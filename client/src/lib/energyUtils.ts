export interface DailyInsight {
    mode: 'EXPANSION' | 'REFUGE' | 'PORTAL' | 'BALANCE';
    title: string;
    advice: string;
    keywords: string[];
    color: string;
}

export function generateDailyInsight(
    zodiacSign: string | undefined,
    personalNumber: number,
    universalDayNumber: number
): DailyInsight {

    // 1. Determine Elemental Nature of the Sign
    const fireSigns = ['Aries', 'Leo', 'Sagittarius'];
    const airSigns = ['Gemini', 'Libra', 'Aquarius'];
    const earthSigns = ['Taurus', 'Virgo', 'Capricorn'];
    const waterSigns = ['Cancer', 'Scorpio', 'Pisces'];

    let element = 'Unknown';
    if (fireSigns.includes(zodiacSign || '')) element = 'FIRE';
    else if (airSigns.includes(zodiacSign || '')) element = 'AIR';
    else if (earthSigns.includes(zodiacSign || '')) element = 'EARTH';
    else if (waterSigns.includes(zodiacSign || '')) element = 'WATER';

    // 2. Determine Number Nature
    const activeNumbers = [1, 3, 5, 8];
    const passiveNumbers = [2, 4, 6, 7, 9];
    const masterNumbers = [11, 22, 33];

    // 3. Cross-Reference Logic

    // PRIORITY: MASTER NUMBERS (Portal)
    if (masterNumbers.includes(universalDayNumber) || masterNumbers.includes(personalNumber)) {
        return {
            mode: 'PORTAL',
            title: 'Portal de Manifestación',
            advice: 'Tu intuición está afilada como un diamante. El velo entre lo visible y lo invisible es delgado hoy. Presta atención a los sueños, coincidencias y señales repetitivas. Es un momento para decretar, no para forzar.',
            keywords: ['Intuición', 'Maestría', 'Sincronicidad'],
            color: 'text-violet-300'
        };
    }

    // MATCH: EXPANSION (Active Element + Active Number)
    if ((element === 'FIRE' || element === 'AIR') && activeNumbers.includes(personalNumber)) {
        return {
            mode: 'EXPANSION',
            title: 'Día de Expansión',
            advice: 'El universo te ha dado luz verde. Tu carisma y energía vital están amplificados. Es el momento perfecto para lanzar ese proyecto, hablar en público o tomar la iniciativa en una relación. El movimiento genera suerte hoy.',
            keywords: ['Liderazgo', 'Socializar', 'Iniciar'],
            color: 'text-amber-300'
        };
    }

    // MATCH: REFUGE (Passive Element + Passive Number)
    if ((element === 'WATER' || element === 'EARTH') && passiveNumbers.includes(personalNumber)) {
        return {
            mode: 'REFUGE',
            title: 'Día de Refugio',
            advice: 'El mundo exterior puede sentirse ruidoso o drenante. Tu poder hoy reside en el silencio y la contención. Busca espacios de calma, conecta con tu círculo íntimo o dedica tiempo al estudio profundo. Evita las multitudes si es posible.',
            keywords: ['Hogar', 'Calma', 'Nutrición'],
            color: 'text-emerald-300'
        };
    }

    // MIXED/BALANCE (Active Element + Passive Number OR Passive Element + Active Number)
    return {
        mode: 'BALANCE',
        title: 'Alquimia Interior',
        advice: 'Hoy se te pide integrar opuestos. Puedes sentir un impulso de actuar frenado por una necesidad de reflexionar (o viceversa). Usa esta tensión creativamente: planifica en silencio para actuar con precisión mañana. Busca el punto medio.',
        keywords: ['Integración', 'Paciencia', 'Estrategia'],
        color: 'text-rose-300'
    };
}
