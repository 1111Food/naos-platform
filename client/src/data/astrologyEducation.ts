// client/src/data/astrologyEducation.ts

export interface EducationSection {
    id: string;
    title: string;
    level: 'INTRO' | 'INTERMEDIATE' | 'PREMIUM';
    content: string;
    metaphor: string;
}

export const ASTRO_EDUCATION: Record<string, EducationSection> = {
    'intro': {
        id: 'intro',
        title: '¿Qué es una Carta Astral?',
        level: 'INTRO',
        content: 'Tu Carta Astral es una fotografía del cielo en el instante exacto de tu nacimiento. Es un mapa de tu psique y un guion de tu vida.',
        metaphor: 'Es el Mapa del Tesoro Interior.'
    },
    'triad': {
        id: 'triad',
        title: 'La Tríada Sagrada',
        level: 'INTRO',
        content: 'Para entender tu carta, unimos tres elementos: Planeta (energía), Signo (estilo) y Casa (escenario).',
        metaphor: 'Actor + Vestuario + Escenario = Tu Realidad.'
    }
};

export const PLANET_DESCRIPTIONS: Record<string, { intro: string; character: string }> = {
    Sun: {
        intro: "El centro de tu sistema solar interior.",
        character: "El Rey - Tu identidad consciente y propósito vital."
    },
    Moon: {
        intro: "Tus mareas emocionales y refugio íntimo.",
        character: "La Madre Interna - Tus necesidades de seguridad y afecto."
    },
    Mercury: {
        intro: "El puente entre el mundo interno y externo.",
        character: "El Mensajero - Tu forma de pensar, aprender y comunicar."
    },
    Venus: {
        intro: "Lo que valoras y cómo buscas la armonía.",
        character: "La Amante - Tu forma de atraer, amar y valorar."
    },
    Mars: {
        intro: "Tu capacidad de conquista y defensa.",
        character: "El Guerrero - Tu motor de acción y fuerza de voluntad."
    },
    Jupiter: {
        intro: "Tu búsqueda de sentido y expansión.",
        character: "El Maestro - Tu capacidad de confiar y crecer."
    },
    Saturn: {
        intro: "Tus límites que se vuelven maestría.",
        character: "El Arquitecto - Tu responsabilidad y autoridad interna."
    },
    Uranus: {
        intro: "Tu necesidad de romper lo obsoleto.",
        character: "El Revolucionario - Tu genialidad y libertad única."
    },
    Neptune: {
        intro: "Tu conexión con la totalidad mística.",
        character: "El Místico - Tu inspiración, sueños y compasión."
    },
    Pluto: {
        intro: "Tu poder de morir y renacer.",
        character: "El Alquimista - Tu resiliencia y poder transformador."
    }
};

export const HOUSE_DESCRIPTIONS: Record<number, string> = {
    1: "Tu entrada al mundo, tu impacto inicial y personalidad.",
    2: "Tus recursos, talentos y lo que valoras materialmente.",
    3: "Tu comunicación, intelecto cotidiano y entorno cercano.",
    4: "Tus raíces, hogar, familia y mundo privado.",
    5: "Tu expresión creativa, romances, hijos y juego.",
    6: "Tu rutina, salud, trabajo diario y servicio.",
    7: "Tus vínculos de pareja, socios y el espejo del otro.",
    8: "Tus transformaciones profundas, tabúes y recursos compartidos.",
    9: "Tu filosofía, viajes largos, fe y horizontes lejanos.",
    10: "Tu vocación, estatus social y cima profesional.",
    11: "Tus amigos, grupos sociales y proyectos colectivos.",
    12: "Tu inconsciente, sueños y disolución del ego."
};

export const SIGN_DESCRIPTIONS: Record<string, { gift: string; shadow: string }> = {
    Aries: { gift: "Don de los comienzos absolutos y el valor", shadow: "Impaciencia infantil y berrinches" },
    Taurus: { gift: "Perseverancia serena y fuerza para construir", shadow: "Temor a soltar y terquedad ciega" },
    Gemini: { gift: "Inteligencia ágil y versatilidad brillante", shadow: "Nerviosismo y vuelo para evitar el compromiso" },
    Cancer: { gift: "Radar empático y capacidad infinita de nutrir", shadow: "Refugio doloroso y manipulación sutil" },
    Leo: { gift: "Corazón radiante y liderazgo creador auténtico", shadow: "Ceguera del orgullo y necesidad tóxica de atención" },
    Virgo: { gift: "Servicio real, eficiencia sana y orden vital", shadow: "Perfeccionismo paralizante y crítica hiriente" },
    Libra: { gift: "Diplomacia empática y don maestro del equilibrio", shadow: "Indecisión agónica y terror pánico a confrontar" },
    Scorpio: { gift: "Resiliencia alquímica y amor indestructible", shadow: "Veneno de los celos, paranoia y control oculto" },
    Sagittarius: { gift: "Fuego visionario, optimismo y verdad rítmica", shadow: "Rebeldía vacua y extremismo temerario" },
    Capricorn: { gift: "Fuerza estoica, disciplina e integridad incorruptible", shadow: "Resignación gélida y ambición de muros altos" },
    Aquarius: { gift: "Genio altruista y humanitarismo desinteresado", shadow: "Superioridad intelectual y desconexión individual" },
    Pisces: { gift: "Empatía mística cósmica y perdón sagrado", shadow: "Evasión adictiva suicida y falta total de arraigo" }
};
