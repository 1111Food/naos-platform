import { FastifyInstance } from 'fastify';
import { SigilService } from '../modules/sigil/service';
import { validateUser } from '../middleware/auth';

const sigilService = new SigilService();

interface TarotCard {
    id: number;
    name: string;
    meaning?: string;
}

import { MAJOR_ARCANA_MEANINGS } from '../utils/tarotMeanings';

interface TarotRequest {
    question: string;
    spreadType: string;
    cards: TarotCard[];
    mode?: 'DIRECT' | 'INTERPRETATIVE';
    forceReading?: boolean;
}

export async function tarotRoutes(app: FastifyInstance) {
    // Debug GET route to verify endpoint is active
    app.get('/', async (request, reply) => {
        return { status: 'Tarot Oracle Online', message: 'The spirits are listening.' };
    });

    app.post<{ Body: TarotRequest }>('/', { preHandler: [validateUser] }, async (request, reply) => {
        // @ts-ignore - bypassCoherence might not be in interface yet
        const { question, spreadType, cards, mode, forceReading, bypassCoherence } = request.body;
        const userId = (request as any).user_id;

        // Map bypassCoherence (new frontend prop) to forceReading (backend logic)
        const finalForceReading = forceReading || bypassCoherence || false;

        console.log(`🔮 Tarot POST. Intent: "${question}", ForceBase: ${forceReading}, Bypass: ${bypassCoherence} -> FINAL FORCE: ${finalForceReading}`);

        try {
            // ... construct message ...
            const message = `
            SOLICITUD DE INTERPRETACIÓN DE TAROT:
            Pregunta: "${question}"
            Tirada: ${spreadType}
            Modo: ${mode || 'INTERPRETATIVE'}
            
            Cartas reveladas:
            ${cards.map((c: any, i: number) => `${i + 1}. ${c.name}`).join('\n')}

            Por favor, interpreta estas cartas siguiendo estrictamente el formato de GOBERNANZA DE SIGIL.
            `;

            // Generate response using Sigil Central (processMessage)
            console.log("Attempting to contact Gemini (Sigil Central)...");
            const response = await sigilService.processMessage(userId, message, undefined, undefined, 'maestro', finalForceReading);
            console.log("Gemini response received.");

            return {
                interpretation: response
            };

        } catch (error: any) {
            console.error("❌ Tarot Route Error:", error);

            const isQuota = error.message?.includes('LIMITE_CUOTA');
            const isTimeout = error.name === 'AbortError';

            try {
                const fs = require('fs');
                const path = require('path');
                const logPath = path.join(process.cwd(), 'debug_sigil.log');
                fs.appendFileSync(logPath, `\n[${new Date().toISOString()}] TAROT_ERROR: ${error.message} (Quota: ${isQuota})\n`);
            } catch (e) {
                console.error("Log failed", e);
            }

            // SMART FALLBACK (Plan B): Construct a meaningful response from hardcoded data
            const fallbackMeaning = cards.map(c => `• **${c.name}**: ${MAJOR_ARCANA_MEANINGS[c.id] || "Misterio profundo..."}`).join("\n\n");

            let errorNarrative = "Las señales del éter son débiles en este instante.";
            if (isQuota) {
                errorNarrative = "El Oráculo ha consumido su energía diaria y requiere meditación (Límite de Cuota alcanzado).";
            } else if (isTimeout) {
                errorNarrative = "La conexión con el plano astral ha tardado demasiado en manifestarse.";
            }

            const fallbackResponse = `
            ${errorNarrative} 
            
            Sin embargo, la impronta de los Arcanos en tu campo es clara:

            ${fallbackMeaning}

            Sintoniza con estos símbolos; tu propia intuición es el intérprete final en este momento de silencio.
            `;

            return reply.status(200).send({
                interpretation: fallbackResponse
            });
        }
    });
}
