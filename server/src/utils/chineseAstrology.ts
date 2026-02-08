export interface ChineseAstrologyResult {
    animal: string;
    element: string;
    birthYear: number;
    description: string;
}

export class ChineseAstrology {
    private static readonly ANIMALS = [
        "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente",
        "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"
    ];

    private static readonly ELEMENTS = [
        "Madera", "Fuego", "Tierra", "Metal", "Agua"
    ];

    // Brief interpretations based on Animal + Element
    private static readonly INTERPRETATIONS: Record<string, string> = {
        "Madera": "Energía de crecimiento, expansión y vitalidad. Buscas la renovación constante y tienes una visión humanista del mundo.",
        "Fuego": "Pasión, iluminación y dinamismo. Tu espíritu es audaz, decisivo y capaz de inspirar a otros con tu luz interior.",
        "Tierra": "Estabilidad, nutrición y realismo. Eres el pilar que sostiene, con una sabiduría práctica y una gran lealtad.",
        "Metal": "Claridad, rectitud y resistencia. Tu voluntad es firme, valoras la estructura y posees una integridad inquebrantable.",
        "Agua": "Fluidez, intuición y profundidad. Navegas por las emociones con sabiduría, adaptándote a los cambios con gracia sagrada."
    };

    /**
     * Calculates the Chinese Zodiac sign based on birth date.
     * Note: Traditional Chinese New Year starts between Jan 21 and Feb 20.
     * For simplified NAOS logic, we use a fixed approximation (Feb 4 - Lichun) to avoid external APIs.
     */
    static calculate(birthDateISO: string): ChineseAstrologyResult {
        const date = new Date(birthDateISO);
        let year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        // Lichun (Start of Solar Spring) usually falls on Feb 4.
        // If birth is before Feb 4, use previous Chinese year.
        if (month < 2 || (month === 2 && day < 4)) {
            year--;
        }

        // Cycle starts from 1900 (Metal Rat)
        // Offset 1900 is Rata (0), Metal (3)
        const animalIdx = (year - 1900) % 12;
        const elementIdx = Math.floor(((year - 1900) % 10) / 2);

        const animal = this.ANIMALS[animalIdx];
        const element = this.ELEMENTS[elementIdx];

        return {
            animal,
            element,
            birthYear: year,
            description: `Bajo el signo del ${animal} de ${element}. ${this.INTERPRETATIONS[element]}`
        };
    }
}
