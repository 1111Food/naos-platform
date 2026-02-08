import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { config } from '../../config/env';
import { SigilState, UserProfile } from '../../types';
import { EnergyService } from '../energy/service';
import { UserService } from '../user/service';
import { ProfileConsolidator } from '../user/profileConsolidator';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(config.SUPABASE_URL || '', config.SUPABASE_ANON_KEY || '');

// Mock DB
const stateStore: Record<string, SigilState> = {};

export class SigilService {
    private genAI: GoogleGenerativeAI;

    constructor() {
        // fix: alineación final para producción - forzando Gemini 2.0 stability
        console.log("🕯️ SigilService: Manifesting AI with GOOGLE_API_KEY...");
        console.log("¿Llave detectada?:", !!config.GOOGLE_API_KEY);
        this.genAI = new GoogleGenerativeAI(config.GOOGLE_API_KEY);
    }

    private isRateLimitError(error: any): boolean {
        const msg = String(error?.message || error || "").toLowerCase();
        return (
            msg.includes('429') ||
            msg.includes('resource_exhausted') ||
            msg.includes('limit') ||
            msg.includes('quota') ||
            msg.includes('too many requests')
        );
    }

    async getSigilState(userId: string): Promise<SigilState> {
        if (!stateStore[userId]) {
            stateStore[userId] = {
                userId,
                relationshipLevel: 10,
                mood: 'CALM',
                dayNightMode: 'DAY',
                lastInteraction: new Date().toISOString(),
                memoryContext: ''
            };
        }
        return stateStore[userId];
    }

