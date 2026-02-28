// server/src/types/synastry.ts
import { AstrologyProfile, NumerologyProfile, UserEnergeticProfile } from './index';

/**
 * Symbolic relationship types that drive the weight engine.
 */
export enum RelationshipType {
    ROMANTIC = 'ROMANTIC',
    FRATERNAL = 'FRATERNAL',
    PARENTAL = 'PARENTAL',
    BUSINESS = 'BUSINESS'
}

/**
 * Basic input data for Person B in a synastry comparison.
 */
export interface SynastryProfile {
    name: string;
    birthDate: string; // ISO Date
    birthTime: string; // HH:mm
    birthCity: string;
    birthCountry: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    utcOffset?: number;
}

/**
 * Results of the 4 Pillars calculation for Person B.
 */
export interface CalculatedPillars {
    astrology: AstrologyProfile;
    numerology: NumerologyProfile;
    mayan: {
        nawal: string;
        tone: number;
    };
    chinese: {
        animal: string;
        element: string;
    };
}

/**
 * Dynamic weights for synastry comparison.
 */
export interface SynastryWeights {
    celestialBodies: Record<string, number>; // e.g., 'venus': 1.0
    houses: Record<number, number>; // e.g., 7: 1.0 (House 7)
    numerologySlots: Record<string, number>; // e.g., 'lifePath': 0.8
    pillars: {
        western: number;
        numerology: number;
        mayan: number;
        chinese: number;
    };
}

/**
 * Overall compatibility report structure.
 */
export interface SynastryReport {
    score: number; // Global Compatibility Index (0-100)
    indices: {
        sexual_erotic: number;
        intellectual_mercurial: number;
        emotional_lunar: number;
        karmic_saturnian: number;
        spiritual_neptunian: number;
        action_martial: number;
    };
    A_StrongCompatibilities: string[];
    B_PotentialTensions: string[];
    C_GrowthAreas: string[];
    pillarBreakdown: {
        western: number;
        numerology: number;
        mayan: number;
        chinese: number;
    };
}
