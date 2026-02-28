
// Mayan Engine - Client Side Port of server/src/utils/mayaCalculator.ts

// Constants for Mayan Nawales and Tones (Spanish)
export const NAWALES = [
    { id: 0, name: "B'atz'", meaning: "Hilo, Tiempo, Tejedor", description: "El tejedor del tiempo y la historia. Energía creativa, artística y organizadora. Conecta el principio con el fin." },
    { id: 1, name: "E", meaning: "Camino, Destino", description: "El camino y el viajero. Guía espiritual y material. Energía de acción, exploración y descubrimiento de nuevos horizontes." },
    { id: 2, name: "Aj", meaning: "Caña, Maíz, Columna", description: "El pilar de la familia y la sociedad. Autoridad, firmeza y resurrección. Conexión con el hogar y la abundancia." },
    { id: 3, name: "I'x", meaning: "Jaguar, Magia Femenina", description: "La energía femenina y la magia de la naturaleza. Alta intuición, astucia y conexión con los misterios de la tierra." },
    { id: 4, name: "Tz'ikin", meaning: "Pájaro, Visión, Libertad", description: "El mensajero del cielo. Visión panorámica, prosperidad y libertad. Intermediario entre lo divino y lo humano." },
    { id: 5, name: "Ajmaq", meaning: "Búho, Perdón, Ancestros", description: "El perdón y la introspección. Conciencia de la imperfección humana y sabiduría ancestral. Dulzura y profundidad." },
    { id: 6, name: "No'j", meaning: "Sabiduría, Idea, Cerebro", description: "El conocimiento y la sabiduría transformada en acción. Creatividad mental, lógica y nobleza de pensamiento." },
    { id: 7, name: "Tijax", meaning: "Obsidiana, Cuchillo, Sanación", description: "El cuchillo de doble filo. Corta lo negativo y abre caminos de sanación. Energía tajante, sufrida y purificadora." },
    { id: 8, name: "Kawoq", meaning: "Tormenta, Comunidad, Familia", description: "La fuerza de la unión y la comunidad. Energía de la tormenta que limpia y renueva. Abundancia y fertilidad." },
    { id: 9, name: "Ajpu", meaning: "Cazador, Sol, Héroe", description: "El guerrero espiritual y el sol. Certeza, valor y liderazgo. Vence las pruebas de la oscuridad con luz propia." },
    { id: 10, name: "Imox", meaning: "Cocodrilo, Agua, Locura Divina", description: "La esencia del agua y lo subconsciente. Creatividad desbordante, intuición profunda y conexión con el origen." },
    { id: 11, name: "Iq'", meaning: "Viento, Aliento de Vida", description: "El aliento divino y la comunicación. Energía vital, cambio constante, purificación y movimiento del espíritu." },
    { id: 12, name: "Aq'ab'al", meaning: "Amanecer, Aurora", description: "La luz que disipa la oscuridad. Esperanza, nuevos comienzos y claridad. Dualidad entre el día y la noche." },
    { id: 13, name: "K'at", meaning: "Red, Fuego, Cautiverio", description: "La red que atrapa y almacena, o que libera. Fuego sagrado y energía de reunión. Problemas que se desenredan." },
    { id: 14, name: "Kan", meaning: "Serpiente, Justicia, Energía Vital", description: "La serpiente emplumada. Energía vital (Kundalini), justicia y sabiduría transmutadora. Poder interior." },
    { id: 15, name: "Kame", meaning: "Muerte, Renacimiento", description: "El ciclo de la vida y la muerte. Transformación profunda, paz interior y conexión con los dimensiones espirituales." },
    { id: 16, name: "Kej", meaning: "Venado, Bosque, Autoridad", description: "Los cuatro pilares del mundo. Fuerza, agilidad y liderazgo natural. Guardián de la naturaleza y el equilibrio." },
    { id: 17, name: "Q'anil", meaning: "Semilla, Germinación", description: "La semilla que rompe la tierra. Fertilidad, creación constante y potencial infinito. Vida que se expande." },
    { id: 18, name: "Toj", meaning: "Ofrenda, Pago, Fuego", description: "El fuego sagrado de la ofrenda. Ley de causa y efecto (Karma). Gratitud, pago y equilibrio de deudas." },
    { id: 19, name: "Tz'i'", meaning: "Perro, Ley, Justicia", description: "El guardián de la ley material y espiritual. Fidelidad, justicia y autoridad. Guía en el camino de la vida." }
];

export const TONES = [
    "Jun (1) - Unidad, Inicio", "Keb' (2) - Dualidad, Polaridad", "Oxib' (3) - Acción, Movimiento", "Kajib' (4) - Estabilidad, Los 4 Rumbos",
    "Job' (5) - Empoderamiento, La Mano", "Waqib' (6) - Flujo, Equilibrio", "Wuqub' (7) - Mística, Canalización", "Wajxaqib' (8) - Justicia, Armonía",
    "B'elejeb' (9) - Paciencia, Ciclos Femeninos", "Lajuj (10) - Manifestación, Ley", "Junlajuj (11) - Superación, Disonancia", "Kab'lajuj (12) - Entendimiento, Totalidad",
    "Oxlajuj (13) - Ascensión, Regreso al Origen"
];

export class MayanEngine {
    // Reference Date: Jan 1, 2000 was 8 B'atz'
    private static readonly CORRELATION_DATE = new Date('2000-01-01T12:00:00Z');
    private static readonly REF_TONE = 8;
    private static readonly REF_NAWAL_IDX = 0;
    // Calibration for User GMC (Gran Cuenta Maya?): -49 days relative to GMT 584283
    private static readonly USER_CORRECTION_OFFSET = -49;

    static calculate(dateString: string) {
        // Ensure standard noon UTC to avoid timezone shifts affecting date diff
        const inputDate = new Date(dateString + 'T12:00:00Z');

        const diffTime = inputDate.getTime() - this.CORRELATION_DATE.getTime();
        const rawDiffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffDays = rawDiffDays + this.USER_CORRECTION_OFFSET;

        // Fix Javascript Negative Modulo Bug
        // (n % m + m) % m ensures positive result
        let tone = ((this.REF_TONE + diffDays) % 13 + 13) % 13;
        if (tone === 0) tone = 13;

        let nawalIdx = ((this.REF_NAWAL_IDX + diffDays) % 20 + 20) % 20;

        const nawalData = NAWALES[nawalIdx];
        const toneData = TONES[tone - 1];

        return {
            nawal_maya: nawalData.name,
            kicheName: nawalData.name, // Alias for compatibility
            nawal_tono: tone,
            tone: tone, // Alias
            meaning: nawalData.meaning,
            toneName: toneData,
            description: nawalData.description,
            // Enhanced Wisdom Fields (Dynamic generation or expanded static data)
            mission: `Misión de ${nawalData.name}: ${nawalData.meaning}. Expandir la conciencia a través de ${nawalData.description.split('.')[0]}.`,
            challenges: `Desafío: Integrar la sombra de ${nawalData.name} y usar su energía para construir, no para destruir.`,
            glyphUrl: `/nawales/${nawalData.name.toLowerCase().replace("'", "")}.svg`
        };
    }

    // Compat method for older calls
    static calculateNawal(birthDate: string) {
        return this.calculate(birthDate);
    }
}
