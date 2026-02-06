import { UserProfile } from '../../types';

export interface AstralDailyResponse {
    personalNumber: number;
    dayNumber: number;
    elementOfDay: string;
    userElement: string;
    affinity: 'FAVORABLE' | 'NEUTRAL' | 'SENSIBLE';
    guidance: {
        favored: string;
        sensitive: string;
        advice: string;
        warning?: string;
    };
    status: 'SACRED_VOID' | 'READY';
}

export class AstralDailyService {
    private static ELEMENTS = ['Fuego', 'Tierra', 'Aire', 'Agua'];
    private static ELEMENT_MAP: Record<string, string[]> = {
        'Fuego': ['Fuego', 'Aire'],
        'Aire': ['Aire', 'Fuego'],
        'Tierra': ['Tierra', 'Agua'],
        'Agua': ['Agua', 'Tierra']
    };

    static calculateDaily(profile: UserProfile): AstralDailyResponse {
        console.log(`🌌 AstralDaily: Calculating for ${profile.name} (BirthDate: ${profile.birthDate}, HasAstro: ${!!profile.astrology})`);

        if (!profile.birthDate || !profile.astrology) {
            console.warn("⚠️ AstralDaily: Missing requirements for ritual calculation. Returning SACRED_VOID.");
            return {
                personalNumber: 0,
                dayNumber: 0,
                elementOfDay: '',
                userElement: '',
                affinity: 'NEUTRAL',
                guidance: {
                    favored: '',
                    sensitive: '',
                    advice: '',
                },
                status: 'SACRED_VOID'
            };
        }

        const now = new Date();
        const personalNumber = this.calculatePersonalNumber(profile.birthDate);
        const dayNumber = this.calculateDayNumber(now);

        const userElement = this.getPredominantElement(profile);
        const elementOfDay = this.getElementOfDay(now);
        const affinity = this.calculateAffinity(userElement, elementOfDay);

        const guidance = this.generateRitualGuidance(personalNumber, dayNumber, userElement, elementOfDay, affinity);

        return {
            personalNumber,
            dayNumber,
            elementOfDay,
            userElement,
            affinity,
            guidance,
            status: 'READY'
        };
    }

    private static calculatePersonalNumber(birthDate: string): number {
        const digits = birthDate.replace(/\D/g, '');
        return this.reduceNumber(digits.split('').reduce((sum, d) => sum + parseInt(d), 0));
    }

    private static calculateDayNumber(date: Date): number {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return this.reduceNumber(day + month + year.toString().split('').reduce((sum, d) => sum + parseInt(d), 0));
    }

    private static reduceNumber(num: number): number {
        while (num > 9 && num !== 11 && num !== 22) {
            num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
        }
        return num;
    }

    private static getPredominantElement(profile: UserProfile): string {
        const elements = profile.astrology?.elements || { fire: 1, earth: 0, air: 0, water: 0 };
        const max = Math.max(elements.fire, elements.earth, elements.air, elements.water);
        if (elements.fire === max) return 'Fuego';
        if (elements.earth === max) return 'Tierra';
        if (elements.air === max) return 'Aire';
        return 'Agua';
    }

    private static getElementOfDay(date: Date): string {
        // Simple cyclical model: Day of year % 4
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date.getTime() - start.getTime();
        const oneDay = 1000 * 60 * 60 * 24;
        const dayOfYear = Math.floor(diff / oneDay);
        return this.ELEMENTS[dayOfYear % 4];
    }

    private static calculateAffinity(user: string, day: string): 'FAVORABLE' | 'NEUTRAL' | 'SENSIBLE' {
        if (user === day) return 'FAVORABLE';
        if (this.ELEMENT_MAP[user].includes(day)) return 'FAVORABLE';

        // Conflict logic: Fire-Water, Earth-Air
        if ((user === 'Fuego' && day === 'Agua') || (user === 'Agua' && day === 'Fuego')) return 'SENSIBLE';
        if ((user === 'Tierra' && day === 'Aire') || (user === 'Aire' && day === 'Tierra')) return 'SENSIBLE';

        return 'NEUTRAL';
    }

    private static generateRitualGuidance(personal: number, dayNum: number, userElem: string, dayElem: string, affinity: string): any {
        const affinityTexts = {
            'FAVORABLE': 'Tus astros cabalgan en armonía con el pulso del día.',
            'NEUTRAL': 'El cosmos observa en silencio, permitiendo que tu voluntad trace el camino.',
            'SENSIBLE': 'Las mareas estelares sugieren cautela y recogimiento.'
        };

        const elementAdvices: Record<string, string> = {
            'Fuego': 'La chispa divina pide acción y coraje.',
            'Tierra': 'La raíz sagrada demanda paciencia y presencia física.',
            'Aire': 'El aliento cósmico invita a la claridad mental y la palabra.',
            'Agua': 'La marea interna solicita fluidez y escucha emocional.'
        };

        return {
            favored: `${affinityTexts[affinity as keyof typeof affinityTexts]} El ${dayElem.toLowerCase()} del día fortalece tu esencia de ${userElem.toLowerCase()}.`,
            sensitive: affinity === 'SENSIBLE'
                ? `La vibración del ${dayElem.toLowerCase()} puede desafiar tu calma natural de ${userElem.toLowerCase()}.`
                : `Mantén atención plena en los sutiles cambios del ${dayElem.toLowerCase()} circundante.`,
            advice: `Hoy, el número ${dayNum} se une a tu vibración ${personal}. ${elementAdvices[dayElem]}.`,
            warning: affinity === 'SENSIBLE' ? "Evita confrontaciones innecesarias bajo este cielo." : undefined
        };
    }
}
