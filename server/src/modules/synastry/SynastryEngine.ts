import { RelationshipType, SynastryReport, CalculatedPillars, SynastryWeights } from '../../types/synastry';
import { UserProfile, AstrologyProfile, NumerologyProfile } from '../../types';
import { REL_WEIGHTS } from '../../config/relWeights';
import { NAWALES } from '../../utils/mayaCalculator';

export class SynastryEngine {
    public static calculate(profileA: UserProfile, pillarsB: CalculatedPillars, type: RelationshipType): SynastryReport {
        const weights = REL_WEIGHTS[type] || REL_WEIGHTS[RelationshipType.ROMANTIC];
        const pillarScores = {
            western: this.calculateAstrologyScore(profileA.astrology!, pillarsB.astrology, weights),
            numerology: this.calculateNumerologyScore(profileA.numerology!, pillarsB.numerology, weights),
            mayan: this.calculateMayanScore(this.getMayaA(profileA), pillarsB.mayan),
            chinese: this.calculateChineseScore(this.getChineseA(profileA), pillarsB.chinese)
        };
        const indices = this.generatePremiumIndices(profileA, pillarsB, pillarScores, weights);
        const score = Math.round((pillarScores.western * weights.pillars.western) + (pillarScores.numerology * weights.pillars.numerology) + (pillarScores.mayan * weights.pillars.mayan) + (pillarScores.chinese * weights.pillars.chinese));
        return { score, indices, A_StrongCompatibilities: this.extractStrengths(indices, type), B_PotentialTensions: this.extractTensions(indices, pillarScores), C_GrowthAreas: this.extractGrowth(indices), pillarBreakdown: pillarScores };
    }
    private static calculateAstrologyScore(chartA: AstrologyProfile, chartB: AstrologyProfile, weights: SynastryWeights): number {
        let score = 0;
        const elementCompatibility = this.checkElementCompatibility(chartA.elements, chartB.elements);
        score += elementCompatibility * 30;
        let aspectPoints = 0, totalWeight = 0;
        Object.entries(weights.celestialBodies).forEach(([body, w]) => {
            const degA = (chartA as any)[body]?.absDegree, degB = (chartB as any)[body]?.absDegree;
            if (degA !== undefined && degB !== undefined) { aspectPoints += this.calculateAspectScore(degA, degB) * w; totalWeight += w; }
        });
        if (totalWeight > 0) score += (aspectPoints / totalWeight) * 70;
        return Math.min(Math.round(score), 100);
    }
    private static calculateNumerologyScore(numA: NumerologyProfile, numB: NumerologyProfile, weights: SynastryWeights): number {
        let matched = 0, possible = 0;
        Object.entries(weights.numerologySlots).forEach(([slot, w]) => {
            const valA = (numA as any)[slot + 'Number'] || (numA as any)[slot], valB = (numB as any)[slot + 'Number'] || (numB as any)[slot];
            if (valA && valB) { possible += w; if (valA === valB) matched += w; else if ((valA + valB) % 9 === 0) matched += w * 0.6; }
        });
        return possible > 0 ? Math.round((matched / possible) * 100) : 50;
    }
    private static calculateMayanScore(mayaA: any, mayaB: any): number {
        if (mayaA.nawal === mayaB.nawal) return 100;
        const idxA = NAWALES.findIndex((n: any) => n.name === mayaA.nawal), idxB = NAWALES.findIndex((n: any) => n.name === mayaB.nawal);
        if (idxA === -1 || idxB === -1) return 50;
        const dist = Math.abs(idxA - idxB);
        if (dist === 1 || dist === 19) return 90;
        if (dist === 5 || dist === 15) return 85;
        if (dist === 10) return 40;
        return 60;
    }
    private static calculateChineseScore(chinA: any, chinB: any): number {
        const trinos = [['Rata', 'Dragón', 'Mono'], ['Buey', 'Serpiente', 'Gallo'], ['Tigre', 'Caballo', 'Perro'], ['Conejo', 'Cabra', 'Cerdo']];
        if (trinos.some(t => t.includes(chinA.animal) && t.includes(chinB.animal))) return 100;
        const oposiciones: any = { 'Rata': 'Caballo', 'Buey': 'Cabra', 'Tigre': 'Mono', 'Conejo': 'Gallo', 'Dragón': 'Perro', 'Serpiente': 'Cerdo' };
        if (oposiciones[chinA.animal] === chinB.animal || oposiciones[chinB.animal] === chinA.animal) return 30;
        return 65;
    }
    private static generatePremiumIndices(profileA: UserProfile, pillarsB: CalculatedPillars, pillarScores: any, weights: SynastryWeights): any {
        const astroA = profileA.astrology!, astroB = pillarsB.astrology;
        const getAspect = (bodyA: string, bodyB: string) => this.calculateAspectScore((astroA as any)[bodyA]?.absDegree ?? (bodyA === 'rising' ? astroA.rising?.absDegree : 0), (astroB as any)[bodyB]?.absDegree ?? (bodyB === 'rising' ? astroB.rising?.absDegree : 0));
        return {
            sexual_erotic: Math.round((getAspect('mars', 'venus') * 40) + (getAspect('venus', 'mars') * 40) + (pillarScores.chinese * 0.2)),
            intellectual_mercurial: Math.round((getAspect('mercury', 'mercury') * 60) + (pillarScores.numerology * 0.4)),
            emotional_lunar: Math.round((getAspect('moon', 'moon') * 50) + (this.checkElementCompatibility(astroA.elements, astroB.elements) * 50)),
            karmic_saturnian: Math.round((getAspect('saturn', 'sun') * 30) + (getAspect('sun', 'saturn') * 30) + (getAspect('saturn', 'rising') * 40)),
            spiritual_neptunian: Math.round((getAspect('neptune', 'moon') * 40) + (pillarScores.mayan * 0.6)),
            action_martial: Math.round((getAspect('mars', 'mars') * 70) + (getAspect('sun', 'mars') * 30))
        };
    }
    private static checkElementCompatibility(elA: any, elB: any): number {
        const getMax = (el: any) => { const map: any = { fire: el.fire, earth: el.earth, air: el.air, water: el.water }; return Object.entries(map).reduce((a: any, b: any) => a[1] > b[1] ? a : b)[0]; };
        const maxA = getMax(elA), maxB = getMax(elB);
        const compatible: any = { fire: ['fire', 'air'], air: ['fire', 'air'], earth: ['earth', 'water'], water: ['earth', 'water'] };
        return maxA === maxB ? 1.0 : compatible[maxA]?.includes(maxB) ? 0.85 : 0.4;
    }
    private static calculateAspectScore(degA: number, degB: number): number {
        const diff = Math.abs(degA - degB) % 360, dist = diff > 180 ? 360 - diff : diff;
        if (dist <= 8) return 1.0;
        if (Math.abs(dist - 120) <= 8) return 1.0;
        if (Math.abs(dist - 60) <= 6) return 0.85;
        if (Math.abs(dist - 90) <= 8) return 0.3;
        if (Math.abs(dist - 180) <= 8) return 0.4;
        return 0.15;
    }
    private static getMayaA(p: UserProfile) { return { nawal: p.mayan?.kicheName || p.nawal_maya || 'Imox', tone: p.mayan?.tone || p.nawal_tono || 1 }; }
    private static getChineseA(p: UserProfile) { return { animal: p.chinese_animal || 'Rata', element: p.chinese_element || 'Madera' }; }
    private static extractStrengths(indices: any, type: RelationshipType): string[] { const s = []; if (indices.emotional_lunar > 75) s.push("Alta resonancia emocional"); if (indices.intellectual_mercurial > 75) s.push("Comunicación fluida"); return s.length > 0 ? s : ["Estabilidad base"]; }
    private static extractTensions(indices: any, scores: any): string[] { const t = []; if (indices.karmic_saturnian > 70) t.push("Carga kármica intensa"); if (scores.western < 40) t.push("Disonancia de elementos"); return t; }
    private static extractGrowth(indices: any): string[] { return ["Calibración de ritmos"]; }
}
