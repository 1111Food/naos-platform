export const getZodiacImage = (sign: string): string => {
    if (!sign) return '';

    // Normalized lookup to handle any case variation from backend
    const normalized = sign.toLowerCase().trim();

    const mapping: Record<string, string> = {
        'aries': 'aries',
        'taurus': 'tauro',
        'tauro': 'tauro',
        'gemini': 'geminis',
        'geminis': 'geminis',
        'cancer': 'cancer',
        'leo': 'leo',
        'virgo': 'virgo',
        'libra': 'libra',
        'scorpio': 'escorpio',
        'escorpio': 'escorpio',
        'sagittarius': 'sagitario',
        'sagitario': 'sagitario',
        'capricorn': 'capricornio',
        'capricornio': 'capricornio',
        'aquarius': 'aquario',
        'acuario': 'aquario',
        'pisces': 'picis',
        'piscis': 'picis'
    };

    const fileName = mapping[normalized] || normalized;

    try {
        // Use a more predictable path resolution
        return new URL(`../assets/zodiac/${fileName}.webp`, import.meta.url).href;
    } catch (e) {
        console.warn(`[ZodiacMapper] Failed to resolve asset for: ${fileName}`);
        return '';
    }
};
