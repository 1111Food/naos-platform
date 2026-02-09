import { FastifyInstance } from 'fastify';
import { SigilService } from '../modules/sigil/service';

const sigilService = new SigilService();

interface TarotCard {
    id: number;
    name: string;
    meaning?: string;
}

interface TarotRequest {
    question: string;
    spreadType: string;
    cards: TarotCard[];
    mode?: 'DIRECT' | 'INTERPRETATIVE';
}

export async function tarotRoutes(app: FastifyInstance) {
    // Debug GET route to verify endpoint is active
    app.get('/', async (request, reply) => {
        return { status: 'Tarot Oracle Online', message: 'The spirits are listening.' };
    });

    app.post<{ Body: TarotRequest }>('/', async (request, reply) => {
        const { question, spreadType, cards, mode } = request.body;
        console.log(`🔮 Tarot POST received. Intent: "${question}", Cards: ${cards.length}`);

        try {
            // Construct a ritualistic intent message for the Sigil Central
            const message = `
            SOLICITUD DE INTERPRETACIÓN DE TAROT:
            Pregunta: "${question}"
            Tirada: ${spreadType}
            Modo: ${mode || 'INTERPRETATIVE'}
            
            Cartas reveladas:
            ${cards.map((c, i) => `${i + 1}. ${c.name}`).join('\n')}

            Por favor, interpreta estas cartas siguiendo estrictamente el formato de GOBERNANZA DE SIGIL.
            `;

            // Generate response using Sigil Central (processMessage)
            console.log("Attempting to contact Gemini (Sigil Central)...");
            const response = await sigilService.processMessage('user-1', message);
            console.log("Gemini response received.");

            return {
                interpretation: response
            };

        } catch (error) {
            console.error("❌ Tarot Route Error:", error);

            // Graceful Fallback (Mock Response) so the UI doesn't break
            return {
                interpretation: "Los espíritus susurran bajito en este momento, pero el mensaje de las cartas es claro: Confía en tu intuición y en el camino que se ha revelado ante ti. La luz siempre encuentra su camino."
            };
        }
    });
}
