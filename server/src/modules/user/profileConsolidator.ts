import { UserProfile, UserEnergeticProfile } from '../../types';

export class ProfileConsolidator {
    /**
     * Consolidates all mystic systems into a single "Bible of Data".
     * This is a pure data transformation, no interpretations added here.
     */
    static consolidate(profile: UserProfile): UserEnergeticProfile {
        console.log(`📜 Consolidating Dynamic Energetic Bible for: ${profile.name || 'Unknown'}`);

        return {
            western: {
                sunSign: profile.astrology?.sun?.sign || profile.astrology?.sunSign || 'Unknown',
                moonSign: profile.astrology?.moon?.sign || profile.astrology?.moonSign || 'Unknown',
                risingSign: profile.astrology?.rising?.sign || profile.astrology?.risingSign || 'Unknown',
                elements: profile.astrology?.elements || { fire: 0, earth: 0, air: 0, water: 0 },
                planets: profile.astrology?.planets || [] // FULL PLANETARY ACCESS: Mars, Venus, etc.
            },
            chinese: {
                animal: profile.chinese_animal || 'Unknown',
                element: profile.chinese_element || 'Unknown',
                birthYear: profile.chinese_birth_year || 0
            },
            mayan: {
                nawal: profile.mayan?.kicheName || profile.nawal_maya || 'Unknown',
                tone: profile.mayan?.tone || profile.nawal_tono || 0,
                meaning: profile.mayan?.meaning || 'Unknown'
            },
            numerology: {
                lifePath: profile.numerology?.lifePathNumber || 0,
                pinnacles: profile.numerology?.pinnacles || []
            }
        };
    }
}
