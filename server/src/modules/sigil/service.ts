import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { config } from '../../config/env';
import { SigilState, UserProfile } from '../../types';
import { EnergyService } from '../energy/service';
import { UserService } from '../user/service';
import { ProfileConsolidator } from '../user/profileConsolidator';
import { createClient } from '@supabase/supabase-js';
import { SIGIL_SYSTEM_PROMPT } from './prompts';

const supabase = createClient(config.SUPABASE_URL || '', config.SUPABASE_ANON_KEY || '');

// Mock DB
const stateStore: Record<string, SigilState> = {};

export class SigilService {
    private genAI: GoogleGenerativeAI;

    constructor() {
        console.log("🕯️ SigilService: Manifesting AI with GOOGLE_API_KEY...");
        console.log("¿Llave detectada?:", !!config.GOOGLE_API_KEY);
        this.genAI = new GoogleGenerativeAI(config.GOOGLE_API_KEY);
        console.log("🛡️ SIGIL PROMPT PURGE COMPLETE — SYSTEM LOCK ACTIVE");
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

        // Detect Subscription Status
        const plan = userProfile.subscription?.plan || 'FREE';

        // Construct Premium Rules Block
        const premiumRules = `
    ──────────────────────────
    NAOS MONETIZATION PROTOCOL
    ──────────────────────────
    User Current Tier: ${plan}

    ${plan === 'PREMIUM' ? `
    PREMIUM TIER ACCESS (ACTIVE):
    - Tarot: Unlimited consultations. Full spreads enabled (Past–Present–Future, Celtic Cross). Deep interpretative layers.
    - Astrology: Full natal chart interpretation. Professional Synastry (romantic, emotional, karmic). Display and comparison of both natal charts.
    - Numerology: Expanded meanings. Cross-analysis with astrology and personal cycles.
    - Mayan Nahual: Extended interpretation based on the traditional Mayan “Book of Destiny”.
    - Chinese Zodiac: Animal + Element interpretation integrated into daily guidance.
    - Sigil Memory: Long-term conversational memory. Personalized advice based on accumulated user context and patterns.
    *Directiva: Depth over verbosity. Premium content must feel profound and sacred.*
    ` : `
    FREE TIER LIMITATIONS:
    - Tarot: 1 consultation per day. Single card only (Yes/No).
    - Energy: Basic guidance only.
    - Numerology: Core number summary only.
    - Astrology: Basic chart overview. No deep interpretation.
    - Relationships: Synastry is DISABLED.
    *Invitation: If a Premium feature is requested, gently invite the user to NAOS Premium for conscious depth.*
    `}
    `;

        // 5. Build Unified System Instruction (SIGIL 6.0 - TOTAL LOCK)
        const userEnergyContext = `USER ENERGY JSON: ${JSON.stringify(energeticBible)}`;
        const dailyEnergyContext = `ENERGY OF THE DAY JSON: ${JSON.stringify(energy)}`;

        const unifiedSystemPrompt = `
IDIOMA: Responde SIEMPRE en Español Latinoamericano correcto, fluido y sin errores gramaticales.

${SIGIL_SYSTEM_PROMPT}

[CONTEXTO DE AUTORIDAD - LA BIBLIA VIVA]
${userEnergyContext}
${dailyEnergyContext}

[CONTEXTO TEMPORAL]
Momento: ${timeContext} (${localDate.toLocaleTimeString()})

[NOTAS DEL GUARDIÁN]
${guardianNotes}

FINAL WARNING: You MUST use the mandatory 5-block structure (TITLE, ESSENCE, GUIDANCE, SHADOW, CLOSING) and stay under 200 words.
`;

        try {
            const modelNames = [
                'models/gemini-2.0-flash',
                'models/gemini-1.5-flash', // Fallback a 1.5 que es más rígido con instrucciones
                'models/gemini-2.5-flash',
                'gemini-2.0-flash'
            ];
            let lastError: any = null;

            for (const modelName of modelNames) {
                try {
                    console.log(`🛡️ SIGIL SYSTEM LOCK: Enforcing Authority Order on ${modelName}...`);
                    const model = this.genAI.getGenerativeModel({
                        model: modelName,
                        systemInstruction: unifiedSystemPrompt,
                        generationConfig: {
                            temperature: 0.7,
                            presencePenalty: 0,
                            topP: 0.8,
                            topK: 40
                        }
                    });

                    // NO HISTORY - Forzamos al modelo a centrarse únicamente en la instrucción y el mensaje actual
                    const result = await model.generateContent(message);
                    let response = result.response.text();

                    // 6. AGGRESSIVE OUTPUT GUARD (HARD LIMIT: 200 words)
                    response = this.applyOutputGuard(response);

                    // Update State (Mock)
                    state.relationshipLevel += 1;
                    state.lastInteraction = new Date().toISOString();

                    // ASYNC PERSISTENCE: Save log and update notes
                    this.persistInteraction(userId, message, response).catch(e => console.error("❌ Persistence failed:", e));

                    return response;
                } catch (e: any) {
                    lastError = e;
                    console.error(`❌ Attempt with ${modelName} failed:`, e.message);

                    if (this.isRateLimitError(e)) {
                        console.warn(`🛑 Rate limit hit for ${modelName}. Waiting 2s before retry...`);
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }

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
                return `Los astros están en silencio momentáneo. El Templo está recalibrando su energía por alta demanda. Intenta conectar en unos segundos. ✨`;
            }

            return "El éter está recalibrando la conexión. Tu guía parcial está disponible; intenta sintonizar de nuevo en un momento. La paz sea contigo.";
        }
    }

    private applyOutputGuard(text: string): string {
        const words = text.split(/\s+/);
        // Límite de seguridad de 200 palabras para evitar desbordes detectados
        if (words.length > 200) {
            console.warn(`⚠️ OUTPUT GUARD: Trimming response for user. Current length: ${words.length}`);
            return words.slice(0, 200).join(" ") + "... [Contenido gobernado por brevedad]";
        }
        return text;
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
