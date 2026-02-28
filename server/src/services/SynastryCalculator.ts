// server/src/services/SynastryCalculator.ts
import { UserProfile, AstrologyProfile, NumerologyProfile } from '../types';
import { RelationshipType, SynastryProfile, SynastryReport, CalculatedPillars, SynastryWeights } from '../types/synastry';
import { SynastryWeightEngine } from './SynastryWeightEngine';
import { AstrologyService } from '../modules/astrology/astroService';
import { NumerologyService } from '../modules/numerology/service';
import { MayanCalculator, NAWALES } from '../utils/mayaCalculator';
import { ChineseAstrology } from '../utils/chineseAstrology';

/**
 * Main Calculator for the NAOS Synastry System (4 Pillars).
 * Coordinates comparisons between User A and a target SynastryProfile B.
 */
export class SynastryCalculator {

    /**
     * Executes the multidimensional synastry analysis.
     */
    public async calculateSynastry(
        profileA: UserProfile,
        profileBData: SynastryProfile,
        relationshipType: RelationshipType
    ): Promise<SynastryReport> {

        // 1. Get dynamic weights based on relationship type
        const weights = SynastryWeightEngine.getWeights(relationshipType);

        // 2. Fetch/Calculate Pillars for Person B
        const pillarsB = await this.calculatePillarsForB(profileBData);

        // 3. Prepare pillars for Person A (ensure data exists)
        const pillarsA = this.preparePillarsForA(profileA);

        // 4. Calculate Scores for Each Pillar (0-100)
        const pillarScores = {
            western: this.calculateAstrologyScore(profileA.astrology!, pillarsB.astrology, weights),
            numerology: this.calculateNumerologyScore(profileA.numerology!, pillarsB.numerology),
            mayan: this.calculateMayanScore(pillarsA.mayan, pillarsB.mayan),
            chinese: this.calculateChineseScore(pillarsA.chinese, pillarsB.chinese)
        };

        // 5. Generate Relational Indices (0-100%)
        const indices = this.generateRelationalIndices(pillarScores, profileA, pillarsB, weights);

        // 6. Extract Qualitative Patterns
        const A_StrongCompatibilities = this.extractStrongCompatibilities(indices, relationshipType);
        const B_PotentialTensions = this.extractPotentialTensions(indices, pillarScores);
        const C_GrowthAreas = this.extractGrowthAreas(indices, relationshipType);

        // 7. Global Score calculation
        const score = this.calculateGlobalScore(pillarScores, weights);

        return {
            score,
            indices,
            A_StrongCompatibilities,
            B_PotentialTensions,
            C_GrowthAreas,
            pillarBreakdown: pillarScores
        };
    }

    /**
     * Calculates the 4 pillars for Person B using input data.
     */
    private async calculatePillarsForB(data: SynastryProfile): Promise<CalculatedPillars> {
        const astro = await AstrologyService.calculateProfile(
            data.birthDate, data.birthTime,
            data.coordinates?.lat || 0, data.coordinates?.lng || 0,
            data.utcOffset || 0
        );

        const num = NumerologyService.calculateProfile(data.birthDate, data.name);
        const maya = MayanCalculator.calculate(data.birthDate);
        const chinese = ChineseAstrology.calculate(data.birthDate);

        return {
            astrology: astro,
            numerology: num,
            mayan: { nawal: maya.nawal_maya, tone: maya.nawal_tono },
            chinese: { animal: chinese.animal, element: chinese.element }
        };
    }

    private preparePillarsForA(profile: UserProfile): any {
        return {
            mayan: { nawal: profile.nawal_maya || 'Imox', tone: profile.nawal_tono || 1 },
            chinese: { animal: profile.chinese_animal || 'Rata', element: profile.chinese_element || 'Madera' }
        };
    }

    // --- PILLAR CALCULATIONS (MATHEMATICAL CORE) ---

