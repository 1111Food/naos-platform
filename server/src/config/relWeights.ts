import { RelationshipType, SynastryWeights } from '../types/synastry';

export const REL_WEIGHTS: Record<RelationshipType, SynastryWeights> = {
    [RelationshipType.ROMANTIC]: {
        celestialBodies: { sun: 0.8, moon: 1.0, mercury: 0.5, venus: 1.0, mars: 0.9, rising: 0.7 },
        houses: { 5: 1.0, 7: 1.0, 8: 0.8 },
        numerologySlots: { lifePath: 1.0, destiny: 0.8, soul: 0.9 },
        pillars: { western: 0.50, numerology: 0.20, mayan: 0.15, chinese: 0.15 }
    },
    [RelationshipType.BUSINESS]: {
        celestialBodies: { sun: 1.0, mercury: 1.0, saturn: 1.0, jupiter: 0.8, rising: 0.6 },
        houses: { 2: 1.0, 6: 1.0, 10: 1.0, 11: 0.8 },
        numerologySlots: { lifePath: 1.0, destiny: 0.9, expression: 0.8 },
        pillars: { western: 0.40, numerology: 0.40, mayan: 0.10, chinese: 0.10 }
    },
    [RelationshipType.FRATERNAL]: {
        celestialBodies: { moon: 0.8, mercury: 1.0, jupiter: 0.9, rising: 0.5 },
        houses: { 3: 1.0, 4: 0.8, 11: 1.0 },
        numerologySlots: { lifePath: 1.0, destiny: 0.7, personality: 0.8 },
        pillars: { western: 0.30, numerology: 0.30, mayan: 0.20, chinese: 0.20 }
    },
    [RelationshipType.PARENTAL]: {
        celestialBodies: { moon: 1.0, saturn: 1.0, sun: 0.8 },
        houses: { 4: 1.0, 10: 1.0 },
        numerologySlots: { lifePath: 1.0, destiny: 0.8 },
        pillars: { western: 0.40, numerology: 0.20, mayan: 0.20, chinese: 0.20 }
    }
};
