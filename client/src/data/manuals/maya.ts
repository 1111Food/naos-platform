export interface NahualData {
    id: string;
    kiche: string;
    spanish: string;
    totem: string;
    essence: string;
    light: string;
    shadow: string;
    mission: string;
    advice: string;
}

export const MAYA_MANUAL = {
    intro: {
        title: "El Cholq'ij: El Telar del Tiempo",
        concept: "Tú no tienes un nahual, tú caminas con una fuerza de la naturaleza",
        content: "El calendario sagrado no cuenta el tiempo lineal, sino la evolución de la conciencia biológica y espiritual. Cada día tiene una energía y, al nacer, esa energía imprime su huella en nuestro espíritu."
    },
    mayanCross: {
        title: "La Cruz Maya: La Estructura del Alma",
        metaphor: "Eres un árbol: tus pies son las raíces, tu cabeza es la copa, tus brazos son el equilibrio y tu corazón es el tronco.",
        positions: [
            { id: 'centro', title: 'El Corazón (Nacimiento)', description: 'Tu esencia pura, tu Nawal de nacimiento.' },
            { id: 'cabeza', title: 'La Cabeza (Destino)', description: 'La energía que guía tu futuro y evolución.' },
            { id: 'pies', title: 'Los Pies (Concepción)', description: 'La energía que te engendró, tu linaje y pasado.' },
            { id: 'derecha', title: 'Mano Derecha (Mágico)', description: 'Tu lado intuitivo y la fuerza que te ayuda.' },
            { id: 'izquierda', title: 'Mano Izquierda (Material)', description: 'Tu lado práctico, retos y desafíos.' }
        ]
    },
    nahuales: [
        {
            id: 'batz',
            kiche: "B'atz'",
            spanish: "El Mono / El Hilo",
            totem: "Mono",
            essence: "El hilo del tiempo que teje la historia y la creatividad.",
            light: "Artista nato, tejedor de relaciones, iniciador.",
            shadow: "Indecisión, dejar cosas inconclusas, timidez.",
            mission: "Traer alegría y tejer la unidad entre los seres humanos.",
            advice: "Toma el hilo de tu vida y asegúrate de que cada nudo sea de amor."
        },
        {
            id: 'e',
            kiche: "E",
            spanish: "El Camino / El Diente",
            totem: "Gato de monte",
            essence: "El guía espiritual, el viajero que despeja el sendero.",
            light: "Gran diplomático, buscador de la verdad, generoso.",
            shadow: "Inestabilidad, falta de dirección o miedo a emprender.",
            mission: "Abrir caminos de luz y compartir el conocimiento.",
            advice: "El camino se hace caminando; no temas a la cima, disfruta el paso."
        },
        {
            id: 'aj',
            kiche: "Aj",
            spanish: "El Cañaveral / El Hogar",
            totem: "Armadillo",
            essence: "La abundancia, el renacimiento y el servicio familiar.",
            light: "Líder espiritual, gran administrador, protector del hogar.",
            shadow: "Falta de convicción, orgullo excesivo o inestabilidad.",
            mission: "Sembrar la ética y la abundancia en su linaje.",
            advice: "Tu hogar es el templo de tu corazón; mantenlo limpio."
        },
        {
            id: 'ix',
            kiche: "I'x",
            spanish: "El Jaguar",
            totem: "Jaguar",
            essence: "La fuerza de la Madre Tierra y la intuición femenina.",
            light: "Estratega, astuto, gran conexión con la naturaleza.",
            shadow: "Orgullo herido, tendencia al aislamiento o materialismo.",
            mission: "Proteger la sabiduría de la tierra con sigilo y precisión.",
            advice: "En el silencio de la selva interna encontrarás tu verdadera fuerza."
        },
        {
            id: 'tzikin',
            kiche: "Tz'ikin",
            spanish: "El Águila / El Quetzal",
            totem: "Águila",
            essence: "La visión elevada y la libertad entre cielo y tierra.",
            light: "Vidente natural, atrae la suerte y la abundancia.",
            shadow: "Arrogancia, olvido de los detalles o huida de la realidad.",
            mission: "Elevar la conciencia y traer mensajes de libertad.",
            advice: "Vuela alto, pero nunca olvides que tus alas necesitan humildad."
        },
        {
            id: 'ajmaq',
            kiche: "Ajmaq",
            spanish: "El Perdón",
            totem: "Abeja",
            essence: "La sabiduría de los ancestros y la fuerza del perdón.",
            light: "Sabio, introspectivo, curador del pasado.",
            shadow: "Culpa, tendencia a juzgar severamente o vicios.",
            mission: "Limpiar el camino ancestral y enseñar la redención.",
            advice: "El perdón no es un regalo para otros, es la llave de tu jaula."
        },
        {
            id: 'noj',
            kiche: "No'j",
            spanish: "El Pensamiento",
            totem: "Pájaro Carpintero",
            essence: "La inteligencia cósmica y la memoria.",
            light: "Intelectual brillante, gran estratega, noble.",
            shadow: "Terquedad, frialdad emocional o laberintos mentales.",
            mission: "Traer ideas nuevas para la evolución humana.",
            advice: "El pensamiento es la semilla; el amor es el agua para crecer."
        },
        {
            id: 'tijax',
            kiche: "Tijax",
            spanish: "El Pedernal",
            totem: "Pez espada",
            essence: "El cuchillo que corta el mal y cura la enfermedad.",
            light: "Sanador valiente, protector de la justicia.",
            shadow: "Conflictivo, propenso a accidentes o palabras hirientes.",
            mission: "Eliminar lo que no sirve para que la vida florezca.",
            advice: "Corta los nudos que te atan sin herir el corazón."
        },
        {
            id: 'kawoq',
            kiche: "Kawoq",
            spanish: "La Tormenta / La Familia",
            totem: "Tortuga",
            essence: "La fuerza expansiva de la comunidad y la lluvia nutricia.",
            light: "Líder comunitario, fértil, generoso.",
            shadow: "Falta de orden, tendencia a la tragedia o entrometido.",
            mission: "Unificar a las personas y proteger el crecimiento.",
            advice: "Después de la tormenta siempre viene el tiempo de la siembra."
        },
        {
            id: 'ajpu',
            kiche: "Ajpu",
            spanish: "El Sol / El Cazador",
            totem: "León",
            essence: "La maestría de la vida y la luz del Abuelo Sol.",
            light: "Brillante, valiente, victorioso ante las pruebas.",
            shadow: "Egosimo, autosuficiencia excesiva o mal perdedor.",
            mission: "Alcanzar la plenitud espiritual y ser luz para otros.",
            advice: "La victoria más grande es vencer a tus demonios internos."
        },
        {
            id: 'imox',
            kiche: "Imox",
            spanish: "El Mar",
            totem: "Cocodrilo",
            essence: "Los sueños y las aguas del inconsciente.",
            light: "Intuitivo, soñador profético, sanador emocional.",
            shadow: "Inestabilidad mental o arrebatos emocionales.",
            mission: "Navegar las aguas del espíritu y traer tesoros invisibles.",
            advice: "No temas al mar de tus emociones; ahí reside tu perla."
        },
        {
            id: 'iq',
            kiche: "Iq'",
            spanish: "El Viento",
            totem: "Colibrí",
            essence: "El aliento de vida y la voz del espíritu.",
            light: "Gran comunicador, ágil, renovador.",
            shadow: "Inconstancia o hablar de más sin sentido.",
            mission: "Limpiar energías estancadas y traer mensajes divinos.",
            advice: "Deja que el viento limpie tus dudas y lleve tu voz al cielo."
        },
        {
            id: 'aqabal',
            kiche: "Aq'ab'al",
            spanish: "El Amanecer",
            totem: "Zorro",
            essence: "El umbral de esperanza entre la noche y el día.",
            light: "Rejuvenecedor, optimista, encuentra soluciones.",
            shadow: "Miedo a la oscuridad o dificultad para cerrar ciclos.",
            mission: "Traer luz a los rincones más oscuros del alma.",
            advice: "Amanece cada día dentro de ti mismo; no esperes al sol."
        },
        {
            id: 'kat',
            kiche: "K'at",
            spanish: "La Red",
            totem: "Araña",
            essence: "La fuerza que une y atrapa el conocimiento.",
            light: "Gran organizador, atrae abundancia, crea redes.",
            shadow: "Opresión, deudas o incapacidad de soltar.",
            mission: "Organizar la sabiduría para el bienestar colectivo.",
            advice: "Limpia tu red de lo que no sirve para atrapar lo bueno."
        },
        {
            id: 'kan',
            kiche: "Kan",
            spanish: "La Serpiente",
            totem: "Serpiente",
            essence: "El movimiento cósmico y la energía vital vital.",
            light: "Sabio, líder natural, gran vitalidad.",
            shadow: "Irritabilidad o manipulación de otros.",
            mission: "Equilibrar la energía física y espiritual para ascender.",
            advice: "Múdate de piel cuando el pasado ya no te deje crecer."
        },
        {
            id: 'kame',
            kiche: "Kame",
            spanish: "La Muerte",
            totem: "Búho",
            essence: "El fin de los ciclos y la transformación; renacer.",
            light: "Pacífico, protector, guía en transiciones.",
            shadow: "Depresión o miedo a lo desconocido.",
            mission: "Servir de puente y enseñar la impermanencia.",
            advice: "Para que el sol nazca mañana, debe morir hoy en el horizonte."
        },
        {
            id: 'kej',
            kiche: "Kej",
            spanish: "El Ciervo",
            totem: "Venado",
            essence: "Liderazgo sensible y equilibrio de los puntos cardinales.",
            light: "Estable, protector, gran fuerza de voluntad.",
            shadow: "Terquedad o agresividad defensiva.",
            mission: "Sostener el equilibrio y guiar con firmeza y amor.",
            advice: "La fuerza sin nobleza es violencia; la nobleza sin fuerza es debilidad."
        },
        {
            id: 'qanil',
            kiche: "Q'anil",
            spanish: "La Semilla",
            totem: "Conejo",
            essence: "El potencial de vida, la fertilidad y la cosecha.",
            light: "Productivo, afortunado, responsable de sus frutos.",
            shadow: "Dispersión o falta de paciencia.",
            mission: "Sembrar belleza para que el futuro florezca.",
            advice: "Siembra con amor y el universo te dará una cosecha de luz."
        },
        {
            id: 'toj',
            kiche: "Toj",
            spanish: "El Fuego / La Ofrenda",
            totem: "Puma",
            essence: "La energía del pago, la gratitud y la purificación.",
            light: "Generoso, intuitivo, purificador.",
            shadow: "Inestabilidad emocional o problemas de manejo.",
            mission: "Mantener encendido el fuego de la gratitud.",
            advice: "La gratitud es el combustible que mantiene tu abundancia."
        },
        {
            id: 'tzi',
            kiche: "Tz'i'",
            spanish: "El Perro / La Ley",
            totem: "Perro",
            essence: "La ley espiritual, la lealtad y la justicia divina.",
            light: "Fiel, justo, protector y honesto.",
            shadow: "Vengativo o infiel a sus principios.",
            mission: "Aplicar la ley con amor y ser guardián de la ética.",
            advice: "Sé fiel a tu propia luz, y nunca caminarás en la oscuridad."
        }
    ],
    integration: {
        title: "Integración: Cómo Caminar tu Nahual",
        content: "Caminar con tu Nawal no es aprender un dato astrológico; es una sintonía cotidiana. Cada Nawal tiene una medicina específica para equilibrar tu vida.",
        closing: "Te invitamos a buscar tu Nawal en la sección de 'Diseño Maya' y pedir a la fuerza de la creación que te guíe. ¡Maltiox!"
    }
};
