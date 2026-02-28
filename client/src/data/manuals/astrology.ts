import { HOUSES_LIB, PLANETS_LIB, SIGNS_LIB } from '../astrologyLibrary';

export interface AstroSection {
    id: string;
    title: string;
    level: 'INTRO' | 'INTERMEDIATE' | 'PREMIUM';
    content: string;
    metaphor: string;
}

export interface PlanetDescription {
    intro: string;
    character: string;
    keywords: string;
    light: string;
    shadow: string;
    advice: string;
    essence: string;
}

export interface SignDescription {
    gift: string;
    shadow: string;
    element: string;
    modality: string;
    ruler: string;
    essence: string;
    light: string;
    advice: string;
}

export interface HouseDescription {
    summary: string;
    theme: string;
    signs: string;
    manifestation: string;
    essence: string;
    shadow: string;
}

export const ASTROLOGY_MANUAL = {
    intro: {
        title: "El Teatro del Cielo",
        concept: "Tu Carta Astral es el Guion de tu Teatro Interior",
        sections: [
            {
                id: 'intro',
                title: '¿Qué es una Carta Astral?',
                level: 'INTRO',
                content: 'Tu Carta Astral es una fotografía del cielo en el instante exacto de tu nacimiento. Es un mapa de tu psique y un guion de tu vida.',
                metaphor: 'Es el Mapa del Tesoro Interior.'
            },
            {
                id: 'triad',
                title: 'La Tríada Sagrada',
                level: 'INTRO',
                content: 'Para entender tu carta, unimos tres elementos: Planeta (energía), Signo (estilo) y Casa (escenario).',
                metaphor: 'Actor + Vestuario + Escenario = Tu Realidad.'
            }
        ]
    },
    planets: {
        Sun: {
            intro: PLANETS_LIB.Sun.mission,
            character: PLANETS_LIB.Sun.archetype,
            keywords: PLANETS_LIB.Sun.keywords,
            light: PLANETS_LIB.Sun.potential,
            shadow: PLANETS_LIB.Sun.shadow,
            advice: PLANETS_LIB.Sun.question,
            essence: PLANETS_LIB.Sun.essence
        },
        Moon: {
            intro: PLANETS_LIB.Moon.mission,
            character: PLANETS_LIB.Moon.archetype,
            keywords: PLANETS_LIB.Moon.keywords,
            light: PLANETS_LIB.Moon.potential,
            shadow: PLANETS_LIB.Moon.shadow,
            advice: PLANETS_LIB.Moon.question,
            essence: PLANETS_LIB.Moon.essence
        },
        Mercury: {
            intro: PLANETS_LIB.Mercury.mission,
            character: PLANETS_LIB.Mercury.archetype,
            keywords: PLANETS_LIB.Mercury.keywords,
            light: PLANETS_LIB.Mercury.potential,
            shadow: PLANETS_LIB.Mercury.shadow,
            advice: PLANETS_LIB.Mercury.question,
            essence: PLANETS_LIB.Mercury.essence
        },
        Venus: {
            intro: PLANETS_LIB.Venus.mission,
            character: PLANETS_LIB.Venus.archetype,
            keywords: PLANETS_LIB.Venus.keywords,
            light: PLANETS_LIB.Venus.potential,
            shadow: PLANETS_LIB.Venus.shadow,
            advice: PLANETS_LIB.Venus.question,
            essence: PLANETS_LIB.Venus.essence
        },
        Mars: {
            intro: PLANETS_LIB.Mars.mission,
            character: PLANETS_LIB.Mars.archetype,
            keywords: PLANETS_LIB.Mars.keywords,
            light: PLANETS_LIB.Mars.potential,
            shadow: PLANETS_LIB.Mars.shadow,
            advice: PLANETS_LIB.Mars.question,
            essence: PLANETS_LIB.Mars.essence
        },
        Jupiter: {
            intro: PLANETS_LIB.Jupiter.mission,
            character: PLANETS_LIB.Jupiter.archetype,
            keywords: PLANETS_LIB.Jupiter.keywords,
            light: PLANETS_LIB.Jupiter.potential,
            shadow: PLANETS_LIB.Jupiter.shadow,
            advice: PLANETS_LIB.Jupiter.question,
            essence: PLANETS_LIB.Jupiter.essence
        },
        Saturn: {
            intro: PLANETS_LIB.Saturn.mission,
            character: PLANETS_LIB.Saturn.archetype,
            keywords: PLANETS_LIB.Saturn.keywords,
            light: PLANETS_LIB.Saturn.potential,
            shadow: PLANETS_LIB.Saturn.shadow,
            advice: PLANETS_LIB.Saturn.question,
            essence: PLANETS_LIB.Saturn.essence
        },
        Uranus: {
            intro: PLANETS_LIB.Uranus.mission,
            character: PLANETS_LIB.Uranus.archetype,
            keywords: PLANETS_LIB.Uranus.keywords,
            light: PLANETS_LIB.Uranus.potential,
            shadow: PLANETS_LIB.Uranus.shadow,
            advice: PLANETS_LIB.Uranus.question,
            essence: PLANETS_LIB.Uranus.essence
        },
        Neptune: {
            intro: PLANETS_LIB.Neptune.mission,
            character: PLANETS_LIB.Neptune.archetype,
            keywords: PLANETS_LIB.Neptune.keywords,
            light: PLANETS_LIB.Neptune.potential,
            shadow: PLANETS_LIB.Neptune.shadow,
            advice: PLANETS_LIB.Neptune.question,
            essence: PLANETS_LIB.Neptune.essence
        },
        Pluto: {
            intro: PLANETS_LIB.Pluto.mission,
            character: PLANETS_LIB.Pluto.archetype,
            keywords: PLANETS_LIB.Pluto.keywords,
            light: PLANETS_LIB.Pluto.potential,
            shadow: PLANETS_LIB.Pluto.shadow,
            advice: PLANETS_LIB.Pluto.question,
            essence: PLANETS_LIB.Pluto.essence
        }
    } as Record<string, PlanetDescription>,
    signs: {
        Aries: {
            gift: "Iniciativa heroica",
            element: "Fuego",
            modality: "Cardinal",
            ruler: "Marte",
            essence: SIGNS_LIB.Aries.essence,
            light: SIGNS_LIB.Aries.gift,
            shadow: SIGNS_LIB.Aries.trap,
            advice: "Aprende que sostener una llama es tan importante como encenderla."
        },
        Taurus: {
            gift: "Perseverancia estable",
            element: "Tierra",
            modality: "Fijo",
            ruler: "Venus",
            essence: SIGNS_LIB.Taurus.essence,
            light: SIGNS_LIB.Taurus.gift,
            shadow: SIGNS_LIB.Taurus.trap,
            advice: "El desapego no te quita valor; te enseña que tu verdadero tesoro eres tú mismo."
        },
        Gemini: {
            gift: "Curiosidad versátil",
            element: "Aire",
            modality: "Mutable",
            ruler: "Mercurio",
            essence: SIGNS_LIB.Gemini.essence,
            light: SIGNS_LIB.Gemini.gift,
            shadow: SIGNS_LIB.Gemini.trap,
            advice: "Elige una dirección y profundiza; conocer un poco de todo a veces es no conocer nada verdaderamente."
        },
        Cancer: {
            gift: "Empatía protectora",
            element: "Agua",
            modality: "Cardinal",
            ruler: "Luna",
            essence: SIGNS_LIB.Cancer.essence,
            light: SIGNS_LIB.Cancer.gift,
            shadow: SIGNS_LIB.Cancer.trap,
            advice: "Perdonar es dejar de habitar en la memoria emocional del dolor."
        },
        Leo: {
            gift: "Corazón radiante",
            element: "Fuego",
            modality: "Fijo",
            ruler: "Sol",
            essence: SIGNS_LIB.Leo.essence,
            light: SIGNS_LIB.Leo.gift,
            shadow: SIGNS_LIB.Leo.trap,
            advice: "El verdadero rey no necesita aplausos constantes para saber que lleva una corona."
        },
        Virgo: {
            gift: "Servicio humilde",
            element: "Tierra",
            modality: "Mutable",
            ruler: "Mercurio",
            essence: SIGNS_LIB.Virgo.essence,
            light: SIGNS_LIB.Virgo.gift,
            shadow: SIGNS_LIB.Virgo.trap,
            advice: "La perfección es enemiga de lo bueno. Ama el proceso imperfecto de la existencia."
        },
        Libra: {
            gift: "Cooperación armónica",
            element: "Aire",
            modality: "Cardinal",
            ruler: "Venus",
            essence: SIGNS_LIB.Libra.essence,
            light: SIGNS_LIB.Libra.gift,
            shadow: SIGNS_LIB.Libra.trap,
            advice: "Un conflicto honesto es mil veces más sano que una paz falsa y complaciente."
        },
        Scorpio: {
            gift: "Transmutación profunda",
            element: "Agua",
            modality: "Fijo",
            ruler: "Plutón / Marte",
            essence: SIGNS_LIB.Scorpio.essence,
            light: SIGNS_LIB.Scorpio.gift,
            shadow: SIGNS_LIB.Scorpio.trap,
            advice: "Soltar el control no te hace débil; te hace invencible ante el fluir del cosmos."
        },
        Sagittarius: {
            gift: "Visión inspiradora",
            element: "Fuego",
            modality: "Mutable",
            ruler: "Júpiter",
            essence: SIGNS_LIB.Sagittarius.essence,
            light: SIGNS_LIB.Sagittarius.gift,
            shadow: SIGNS_LIB.Sagittarius.trap,
            advice: "La verdad tiene muchos rostros; ten cuidado de no convertir tu verdad en el único dogma."
        },
        Capricorn: {
            gift: "Integridad maestra",
            element: "Tierra",
            modality: "Cardinal",
            ruler: "Saturno",
            essence: SIGNS_LIB.Capricorn.essence,
            light: SIGNS_LIB.Capricorn.gift,
            shadow: SIGNS_LIB.Capricorn.trap,
            advice: "El éxito material sin gozo emocional es la montaña más solitaria del mundo."
        },
        Aquarius: {
            gift: "Innovación fraterna",
            element: "Aire",
            modality: "Fijo",
            ruler: "Urano / Saturno",
            essence: SIGNS_LIB.Aquarius.essence,
            light: SIGNS_LIB.Aquarius.gift,
            shadow: SIGNS_LIB.Aquarius.trap,
            advice: "Amas a la humanidad en teoría, recuerda amar a las personas humanas complejas en la práctica."
        },
        Pisces: {
            gift: "Amor incondicional",
            element: "Agua",
            modality: "Mutable",
            ruler: "Neptuno / Júpiter",
            essence: SIGNS_LIB.Pisces.essence,
            light: SIGNS_LIB.Pisces.gift,
            shadow: SIGNS_LIB.Pisces.trap,
            advice: "Necesitas anclas en la realidad física para que tu océano no te ahogue a ti mismo."
        }
    } as Record<string, SignDescription>,
    houses: {
        1: {
            summary: HOUSES_LIB[1].scenario,
            theme: HOUSES_LIB[1].title,
            signs: HOUSES_LIB[1].challenge,
            manifestation: HOUSES_LIB[1].manifestation,
            essence: HOUSES_LIB[1].essence,
            shadow: HOUSES_LIB[1].shadow
        },
        2: {
            summary: HOUSES_LIB[2].scenario,
            theme: HOUSES_LIB[2].title,
            signs: HOUSES_LIB[2].challenge,
            manifestation: HOUSES_LIB[2].manifestation,
            essence: HOUSES_LIB[2].essence,
            shadow: HOUSES_LIB[2].shadow
        },
        3: {
            summary: HOUSES_LIB[3].scenario,
            theme: HOUSES_LIB[3].title,
            signs: HOUSES_LIB[3].challenge,
            manifestation: HOUSES_LIB[3].manifestation,
            essence: HOUSES_LIB[3].essence,
            shadow: HOUSES_LIB[3].shadow
        },
        4: {
            summary: HOUSES_LIB[4].scenario,
            theme: HOUSES_LIB[4].title,
            signs: HOUSES_LIB[4].challenge,
            manifestation: HOUSES_LIB[4].manifestation,
            essence: HOUSES_LIB[4].essence,
            shadow: HOUSES_LIB[4].shadow
        },
        5: {
            summary: HOUSES_LIB[5].scenario,
            theme: HOUSES_LIB[5].title,
            signs: HOUSES_LIB[5].challenge,
            manifestation: HOUSES_LIB[5].manifestation,
            essence: HOUSES_LIB[5].essence,
            shadow: HOUSES_LIB[5].shadow
        },
        6: {
            summary: HOUSES_LIB[6].scenario,
            theme: HOUSES_LIB[6].title,
            signs: HOUSES_LIB[6].challenge,
            manifestation: HOUSES_LIB[6].manifestation,
            essence: HOUSES_LIB[6].essence,
            shadow: HOUSES_LIB[6].shadow
        },
        7: {
            summary: HOUSES_LIB[7].scenario,
            theme: HOUSES_LIB[7].title,
            signs: HOUSES_LIB[7].challenge,
            manifestation: HOUSES_LIB[7].manifestation,
            essence: HOUSES_LIB[7].essence,
            shadow: HOUSES_LIB[7].shadow
        },
        8: {
            summary: HOUSES_LIB[8].scenario,
            theme: HOUSES_LIB[8].title,
            signs: HOUSES_LIB[8].challenge,
            manifestation: HOUSES_LIB[8].manifestation,
            essence: HOUSES_LIB[8].essence,
            shadow: HOUSES_LIB[8].shadow
        },
        9: {
            summary: HOUSES_LIB[9].scenario,
            theme: HOUSES_LIB[9].title,
            signs: HOUSES_LIB[9].challenge,
            manifestation: HOUSES_LIB[9].manifestation,
            essence: HOUSES_LIB[9].essence,
            shadow: HOUSES_LIB[9].shadow
        },
        10: {
            summary: HOUSES_LIB[10].scenario,
            theme: HOUSES_LIB[10].title,
            signs: HOUSES_LIB[10].challenge,
            manifestation: HOUSES_LIB[10].manifestation,
            essence: HOUSES_LIB[10].essence,
            shadow: HOUSES_LIB[10].shadow
        },
        11: {
            summary: HOUSES_LIB[11].scenario,
            theme: HOUSES_LIB[11].title,
            signs: HOUSES_LIB[11].challenge,
            manifestation: HOUSES_LIB[11].manifestation,
            essence: HOUSES_LIB[11].essence,
            shadow: HOUSES_LIB[11].shadow
        },
        12: {
            summary: HOUSES_LIB[12].scenario,
            theme: HOUSES_LIB[12].title,
            signs: HOUSES_LIB[12].challenge,
            manifestation: HOUSES_LIB[12].manifestation,
            essence: HOUSES_LIB[12].essence,
            shadow: HOUSES_LIB[12].shadow
        }
    } as Record<number, HouseDescription>,
    integration: {
        title: "Integración: El Teatro de la Vida",
        content: "Comprender tu Carta Astral no es memorizar datos, es aprender a dirigir a los personajes que habitan en ti.",
        closing: "Eres el director de tu propio cosmos."
    }
};
