import { FastifyInstance } from 'fastify';
import { AstrologyService } from '../modules/astrology/astroService';
import { UserService } from '../modules/user/service';
import { AstralDailyService } from '../modules/astrology/AstralDailyService';
import { NumerologyService } from '../modules/numerology/service';
import { MayanCalculator } from '../utils/mayaCalculator';
import { ChineseAstrology } from '../utils/chineseAstrology';
import { GeocodingService } from '../modules/user/geocoding';
import { parseFlexibleDate } from '../utils/dateParser';

const currentUserId = '00000000-0000-0000-0000-000000000000';

interface NatalChartRequest {
    name: string;
    birthDate: string; // YYYY-MM-DD
    birthTime: string; // HH:mm
    birthCity?: string;
    birthCountry?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    utcOffset?: number;
}

export async function astrologyRoutes(app: FastifyInstance) {
    // Standard Persistent Calculation
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

    // TEMPORARY CALCULATION (DRY RUN / GUEST MODE) - Does NOT save to DB
    app.post<{ Body: NatalChartRequest }>('/natal-chart-temp', async (req, reply) => {
        try {
            // 1. ENTRY LOG
            console.log("👉 [DEBUG] HIT natal-chart-temp. Body:", JSON.stringify(req.body));

            const { birthDate, birthTime, coordinates, name, birthCity, birthCountry } = req.body;
            console.log("🧪 Natal Chart TEMP Request:", { birthDate, birthTime, birthCity, birthCountry, coordinates });

            let lat: number;
            let lng: number;
            let utcOffset: number = -6; // Default fallback

            // 1. ROBUST GEOCODING & COORDINATE VALIDATION
            if (coordinates && typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number') {
                lat = coordinates.lat;
                lng = coordinates.lng;
                utcOffset = req.body.utcOffset !== undefined ? Number(req.body.utcOffset) : -6;
            } else if (birthCity) {
                try {
                    const geo = await GeocodingService.getCoordinates(birthCity, "", birthCountry || "");

                    // CRITICAL VALIDATION
                    if (!geo || typeof geo.lat !== 'number' || typeof geo.lng !== 'number') {
                        console.error(`❌ Geocoding returned invalid data for: ${birthCity}`);
                        return reply.status(400).send({ error: `No pudimos localizar '${birthCity}'. Intenta verificar el nombre o añadir el país.` });
                    }

                    lat = geo.lat;
                    lng = geo.lng;

                    // Get Timezone if not provided
                    if (req.body.utcOffset !== undefined) {
                        utcOffset = Number(req.body.utcOffset);
                    } else {
                        utcOffset = await GeocodingService.getTimezoneOffset(lat, lng);
                    }
                    console.log(`📍 Geocoded: ${birthCity} -> ${lat}, ${lng} (Offset: ${utcOffset})`);
                } catch (geoError) {
                    console.error("Geocoding failed:", geoError);
                    return reply.status(400).send({ error: `No pudimos localizar la ciudad '${birthCity}'. Por favor verifica la ortografía.` });
                }
            } else {
                return reply.status(400).send({ error: "Se requiere Ciudad o Coordenadas exactas para el cálculo." });
            }

            // 2. VALIDATE DATE (FLEXIBLE PARSING)
            const dateObj = parseFlexibleDate(birthDate);
            if (!dateObj) {
                console.warn("❌ Date Parse Failed for:", birthDate);
                return reply.status(400).send({ error: "Fecha inválida. Use YYYY-MM-DD o DD/MM/YYYY." });
            }
            // Normalize birthDate to YYYY-MM-DD string for AstrologyService
            const normalizedDate = dateObj.toISOString().split('T')[0];


            // 3. CORE ASTROLOGY CALCULATION
            let chart;
            try {
                chart = await AstrologyService.calculateProfile(
                    normalizedDate, // Use the normalized date string
                    birthTime,
                    lat,
                    lng,
                    utcOffset
                );
            } catch (astroError) {
                console.error("🔥 Astrology Calc Failed:", astroError);
                return reply.status(400).send({ error: "Error interno calculando posiciones planetarias. Verifique la fecha/hora." });
            }

            // 4. CALCULATE SUPPLEMENTARY SYSTEMS (Fail-safe)
            let numerology = { lifePath: 0, personalYear: 0 };
            try {
                const numProfile = NumerologyService.calculateProfile(normalizedDate, name || 'Invitado');
                numerology = {
                    lifePath: numProfile.lifePathNumber,
                    personalYear: 0 // Feature not available in temp profile
                };
            } catch (e) {
                console.warn("Temp Numerology Error:", e);
            }

            let mayanSign = "Desconocido";
            try {
                const mayanData = MayanCalculator.calculate(normalizedDate);
                mayanSign = mayanData.nawal_maya;
            } catch (e) {
                console.warn("Temp Mayan Error:", e);
            }

            let chinese = { sign: "Desconocido", element: "Desconocido" };
            try {
                const chineseData = ChineseAstrology.calculate(normalizedDate);
                chinese = {
                    sign: chineseData.animal,
                    element: chineseData.element
                };
            } catch (e) {
                console.warn("Temp Chinese Error:", e);
            }

            // 5. CONSTRUCT STRICT JSON RESPONSE
            const response = {
                sun: chart.sun,
                moon: chart.moon,
                ascendant: chart.ascendant,
                elements: chart.elements,
                numerology: numerology,
                mayanSign: mayanSign,
                chinese: chinese,
                // Meta for debugging/UI feedback
                meta: {
                    lat,
                    lng,
                    utcOffset,
                    resolvedCity: birthCity,
                    resolvedCountry: birthCountry
                }
            };

            console.log("✅ TEMP Chart calculated successfully:", response.sun, response.ascendant);
            return reply.send(response);

        } catch (globalError: any) {
            console.error("🔥 CRITICAL ENDPOINT ERROR:", globalError);

            // DEBUGGING: Write to file
            try {
                const fs = require('fs');
                const path = require('path');
                const logPath = path.join(process.cwd(), 'debug_error.log');
                const logEntry = `\n[${new Date().toISOString()}] ERROR IN NATAL-CHART-TEMP\nMessage: ${globalError.message}\nStack: ${globalError.stack}\nInput Body: ${JSON.stringify(req.body)}\n`;
                fs.appendFileSync(logPath, logEntry);
            } catch (fsErr) {
                console.error("Failed to write log", fsErr);
            }

            // NEVER RETURN 500, RETURN 400 WITH MESSAGE
            const safeErrorMsg = String(globalError.message || "Error interno desconocido");
            console.error("⚠️ Sending 400 to client:", safeErrorMsg);

            // Explicitly verify response object validity
            return reply.status(400).header('Content-Type', 'application/json').send({
                error: `Error interno de cálculo. (${safeErrorMsg.substring(0, 100)})`
            });
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
