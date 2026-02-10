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

            return natalChart;

        } catch (error) {
            console.error("🔥 AstroService Critical Failure:", error);
            throw error; // Propagar para que UserService pueda manejar el fallback si es necesario
        }
    }

    /**
     * Genera una interpretación profunda basada en Gramática Generativa.
     * Une: [Arquetipo Planeta] + [Estilo Signo] + [Escenario Casa]
     */
    static getSmartInterpretation(planet: string, sign: string, house: number, isRetrograde: boolean) {
        // 1. Recuperar datos con seguridad
        const p = PLANETS_LIB[planet] || PLANETS_LIB['Sun'];
        const s = SIGNS_LIB[sign] || SIGNS_LIB['Aries'];
        const h = HOUSES_LIB[house] || HOUSES_LIB[1];

        // 2. CONSTRUCCIÓN DE LA NARRATIVA (Los 3 Bloques)

        // BLOQUE 1: LA ESENCIA
        const block1 = `Tu ${p.archetype} se expresa a través del filtro de ${s.name}. ${p.essence_paragraph} En este signo, la energía funciona ${s.style_paragraph}.`;

        // BLOQUE 2: EL ESCENARIO
        const block2 = `Esta configuración se manifiesta principalmente en la ${h.name}, el escenario de ${h.arena}. ${h.arena_paragraph} Aquí es donde tu alma busca brillar, aplicando la estrategia de ${s.strategy} para conquistar los asuntos de ${h.manifestation}.`;

        // BLOQUE 3: EL RETO EVOLUTIVO
        const block3 = `El desafío evolutivo radica en evitar la sombra de ${s.name}, que tiende a ${s.shadow_paragraph}. Tu maestría consiste en elevar esta vibración en el ámbito de ${h.evolution_paragraph}, integrando la energía conscientemente.`;

        // 3. Empaquetar
        return {
            title: `${p.name} en ${s.name}`,
            archetype: p.archetype,
            blocks: [block1, block2, block3],
            isRetrograde
        };
    }

    // Mantener métodos antiguos por compatibilidad
    static getAstralReading(planet: string, sign: string, house: number, isRetrograde: boolean): string {
        const data = this.getSmartInterpretation(planet, sign, house, isRetrograde);
        return data.blocks.join('\n\n');
    }
}