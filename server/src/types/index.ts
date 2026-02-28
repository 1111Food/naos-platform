export interface SubscriptionStatus {
    plan: 'FREE' | 'PREMIUM' | 'EXTENDED';
    validUntil?: string; // ISO Date
    features: string[];
}

export interface UserProfile {
    id: string;
    name: string;
    nickname?: string;
    email?: string;
    birthDate: string; // ISO Date
    birthTime: string; // HH:mm
    birthPlace: string;
    birthCity: string;
    birthState: string;
    birthCountry: string;
    utcOffset?: number;
    coordinates: {
        lat: number;
        lng: number;
    };
    subscription: SubscriptionStatus;
    plan_type: 'free' | 'premium' | 'premium_plus';
    usage_level: 'normal' | 'frequent' | 'intensive';
    daily_interactions: number;
    guardian_notes?: string;
    astrology?: AstrologyProfile;
    numerology?: NumerologyProfile;
    fengShui?: FengShuiProfile;
    mayan?: MayanNawal;
    nawal_maya?: string;
    nawal_tono?: number;
    // Chinese Astrology Expansion
    chinese_animal?: string;
    chinese_element?: string;
    chinese_birth_year?: number;
    sigil_url?: string;
    active_anchor?: string | null;
    anchor_expires_at?: string | null; // ISO Date
    last_meditation?: { type: string; date: string } | null;
    dominant_intent?: 'fitness' | 'consciousness' | 'productivity' | 'creativity' | 'none';
}

export interface MayanNawal {
    kicheName: string; // e.g., 'B'atz''
    meaning: string;
    tone: number; // 1-13
    toneName: string;
    description: string;
    glyphUrl?: string; // We'll implement inline SVG logic similar to Tarot
}

export interface CelestialBody {
    name: string;
    sign: string;
    degree: number;
    house: number;
    absDegree: number; // 0-360
    isRetrograde?: boolean;
}

export interface AstrologyProfile {
    sun: CelestialBody;
    moon: CelestialBody;
    rising: CelestialBody;
    planets: CelestialBody[]; // Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto
    houses: number[]; // Start degree of each house (0-360)
    houseSystem: 'Equal' | 'Placidus' | 'Whole Sign';
    elements: {
        fire: number;
        earth: number;
        air: number;
        water: number;
    };
    // Legacy support (to avoid breaking current UI during transition)
    sunSign: string;
    moonSign: string;
    risingSign: string;
}

export interface NumerologyProfile {
    lifePathNumber: number;
    destinyNumber: number;
    soulUrgeNumber: number;
    pinnacles: number[]; // The 4 numeric pinnacles
    tantric?: {
        karma: number;
        soul: number;
        gift: number;
        destiny: number;
        path: number;

    };
    pinaculo?: {
        a: number; // Karma (Month)
        b: number; // Personal (Day)
        c: number; // Past Life (Year)
        d: number; // Personality (Sum)
        e: number; // A+B
        f: number; // B+C
        g: number; // E+F
        h: number; // G + ? (Result)
        i: number; // Subconscious
        j: number; // Unconscious
        k: number; // Challenge 1
        l: number; // Challenge 2
        m: number; // Challenge 3 (Main)
        n: number; // Challenge 4
        o: number; // Neg Unconscious
        p: number; // Shadow
        q: number; // Lower Inherited
        r: number; // Lower Conscious
        s: number; // Lower Latent
    };
}

export interface FengShuiProfile {
    kuaNumber: number;
    element: string;
    favorableDirections: string[];
    guidance: string;
}

export interface TarotReading {
    card: string;
    arcana: 'MAJOR' | 'MINOR';
    answer: 'YES' | 'NO' | 'MAYBE';
    meaning: string;
    imageUrl?: string;
}

export interface SigilState {
    userId: string;
    relationshipLevel: number; // 0-100
    mood: 'CALM' | 'PROTECTIVE' | 'PLAYFUL' | 'mystic' | 'SERIOUS';
    dayNightMode: 'DAY' | 'NIGHT';
    lastInteraction: string; // ISO Date
    memoryContext: string; // Summary of past conversations
    evolution_stage?: number;
    preferred_tone?: 'DIDACTICO' | 'MISTICO' | 'DIRECTO';
}

export interface EnergySnapshot {
    date: string; // YYYY-MM-DD
    transitScore: number; // 1-10 (How favorable are transits)
    dominantElement: 'FIRE' | 'EARTH' | 'AIR' | 'WATER' | 'FUEGO' | 'TIERRA' | 'AIRE' | 'AGUA';
    guidance: string; // Daily proverb/summary
    moonPhase: string;
    // Sigil 2.0: Daily Wisdom
    mayan?: {
        nawal: string;
        tone: number;
        meaning: string;
    };
    fengShui?: {
        dailyStar: number;
        energy: string;
    };
}

// Sigil 2.0: Biblia de Datos (Canon Energetic Profile)
export interface UserEnergeticProfile {
    western: {
        sunSign: string;
        moonSign: string;
        risingSign: string;
        elements: AstrologyProfile['elements'];
    };
    chinese: {
        animal: string;
        element: string;
        birthYear: number;
    };
    mayan: {
        nawal: string;
        tone: number;
        meaning: string;
    };
    numerology: {
        lifePath: number;
        pinnacles: number[];
    };
}