    private calculateAstrologyScore(chartA: AstrologyProfile, chartB: AstrologyProfile, weights: SynastryWeights): number {
        let score = 0;
        let totalWeight = 0;

        // 1. Element Affinity (Weighted by platform default)
        const elementMatch = this.checkElementCompatibility(chartA.elements, chartB.elements);
        score += elementMatch * 30; // Max 30 points

        // 2. Aspects for Principal Bodies
        const bodies = ['sun', 'moon', 'mercury', 'venus', 'mars'];
        bodies.forEach(body => {
            const w = weights.celestialBodies[body] || 0.5;
            const posA = (chartA as any)[body]?.absDegree;
            const posB = (chartB as any)[body]?.absDegree;

            if (posA !== undefined && posB !== undefined) {
                const aspectScore = this.calculateAspectScore(posA, posB);
                score += aspectScore * 14 * w; // Max ~14 points per body
                totalWeight += w;
            }
        });

        return Math.min(Math.round(score), 100);
    }

    private checkElementCompatibility(elA: any, elB: any): number {
        const getMax = (el: any) => {
            const map: any = { fire: el.fire, earth: el.earth, air: el.air, water: el.water };
            return Object.entries(map).reduce((a: any, b: any) => a[1] > b[1] ? a : b)[0];
        };
        const maxA = getMax(elA);
        const maxB = getMax(elB);

        const compatible: any = {
            fire: ['fire', 'air'],
            air: ['fire', 'air'],
            earth: ['earth', 'water'],
            water: ['earth', 'water']
        };

        if (maxA === maxB) return 1.0;
        if (compatible[maxA].includes(maxB)) return 0.8;
        return 0.3;
    }

    private calculateAspectScore(degA: number, degB: number): number {
        const diff = Math.abs(degA - degB) % 360;
        const dist = diff > 180 ? 360 - diff : diff;

        if (dist <= 8) return 1.0; // Conjunction
        if (Math.abs(dist - 120) <= 8) return 1.0; // Trine
        if (Math.abs(dist - 60) <= 6) return 0.8; // Sextile
        if (Math.abs(dist - 90) <= 8) return 0.4; // Square
        if (Math.abs(dist - 180) <= 8) return 0.4; // Opposition

        return 0.1;
    }

    private calculateNumerologyScore(numA: NumerologyProfile, numB: NumerologyProfile): number {
        let score = 0;
        // Essence (Life Path) comparison
        if (numA.lifePathNumber === numB.lifePathNumber) score += 60;
        else if ((numA.lifePathNumber + numB.lifePathNumber) % 9 === 0) score += 40;

        // Master Numbers intensity
        const masters = [11, 22, 33];
        if (masters.includes(numA.lifePathNumber) && masters.includes(numB.lifePathNumber)) score += 20;

        return Math.min(score, 100);
    }

    private calculateMayanScore(mayaA: any, mayaB: any): number {
        if (mayaA.nawal === mayaB.nawal) return 100;

        const idxA = NAWALES.findIndex(n => n.name === mayaA.nawal);
        const idxB = NAWALES.findIndex(n => n.name === mayaB.nawal);

        if (idxA === -1 || idxB === -1) return 50;

        const dist = Math.abs(idxA - idxB);
        if (dist === 10) return 40; // Antipode (Friction)
        if (dist === 1 || dist === 19) return 90; // Oracle family affinity
        if (dist === 5 || dist === 15) return 85;

        return 50;
    }

    private calculateChineseScore(chinA: any, chinB: any): number {
        const trinos = [
            ['Rata', 'Dragón', 'Mono'],
            ['Buey', 'Serpiente', 'Gallo'],
            ['Tigre', 'Caballo', 'Perro'],
            ['Conejo', 'Cabra', 'Cerdo']
        ];

        for (const trino of trinos) {
            if (trino.includes(chinA.animal) && trino.includes(chinB.animal)) return 100;
        }

        const oposiciones: any = {
            'Rata': 'Caballo', 'Caballo': 'Rata',
            'Buey': 'Cabra', 'Cabra': 'Buey',
            'Tigre': 'Mono', 'Mono': 'Tigre'
        };

        if (oposiciones[chinA.animal] === chinB.animal) return 30;

        return 60;
    }

    // --- GENERATION OF RELATIONAL INDICES ---

