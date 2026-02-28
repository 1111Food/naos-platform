// server/src/services/SynastryWeightEngine.ts
import { RelationshipType, SynastryWeights } from '../types/synastry';

/**
 * Adjusts mathematical weights for the synastry comparison based on RelationshipType.
 * Follows the NAOS analytical pattern: Behavioral Architecture over determinism.
 */
export class SynastryWeightEngine {

    /**
     * Returns a weight configuration for a specific relationship type.
     */
    public static getWeights(type: RelationshipType): SynastryWeights {
        const baseWeights: SynastryWeights = {
            celestialBodies: {
                sun: 0.8,
                moon: 0.8,
                mercury: 0.5,
                venus: 0.5,
                mars: 0.5,
                jupiter: 0.4,
                saturn: 0.4,
                rising: 0.7
            },
            houses: {
                1: 0.5, 3: 0.5, 4: 0.5, 5: 0.5, 7: 0.5, 8: 0.4, 10: 0.5, 11: 0.4
            },
            numerologySlots: {
                lifePath: 1.0,
                destiny: 0.8,
                soul: 0.7
            },
            pillars: {
                western: 0.4,
                numerology: 0.3,
                mayan: 0.15,
                chinese: 0.15
            }
        };

        switch (type) {
            case RelationshipType.ROMANTIC:
                return {
                    ...baseWeights,
                    celestialBodies: {
                        ...baseWeights.celestialBodies,
                        moon: 1.0,
                        venus: 1.0,
                        mars: 0.9,
                    },
                    houses: {
                        ...baseWeights.houses,
                        5: 1.0,
                        7: 1.0,
                        8: 0.8
                    }
                };

            case RelationshipType.BUSINESS:
                return {
                    ...baseWeights,
                    celestialBodies: {
                        ...baseWeights.celestialBodies,
                        mercury: 1.0,
                        saturn: 1.0,
                        jupiter: 0.8
                    },
                    houses: {
                        ...baseWeights.houses,
                        2: 1.0,
                        6: 1.0,
                        10: 1.0
                    }
                };

            case RelationshipType.PARENTAL:
                return {
                    ...baseWeights,
                    celestialBodies: {
                        ...baseWeights.celestialBodies,
                        moon: 1.0,
                        saturn: 0.8,
                        // Using 'north_node' as a key for future extraction
                        north_node: 0.9
                    },
                    houses: {
                        ...baseWeights.houses,
                        4: 1.0,
                        10: 0.8
                    }
                };

            case RelationshipType.FRATERNAL:
                return {
                    ...baseWeights,
                    celestialBodies: {
                        ...baseWeights.celestialBodies,
                        mercury: 1.0,
                        jupiter: 0.7
                    },
                    houses: {
                        ...baseWeights.houses,
                        3: 1.0,
                        11: 0.9
                    }
                };

            default:
                return baseWeights;
        }
    }
}
