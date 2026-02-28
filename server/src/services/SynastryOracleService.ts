// server/src/services/SynastryOracleService.ts
import { config } from '../config/env';
import { RelationshipType } from '../types/synastry';

/**
 * Service to generate AI-powered narrative synthesis for synastry.
 * Follows the "Guardian of NAOS" persona: Stoic, Strategic, and Direct.
 */
export class SynastryOracleService {

    private static async callGemini(prompt: string, systemInstruction: string): Promise<string> {
        const apiKey = config.GOOGLE_API_KEY;
        if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");

        const TARGET_MODEL = "gemini-2.0-flash";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${TARGET_MODEL}:generateContent?key=${apiKey}`;

        const payload = {
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.4, // Lower temperature for more consistent, analytical tone
                topP: 0.8,
                maxOutputTokens: 1024,
                response_mime_type: "application/json"
            }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Gemini API Error: ${JSON.stringify(error)}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    }

    public static async generateSynthesis(payload: any, type: RelationshipType): Promise<any> {
        const systemInstruction = `
            Eres el Guardián Analítico de NAOS. Tu objetivo es interpretar la compatibilidad arquetípica de dos individuos basándote en datos técnicos de astrología, numerología, maya y zodíaco chino.
            
            TONO: Estoico, psicológico, estratégico y directo. 
            REGLAS:
            - Prohibido el misticismo superficial.
            - Habla de "fricciones evolutivas" y "zonas de resonancia".
            - Enfócate en el potencial de construcción y los puntos de ceguera mutuos.
            
            DEBES RESPONDER EXCLUSIVAMENTE EN FORMATO JSON CON ESTA ESTRUCTURA:
            {
                "sintesis_global": "Párrafo corto (3-4 líneas) resumiendo la esencia del vínculo.",
                "dinamica_poder": "Análisis de cómo interactúan sus voluntades y energías.",
                "alerta_temporal": "Consejo accionable basado en la sinastría y la tensión actual."
            }
        `;

        const userPrompt = `
            Analiza la siguiente sinastría de tipo ${type}:
            DATOS TÉCNICOS:
            ${JSON.stringify(payload, null, 2)}
            
            Genera la síntesis del Guardián.
        `;

        try {
            const rawResponse = await this.callGemini(userPrompt, systemInstruction);
            return JSON.parse(rawResponse);
        } catch (error) {
            console.error("Error generating synastry synthesis:", error);
            return {
                sintesis_global: "La resonancia entre estas dos almas está siendo procesada. Los arquetipos sugieren una conexión profunda en los planos fundamentales.",
                dinamica_poder: "Equilibrio dinámico detectado entre la voluntad personal y la misión compartida.",
                alerta_temporal: "Mantengan la claridad en la comunicación durante este ciclo de ajuste."
            };
        }
    }
}
