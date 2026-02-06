import { EnergySnapshot, UserProfile } from '../../types';
import { AstrologyService } from '../astrology/service';

export class EnergyService {

    static getDailySnapshot(user: UserProfile, date: Date = new Date()): EnergySnapshot {
        // 1. Day/Night Mode Calculation
        // Simple logic: 6am - 6pm is DAY. 
        // Ideally use SunCalc/Astronomy engine for sunrise/sunset at coordinates.
        // For MVP: Fixed hours.
        const hour = date.getHours();
        const dayNightMode = (hour >= 6 && hour < 18) ? 'DAY' : 'NIGHT';

        // 2. Transit Score (Mock)
        // Real impl would compare transits to natal chart.
        // Mock: Random based on date hash or simple cycle.
        const transitScore = Math.floor(Math.random() * 10) + 1;

        // 3. Dominant Element of the Day
        const elements: ('FIRE' | 'EARTH' | 'AIR' | 'WATER')[] = ['FIRE', 'EARTH', 'AIR', 'WATER'];
        const elementIndex = date.getDate() % 4;
        const dominantElement = elements[elementIndex];

        // 4. Guidance
        const guidance = this.getDailyGuidance(dominantElement, dayNightMode);

        return {
            date: date.toISOString().split('T')[0],
            transitScore,
            dominantElement,
            guidance,
            moonPhase: 'Waxing Crescent' // Placeholder
        };
    }

    private static getDailyGuidance(element: string, mode: string): string {
        const prompts = [
            "Focus on grounding yourself today.",
            "The energy is high; take action.",
            "Reflect on your inner emotional state.",
            "Communication will flow easily today."
        ];
        return prompts[Math.floor(Math.random() * prompts.length)];
    }
}
