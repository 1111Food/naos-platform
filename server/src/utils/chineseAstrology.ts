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
        "Metal", "Agua", "Madera", "Fuego", "Tierra"
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
    /**
     * Calculates the Chinese Zodiac sign based on birth date (Hard Fix V3.0)
     */
    static calculate(birthDateISO: string): ChineseAstrologyResult {
        const date = new Date(birthDateISO);
        let year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        // Lichun adjustment (Feb 4)
        if (month < 2 || (month === 2 && day < 4)) {
            year--;
        }

        const animalIdx = (year - 1900) % 12;
        const animal = this.ANIMALS[animalIdx];

        // FIXED ELEMENT LOGIC (User Request)
        // 0-1: Metal, 2-3: Agua, 4-5: Madera, 6-7: Fuego, 8-9: Tierra
        const lastDigit = year % 10;
        let element = 'Tierra'; // Default

        if (lastDigit === 0 || lastDigit === 1) element = 'Metal';
        else if (lastDigit === 2 || lastDigit === 3) element = 'Agua';
        else if (lastDigit === 4 || lastDigit === 5) element = 'Madera';
        else if (lastDigit === 6 || lastDigit === 7) element = 'Fuego';

        return {
            animal,
            element,
            birthYear: year,
            description: `Bajo el signo del ${animal} de ${element}. ${this.INTERPRETATIONS[element]}`
        };
    }
}
