// server/src/modules/astrology/astroService.ts

import { PLANETS_LIB, SIGNS_LIB, HOUSES_LIB } from './astrologyLibrary';
import { AstrologyEngine } from './engine';

export class AstrologyService {

    /**
     * Calcula la Carta Astral completa con precisión UTC robusta.
     * @param dateStr Fecha "YYYY-MM-DD"
     * @param timeStr Hora "HH:MM"
     * @param lat Latitud decimal
     * @param lng Longitud decimal
     * @param utcOffset Offset horario (ej: -6 para Guatemala)
     */
    static async calculateProfile(
        dateStr: string,
        timeStr: string,
        lat: number,
        lng: number,
        utcOffset: number
    ) {
        try {
            // 1. Validación de Entrada
            if (!dateStr || !timeStr) {
                console.warn("⚠️ AstroService: Fecha u hora faltante. Usando 'Ahora'.");
                const now = new Date();
                dateStr = now.toISOString().split('T')[0];
                timeStr = `${now.getHours()}:${now.getMinutes()}`;
            }

            // 2. Construcción de Fecha UTC (Critical Fix v9.2)
            // El objetivo es crear un instante en el tiempo universal que corresponda
            // a la hora local del usuario.
            // Fórmula: UTC_Hour = Local_Hour - Offset
            // Ej: 12:00 Local en Offset -6 => 12 - (-6) = 18:00 UTC.

            const [year, month, day] = dateStr.split('-').map(Number);
            const [hour, minute] = timeStr.split(':').map(Number);

            // Date.UTC recibe (year, monthIndex, day, hour, minute...)
            // monthIndex es 0-11
            // Restamos el offset a la hora. JS maneja el desbordamiento de horas/días automáticamente.
            const utcTimestamp = Date.UTC(year, month - 1, day, hour - utcOffset, minute);
            const dateObj = new Date(utcTimestamp);

            console.log(`🌌 Astro Engine: Calculating for ${dateStr} ${timeStr} (Offset ${utcOffset}) => UTC: ${dateObj.toISOString()}`);

            // 3. Llamada al Motor Astronómico
            // El motor usa year/month/day/hour del objeto Date en su contexto UTC interno si se usa Astronomy.MakeTime(date)
            const natalChart = AstrologyEngine.calculateNatalChart(dateObj, lat, lng);

            // 4. Adapt to AstrologyProfile Interface (Fix v9.13)
            const sun = natalChart.planets.find(p => p.name === 'Sun');
            const moon = natalChart.planets.find(p => p.name === 'Moon');

            // Rising is based on Ascendant
            // We need to construct a CelestialBody for Rising based on the Ascendant degree
            // NatalChart.ascendant is absolute degree (0-360)
            const ascDeg = natalChart.ascendant;
            const ascSignIndex = Math.floor(ascDeg / 30);
            const ZODIAC = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
            const ascSign = ZODIAC[ascSignIndex];
            const ascRelDeg = ascDeg % 30;

            const rising: any = {
                name: 'Rising',
                sign: ascSign,
                degree: ascRelDeg,
                absDegree: ascDeg,
                house: 1,
                isRetrograde: false
            };

            const profile: any = {
                sun: sun,
                moon: moon,
                rising: rising,
                planets: natalChart.planets,
                houses: natalChart.houses.map(h => h.absDegree), // Map to number[] as expected by interface
                houseSystem: 'Equal',
                elements: natalChart.elements,
                // Legacy support
                sunSign: sun?.sign || '',
                moonSign: moon?.sign || '',
                risingSign: rising.sign || ''
            };

            return profile;

        } catch (error) {
            console.error("🔥 AstroService Critical Failure:", error);
            throw error; // Propagar para que UserService pueda manejar el fallback si es necesario
        }
    }

    /**
     * Genera una interpretación profunda basada en la metáfora del "Teatro de la Vida".
     * Une: [Actor] + [Estilo/Vestuario] + [Escenario]
     */
    static getSmartInterpretation(planet: string, sign: string, house: number, isRetrograde: boolean) {
        // 1. Recuperar datos con seguridad
        const p = PLANETS_LIB[planet] || PLANETS_LIB['Sun'];
        const s = SIGNS_LIB[sign] || SIGNS_LIB['Aries'];
        const h = HOUSES_LIB[house] || HOUSES_LIB[1];

        // 2. CONSTRUCCIÓN DE LA NARRATIVA (Teatro de la Vida)

        // BLOQUE 1: LA FÓRMULA DE SÍNTESIS
        const block1 = `LA ESCENA: El ${p.archetype} (${p.name}) actuando con el estilo de ${s.name} en ${h.scenario}.`;

        // BLOQUE 2: TRADUCCIÓN HUMANISTA
        const block2 = `Tu misión con esta configuración es ${p.mission} En este escenario, actúas ${s.style} enfrentando el reto de: ${h.challenge}.`;

        // BLOQUE 3: LUZ, SOMBRA Y EVOLUCIÓN
        const block3 = `EN LUZ: ${p.potential} (Don de ${s.name}: ${s.gift}).\nEN SOMBRA: ${p.shadow} (Trampa de ${s.name}: ${s.trap}).\nRETO: ${h.challenge}`;

        // BLOQUE 4: LA PREGUNTA DEL ALMA
        const block4 = `REFLEXIÓN: ${p.question} (Mantra: "${s.mantra}")`;

        // 3. Empaquetar
        return {
            title: `${p.name} en ${s.name} (${h.title})`,
            archetype: p.archetype,
            blocks: [block1, block2, block3, block4],
            isRetrograde
        };
    }

    // Mantener métodos antiguos por compatibilidad
    static getAstralReading(planet: string, sign: string, house: number, isRetrograde: boolean): string {
        const data = this.getSmartInterpretation(planet, sign, house, isRetrograde);
        return data.blocks.join('\n\n');
    }

    /**
     * Determines the general "Mood" of the cosmos for Coherence Engine.
     * Deterministic based on date to avoid random fluctuations.
     */
    static getDailyMood(date: Date = new Date()): 'HARMONIOUS' | 'CHALLENGING' | 'NEUTRAL' {
        // Simple deterministic logic:
        // Day of month % 3 => 0: Neutral, 1: Harmonious, 2: Challenging
        const day = date.getDate();
        const moodIndex = day % 3;

        if (moodIndex === 1) return 'HARMONIOUS';
        if (moodIndex === 2) return 'CHALLENGING';
        return 'NEUTRAL';
    }
}