// REFERENCIAS: Liz Greene (Psicológica), Steven Forrest (Evolutiva), Stephen Arroyo (Intercambio Energético), Robert Hand (Casas).
// v8.7: Motor de Profundidad - Párrafos Narrativos para Interpretaciones Bibliográficas

export const PLANETS_LIB: Record<string, {
    name: string;
    archetype: string;
    mission: string;
    potential: string;
    shadow: string;
    question: string;
}> = {
    Sun: {
        name: "Sol",
        archetype: "El Rey / La Identidad",
        mission: "Irradiar la esencia única y el propósito vital.",
        potential: "Vitalidad, autenticidad, liderazgo consciente y calidez.",
        shadow: "Egocentrismo, arrogancia o necesidad constante de validación externa.",
        question: "¿Quién eres realmente cuando nadie te está mirando?"
    },
    Moon: {
        name: "Luna",
        archetype: "La Madre Interna / El Refugio",
        mission: "Procesar las emociones y buscar seguridad interna.",
        potential: "Inteligencia emocional, cuidado, nutrición y pertenencia.",
        shadow: "Dependencia emocional, capricho, hipersensibilidad o refugio en el pasado.",
        question: "¿Qué necesita tu niño interno para sentirse a salvo hoy?"
    },
    Mercury: {
        name: "Mercurio",
        archetype: "El Mensajero / El Traductor",
        mission: "Percibir, razonar y comunicar la realidad.",
        potential: "Curiosidad, agilidad mental, elocuencia y aprendizaje constante.",
        shadow: "Nerviosismo, dispersión, superficialidad o uso de la palabra para engañar.",
        question: "¿Estás escuchando para entender o solo para responder?"
    },
    Venus: {
        name: "Venus",
        archetype: "La Amante / El Imán",
        mission: "Valorar, atraer y crear armonía en los vínculos.",
        potential: "Capacidad de goce, sentido estético, diplomacia y amor propio.",
        shadow: "Vanidad, complacencia excesiva, miedo al conflicto o materialismo.",
        question: "¿Qué es lo que realmente valoras y cómo te permites recibirlo?"
    },
    Mars: {
        name: "Marte",
        archetype: "El Guerrero / El Motor",
        mission: "Afirmar la voluntad y actuar con determinación.",
        potential: "Coraje, iniciativa, sexualidad sana y capacidad de conquista.",
        shadow: "Agresividad, impaciencia, impulsividad destructiva o ira reprimida.",
        question: "¿Por qué causa vale la pena luchar hoy?"
    },
    Jupiter: {
        name: "Júpiter",
        archetype: "El Guía / El Explorador",
        mission: "Expandir los horizontes y encontrar sentido a la vida.",
        potential: "Optimismo, abundancia, sabiduría y confianza en la vida.",
        shadow: "Exceso de confianza, fanatismo, exageración o falta de límites.",
        question: "¿Hacia dónde te guía tu fe cuando el camino se oscurece?"
    },
    Saturn: {
        name: "Saturno",
        archetype: "El Maestro Severo / El Arquitecto",
        mission: "Estructurar, poner límites y construir realidades sólidas.",
        potential: "Madurez, responsabilidad, disciplina y maestría interna.",
        shadow: "Rigidez, pesimismo, miedo al fracaso o frialdad emocional.",
        question: "¿De qué área de tu vida necesitas hacerte cargo finalmente?"
    },
    Uranus: {
        name: "Urano",
        archetype: "El Revolucionario / El Rayo",
        mission: "Romper estructuras obsoletas y despertar la genialidad original.",
        potential: "Innovación, libertad, visión de futuro y desapego sanador.",
        shadow: "Rebeldía sin causa, inestabilidad crónica o frialdad radical.",
        question: "¿A qué verdad te estás resistiendo por miedo a ser diferente?"
    },
    Neptune: {
        name: "Neptuno",
        archetype: "El Místico / El Soñador",
        mission: "Disolver los límites del ego para conectar con la totalidad.",
        potential: "Compasión infinita, inspiración artística, intuición y espiritualidad.",
        shadow: "Evasión, confusión, victimización o adicciones.",
        question: "¿En qué sueño te has perdido y de cuál necesitas despertar?"
    },
    Pluto: {
        name: "Plutón",
        archetype: "El Alquimista / El Guardián de las Sombras",
        mission: "Transformar la crisis en poder mediante la muerte y el renacimiento.",
        potential: "Resiliencia extrema, verdad profunda, sanación y empoderamiento.",
        shadow: "Control, manipulación, obsesión o miedo a la propia sombra.",
        question: "¿Qué parte de ti necesita morir para que puedas renacer?"
    },
    Chiron: {
        name: "Quirón",
        archetype: "El Sanador Herido",
        mission: "Integrar el dolor más profundo para convertirlo en medicina para otros.",
        potential: "Empatía sagrada, enseñanza desde la vulnerabilidad y aceptación.",
        shadow: "Sentimiento constante de insuficiencia o amargura por la herida.",
        question: "¿Cómo puedes usar tu dolor para alumbrar el camino ajeno?"
    },
    NorthNode: {
        name: "Nodo Norte",
        archetype: "La Brújula Evolutiva / El Destino del Alma",
        mission: "Moverse del confort conocido hacia el propósito evolutivo.",
        potential: "Crecimiento deliberado y alineación con la vocación del alma.",
        shadow: "Estancamiento en hábitos repetitivos y miedo a lo nuevo.",
        question: "¿Qué estás dispuesto a soltar para convertirte en quien viniste a ser?"
    }
};

