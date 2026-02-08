import { FastifyInstance } from 'fastify';
import { AstrologyService } from '../modules/astrology/astroService';
import { UserService } from '../modules/user/service';
import { AstralDailyService } from '../modules/astrology/AstralDailyService';

const currentUserId = '00000000-0000-0000-0000-000000000000';

interface NatalChartRequest {
    name: string;
    birthDate: string; // YYYY-MM-DD
    birthTime: string; // HH:mm
    birthCity?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export async function astrologyRoutes(app: FastifyInstance) {
    app.post<{ Body: NatalChartRequest }>('/natal-chart', async (req, reply) => {
        const { birthDate, birthTime, coordinates } = req.body;

        console.log("🌌 Natal Chart Request:", req.body);

        if (!coordinates || !coordinates.lat || !coordinates.lng) {
            return reply.status(400).send({ error: "Coordinates (lat, lng) are required for accurate calculation." });
        }

        try {
            // Hot Fix: Use consolidated AstrologyService for Vercel Parity
            const chart = await AstrologyService.calculateProfile(
                birthDate,
                birthTime,
                coordinates.lat,
                coordinates.lng,
                req.body.utcOffset !== undefined ? req.body.utcOffset : -6
            );

            const response = {
                ...chart,
                // Legacy compatibility for frontend UI
                elemental_balance: chart.elements
            };

            await UserService.updateProfile(currentUserId, {
                astrology: response as any,
                name: req.body.name
            });

            return response;

        } catch (error) {
            console.error("Chart Calculation Error:", error);
            return reply.status(500).send({ error: "Failed to calculate chart." });
        }
    });

    app.get('/daily', async (req, reply) => {
        try {
            const profile = await UserService.getProfile(currentUserId);
            const dailyData = AstralDailyService.calculateDaily(profile);
            return dailyData;
        } catch (error) {
            console.error("Daily Portal Error:", error);
            return {
                status: 'SACRED_VOID',
                guidance: {
                    favored: 'El Templo aguarda tus coordenadas.',
                    sensitive: 'Inicia tu Ritual de Nacimiento para que las estrellas puedan reconocerte.',
                    advice: 'Sin la canción de tu origen, el día permanece en penumbra.'
                }
            };
        }
    });
}