    private generateRelationalIndices(pillarScores: any, profileA: UserProfile, pillarsB: CalculatedPillars, weights: SynastryWeights): any {
        const astroA = profileA.astrology!;
        const astroB = pillarsB.astrology;

        const getDist = (bodyA: string, bodyB: string) => {
            const degA = (astroA as any)[bodyA]?.absDegree || (astroA.planets.find(p => p.name.toLowerCase() === bodyA.toLowerCase())?.absDegree);
            const degB = (astroB as any)[bodyB]?.absDegree || (astroB.planets.find(p => p.name.toLowerCase() === bodyB.toLowerCase())?.absDegree);
            return this.calculateAspectScore(degA || 0, degB || 0) * 100;
        };

        return {
            resonancia_base: Math.round((pillarScores.western + pillarScores.numerology + pillarScores.mayan + pillarScores.chinese) / 4),
            friccion_evolutiva: Math.round(100 - (pillarScores.western * 0.6 + pillarScores.mayan * 0.4)),
            vinculo_mental: Math.round((getDist('mercury', 'mercury') + pillarScores.numerology) / 2),
            vinculo_emocional: Math.round((getDist('moon', 'moon') + (this.checkElementCompatibility(astroA.elements, astroB.elements) * 100)) / 2),
            vinculo_propósito: Math.round((getDist('sun', 'sun') + pillarScores.mayan) / 2),
            vinculo_accion: Math.round((getDist('mars', 'mars') + (astroA.elements.fire > 3 ? 100 : 50)) / 2)
        };
    }

    // --- QUALITATIVE ANALYTICAL PATTERNS ---

    private extractStrongCompatibilities(indices: any, type: RelationshipType): string[] {
        const strong = [];
        if (indices.resonancia_base > 75) strong.push("Resonancia arquetípica de alta frecuencia");
        if (indices.vinculo_emocional > 70) strong.push("Sintonía emocional y nutrición mutua");
        if (indices.vinculo_mental > 75) strong.push("Fluidez en procesos cognitivos y comunicación");
        if (indices.vinculo_propósito > 80) strong.push("Alineación profunda de voluntades (Misión)");
        return strong.length > 0 ? strong : ["Afinidad en fase de exploración"];
    }

    private extractPotentialTensions(indices: any, pillarScores: any): string[] {
        const tensions = [];
        if (indices.friccion_evolutiva > 65) tensions.push("Fricción evolutiva: Desafíos estructurales de crecimiento");
        if (pillarScores.western < 40) tensions.push("Disonancia de elementos primarios (Desafío de adaptación)");
        if (pillarScores.mayan < 50) tensions.push("Tensión en el oráculo del destino");
        return tensions.length > 0 ? tensions : ["Armonía estructural estable"];
    }

    private extractGrowthAreas(indices: any, type: RelationshipType): string[] {
        const areas = ["Calibración de lenguajes compartidos"];
        if (indices.vinculo_accion < 50) areas.push("Integración de ritmos de acción y voluntad");
        if (indices.vinculo_mental < 60) areas.push("Apertura a nuevos puentes comunicativos");
        return areas;
    }

    private calculateGlobalScore(pillarScores: any, weights: SynastryWeights): number {
        const ws = weights.pillars;
        const raw = (pillarScores.western * ws.western) +
            (pillarScores.numerology * ws.numerology) +
            (pillarScores.mayan * ws.mayan) +
            (pillarScores.chinese * ws.chinese);
        return Math.round(raw);
    }

    /**
     * Prepares Phase 3 Payload for Gemini LLM.
     */
    public buildPromptPayload(report: SynastryReport, type: RelationshipType): any {
        return {
            system: "NAOS_SYNASTRY_SYNTHESIS_V2",
            context: { relationshipType: type },
            metrics: {
                globalCompatibility: report.score,
                indices: report.indices,
                pillars: report.pillarBreakdown
            },
            patterns: {
                resonances: report.A_StrongCompatibilities,
                clashes: report.B_PotentialTensions,
                evolutionSteps: report.C_GrowthAreas
            }
        };
    }
}