export const SIGNS_LIB: Record<string, {
    name: string;
    style: string;
    essence: string;
    gift: string;
    trap: string;
    mantra: string;
}> = {
    Aries: {
        name: "Aries",
        style: "con una descarga de energía pura, directa y valiente.",
        essence: "La incondicionalidad del niño interior. Aries no calcula, simplemente *es*. Su arquetipo es el guerrero inocente que se lanza a la vida sin memoria de fracasos pasados.",
        gift: "Tu Luz Radiante: Tienes el don de los comienzos absolutos. Tu franqueza desarma las mentiras del mundo, y tu coraje nato te permite arrasar obstáculos con una sinceridad inquebrantable. Aportas el milagro de lo espontáneo.",
        trap: "Tus Sombras Mágicas: La impaciencia infantil. Cuando el mundo no se rinde ante tus pies en el momento exacto, puedes estallar en berrinches destructivos. Tu lección es recordar que escuchar al otro no apaga tu propio fuego.",
        mantra: "Yo Soy, Yo Actúo"
    },
    Taurus: {
        name: "Tauro",
        style: "con pausa, sensualidad y una búsqueda constante de estabilidad.",
        essence: "La paciencia infinita de la tierra fértil. Es el constructor implacable de certezas tangibles; vive a través de los cinco sentidos anclado en la pura realidad del presente.",
        gift: "Tu Luz Radiante: Posees la fuerza serena para transformar el caos en belleza permanente. Tu terquedad, cuando se vuelve lealtad, es invencible. Eres el ancla pacífica en medio de la tormenta, manifestando paciencia suprema.",
        trap: "Tus Sombras Mágicas: El temor a soltar. Te quedas por demasiado tiempo en lo seguro (espacios, situaciones, ideas), aferrándote con obstinación cuando la vida exige que fluya. Tienes que perdonar más rápido.",
        mantra: "Yo Tengo, Yo Valoro"
    },
    Gemini: {
        name: "Géminis",
        style: "con curiosidad lúdica, versatilidad y una mente que vuela entre opciones.",
        essence: "El centelleo de una mente brillante que no duerme. Géminis es dualidad divina: es el niño preguntón infinito jugando entre las esferas del pensamiento, buscando incansablemente conectar mundos.",
        gift: "Tu Luz Radiante: Eres electricidad verbal. Tu inteligencia ágil desmitifica la pesadez del drama con humor fresco. Tienes el don mágico de desdoblarte y entender ambos lados de una verdad a la velocidad de la luz.",
        trap: "Tus Sombras Mágicas: El nerviosismo desconectado y el vuelo constante, que a veces es solo escapismo encubierto o dificultad profunda para comprometerse a una sola decisión, de miedo a perderte todo lo demás.",
        mantra: "Yo Pienso, Yo Comunico"
    },
    Cancer: {
        name: "Cáncer",
        style: "con ternura protectora, memoria emocional y mucha intuición visceral.",
        essence: "La profundidad de los océanos regidos por la Luna. Sensibilidad mística arropada por una caparazón protectora. Detrás de sus risas hay memorias psíquicas de todas sus vidas pasadas.",
        gift: "Tu Luz Radiante: Un radar infalible para leer el alma humana ajena antes de que pronuncie palabra. Tu capacidad para dotar de nutrición emocional y sentido de pertenencia a quienes amas transforma espacios fríos en verdaderos santuarios.",
        trap: "Tus Sombras Mágicas: Navegas demasiado al pasado y a veces haces de tu dolor un refugio con garras de manipulación. El humor sombrío te asalta de improvisto; aprende a soltar defensas para ser feliz hoy.",
        mantra: "Yo Siento, Yo Protejo"
    },
    Leo: {
        name: "Leo",
        style: "con generosidad magnética, creatividad dramática y necesidad de brillo.",
        essence: "Un corazón inmenso como un Sol radiante, pulsando dignidad, calidez estival y poder magnánimo. Como verdadero monarca interior, no vino al mundo a complacer, sino a reinar a través de un amor colosal y leal.",
        gift: "Tu Luz Radiante: Siembras valor por donde caminas. Tienes el increíble don de hacer sentir a todos como tu corte real. Si estás alineado, usas tu gran influencia dramática para iluminar a otros en lugar de opacarlos.",
        trap: "Tus Sombras Mágicas: La trágica ceguera del orgullo, y tu herida profunda ante cualquier forma de desprecio. Para protegerte terminas por rodearte de súbditos frívolos dictando a capricho, dejando al verdadero corazón aullando por validación externa.",
        mantra: "Yo Brillo, Yo Expreso"
    },
    Virgo: {
        name: "Virgo",
        style: "con detalle, discernimiento y una búsqueda incansable de la mejora funcional.",
        essence: "La pureza incuestionable del propósito práctico. No son vírgenes literales, sino seres psíquicamente incorruptibles, obsesionados por destilar lo inútil hasta revelar la más perfecta y silenciosa eficiencia.",
        gift: "Tu Luz Radiante: La aguda alquimia del intelecto aplicado al servicio real. Ordenas impecablemente donde el mundo siembra confusión, sanas desde una humildad meticulosa y demuestras amor puro mediante actos de servicio irreprochables.",
        trap: "Tus Sombras Mágicas: El laberinto sombrío del perfeccionismo paralizante y la crítica hiriente (tanto ajena como propia). Te escondes en el micro-detalle para no enfrentar el bosque vasto de tus propias e indominables emociones.",
        mantra: "Yo Analizo, Yo Sirvo"
    },
    Libra: {
        name: "Libra",
        style: "con elegancia, diplomacia y una mirada siempre puesta en el otro.",
        essence: "La balanza etérea oscilando perpetuamente hacia la perfección estética e intelectual. Están enamorados de la armonía conceptual. Su intelecto es afilado pero arropado por la inmensa belleza y táctica de Venus.",
        gift: "Tu Luz Radiante: Nadie sintetiza lados opuestos de un conflicto mejor que tú, porque ves intuitivamente la paz. Tienes un magnetismo natural para suavizar el drama de la humanidad con diplomacia compasiva, civilizada y estética pura.",
        trap: "Tus Sombras Mágicas: Un pánico extremo a confrontar que los condena a una indecisión agónica. Tu constante esfuerzo por agradar y seducir artificialmente desdibuja tu propia verdad interior asfixiada en balanzas nunca quietas.",
        mantra: "Yo Equilibro, Yo Me Vínculo"
    },
    Scorpio: {
        name: "Escorpio",
        style: "con intensidad profunda, misterio y una voluntad inquebrantable.",
        essence: "Un poder psíquico capaz de matar o resucitar. Es la intensidad sin paliativos disfrazada bajo una gélida máscara de control. Con un corazón profundamente pasional, penetra el mundo como un cirujano del alma incapaz de la mediocridad.",
        gift: "Tu Luz Radiante: Has cruzado los infiernos e irradias resiliencia extrema. Ofreces la transmutación más profunda a quienes conoces amando de manera infinita e indestructible, poseyendo también una voluntad férrea capaz de domar continentes y lograr el propósito.",
        trap: "Tus Sombras Mágicas: Tus venenos internos— los celos corrosivos, el cálculo de paranoias invisibles y una compulsión a dominarlo todo desde la retaguardia para no ceder ni una gota de control emocional de forma desvalida.",
        mantra: "Yo Deseo, Yo Transformo"
    },
    Sagittarius: {
        name: "Sagitario",
        style: "con optimismo contagioso, aventura mental y búsqueda de la verdad.",
        essence: "El flechazo indomable y luminoso ascendiendo a la galaxia. Un buscador filosófico inquebrantable que corre desesperadamente hacia la verdad y el significado. Su esperanza interior es su gran fuerza motora.",
        gift: "Tu Luz Radiante: Optimismo expansivo, inquebrantable nobleza y una honradez casi temeraria pero liberadora. Tu fuego inspira, anima y le inyecta a las masas y amigos el milagro visionario para entender lo inexplicable de la vida cósmica.",
        trap: "Tus Sombras Mágicas: Huir con ceguera y rebeldía vacua, escapando de los detalles densos del vivir para caer en la irresponsabilidad temeraria o en la brusquedad filosófica extremista, asumiendo una falsa posesión absoluta de la moral real.",
        mantra: "Yo Comprendo, Yo Me Expando"
    },
    Capricorn: {
        name: "Capricornio",
        style: "con pragmatismo, estructura y una mirada puesta en el éxito a largo plazo.",
        essence: "El centinela cósmico conquistador incansable del abismo y de la montaña de las aspiraciones. Una vieja alma cargada con ambiciones estoicas envueltas en la profunda sabiduría práctica de sus propios silencios reflexivos solitarios y saturninos.",
        gift: "Tu Luz Radiante: Disciplina formidable e integridad incorruptible absoluta en la cumbre del éxito y un humor seco maravillosamente inteligente. Naciste un alma antigua para materializar proyectos imbatibles y servir tú mismo de roca maestra inamovible para tu familia extensa. ",
        trap: "Tus Sombras Mágicas: Resignarse melancólicamente al deber y castigar todo atisbo de frivolidad sin compasión. En el proceso construyes muros titánicos aislando el corazón en gélidos y ambiciosos cálculos pragmáticos vaciados del aliento de la espiritualidad blanda.",
        mantra: "Yo Logro, Yo Construyo"
    },
    Aquarius: {
        name: "Acuario",
        style: "con originalidad disruptiva, desapego y un enfoque en el bien común.",
        essence: "El mago humanitario desfasado viviendo secretamente trescientos años adelantado a esta dimensión. Operan un rayo azul errático capaz de derribar todas las normas en un instante fugaz en honor al progreso y bienestar genuino.",
        gift: "Tu Luz Radiante: Innovación desinteresada y absoluta falta de prejuicios terrenales, tienes la rebeldía del genio altruista y universal a través de intelectos agudos, permitiendo al entorno liberarse de etiquetas viejas inútiles.",
        trap: "Tus Sombras Mágicas: Enamorarse trágicamente del género humano lejano despreciando y desconectándose en rebeldías frívolas, dogmáticas intocables por una superioridad intelectual paralizante al dolor de los pocos amores individuales que tienes a medio metro.",
        mantra: "Yo Sé, Yo Innoivo"
    },
    Pisces: {
        name: "Piscis",
        style: "con compasión universal, ensoñación y una sensibilidad sin fronteras.",
        essence: "El místico inmanente universal capaz de nadar todos los sueños multidimensionales de una sola gota a la existencia pura. Conociendo de memoria las once lecciones kármicas anteriores que forjaron su vulnerabilidad como extrema belleza e hiper sensorialidad abstracta.",
        gift: "Tu Luz Radiante: Tienes un océano místico cósmico de empatía y sacrificio. Capacidad artística hipnótica que te permite sumergirte como psíquico sin límites y fluir diluyendo resentimientos densos que redime todo mal de almas cansadas a fuerza de amor extremo puro.",
        trap: "Tus Sombras Mágicas: Negativa suicida al anclaje en tierra; vivir arrastrado en ensoñaciones melancólicas disolutivas autoengaños que desvían por evasiones adictivas a una trágica y constante espiral pasiva, olvidando tus responsabilidades materiales.",
        mantra: "Yo Creo, Yo Fluyo"
    }
};