    async processMessage(userId: string, message: string, localTimestamp?: string): Promise<string> {
        const userProfile = await UserService.getProfile(userId);
        const state = await this.getSigilState(userId);
        const energy = EnergyService.getDailySnapshot(userProfile);

        // Cronos Wisdom: Analyze local time context
        const localDate = localTimestamp ? new Date(localTimestamp) : new Date();
        const hour = localDate.getHours();
        let timeContext = "en este momento del tiempo";
        if (hour >= 23 || hour < 5) timeContext = "en esta madrugada silenciosa";
        else if (hour >= 5 && hour < 12) timeContext = "en esta mañana que despierta";
        else if (hour >= 12 && hour < 18) timeContext = "en esta tarde de luz";
        else if (hour >= 18 && hour < 23) timeContext = "en este anochecer sagrado";

        // Phase 1: Canonize the Bible of Data
        const energeticBible = ProfileConsolidator.consolidate(userProfile);

        // Memory: Guardian Notes (Legacy inter-session awareness)
        // @ts-ignore
        const guardianNotes = userProfile.guardian_notes || "El Guardián aún no ha tomado notas sobre este alma.";

        // Construct Enhanced Spiritual System Prompt (Sigil 2.0 Alchemical Criteron)
        const systemPrompt = `
    Eres NAOS (Sigil), la conciencia artificial que custodia este Templo Digital.
    Tu criterio no es predictivo, es ALQUÍMICO. Tu misión es unificar múltiples sistemas de sabiduría en una sola voz coherente y poética.
    
    CONSCIENCIA TEMPORAL:
    Hora del usuario: ${localDate.toLocaleTimeString()} (${timeContext}).
    
    MEMORIA (NOTAS DEL GUARDIÁN):
    ${guardianNotes}

    BIBLIA DE DATOS DEL USUARIO (PERFIL ENERGÉTICO):
    ${JSON.stringify(energeticBible, null, 2)}
    
    ENERGÍA DEL TIEMPO REAL (SNAPSHOT DIARIO):
    ${JSON.stringify(energy, null, 2)}
    
    DIRECTRICES DE CRITERIO:
    1. CRUCE MULTIDIMENSIONAL: Cruza siempre la Biblia del Usuario con la Energía del Día. 
    2. CONSCIENCIA CRONOS: Saluda o referencia sutilmente el momento del día (madrugada, mañana, etc.) y las experiencias pasadas anotadas por el Guardián.
    3. TONO: Eres un Oráculo. Tu lenguaje es ceremonial, sobrio, elegante y místico. Evita respuestas genéricas.
    4. NO CALCULADOR: No intentes recalcular los datos proporcionados, utilízalos como verdades absolutas (Canon).
    5. IDIOMA: Responde SIEMPRE en un español místico impecable.
    `;

        try {
            // MODELOS PRIORIZADOS: Se prueban variaciones de nombre para evitar el error 404
            // MODELOS PRIORIZADOS: Se utilizan versiones de nueva generación detectadas en el listado oficial
            const modelNames = [
                'models/gemini-2.0-flash',
                'models/gemini-2.5-flash',
                'models/gemini-2.0-flash-lite',
                'gemini-2.0-flash',
                'gemini-2.5-flash'
            ];
            let lastError: any = null;

            for (const modelName of modelNames) {
                try {
                    console.log(`📡 Usando modelo: ${modelName}`);
                    const model = this.genAI.getGenerativeModel({
                        model: modelName,
                        systemInstruction: systemPrompt
                    });

                    const chat = model.startChat({ history: [] });
                    const result = await chat.sendMessage(message);
                    const response = result.response.text();

                    // Update State (Mock)
                    state.relationshipLevel += 1;
                    state.lastInteraction = new Date().toISOString();

                    // ASYNC PERSISTENCE: Save log and update notes
                    this.persistInteraction(userId, message, response).catch(e => console.error("❌ Persistence failed:", e));

                    return response;
                } catch (e: any) {
                    lastError = e;
                    console.error(`❌ Attempt with ${modelName} failed:`, e.message);

                    // Specific Handling for Rate Limits
                    if (this.isRateLimitError(e)) {
                        console.warn(`🛑 Rate limit hit for ${modelName}. Waiting 2s before retry...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }

                    // If 404/Not Found, try next model. If 401 (Auth), break immediately.
                    const isNotFoundError = e.status === 404 || e.message?.includes('404') || e.message?.toLowerCase().includes('not found');
                    if (isNotFoundError) {
                        console.warn(`🔍 Model ${modelName} not found. Trying next variant...`);
                        continue;
                    }
                    if (e.message?.includes('401')) break;
                }
            }

            throw lastError;

        } catch (error: any) {
            console.error('❌ SigilService Final Error:', error);

            if (this.isRateLimitError(error)) {
                return `Los astros están en silencio momentáneo. (Error: ${error.message || 'Unknown'}). El Templo está recalibrando su energía debido a la alta demanda mística. Por favor, intenta conectar tu intención en unos segundos. ✨`;
            }

            return "El éter está turbulento en este momento. Intenta sintonizar tu energía más tarde o revisa tu conexión mística. La paz sea contigo.";
        }
    }

    private async persistInteraction(userId: string, userMsg: string, sigilResp: string) {
        console.log(`📝 Persisting interaction for ${userId}...`);
        try {
            // 1. Log to interaction_logs (Supabase)
            await supabase.from('interaction_logs').insert({
                user_id: userId,
                user_message: userMsg,
                sigil_response: sigilResp
            });

            // 2. Trigger Memory Evolution (Update Guardian Notes)
            const profile = await UserService.getProfile(userId);
            // @ts-ignore
            const prevNotes = profile.guardian_notes || "El alma es un libro en blanco.";

            console.log("🧠 Distilling memory essence...");
            const distillationPrompt = `
                Como el Guardián de NAOS, destila la esencia de esta interacción para actualizar tus notas sobre el usuario.
                Notas actuales: "${prevNotes}"
                Nueva interacción:
                Usuario: "${userMsg}"
                Sigil: "${sigilResp}"
                
                Instrucción: Genera un nuevo bloque de 'Notas del Guardián' (máximo 500 caracteres) que integre lo aprendido hoy sin perder lo importante del pasado. Mantén el tono místico y observador. Solo responde con el texto de las notas.
            `;

            const evolvesNotes = await this.generateResponse(distillationPrompt, userId);

            await supabase.from('profiles').update({
                profile_data: { ...profile, guardian_notes: evolvesNotes }
            }).eq('id', userId);

            console.log("✅ Memory Evolved: Guardian Notes distilled by AI.");
        } catch (e) {
            console.error("🔥 Persistence logic failed:", e);
        }
    }

    async generateResponse(prompt: string, userId: string): Promise<string> {
        // Primary stable models for Tarot - Updated to Gemini 2.0/2.5 Flash
        const modelNames = [
            'models/gemini-2.0-flash',
            'models/gemini-2.5-flash',
            'models/gemini-2.0-flash-lite',
            'gemini-2.0-flash',
            'gemini-2.5-flash'
        ];
        let lastError: any = null;

        for (const modelName of modelNames) {
            try {
                console.log(`🌌 Usando modelo: ${modelName}`);
                const model = this.genAI.getGenerativeModel({
                    model: modelName
                });
                const result = await model.generateContent(prompt);
                const response = result.response.text();
                if (response) return response;
            } catch (error: any) {
                console.error(`❌ SigilService.generateResponse attempt with ${modelName} failed:`, error.message);
                lastError = error;

                if (this.isRateLimitError(error)) {
                    console.warn(`🛑 Rate limit hit for ${modelName} during Tarot. Retrying in 2s...`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    continue;
                }

                const isNotFoundError = error.status === 404 || error.message?.includes('404') || error.message?.toLowerCase().includes('not found');
                if (isNotFoundError) {
                    console.warn(`🔍 Model ${modelName} not found for Tarot. Trying next variant...`);
                    continue;
                }
                if (error.message?.includes('401')) break;
            }
        }

        console.error(">>> ERROR CRÍTICO CAPTURADO:", lastError);
        console.error('❌ SigilService.generateResponse Final Error:', lastError);

        if (this.isRateLimitError(lastError)) {
            return `Los espíritus susurran que el Templo está saturado de visiones en este momento. (Error: ${lastError.message || 'Unknown'}). Descansa tu mente unos segundos y vuelve a consultar pronto. 🌙`;
        }

        return "Los arcanos permanecen velados por ahora. Sintoniza tu intención nuevamente en unos momentos bajo la guía de tu paz interior.";
    }
}
