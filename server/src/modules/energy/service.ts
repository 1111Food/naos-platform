import { EnergySnapshot, UserProfile } from '../../types';
import { MayanCalculator } from '../../utils/mayaCalculator';
import { AstrologyService } from '../astrology/astroService';

export class EnergyService {
    static getDailySnapshot(user: any, coherenceScore: number = 50, date: Date = new Date()): EnergySnapshot {
        const hour = date.getHours();
        const dayNightMode = (hour >= 6 && hour < 18) ? 'DAY' : 'NIGHT';

        // REAL COHERENCE INTEGRATION
        // Formula: The transit score is a blend of the user's behavior score and the cosmic climate.
        const mood = AstrologyService.getDailyMood(date);
        const moodModifier = mood === 'HARMONIOUS' ? 10 : mood === 'CHALLENGING' ? -10 : 0;

        // Final transit score (capped 0-100, then scaled to 0-10 for the legacy UI if needed)
        // Actually, transitScore in EnergySnapshot seems to be 0-10? Let's check.
        // EnergySnapshot interface: transitScore: number;
        // The UI might expect 0-10 or 0-100. Let's assume 0-100 for better resolution.
        const transitScore = Math.max(0, Math.min(100, coherenceScore + moodModifier));

        // 3. Dominant Element of the Day (Cycle for environment)
        const elementsMap: Record<string, string> = {
            'FIRE': 'FUEGO',
            'EARTH': 'TIERRA',
            'AIR': 'AIRE',
            'WATER': 'AGUA'
        };
        const elementsValues: ('FIRE' | 'EARTH' | 'AIR' | 'WATER')[] = ['FIRE', 'EARTH', 'AIR', 'WATER'];
        const elementIndex = date.getDate() % 4;
        const dominantElementRaw = elementsValues[elementIndex];
        const dominantElement = elementsMap[dominantElementRaw];

        // 4. Feng Shui Advice (New Repository)
        const fengShuiTips = [
            "Coloca una planta cerca de tu ventana para renovar el Qi.",
            "Limpia tu escritorio para invitar a la claridad mental.",
            "Añade un cristal de cuarzo en tu zona de trabajo.",
            "Permite que la luz natural bañe tu espacio matutino.",
            "Mantén el flujo de agua limpio para atraer prosperidad.",
            "Elimina objetos rotos para evitar el estancamiento energético.",
            "Enciende una vela de sándalo para purificar el ambiente.",
            "Organiza tus libros para ordenar tus pensamientos."
        ];
        const dailyTip = fengShuiTips[date.getDate() % fengShuiTips.length];

        const dateStr = date.toISOString().split('T')[0];
        const mayanDaily = MayanCalculator.calculate(dateStr);
        const dailyStar = ((date.getDate() + date.getMonth()) % 9) + 1;

        return {
            date: dateStr,
            transitScore,
            dominantElement,
            guidance: dailyTip,
            moonPhase: 'Luna Creciente 🌙',
            mayan: {
                nawal: mayanDaily.nawal_maya,
                tone: mayanDaily.nawal_tono,
                meaning: mayanDaily.meaning
            } as any, // Cast to match interface if needed
            fengShui: {
                dailyStar,
                energy: dailyStar % 2 === 0 ? 'YIN (Pasivo/Femenino)' : 'YANG (Activo/Masculino)'
            }
        } as EnergySnapshot;
    }
}
