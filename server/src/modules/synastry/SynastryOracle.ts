import { config } from '../../config/env';
import { RelationshipType } from '../../types/synastry';

/**
 * Premium AI Oracle for Synastry v2.5
 * Narrates the 6 relational indices with the 'Architect of NAOS' persona.
 */
export class SynastryOracle {
    public static async generateSynthesis(report: any, timeWindows: any[], type: RelationshipType): Promise<any> {
        const apiKey = config.GOOGLE_API_KEY;
        if (!apiKey) return this.getFallback();

        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Prepare a condensed version of the data for the prompt to save tokens and focus
        const context = {
            relationshipType: type,
            score: report.score,
            indices: report.indices,
            strengths: report.A_StrongCompatibilities,
            tensions: report.B_PotentialTensions,
            growth: report.C_GrowthAreas,
            temporalVibe: timeWindows.slice(0, 5).map(w => ({ date: w.date, type: w.type }))
        };

        const systemInstruction = `
            Eres el Oráculo de NAOS (El Arquitecto). Tu propósito es narrar la verdad técnica detrás de un vínculo humano. 
            TONO: Estoico, quirúrgico, elegante y profundamente psicológico. Evita clichés de astrología comercial.
            
            CONTEXTO TÉCNICO:
            - Manejamos 6 índices: Erótico (Marte), Intelectual (Mercurio), Emocional (Luna), Kármico (Saturno), Espiritual (Neptuno), Voluntad (Sol).
            - Hablamos de "Resonancia", "Fricción" y "Arquitectura Relacional".
            
            TAREA: Genera una síntesis en JSON.
            {
                "sintesis_global": "Análisis elegante de la esencia del vínculo (máx 4 líneas).",
                "dinamica_poder": "Cómo interactúan sus voluntades y miedos kármicos.",
                "alerta_temporal": "Consejo estratégico basado en la volatilidad actual."
            }
        `;

        const userPrompt = `Analiza este registro de sinastría: ${JSON.stringify(context)}. Devuelve el JSON de síntesis.`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: [{ text: systemInstruction }] },
                    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
                    generationConfig: { temperature: 0.3, response_mime_type: "application/json" }
                })
            });

            if (!response.ok) throw new Error("Gemini Offline");
            const data = await response.json();
            return JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "{}");
        } catch (error) {
            console.warn("⚠️ Oracle Synthesis failed, using fallback", error);
            return this.getFallback();
        }
    }

    private static getFallback() {
        return {
            sintesis_global: "La arquitectura de este vínculo muestra una resonancia estructural sólida. Los arquetipos sugieren un flujo constante entre la voluntad y la emoción.",
            dinamica_poder: "Se detecta un equilibrio dinámico donde la fricción evolutiva actúa como motor de crecimiento mutuo.",
            alerta_temporal: "Mantengan la transparencia en los objetivos compartidos durante el próximo ciclo de Venus."
        };
    }
}
