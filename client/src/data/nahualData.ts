export interface NahualInfo {
    meaning: string;
    totem: string;
    element: string;
    description: string;
    personality_light: string;
    personality_shadow: string;
    legacy: string;
}

export const NAHUAL_WISDOM: Record<string, NahualInfo> = {
    "B'atz'": {
        meaning: "El Hilo del Tiempo / El Maestro",
        totem: "Mono",
        element: "Fuego (Espiritual)",
        description: "Es el principio de la inteligencia y el tiempo. B'atz' es el hilo que teje la historia y la vida. Representa la continuidad con los ancestros y la sabiduría de la creación.",
        personality_light: "Son los artistas, tejedores y organizadores por excelencia. Tienen una conexión innata con la sabiduría antigua, son grandes consejeros, solucionadores de problemas y poseen un sentido del humor sagrado.",
        personality_shadow: "Pueden caer en la indecisión, la arrogancia intelectual o quedarse atrapados en el pasado. Su reto es no enredarse en su propio hilo mental o emocional.",
        legacy: "Su misión es mantener viva la tradición, recordar que el tiempo es un arte y tejer la armonía en su comunidad."
    },
    "E": {
        meaning: "El Camino / El Destino",
        totem: "Gato de Monte",
        element: "Agua (Emocional)",
        description: "Representa el camino de la vida, el destino y el dinamismo de la existencia. Es la energía de la comunicación, los viajes y el intercambio.",
        personality_light: "Personas viajeras, sociables y muy trabajadoras. Tienen el don de abrir caminos para otros y son excelentes mediadores y comerciantes.",
        personality_shadow: "Tienden a la inconstancia, a perder el rumbo o a volverse manipuladores para lograr sus objetivos. El cansancio puede ser su mayor obstáculo.",
        legacy: "Enseñar a otros a recorrer su propio sendero con integridad y compartir la abundancia encontrada en el camino."
    },
    "Aj": {
        meaning: "El Cañaveral / El Hogar",
        totem: "Armadillo",
        element: "Tierra (Material)",
        description: "Simboliza la autoridad espiritual, la ética y la columna vertebral de la sociedad. Es la energía del hogar, la familia y la regeneración.",
        personality_light: "Seres responsables, rectos y protectores de su familia. Tienen una gran capacidad de liderazgo y un fuerte sentido de la comunidad y la justicia.",
        personality_shadow: "Pueden ser demasiado rígidos, autoritarios o posesivos. Les cuesta aceptar críticas y pueden volverse tercos ante el cambio.",
        legacy: "Establecer bases sólidas para las futuras generaciones y cultivar la armonía dentro del núcleo familiar y social."
    },
    "I'x": {
        meaning: "El Jaguar / La Energía Femenina",
        totem: "Jaguar",
        element: "Aire (Mental)",
        description: "Representa la fuerza de la Madre Tierra y la energía femenina primordial. Es la astucia, la intuición y el poder de lo invisible.",
        personality_light: "Personas intuitivas, místicas y con una gran fuerza interior. Poseen el don de la sanación y una conexión profunda con la naturaleza y los misterios de la vida.",
        personality_shadow: "Pueden ser reservados en exceso, rencorosos o utilizar su poder para el dominio. La soledad mal llevada puede ser su desafío.",
        legacy: "Custodiar los lugares sagrados y recordar a la humanidad su conexión indisoluble con la Madre Tierra."
    },
    "Tz'ikin": {
        meaning: "El Pájaro / La Visión",
        totem: "Águila / Cóndor",
        element: "Fuego (Espiritual)",
        description: "Es el símbolo de la libertad, la visión elevada y la prosperidad. Representa la conexión entre el Cielo y la Tierra a través del espíritu.",
        personality_light: "Seres optimistas, visionarios y comunicativos. Tienen la capacidad de atraer la abundancia y de ver soluciones donde otros ven problemas.",
        personality_shadow: "Pueden volverse materialistas, superficiales o dispersarse en demasiados proyectos sin concluir ninguno. Su ego puede nublar su visión.",
        legacy: "Elevar la consciencia colectiva y recordar que la verdadera prosperidad nace de la libertad del espíritu."
    },
    "Ajmaq": {
        meaning: "El Perdón / Los Ancestros",
        totem: "Abeja / Búho",
        element: "Agua (Emocional)",
        description: "Representa la sabiduría de los antepasados, el perdón de las faltas y la armonía con el pasado. Es el día de la introspección y la purificación.",
        personality_light: "Cualidad de gran sabiduría, paciencia y un aura de paz. Tienen el don de la escucha y son capaces de sanar heridas profundas del pasado.",
        personality_shadow: "Pueden cargar con culpas ajenas, ser demasiado complacientes o caer en la melancolía por lo que ya fue.",
        legacy: "Enseñar el valor del perdón como la llave para la verdadera libertad y honrar la herencia de los ancestros."
    },
    "No'j": {
        meaning: "El Conocimiento / La Idea",
        totem: "Pájaro Carpintero",
        element: "Tierra (Material)",
        description: "Simboliza la inteligencia, la memoria y el pensamiento creativo. Es la fuerza que permite transformar las ideas en realidad.",
        personality_light: "Mentes brillantes, analíticas y creativas. Tienen una sed inagotable de saber y la capacidad de organizar grandes sistemas de información.",
        personality_shadow: "Pueden volverse fríos, excesivamente críticos o perderse en la racionalización de las emociones. Su ego intelectual puede aislarlos.",
        legacy: "Poner la sabiduría al servicio de la evolución humana y transformar el conocimiento en consciencia aplicada."
    },
    "Tijax": {
        meaning: "La Piedra de Obsidiana / El Sanador",
        totem: "Pez Espada / Tucán",
        element: "Aire (Mental)",
        description: "Representa el cuchillo de doble filo, la cirugía espiritual y la liberación del sufrimiento. Es la fuerza que corta lo que ya no sirve.",
        personality_light: "Sanadores valientes, directos y transformadores. Poseen una gran capacidad para enfrentar la verdad y ayudar a otros en crisis profundas.",
        personality_shadow: "Pueden ser hirientes con sus palabras, drásticos en sus decisiones o atraer conflictos innecesarios. Su reto es la compasión.",
        legacy: "Liberar a los demás de sus prisiones mentales y emocionales, recordándoles que la verdad es el único camino a la sanación."
    },
    "Kawoq": {
        meaning: "La Comunidad / La Lluvia",
        totem: "Tortuga",
        element: "Fuego (Espiritual)",
        description: "Simboliza la fuerza de la familia, el grupo y la abundancia que genera la unión. Es la energía de la lluvia que fecunda la tierra.",
        personality_light: "Personas generosas, maternales/paternales y muy protectoras. Tienen el don de unir a las personas y crear ambientes de armonía y nutrición.",
        personality_shadow: "Pueden volverse entrometidos, sacrificarse en exceso por los demás o ser víctimas de su propia emocionalidad desbordada.",
        legacy: "Cultivar el sentido de pertenencia y asegurar que nadie se quede atrás en el camino de la evolución colectiva."
    },
    "Ajpu": {
        meaning: "El Cazador / El Guerrero Solar",
        totem: "Humano",
        element: "Agua (Emocional)",
        description: "Representa la plenitud, la victoria y el poder del Sol. Es la fuerza del guerrero espiritual que busca la armonía y la luz.",
        personality_light: "Seres carismáticos, valientes y con un alto sentido ético. Tienen una gran vitalidad y la capacidad de liderar a través del ejemplo.",
        personality_shadow: "Pueden ser egocéntricos, dominantes o frustrarse intensamente cuando las cosas no salen según su voluntad.",
        legacy: "Mantener encendida la llama de la esperanza y recordar que la luz interior es invencible frente a cualquier sombra."
    },
    "Imox": {
        meaning: "El Cocodrilo / El Inconsciente",
        totem: "Lagarto",
        element: "Tierra (Material)",
        description: "Simboliza el origen de la vida, el mar de las emociones y el mundo de los sueños. Es la energía de la creatividad primaria y la locura sagrada.",
        personality_light: "Personas creativas, sensibles y con una gran imaginación. Son capaces de conectar con las profundidades de la psique y manifestar belleza.",
        personality_shadow: "Tienden a la inestabilidad emocional, a perderse en sus fantasías o a ser influenciables por las energías del entorno.",
        legacy: "Enseñar a la humanidad a navegar en las aguas de la emoción sin perder la conexión con la realidad física."
    },
    "Iq'": {
        meaning: "El Viento / El Aliento de Vida",
        totem: "Colibrí",
        element: "Aire (Mental)",
        description: "Representa el espíritu, el movimiento y la comunicación divina. Es la fuerza que limpia las energías y trae nuevas ideas.",
        personality_light: "Seres elocuentes, adaptables y con una mente ágil. Tienen el don de la palabra y la capacidad de inspirar a otros con su visión.",
        personality_shadow: "Pueden ser variables, chismosos o superficiales en sus relaciones. Su reto es encontrar un ancla en medio de su propio movimiento.",
        legacy: "Ser el puente entre lo divino y lo humano a través de la comunicación consciente y el aliento vital."
    },
    "Aq'ab'al": {
        meaning: "El Amanecer / El Misterio",
        totem: "Murciélago",
        element: "Fuego (Espiritual)",
        description: "Simboliza el paso de la oscuridad a la luz, la renovación y los secretos que aguardan ser revelados. Es la energía de la dualidad armónica.",
        personality_light: "Personas jóvenes de espíritu, renovadoras y discretas. Tienen la capacidad de encontrar luz en los momentos más oscuros y de guardar secretos sagrados.",
        personality_shadow: "Pueden ser reservados en exceso, miedosos ante el cambio o vivir en las sombras por temor a ser descubiertos.",
        legacy: "Recordar que siempre hay un nuevo comienzo disponible y que el misterio es la cuna de toda creación."
    },
    "K'at": {
        meaning: "La Red / La Abundancia",
        totem: "Lagartija",
        element: "Agua (Emocional)",
        description: "Representa la organización, la red de relaciones y la abundancia que surge del trabajo ordenado. Es la energía que atrapa lo necesario.",
        personality_light: "Seres ordenados, sociables y con gran capacidad de gestión. Son excelentes para tejer redes de apoyo y asegurar la prosperidad del grupo.",
        personality_shadow: "Pueden caer en el control excesivo, sentirse atrapados por sus propias responsabilidades o ser esclavos de lo material.",
        legacy: "Enseñar el valor de la cooperación y la organización como herramientas para manifestar la abundancia espiritual y física."
    },
    "Kan": {
        meaning: "La Serpiente / La Justicia",
        totem: "Serpiente",
        element: "Tierra (Material)",
        description: "Simboliza la energía vital (Kundalini), el conocimiento profundo y el equilibrio de la justicia divina. Es la fuerza de la transformación constante.",
        personality_light: "Personas sabias, intuitivas y con un gran magnetismo personal. Tienen la capacidad de regenerarse y de discernir la verdad oculta tras las apariencias.",
        personality_shadow: "Pueden ser vengativos, manipuladores o dejarse llevar por sus impulsos más bajos. Su reto es la transmutación de sus deseos.",
        legacy: "Manifestar la justicia natural y recordar que la evolución requiere mudar de piel constantemente."
    },
    "Kame": {
        meaning: "La Muerte / El Renacimiento",
        totem: "Tecolote (Aves del ocaso)",
        element: "Aire (Mental)",
        description: "Representa el ciclo de la vida y la muerte, el contacto con el mundo espiritual y la protección de los antepasados. Es la fuerza de la paz profunda.",
        personality_light: "Seres pacíficos, intuitivos y con una gran fortaleza ante la adversidad. Tienen el don de acompañar a otros en sus procesos de transición.",
        personality_shadow: "Pueden ser fatalistas, propensos a la tristeza o tener un interés poco saludable por el sufrimiento. El miedo a la pérdida es su prueba.",
        legacy: "Enseñar que la muerte no es el final, sino una transformación necesaria para alcanzar un nuevo nivel de existencia."
    },
    "Kej": {
        meaning: "El Venado / El Equilibrio",
        totem: "Venado",
        element: "Fuego (Espiritual)",
        description: "Simboliza la fuerza del equilibrio, los cuatro puntos cardinales y la conexión con la naturaleza salvaje. Es la energía de la nobleza y el servicio.",
        personality_light: "Personas nobles, equilibradas y con una gran capacidad de servicio. Son defensores de la vida y poseen un liderazgo natural basado en la paz.",
        personality_shadow: "Pueden ser demasiado sensibles a la crítica, indecisos o volverse evasivos ante el conflicto. Su reto es la firmeza.",
        legacy: "Mantener el equilibrio en medio del caos y recordar la importancia de vivir en armonía con todas las formas de vida."
    },
    "Q'anil": {
        meaning: "La Semilla / La Maduración",
        totem: "Conejo",
        element: "Agua (Emocional)",
        description: "Representa la fertilidad, el potencial de crecimiento y la culminación de los procesos. Es la energía de la abundancia compartida.",
        personality_light: "Seres fértiles en ideas y proyectos, pacientes y muy productivos. Tienen el don de nutrir lo que siembran y de celebrar la cosecha.",
        personality_shadow: "Pueden ser descuidados, impacientes o desperdiciar su talento por falta de disciplina. El apego al resultado puede limitarlos.",
        legacy: "Recordar que todo tiene su tiempo bajo el sol y que la paciencia es la madre de toda verdadera cosecha."
    },
    "Toj": {
        meaning: "El Pago / La Ofrenda",
        totem: "Tiburón / Puma",
        element: "Tierra (Material)",
        description: "Simboliza la ley del equilibrio cósmico, la ofrenda que restaura la armonía y la gratitud. Es la energía del intercambio justo.",
        personality_light: "Personas generosas, conscientes de sus deudas espirituales y con un gran sentido de la gratitud. Son sanadores a través de la ritualidad.",
        personality_shadow: "Pueden sentirse obligados a sacrificarse innecesariamente, ser víctimas de sus propios cargos de conciencia o ser injustos consigo mismos.",
        legacy: "Enseñar el valor de la gratitud y la importancia de vivir en un intercambio sagrado y recíproco con la vida."
    },
    "Tz'i'": {
        meaning: "El Perro / La Justicia Humana",
        totem: "Perro / Coyote",
        element: "Aire (Mental)",
        description: "Representa la ley, la justicia terrestre, la autoridad y la fidelidad. Es la energía de los guardianes de la verdad y el orden social.",
        personality_light: "Seres leales, protectores y con un gran sentido de la justicia. Tienen la capacidad de guiar a otros y de mantener el orden en medio de la confusión.",
        personality_shadow: "Pueden ser juiciosos en exceso, autoritarios o dejarse corromper por el poder. Su reto es la fidelidad a sus propios principios.",
        legacy: "Asegurar que la justicia sea un reflejo de la compasión y proteger la verdad por encima de los intereses personales."
    }
};