export const HOUSES_LIB: Record<number, {
    title: string;
    scenario: string;
    challenge: string;
}> = {
    1: {
        title: "El Escenario de la Identidad",
        scenario: "el amanecer de la conciencia, tu máscara al mundo y tu primera impresión.",
        challenge: "Aprender a proyectar tu esencia auténtica con valentía y claridad."
    },
    2: {
        title: "El Escenario de los Recursos",
        scenario: "tus valores, talentos y posesiones; lo que te da seguridad.",
        challenge: "Cultivar un valor propio que no dependa de lo externo."
    },
    3: {
        title: "El Escenario de la Comunicación",
        scenario: "tu entorno cercano, el aprendizaje y cómo procesas la información.",
        challenge: "Desarrollar una mente flexible y la capacidad de entender diversas perspectivas."
    },
    4: {
        title: "El Escenario del Hogar",
        scenario: "tus raíces, familia y tu mundo privado; la base de tu vida.",
        challenge: "Crear un refugio interno de paz y sanar la herencia familiar."
    },
    5: {
        title: "El Escenario de la Creatividad",
        scenario: "el romance, el juego, el arte y la autoexpresión alegre.",
        challenge: "Atreverse a brillar con voz propia y celebrar el goce de estar vivo."
    },
    6: {
        title: "El Escenario de la Rutina",
        scenario: "el trabajo cotidiano, el servicio, la salud física y los hábitos diarios.",
        challenge: "Integrar cuerpo y mente mediante el orden y el servicio humilde."
    },
    7: {
        title: "El Escenario del Vínculo",
        scenario: "la pareja, los socios y el espejo que los demás nos devuelven.",
        challenge: "Aprender que el equilibrio real nace del respeto a la individualidad."
    },
    8: {
        title: "El Escenario de la Fusión",
        scenario: "las crisis profundas, la sexualidad transformadora y lo oculto.",
        challenge: "Soltar el control y permitir que lo viejo muera para que surja la potencia."
    },
    9: {
        title: "El Escenario de la Filosofía",
        scenario: "estudios superiores, viajes largos y la búsqueda de significado.",
        challenge: "Construir un sistema de creencias propio basado en la experiencia directa."
    },
    10: {
        title: "El Escenario del Propósito Público",
        scenario: "tu carrera, estatus social y tu contribución al mundo.",
        challenge: "Asumir la autoridad propia y caminar hacia tu cumbre con integridad."
    },
    11: {
        title: "El Escenario de los Grupos",
        scenario: "amigos, comunidades, ideales colectivos y proyectos futuros.",
        challenge: "Colaborar con otros sin perder tu singularidad, sirviendo a una visión común."
    },
    12: {
        title: "El Escenario del Inconsciente",
        scenario: "la espiritualidad, la soledad y la conexión con la totalidad.",
        challenge: "Rendirse al misterio de la vida y encontrar la unidad en el silencio."
    }
};

