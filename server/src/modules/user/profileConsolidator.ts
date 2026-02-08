import { UserProfile, UserEnergeticProfile } from '../../types';

export class ProfileConsolidator {
    /**
     * Consolidates all mystic systems into a single "Bible of Data".
     * This is a pure data transformation, no interpretations added here.
     */
    static consolidate(profile: UserProfile): UserEnergeticProfile {
        console.log(`📜 Consolidating Energetic Bible for: ${profile.name}`);

        return {
            western: {
                sunSign: profile.astrology?.sunSign || 'Unknown',
                moonSign: profile.astrology?.moonSign || 'Unknown',
                risingSign: profile.astrology?.risingSign || 'Unknown',
                elements: profile.astrology?.elements || { fire: 0, earth: 0, air: 0, water: 0 }
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
