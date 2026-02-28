import { UserProfile } from '../../types';

export interface TimeWindow {
    date: string;
    type: 'FLOW' | 'TENSION' | 'NEUTRAL';
    score: number;
    description: string;
    affectedPillar: 'EMOTIONAL' | 'ACTION' | 'MENTAL' | 'GLOBAL';
}

export class TemporalEngine {
    public static project(profileA: UserProfile, profileB: any): TimeWindow[] {
        const windows: TimeWindow[] = [];
        const startDate = new Date();
        for (let i = 0; i < 30; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            const dateStr = currentDate.toISOString().split('T')[0];
            const resonanceA = this.calculateDayResonance(profileA, currentDate), resonanceB = this.calculateDayResonance(profileB, currentDate);
            let type: 'FLOW' | 'TENSION' | 'NEUTRAL' = 'NEUTRAL', score = 50, description = "Energía latente", affectedPillar: any = 'GLOBAL';
            if (resonanceA === 'FAVORABLE' && resonanceB === 'FAVORABLE') { type = 'FLOW'; score = 85; description = "Sincronía Armónica."; affectedPillar = 'EMOTIONAL'; }
            else if (resonanceA === 'SENSIBLE' || resonanceB === 'SENSIBLE') { type = 'TENSION'; score = 30; description = "Fricción Astrológica."; affectedPillar = 'MENTAL'; }
            if (i % 7 === 0) { description += " La Luna activa tránsitos."; affectedPillar = 'ACTION'; score += type === 'FLOW' ? 10 : -10; }
            windows.push({ date: dateStr, type, score: Math.max(0, Math.min(100, score)), description, affectedPillar });
        }
        return windows;
    }
    private static calculateDayResonance(profile: any, date: Date): 'FAVORABLE' | 'NEUTRAL' | 'SENSIBLE' {
        const userElement = this.getPredominantElement(profile);
        const dayElement = this.getCollectiveEnergy(date);
        if (userElement === dayElement) return 'FAVORABLE';
        const friendly: any = { 'Fuego': ['Aire'], 'Aire': ['Fuego'], 'Tierra': ['Agua'], 'Agua': ['Tierra'] };
        if (friendly[userElement]?.includes(dayElement)) return 'FAVORABLE';
        const hostile: any = { 'Fuego': ['Agua'], 'Agua': ['Fuego'], 'Tierra': ['Aire'], 'Aire': ['Tierra'] };
        return hostile[userElement]?.includes(dayElement) ? 'SENSIBLE' : 'NEUTRAL';
    }
    private static getCollectiveEnergy(date: Date): string { const elements = ['Fuego', 'Tierra', 'Aire', 'Agua'], start = new Date(date.getFullYear(), 0, 0), diff = date.getTime() - start.getTime(), dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)); return elements[dayOfYear % 4]; }
    private static getPredominantElement(profile: any): string { const elements = profile.astrology?.elements || { fire: 1, earth: 0, air: 0, water: 0 }, max = Math.max(elements.fire, elements.earth, elements.air, elements.water); if (elements.fire === max) return 'Fuego'; if (elements.earth === max) return 'Tierra'; if (elements.air === max) return 'Aire'; return 'Agua'; }
}
