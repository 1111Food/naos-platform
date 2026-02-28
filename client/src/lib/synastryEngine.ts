import { AstrologyEngine } from './astrologyEngine';
import { NumerologyEngine } from './numerologyEngine';
// import { MayanEngine } from './mayanEngine';
// Chinese Zodiac Helper (Internal or imported if exists)

type CompatibilityAspect = 'HARMONY' | 'FRICTION' | 'NEUTRAL';

interface SynastryReport {
    score: number;
    guidance: string;
    aspects: {
        label: string;
        value: string;
        polarity: 'GOOD' | 'BAD' | 'NEUTRAL';
    }[];
    details: {
        astro: {
            sun: CompatibilityAspect;
            moon: CompatibilityAspect;
            venus: CompatibilityAspect;
            mars: CompatibilityAspect;
        };
        numero: {
            essence: number; // diff
            harmony: boolean;
        };
    };
}

export class SynastryEngine {

    static calculateSynastry(
        user: { birthDate: string, birthTime: string },
        partner: { birthDate: string, birthTime: string }
    ): SynastryReport {
        // Defaults for lat/lng if not provided (Synastry focuses on signs mostly)
        const lat = 0; const lng = 0;

        // 1. ASTROLOGY
        const chartA = AstrologyEngine.calculateNatalChart(new Date(`${user.birthDate}T${user.birthTime}`), lat, lng);
        const chartB = AstrologyEngine.calculateNatalChart(new Date(`${partner.birthDate}T${partner.birthTime}`), lat, lng);

        const sunAspect = this.compareElements(this.getPlanetSign(chartA, 'Sun'), this.getPlanetSign(chartB, 'Sun'));
        const moonAspect = this.compareElements(this.getPlanetSign(chartA, 'Moon'), this.getPlanetSign(chartB, 'Moon'));
        const venusAspect = this.compareElements(this.getPlanetSign(chartA, 'Venus'), this.getPlanetSign(chartB, 'Venus'));
        const marsAspect = this.compareElements(this.getPlanetSign(chartA, 'Mars'), this.getPlanetSign(chartB, 'Mars'));

        // 2. NUMEROLOGY
        const numA = NumerologyEngine.calculateLifePath(user.birthDate);
        const numB = NumerologyEngine.calculateLifePath(partner.birthDate);
        const numHarmony = this.checkNumerology(numA, numB);

        // 3. SCORING
        let score = 50; // Base compatibility
        if (sunAspect === 'HARMONY') score += 15;
        if (moonAspect === 'HARMONY') score += 20; // Emotional bond is key
        if (venusAspect === 'HARMONY') score += 10;
        if (numHarmony) score += 10;

        if (sunAspect === 'FRICTION') score -= 10;
        if (moonAspect === 'FRICTION') score -= 10;

        // Clamp
        score = Math.min(100, Math.max(0, score));

        // 4. GUIDANCE GENERATION (Simple Rules Engine)
        let guidance = "Un encuentro destinado a enseñar lecciones profundas.";
        if (score > 80) guidance = "Una resonancia de almas maestras. Vuestro vínculo trasciende el tiempo.";
        else if (score > 60) guidance = "Armonía natural con espacio para el crecimiento mutuo.";
        else if (score < 40) guidance = "Un espejo de sombras. Este vínculo requiere trabajo consciente para florecer.";

        return {
            score,
            guidance,
            aspects: [
                { label: "Vínculo Solar (Propósito)", value: sunAspect === 'HARMONY' ? "Fluido" : sunAspect === 'FRICTION' ? "Tenso" : "Neutro", polarity: sunAspect === 'HARMONY' ? 'GOOD' : 'NEUTRAL' },
                { label: "Vínculo Lunar (Emoción)", value: moonAspect === 'HARMONY' ? "Profundo" : moonAspect === 'FRICTION' ? "Desafiante" : "Estable", polarity: moonAspect === 'HARMONY' ? 'GOOD' : 'NEUTRAL' },
                { label: "Numerología", value: numHarmony ? "Maestra" : "Complementaria", polarity: numHarmony ? 'GOOD' : 'NEUTRAL' }
            ],
            details: {
                astro: { sun: sunAspect, moon: moonAspect, venus: venusAspect, mars: marsAspect },
                numero: { essence: Math.abs(numA - numB), harmony: numHarmony }
            }
        };
    }

    private static getPlanetSign(chart: any, planetName: string): string {
        return chart.planets.find((p: any) => p.name === planetName)?.sign || '';
    }

    private static compareElements(signA: string, signB: string): CompatibilityAspect {
        const elements = {
            Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
            Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
            Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
            Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
        };
        // @ts-ignore
        const elA = elements[signA];
        // @ts-ignore
        const elB = elements[signB];

        if (elA === elB) return 'HARMONY';

        // Compatible Pairs: Fire-Air, Earth-Water
        if ((elA === 'Fire' && elB === 'Air') || (elA === 'Air' && elB === 'Fire')) return 'HARMONY';
        if ((elA === 'Earth' && elB === 'Water') || (elA === 'Water' && elB === 'Earth')) return 'HARMONY';

        // Friction: Fire-Water, Air-Earth (Generalizing)
        if ((elA === 'Fire' && elB === 'Water') || (elA === 'Water' && elB === 'Fire')) return 'FRICTION';

        return 'NEUTRAL';
    }

    private static checkNumerology(a: number, b: number): boolean {
        // Simple Pythagorean Harmony lines (mock logic for "Maestro")
        const harmonies = [
            [1, 5, 7], [2, 4, 8], [3, 6, 9] // Natural groups
        ];
        return harmonies.some(group => group.includes(a) && group.includes(b));
    }
}
