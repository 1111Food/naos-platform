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
            // Construct a ritualistic prompt for the Sigil
            const prompt = `
                Actúa como un Místico Lector de Tarot en el 'Templo de Luz'.
                
                Contexto:
                - Pregunta del Usuario (Intención del Alma): "${question}"
                - Tipo de Tirada: ${spreadType}
                - Modo: ${mode || 'INTERPRETATIVE'}
                
                Las cartas reveladas son:
                ${cards.map((c, i) => `${i + 1}. ${c.name}`).join('\n')}

                Misión:
                Provee una interpretación espiritual profunda de estas cartas en relación con la intención del usuario.
                Enfócate en la guía, la luz y el empoderamiento.
                Mantén un tono ceremonial pero accesible.
                Dirígete al usuario directamente.
                Máximo 150 palabras.
                RESPONDE SIEMPRE EN ESPAÑOL.
            `;

            // Generate response using Gemini (Sigil)
            console.log("Attempting to contact Gemini (Sigil)...");
            const response = await sigilService.generateResponse(prompt, 'user-1');
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
