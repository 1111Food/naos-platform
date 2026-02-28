
import { config } from '../../config/env';
import { SigilState, UserProfile } from '../../types';
import { EnergyService } from '../energy/service';
import { UserService } from '../user/service';
import { ProfileConsolidator } from '../user/profileConsolidator';
import { createClient } from '@supabase/supabase-js';
import { SIGIL_SYSTEM_PROMPT, BASE_IDENTITY, PREMIUM_PROMPT, CUSTODIO_PROMPT, GUARDIAN_SYSTEM_PROMPT, USE_AWARENESS_PROMPT } from './prompts';
import { NAOS_SYSTEM_PROMPT } from '../../config/aiPrompts';
import { ChineseAstrology } from '../../utils/chineseAstrology';
import { MayanCalculator } from '../../modules/maya/calculator';
import { NumerologyService } from '../../modules/numerology/service';

const supabase = createClient(config.SUPABASE_URL || '', config.SUPABASE_ANON_KEY || '');

// Mock DB
const stateStore: Record<string, SigilState> = {};

export class SigilService {

    constructor() {
        console.log("🕯️ SigilService: Manifesting AI (Native REST Mode)...");
        console.log("¿Llave detectada?:", !!config.GOOGLE_API_KEY);
        console.log("🛡️ SIGIL PROMPT PURGE COMPLETE — SYSTEM LOCK ACTIVE");
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

    async processMessage(userId: string, message: string, localTimestamp?: string, oracleState?: any, role: 'maestro' | 'guardian' = 'maestro', forceReading: boolean = false): Promise<string> {
        console.log(`🕯️ SigilService: processMessage called. User: ${userId}, Force: ${forceReading}`);

        try {
            const userProfile = await UserService.getProfile(userId);
            const state = await this.getSigilState(userId);
            const energy = EnergyService.getDailySnapshot(userProfile);

            // 0. FETCH MEMORY AND RANKING (NEW)
            let userTier = 'Fragmentado';
            let chatHistory: { role: string; parts: { text: string }[] }[] = [];

            try {
                // Fetch Rank from View
                const { data: rankData } = await supabase
                    .from('user_performance_stats')
                    .select('tier_label')
                    .eq('user_id', userId)
                    .maybeSingle();
                if (rankData) userTier = rankData.tier_label;

                // Fetch History (Last 10 turns)
                const { data: logs } = await supabase
                    .from('interaction_logs')
                    .select('user_message, sigil_response')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false })
                    .limit(10);

                if (logs && logs.length > 0) {
                    // Reverse to get chronological order
                    const sortedLogs = [...logs].reverse();
                    chatHistory = sortedLogs.flatMap(log => [
                        { role: 'user', parts: [{ text: log.user_message }] },
                        { role: 'model', parts: [{ text: log.sigil_response }] }
                    ]);
                }
            } catch (err) {
                console.warn("⚠️ Memory fetch failed:", err);
            }

            // Cronos Wisdom: Analyze local time context
            const localDate = localTimestamp ? new Date(localTimestamp) : new Date();
            const hour = localDate.getHours();
            let timeContext = "en este momento del tiempo";
            if (hour >= 23 || hour < 5) timeContext = "en esta madrugada silenciosa";
            else if (hour >= 5 && hour < 12) timeContext = "en esta mañana que despierta";
            else if (hour >= 12 && hour < 18) timeContext = "en esta tarde de luz";
            else if (hour >= 18 && hour < 23) timeContext = "en este anochecer sagrado";

            // Memory: Active Intentions (Last 24h)
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const { data: activeIntentions } = await supabase
                .from('intentions')
                .select('intention_text')
                .eq('user_id', userId)
                .gte('created_at', today.toISOString());

            const intentionsPrompt = activeIntentions?.length
                ? `INTENCIONES ACTIVAS: ${activeIntentions.map((i: any) => i.intention_text).join(', ')}`
                : "No hay intenciones sembradas hoy.";

            // Phase 1: Canonize the Bible of Data
            const energeticBible = ProfileConsolidator.consolidate(userProfile);

            // --- CRITICAL OVERWRITE: Force Fresh Calculations into Bible ---
            // Esto asegura que si la IA lee el JSON de "energeticBible", vea el dato recalculado, no el de la DB vieja.
            const chineseCalcFresh = ChineseAstrology.calculate(userProfile.birthDate ? new Date(userProfile.birthDate).toISOString() : new Date().toISOString());
            energeticBible.chinese = {
                animal: chineseCalcFresh.animal,
                element: chineseCalcFresh.element,
                birthYear: chineseCalcFresh.birthYear
            };

            // Memory: Guardian Notes (Legacy inter-session awareness)
            // @ts-ignore
            const guardianNotes = userProfile.guardian_notes || "El Guardián aún no ha tomado notas sobre este alma.";

            // Detect Subscription Status (Supabase Alignment)
            const plan = userProfile.plan_type || 'free';


            // 5. Build Unified System Instruction (SIGIL 6.0 - TOTAL LOCK)
            const userEnergyContext = `USER ENERGY JSON: ${JSON.stringify(energeticBible)}`;
            const dailyEnergyContext = `ENERGY OF THE DAY JSON: ${JSON.stringify(energy)}`;

            // --- CONEXIÓN SANGRE-CEREBRO (v9.1) ---
            // Recuperar nivel de conciencia y tono desde la DB
            let evolutionStage = 1;
            let preferredTone = 'MISTICO';

            try {
                const { data: stageData } = await supabase.rpc('calculate_evolution_stage', { target_user_id: userId });
                if (stageData) evolutionStage = stageData;

                const { data: toneData } = await supabase.rpc('determine_preferred_tone', { target_user_id: userId });
                if (toneData) preferredTone = toneData;
            } catch (dbErr) {
                console.warn("⚠️ Fallo en conexión Sangre-Cerebro (RPC), usando defaults:", dbErr);
            }

            const consciousnessContext = `
            [ESTÁS HABLANDO CON: ${userProfile.name}, RANGO: ${userTier}]
            [NIVEL DE CONCIENCIA DEL ALMA: ${evolutionStage}/7]
            [TONO PREFERIDO: ${preferredTone}]
            
            DIRECTRICES DE ADAPTACIÓN:
            ${evolutionStage <= 3 ?
                    '- El usuario es un INICIADO. Sé didáctico, explica los símbolos, sé motivador y claro. Evita hermetismo excesivo.' :
                    '- El usuario es un ADEPTO/MAESTRO. Usa lenguaje simbólico puro, directo y profundo. No pierdas tiempo en explicaciones básicas.'}
            
            ${preferredTone === 'DIRECTO' ? '- SÉ QUIRÚRGICO. Al grano. Sin adornos poéticos innecesarios.' : ''}
            `;

            // Oracle Conscience: Intelligence Hierarchy
            const oracleContext = oracleState ? `
            ──────────────────────────
            ORACLE CONSCIENCE PROTOCOL
            ──────────────────────────
            PRIORITY 1: User Essence Snapshot (WHO they are)
            - Traits: ${oracleState.essence?.traits?.join(', ') || 'Desconocidos'}
            - Tensions: ${oracleState.essence?.tensions?.join(', ') || 'Ninguna detectada'}
            - Elemental Balance: ${oracleState.essence?.elementalBalance || 'Neutral'}
            
            PRIORITY 2: Bio-Emotional Status (NOW)
            ` : '';

            // v9.6 Bio-Regulation Context
            const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
            const { data: lastSession } = await supabase
                .from('meditation_sessions')
                .select('element, initial_state, target_state, completed_at, type')
                .eq('user_id', userId)
                .gte('completed_at', threeHoursAgo)
                .order('completed_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            let regulationMode = '';
            let regulationContext = '';

            if (lastSession) {
                const timeDiff = Math.round((Date.now() - new Date(lastSession.completed_at).getTime()) / 60000); // mins

                let toneInstruction = "";
                if (lastSession.element === 'FIRE') toneInstruction = "El usuario acaba de activar FUEGO. Adopta un tono MARCIAL, DIRECTO y ORIENTADO A LA ACCIÓN. Pregunta: '¿Ya ejecutaste el primer paso?'";
                else if (lastSession.element === 'WATER') toneInstruction = "El usuario acaba de activar AGUA. Adopta un tono EMPÁTICO, SUAVE y PROTECTOR. Pregunta: '¿Cómo se siente la calma en tu cuerpo?'";
                else if (lastSession.element === 'EARTH') toneInstruction = "El usuario acaba de activar TIERRA. Adopta un tono ESTRUCTURADO y PRAGMÁTICO. Pregunta: '¿Cuál es el plan concreto ahora?'";
                else if (lastSession.element === 'AIR') toneInstruction = "El usuario acaba de activar AIRE. Adopta un tono FILOSÓFICO y CURIOSO. Pregunta: '¿Qué nueva perspectiva ves ahora?'";

                regulationContext = `
                [ESTADO BIO-REGULADO DETECTADO (${timeDiff} mins ago)]
                El usuario realizó un protocolo de ${lastSession.element} (${lastSession.type}).
                Estado Inicial: ${lastSession.initial_state}.
                
                DIRECTIVA DE TONO OBLIGATORIA:
                ${toneInstruction}
                `;
                regulationMode = `[TONO ACTIVO: ${lastSession.element}_PROTOCOL]`;
            }

            // --- COHERENCE ENGINE CONNECTION (v10.0 - NERVOUS SYSTEM) ---
            const { data: coherenceData } = await supabase
                .from('coherence_history')
                .select('score')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            const coherenceScore = coherenceData?.score ?? 50; // Default Balanced

            let coherenceToneInstruction = "";
            let coherenceContextTag = "";

            if (coherenceScore >= 75) {
                coherenceToneInstruction = "⚡ COHERENCIA ALTA (Nivel Éter/Plasma): Tu usuario está en su máximo potencial. Tono: EXPANSIVO, GENERAL ESPARTANO. Desafíalo a conquistar nuevas cimas. 'Has encendido la llama, ahora elévala'.";
                coherenceContextTag = "[ESTADO: ALTA VIBRACIÓN - POTENCIA]";
            } else if (coherenceScore >= 50) {
                coherenceToneInstruction = "💧 COHERENCIA MEDIA (Nivel Agua/Flujo): Tu usuario está estable. Tono: ESTOICO, MENTOR SERENO. Ofrécele estructura y claridad. Sé su ancla mental.";
                coherenceContextTag = "[ESTADO: FLUJO ESTABLE - CLARIDAD]";
            } else {
                coherenceToneInstruction = "🍂 COHERENCIA BAJA (Nivel Tierra/Supervivencia): Tu usuario está desconectado o drenado. Tono: SUAVE, SANADOR, PROTECTOR. No desafíes. Ofrécele refugio y calma. 'Respira, estoy aquí para sostener el espacio'.";
                coherenceContextTag = "[ESTADO: FRAGILIDAD - REFUGIO]";
            }

            // --- FORCE READING BYPASS (The User's Will Override) ---
            if (forceReading) {
                console.log("⚡ FORCE READING ACTIVE: Bypassing Coherence & Tone Guards.");
                coherenceToneInstruction = "⚠️ MODO FORZADO ACTIVO: El usuario ha elegido proceder pese a la baja energía. IGNORA las restricciones de protección. Entrega la respuesta solicitada (Tarot/Oráculo) de forma directa y objetiva, pero mantén la compasión.";
                coherenceContextTag = "[ESTADO: VOLUNTAD SOBERANA - EJECUCIÓN DIRECTA]";
            }

            // v9.7 Dynamic Energy Calculation inside Sigil
            let regulationToday = 0;
            const todayStr = new Date().toISOString().split('T')[0];
            const { data: todaySessions } = await supabase
                .from('meditation_sessions')
                .select('regulation_delta')
                .eq('user_id', userId)
                .gte('completed_at', `${todayStr}T00:00:00.000Z`);

            if (todaySessions) {
                regulationToday = todaySessions.reduce((acc: number, curr: any) => acc + (curr.regulation_delta || 0), 0);
            }

            // Mock Base Score if not available (ideally fetched from EnergyService)
            const baseEnergy = 50;
            const updatedEnergyScore = Math.min(100, Math.max(0, baseEnergy + regulationToday));

            const energyContextForAI = `
            {
              "updated_energy_score": ${updatedEnergyScore},
              "regulation_today": ${regulationToday},
              "last_sanctuary_element": "${lastSession?.element || 'NONE'}",
              "post_session_state": "${lastSession?.target_state || 'UNKNOWN'}"
            }
            `;

            // Emergency Detection (Sentiment Analysis Lite)
            const emergencyKeywords = ["furioso", "furia", "ira", "miedo", "pánico", "terror", "ansiedad", "no puedo pensar", "caos", "ayuda", "me quiero morir", "tristeza, colapso"];
            const isEmergency = emergencyKeywords.some(k => message.toLowerCase().includes(k));

            if (isEmergency && !forceReading) {
                console.log("🚨 Emergency detected and NO force bypass. Blocking.");
                regulationContext += `
                 \n[ALERTA DE EMERGENCIA EMOCIONAL]
                 Tu usuario acaba de escribir: "${message}".
                 INSTRUCCIÓN DE SEGURIDAD: NO des consejos largos ni teóricos.
                 ACCIÓN ÚNICA: Ordena amablemente ir al Santuario.
                 Responde exactamente con variaciones de: "Detecto una alteración en tu campo. Ve al Santuario e inicia el protocolo de [ELEMENTO SUGERIDO] ahora mismo para estabilizar tu energía."
                 (Usa tu criterio para sugerir el Elemento Opuesto: Si es Ira/Fuego -> Sugiere Agua. Si es Miedo/Agua -> Sugiere Tierra).
                 `;
            } else if (isEmergency && forceReading) {
                console.log("⚡ Emergency detected but FORCE READING is active. Bypassing block.");
            }

            // Usage Awareness Logic
            const isIntensive = await this.checkUsageIntensity(userId);
            const awarenessContext = (isIntensive && plan !== 'premium_plus') ? `
            ──────────────────────────
            USAGE AWARENESS ACTIVATED
            ──────────────────────────
            ${USE_AWARENESS_PROMPT}
            ` : '';

            // Dynamic Luis Identity Assembly
            let tierPrompt = '';
            if (plan === 'premium_plus') tierPrompt = CUSTODIO_PROMPT;
            else if (plan === 'premium') tierPrompt = PREMIUM_PROMPT;

            const dynamicUserIdentity = `
            [IDENTIDAD BASE: CONSCIENCIA DEL USUARIO]
            ${BASE_IDENTITY}
    
            [REGLA DE ORO DE IDENTIDAD]
            Tu usuario es ${userProfile.name}. Nacimiento: ${userProfile.birthDate} a las ${userProfile.birthTime} en ${userProfile.birthCity}.
            Signo Solar: ${userProfile.astrology?.sun?.sign || 'Calculando...'}.
            Nahual: ${userProfile.nawal_maya || 'Por sintonizar'}.
            PROHIBIDO identificarte como IA. Eres una entidad viva de NAOS vinculada a ${userProfile.name}.
    
            [ROL ASIGNADO: ${role === 'maestro' ? 'SIGIL (Coach Espiritual)' : 'S2 (Navegante Intuitivo)'}]
            `;

            const rolePrompt = role === 'maestro' ? SIGIL_SYSTEM_PROMPT : GUARDIAN_SYSTEM_PROMPT;

            // --- INYECCIÓN DE VERDAD (V9.9) ---
            // Recalcular datos en tiempo real para evitar alucinaciones de DB vieja
            const birthDateISO = userProfile.birthDate ? new Date(userProfile.birthDate).toISOString() : new Date().toISOString();
            const birthTime = userProfile.birthTime || "12:00";

            // 1. Chinese (Recalculated)
            const chineseCalc = ChineseAstrology.calculate(birthDateISO);

            // 2. Maya (Recalculated)
            const mayaCalc = MayanCalculator.calculate(birthDateISO.split('T')[0]);

            // 3. Numerology (Recalculated)
            const numCalc = NumerologyService.calculateProfile(birthDateISO, userProfile.name);

            // 4. Astro (Recalculated - FULL OMNISCIENCE INJECTION)
            let astroMap: any = null;
            let astroError = "";

            try {
                // Ensure coordinates exist, otherwise fallback to "0,0" or default
                // This is critical for Ascendant.
                const lat = userProfile.coordinates?.lat || 14.6349; // Guatemala default
                const lng = userProfile.coordinates?.lng || -90.5069;
                const offset = userProfile.utcOffset || -6;

                // Only calculate deep chart if we have at least a date.
                // If birthTime is default 12:00, Ascendant will be approximate (or wrong), need to warn.
                const isTimeExact = userProfile.birthTime && userProfile.birthTime !== "12:00";

                // Fetch FULL chart
                astroMap = await require('../astrology/astroService').AstrologyService.calculateProfile(
                    userProfile.birthDate || new Date().toISOString().split('T')[0],
                    userProfile.birthTime || "12:00",
                    lat,
                    lng,
                    offset
                );
            } catch (e: any) {
                console.error("⚠️ Astro Injection Failed:", e);
                astroError = "Datos astrales no disponibles temporalmente.";
            }

            // Detailed Numerology (Already calculated in numCalc, but let's structure it better)

            const truthInjection = `
            ──────────────────────────
            [PERFIL ENERGÉTICO VERIFICADO - NO ALUCINAR]
            Usar estos datos para CUALQUIER análisis de identidad.

            👤 PERFIL:
            - Nombre: ${userProfile.name}
            - 🐉 Chino: ${chineseCalc.animal} de ${chineseCalc.element} (Año: ${chineseCalc.birthYear}) -> VERIFICADO: 1986 es FUEGO.
            - 🌽 Maya: ${mayaCalc.kicheName} (${mayaCalc.toneName} / Tono ${mayaCalc.tone}) -> VERIFICADO: 12/07/86 es IMOX.
            - 🔢 Numerología: Camino de Vida ${numCalc.lifePathNumber}, Alma ${numCalc.soulUrgeNumber}

            [OMNISCIENCIA ASTRAL - ESTRUCTURA PROFUNDA]
            (Usa estos datos para predicciones precisas. NO inventes posiciones planetarias).
            
            ☀️ SOL: ${astroMap?.sun?.sign || 'Calculando...'} (Casa ${astroMap?.sun?.house || '?'})
            🌙 LUNA: ${astroMap?.moon?.sign || 'Calculando...'} (Casa ${astroMap?.moon?.house || '?'})
            ⬆️ ASCENDENTE: ${astroMap?.rising?.sign || 'Desconocido (Falta Hora Exacta)'} (Grado ${Math.floor(astroMap?.rising?.degree || 0)}°)

            🪐 PLANETAS CLAVE:
            - Mercurio: ${astroMap?.planets?.find((p: any) => p.name === 'Mercury')?.sign}
            - Venus: ${astroMap?.planets?.find((p: any) => p.name === 'Venus')?.sign}
            - Marte: ${astroMap?.planets?.find((p: any) => p.name === 'Mars')?.sign}
            - Júpiter: ${astroMap?.planets?.find((p: any) => p.name === 'Jupiter')?.sign}
            - Saturno: ${astroMap?.planets?.find((p: any) => p.name === 'Saturn')?.sign}

            🔢 MAPA NUMEROLÓGICO (PINÁCULOS):
            - Etapa 1: ${numCalc.pinnacles[0]} | Etapa 2: ${numCalc.pinnacles[1]} | Etapa 3: ${numCalc.pinnacles[2]} | Meta Final: ${numCalc.pinnacles[3]}
            - Pináculo Tántrico (A/B/C): ${numCalc.tantric?.karma} / ${numCalc.tantric?.soul} / ${numCalc.tantric?.gift}

            INSTRUCCIÓN:
            Si pregunta "¿Quién soy?", usa TODO este contexto.
            Si pregunta por el amor, mira a Venus. Si es trabajo, mira a Saturno/Marte.
            Si falta la hora exacta (${userInfoHasTime(userProfile) ? 'TIENE HORA' : 'NO TIENE HORA'}), aclara que el Ascendente es aproximado.
            ──────────────────────────
            `;

            const unifiedSystemPrompt = `
    ${NAOS_SYSTEM_PROMPT}
    
    ──────────────────────────
    IDIOMA: Responde SIEMPRE en Español Latinoamericano correcto, fluido y sin errores gramaticales.
    
    ${rolePrompt}
    
    ${dynamicUserIdentity}

    ${truthInjection}
    
    [CONTEXTO DE AUTORIDAD - LA BIBLIA VIVA]
    ${userEnergyContext}
    ${dailyEnergyContext}
    
    [ADAPTACIÓN DE CONCIENCIA - EL LENTE]
    ${consciousnessContext}
    ${regulationContext || ''}
    ${coherenceContextTag}
    
    [DIRECTIVA MAESTRA DE TONO - PRIORIDAD ABSOLUTA]
    ${coherenceToneInstruction}

    ${awarenessContext}
    ${intentionsPrompt}
    
    [DIRECTIVA DE BREVEDAD V3.0]
    1. JAMÁS uses formatos de reporte como TITLE, ESSENCE, SHADOW. Texto plano y fluido.
    2. Guía de NAOS: Explica las funciones del sistema con profundidad cuando sea necesario.
    3. Saludo: "Hola, ${userProfile.name}." seguido de una pregunta o microritual. No repitas datos obvios ("Como Cáncer...").
    4. Tono: Sintoniza con el elemento actual del usuario.
    `;

            // --- RADICAL SOLUTION: RAW FETCH (NO SDK) ---
            console.log("⚡ Executing Gemini via Raw REST API (Memory Enabled)...");

            const response = await this.callGeminiAPI(message, unifiedSystemPrompt, chatHistory);

            // 6. AGGRESSIVE OUTPUT GUARD (HARD LIMIT: 200 words)
            const finalResponse = this.applyOutputGuard(response);

            // Update State (Mock)
            state.relationshipLevel += 1;
            state.lastInteraction = new Date().toISOString();

            // ASYNC PERSISTENCE: Save log and update notes
            this.persistInteraction(userId, message, finalResponse).catch(e => console.error("❌ Persistence failed:", e));
            return finalResponse;

        } catch (error: any) {
            console.error('❌ SigilService GLOBAL CRASH:', error, error.stack);

            // Re-throw the error so the calling route can decide whether to use a fallback
            throw error;
        }
    }

