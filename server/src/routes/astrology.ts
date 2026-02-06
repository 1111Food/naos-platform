import { FastifyInstance } from 'fastify';
import { AstrologyEngine } from '../modules/astrology/engine';
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
            const dateStr = `${birthDate}T${birthTime}:00`;
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                return reply.status(400).send({ error: "Invalid Date/Time format." });
            }

            const chart = AstrologyEngine.calculateNatalChart(
                date,
                coordinates.lat,
                coordinates.lng
            );

            const ZODIAC = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
            const ascSignIndex = Math.floor(chart.ascendant / 30);
            const ascSign = ZODIAC[ascSignIndex];
            const ascDegree = chart.ascendant % 30;

            const rising = {
                name: 'Ascendant',
                sign: ascSign,
                degree: ascDegree,
                absDegree: chart.ascendant,
                house: 1
            };

            const houses = chart.houses.map(h => h.absDegree);
            const elements = chart.elements;

            const response = {
                sun: chart.planets.find(p => p.name === 'Sun'),
                moon: chart.planets.find(p => p.name === 'Moon'),
                rising: rising,
                planets: chart.planets,
                houses: houses,
                houseSystem: 'Whole Sign',
                elements: elements,
                sunSign: chart.planets.find(p => p.name === 'Sun')?.sign || 'Aries',
                moonSign: chart.planets.find(p => p.name === 'Moon')?.sign || 'Aries',
                risingSign: ascSign
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