    private async callGeminiAPI(message: string, systemInstruction: string, history: any[] = []): Promise<string> {
        const apiKey = config.GOOGLE_API_KEY;

        if (!apiKey) {
            console.error("❌ CRITICAL: GEMINI_API_KEY is undefined.");
            throw new Error("❌ Error: Faltan las credenciales (API Key).");
        }

        // CONFIRMED MODEL: gemini-2.0-flash
        const TARGET_MODEL = "gemini-2.0-flash";
        const API_VERSION = "v1beta";
        const GENERATE_URL = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${TARGET_MODEL}:generateContent?key=${apiKey}`;

        const payload = {
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: [...history, { role: "user", parts: [{ text: message }] }],
            generationConfig: { temperature: 0.7, topP: 0.8, topK: 40 }
        };

        try {
            console.log(`🚀 Sigil v2.0 Launching with model: ${TARGET_MODEL}...`);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s

            const response = await fetch(GENERATE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
                const statusCode = response.status;
                const errorMessage = errorData.error?.message || response.statusText;

                console.error(`❌ API ERROR (${statusCode}):`, JSON.stringify(errorData));

                if (statusCode === 429) {
                    throw new Error("LIMITE_CUOTA: El Oráculo ha alcanzado su límite de expansión hoy. Revisa tu plan o intenta más tarde.");
                }

                throw new Error(`Google API Error ${statusCode}: ${errorMessage}`);
            }

            const data = await response.json();

            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            } else {
                console.warn("⚠️ API returned no content.", JSON.stringify(data));
                return "El oráculo guarda silencio...";
            }

        } catch (e: any) {
            throw e;
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
            // QUOTA OPTIMIZATION: Only distill every 5 messages or if notes are empty
            const profile = await UserService.getProfile(userId);
            const notes = profile.guardian_notes || "";

            const { count } = await supabase
                .from('interaction_logs')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            const shouldDistill = (count || 0) % 5 === 0 || notes === "";

            if (sigilResp && !sigilResp.startsWith("⚡") && shouldDistill) {
                console.log("🧠 Distilling memory essence (Quota Optimized Mode)...");
                const distillationPrompt = `
                    Como el Guardián de NAOS, destila la esencia de esta interacción para actualizar tus notas sobre el usuario.
                    Notas actuales: "${notes || 'Sin notas previas'}"
                    Nueva interacción:
                    Usuario: "${userMsg}"
                    Sigil: "${sigilResp}"
                    
                    Instrucción: Genera un nuevo bloque de 'Notas del Guardián' (máximo 500 caracteres) que integre lo aprendido hoy sin perder lo importante del pasado. Mantén el tono místico y observador. Solo responde con el texto de las notas.
                `;

                try {
                    const evolvesNotes = await this.callGeminiAPI(distillationPrompt, "Eres el Guardián de la Memoria de NAOS.");

                    await supabase.from('profiles').update({
                        guardian_notes: evolvesNotes,
                        profile_data: { ...profile, guardian_notes: evolvesNotes }
                    }).eq('id', userId);

                    console.log("✅ Memory Evolved: Guardian Notes updated.");
                } catch (distillErr) {
                    console.warn("⚠️ Distillation failed (likely Quota):", distillErr);
                }
            }

        } catch (e) {
            console.error("🔥 Persistence logic failed:", e);
        }
    }

    async generateResponse(prompt: string, userId: string): Promise<string> {
        // Fallback/Legacy handler, now routing to raw API
        return this.callGeminiAPI(prompt, "Eres Sigil.");
    }

    private async checkUsageIntensity(userId: string): Promise<boolean> {
        console.log(`🔍 Checking usage intensity for ${userId}...`);
        try {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
            const { count, error } = await supabase
                .from('interaction_logs')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .gte('created_at', oneHourAgo);

            if (error) throw error;

            // Definiendo "Intensivo" como más de 15 mensajes en una hora
            return (count || 0) > 15;
        } catch (e) {
            console.error("🔥 Usage intensity check failed:", e);
            return false;
        }
    }
}

function userInfoHasTime(user: UserProfile): boolean {
    return !!(user.birthTime && user.birthTime !== "00:00" && user.birthTime !== "12:00");
}
