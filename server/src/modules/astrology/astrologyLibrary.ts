// REFERENCIAS: Liz Greene (Psicológica), Steven Forrest (Evolutiva), Stephen Arroyo (Intercambio Energético), Robert Hand (Casas).
// v8.7: Motor de Profundidad - Párrafos Narrativos para Interpretaciones Bibliográficas

export const PLANETS_LIB: Record<string, {
    name: string;
    archetype: string;
    drive: string;
    essence_paragraph: string;
}> = {
    Sun: {
        name: "Sol",
        archetype: "El Héroe / La Identidad Consciente",
        drive: "brillar con autenticidad y vitalidad",
        essence_paragraph: "El Sol representa tu voluntad vital, el principio de identidad consciente y el 'Viaje del Héroe' que describes en esta encarnación. Es la fuerza que te impulsa a individualizarte, a separarte del colectivo para descubrir quién eres en esencia. Según Liz Greene, el Sol es el centro organizador de la psique, el arquetipo del Self que busca expresarse plenamente en el mundo. No es solo 'lo que haces', sino 'quién decides ser' cuando nadie te está mirando. Es tu propósito creativo, tu capacidad de irradiar presencia y tu necesidad de dejar una huella única en la existencia."
    },
    Moon: {
        name: "Luna",
        archetype: "El Alma / La Madre Interior",
        drive: "buscar nutrición y seguridad instintiva",
        essence_paragraph: "La Luna gobierna tu mundo emocional inconsciente, tus necesidades de seguridad y nutrición, y los patrones reactivos que heredaste de tu linaje materno. Representa el niño interior que nunca crece del todo, la parte de ti que necesita ser sostenida, alimentada y protegida. Según Steven Forrest, la Luna es tu 'hogar psíquico', el lugar al que regresas cuando el mundo te agota. Es tu memoria celular, tus hábitos automáticos, y la forma en que procesas emocionalmente la realidad antes de que la mente racional intervenga. La Luna te conecta con lo ancestral, lo familiar, y con la sabiduría instintiva del cuerpo."
    },
    Mercury: {
        name: "Mercurio",
        archetype: "El Mensajero / El Alquimista Mental",
        drive: "traducir la realidad y conectar ideas",
        essence_paragraph: "Mercurio rige tu mente racional, tu capacidad de comunicación, y la forma en que procesas y organizas la información. Es el puente entre el mundo interno y el externo, el traductor que convierte experiencias en palabras y conceptos en acción. Según Stephen Arroyo, Mercurio no es solo 'inteligencia', sino la cualidad de tu curiosidad y tu estilo de aprendizaje. Es cómo percibes los detalles, cómo conectas puntos aparentemente inconexos, y cómo compartes tu visión del mundo con los demás. Mercurio es el eterno estudiante, el comerciante de ideas, y el tejedor de redes de significado."
    },
    Venus: {
        name: "Venus",
        archetype: "El Amante / El Imán de Armonía",
        drive: "magnetizar armonía y establecer vínculos de valor",
        essence_paragraph: "Venus gobierna tu capacidad de amar, tu sentido de la belleza, y lo que valoras como digno de deseo. Es el principio de atracción magnética, la fuerza que te lleva a buscar placer, conexión y equilibrio en las relaciones. Según Liz Greene, Venus no es solo 'amor romántico', sino tu sistema de valores personales: qué te hace sentir vivo, qué estás dispuesto a intercambiar, y cómo defines la 'buena vida'. Es tu capacidad de recibir, tu sensualidad, y tu necesidad de ser apreciado. Venus es el arte de relacionarte, de crear belleza, y de encontrar paz en la reciprocidad."
    },
    Mars: {
        name: "Marte",
        archetype: "El Guerrero / La Espada de la Voluntad",
        drive: "autoafirmarte con coraje y conquistar deseos",
        essence_paragraph: "Marte es tu impulso de acción, tu capacidad de autoafirmación, y la forma en que persigues lo que deseas. Es la energía yang, la fuerza que corta, penetra y conquista. Según Steven Forrest, Marte es tu 'espada sagrada', la herramienta que usas para defender tus límites y para luchar por lo que crees justo. No es solo agresión, sino coraje: la valentía de existir plenamente, de decir 'no' cuando es necesario, y de iniciar batallas que valen la pena. Marte es tu libido vital, tu competitividad sana, y tu capacidad de convertir la rabia en combustible para el cambio."
    },
    Jupiter: {
        name: "Júpiter",
        archetype: "El Explorador / El Rey Benevolente",
        drive: "expandir horizontes y encontrar propósito",
        essence_paragraph: "Júpiter rige tu búsqueda de significado, tu fe en la vida, y tu capacidad de expansión hacia horizontes más amplios. Es el principio de crecimiento, optimismo y abundancia. Según Robert Hand, Júpiter no es solo 'suerte', sino tu habilidad de ver oportunidades donde otros ven obstáculos, de confiar en que el universo conspira a tu favor. Es tu filosofía de vida, tu sentido del humor, y tu necesidad de trascender lo mundano para conectar con algo más grande. Júpiter es el maestro que te enseña a través de la experiencia, el viajero que busca la verdad, y el generoso que comparte su sabiduría."
    },
    Saturn: {
        name: "Saturno",
        archetype: "El Arquitecto / El Anciano Sabio",
        drive: "construir estructuras sólidas y asumir maestría",
        essence_paragraph: "Saturno representa tu relación con la autoridad, la disciplina, y el tiempo. Es el principio de estructura, límite y responsabilidad. Según Liz Greene, Saturno no es el 'planeta malvado', sino el maestro severo que te obliga a madurar, a enfrentar la realidad tal como es, y a construir algo duradero. Es tu capacidad de postergar la gratificación, de trabajar con paciencia, y de asumir las consecuencias de tus actos. Saturno es el guardián del umbral, el que te exige integridad antes de otorgarte poder. Es tu miedo más profundo, pero también tu mayor maestría cuando lo integras conscientemente."
    },
    Uranus: {
        name: "Urano",
        archetype: "El Rebelde / El Genio Despertador",
        drive: "romper cadenas y canalizar genialidad",
        essence_paragraph: "Urano rige tu necesidad de libertad, tu capacidad de innovación, y tu rebeldía ante lo establecido. Es el principio de ruptura, despertar y genialidad. Según Steven Forrest, Urano es el rayo que ilumina la oscuridad, la chispa de lo inesperado que sacude tu vida cuando te has vuelto demasiado cómodo. Es tu lado excéntrico, tu visión futurista, y tu rechazo a ser encasillado. Urano no respeta tradiciones que ya no sirven; es el revolucionario interno que te empuja a ser auténtico aunque eso signifique estar solo. Es tu genialidad única, tu capacidad de ver patrones que otros ignoran, y tu valentía para ser diferente."
    },
    Neptune: {
        name: "Neptuno",
        archetype: "El Místico / El Soñador Universal",
        drive: "disolver límites y fundirte con lo sagrado",
        essence_paragraph: "Neptuno gobierna tu conexión con lo trascendente, tu capacidad de compasión, y tu anhelo de fusión con algo más grande que el ego. Es el principio de disolución, imaginación y redención. Según Liz Greene, Neptuno es el portal hacia lo numinoso, la parte de ti que sabe que todo está interconectado. Es tu sensibilidad psíquica, tu capacidad de soñar, y tu necesidad de escapar de la dureza de la realidad material. Neptuno es el artista, el sanador, el místico que ve lo invisible. Pero también es la niebla que confunde, la ilusión que seduce, y el sacrificio que puede convertirse en victimismo si no se canaliza conscientemente."
    },
    Pluto: {
        name: "Plutón",
        archetype: "El Fénix / El Señor del Inframundo",
        drive: "morir a lo viejo para renacer en poder",
        essence_paragraph: "Plutón rige los procesos de muerte y renacimiento, tu capacidad de transformación profunda, y tu relación con el poder en su forma más cruda. Es el principio de regeneración, intensidad y catarsis. Según Jeffrey Wolf Green, Plutón es el alma que ha venido a evolucionar a través de crisis que obligan a soltar lo que ya no sirve. Es tu sombra más oscura, tus obsesiones, y tus deseos más tabú. Pero también es tu poder de resurrección, tu capacidad de renacer de las cenizas, y tu habilidad de transmutar el veneno en medicina. Plutón no negocia: exige verdad total, autenticidad radical, y la valentía de mirar al abismo sin parpadear."
    },
    NorthNode: {
        name: "Nodo Norte",
        archetype: "La Brújula Evolutiva / El Destino del Alma",
        drive: "avanzar hacia tu destino más elevado",
        essence_paragraph: "El Nodo Norte representa la dirección evolutiva de tu alma en esta vida, el territorio desconocido que estás llamado a explorar. Según Steven Forrest, no es un 'destino fijo', sino una invitación a crecer más allá de tus patrones kármicos (Nodo Sur). Es la zona de incomodidad que, cuando la abrazas, te lleva a tu mayor realización. El Nodo Norte es el héroe que aún no eres, la versión de ti que requiere valentía, vulnerabilidad y fe. Es el camino menos transitado, la medicina que tu alma necesita, y el propósito que le da sentido a tus luchas."
    }
};

export const SIGNS_LIB: Record<string, {
    name: string;
    adverb: string;
    strategy: string;
    style_paragraph: string;
    shadow_paragraph: string;
}> = {
    Aries: {
        name: "Aries",
        adverb: "con una urgencia impulsiva y directa",
        strategy: "iniciar batallas y conquistar nuevos territorios",
        style_paragraph: "Aries es el fuego cardinal, la chispa que inicia el ciclo zodiacal. Actúa con valentía instintiva, sin calcular demasiado las consecuencias. Es el pionero que abre caminos donde no los hay, el guerrero que prefiere la acción a la contemplación. Su energía es espontánea, competitiva y ferozmente independiente. Aries no espera permiso; simplemente avanza.",
        shadow_paragraph: "La sombra de Aries es la impulsividad ciega y la arrogancia del ego inflado. Puede volverse egoísta, impaciente y agresivo cuando no obtiene lo que quiere de inmediato. Su mayor reto es aprender a considerar a los demás sin perder su fuego, a canalizar su rabia en causas nobles, y a terminar lo que empieza en lugar de saltar al próximo desafío."
    },
    Taurus: {
        name: "Tauro",
        adverb: "con una persistencia calmada y sensorial",
        strategy: "estabilizar recursos y cultivar placer material",
        style_paragraph: "Tauro es la tierra fija, la roca inamovible que construye seguridad a través de la paciencia. Actúa con lentitud deliberada, valorando la calidad sobre la velocidad. Es el jardinero que cultiva con sus manos, el artesano que crea belleza tangible, y el guardián de los recursos. Su energía es sensual, leal y profundamente conectada con el cuerpo y la naturaleza.",
        shadow_paragraph: "La sombra de Tauro es la terquedad obstinada y el apego material excesivo. Puede volverse posesivo, perezoso y resistente al cambio necesario. Su mayor reto es soltar el control sobre lo que 'posee' (personas, cosas, ideas), aprender que la verdadera seguridad es interna, y permitir que la vida fluya sin aferrarse a lo conocido por miedo a la incertidumbre."
    },
    Gemini: {
        name: "Géminis",
        adverb: "con una curiosidad inquieta y juguetona",
        strategy: "diversificar opciones y comunicar puentes",
        style_paragraph: "Géminis es el aire mutable, la brisa que conecta ideas y personas. Actúa con versatilidad mental, saltando de un tema a otro con agilidad. Es el comunicador nato, el eterno estudiante, y el tejedor de redes sociales. Su energía es ligera, ingeniosa y profundamente curiosa. Géminis no se queda quieto; necesita variedad, estímulo intelectual y libertad de movimiento.",
        shadow_paragraph: "La sombra de Géminis es la dispersión mental y la superficialidad. Puede volverse chismoso, manipulador con las palabras, y evasivo ante la profundidad emocional. Su mayor reto es comprometerse con una dirección sin sentirse atrapado, desarrollar consistencia sin perder su chispa, y usar su don de la palabra para sanar en lugar de herir."
    },
    Cancer: {
        name: "Cáncer",
        adverb: "con una sensibilidad protectora y nutricia",
        strategy: "crear refugios y honrar la raíz emocional",
        style_paragraph: "Cáncer es el agua cardinal, la marea que nutre y protege. Actúa desde la intuición emocional, creando espacios de seguridad para sí mismo y para quienes ama. Es la madre arquetípica, el guardián del hogar, y el sanador de heridas ancestrales. Su energía es empática, nostálgica y profundamente conectada con la memoria y la familia.",
        shadow_paragraph: "La sombra de Cáncer es la dependencia emocional y la manipulación a través de la culpa. Puede volverse sobreprotector, resentido y atrapado en el pasado. Su mayor reto es soltar el papel de víctima o mártir, establecer límites sanos sin sentirse cruel, y honrar sus propias necesidades sin sacrificarse por los demás hasta el agotamiento."
    },
    Leo: {
        name: "Leo",
        adverb: "con una creatividad generosa y radiante",
        strategy: "expresarte con autoridad y brillo personal",
        style_paragraph: "Leo es el fuego fijo, el sol que brilla en el centro del escenario. Actúa con confianza magnética, irradiando calidez y creatividad. Es el rey benevolente, el artista que crea desde el corazón, y el líder que inspira lealtad. Su energía es dramática, generosa y profundamente necesitada de reconocimiento. Leo no se esconde; necesita ser visto, celebrado y amado.",
        shadow_paragraph: "La sombra de Leo es la arrogancia y la necesidad neurótica de atención. Puede volverse egocéntrico, tiránico y devastado por la crítica. Su mayor reto es brillar sin eclipsar a los demás, liderar con humildad, y encontrar su valor interno sin depender de la validación externa constante."
    },
    Virgo: {
        name: "Virgo",
        adverb: "con una precisión analítica y humilde",
        strategy: "perfeccionar procesos y servir con orden",
        style_paragraph: "Virgo es la tierra mutable, el artesano que refina cada detalle. Actúa con discernimiento meticuloso, buscando la perfección a través del servicio. Es el sanador práctico, el analista que ve lo que falta, y el trabajador incansable. Su energía es modesta, eficiente y profundamente comprometida con la mejora continua.",
        shadow_paragraph: "La sombra de Virgo es el perfeccionismo paralizante y la crítica destructiva. Puede volverse obsesivo con los detalles, hipocondríaco y resentido por 'servir' sin reconocimiento. Su mayor reto es aceptar la imperfección como parte de la vida, soltar el control neurótico, y aprender que 'suficientemente bueno' a veces es perfecto."
    },
    Libra: {
        name: "Libra",
        adverb: "con un refinamiento diplomático y equilibrado",
        strategy: "buscar la justicia y la armonía compartida",
        style_paragraph: "Libra es el aire cardinal, la balanza que busca equilibrio en todas las cosas. Actúa con gracia social, valorando la belleza, la justicia y la cooperación. Es el diplomático nato, el artista de las relaciones, y el mediador que ve ambos lados. Su energía es encantadora, indecisa y profundamente comprometida con la paz.",
        shadow_paragraph: "La sombra de Libra es la indecisión crónica y la dependencia de la aprobación ajena. Puede volverse manipulador pasivo-agresivo, superficial en su búsqueda de armonía, y resentido por sacrificar sus propias necesidades. Su mayor reto es tomar decisiones firmes sin miedo al conflicto, y aprender que la verdadera paz a veces requiere confrontación honesta."
    },
    Scorpio: {
        name: "Escorpio",
        adverb: "con una intensidad penetrante y regenerativa",
        strategy: "investigar lo oculto y transmutar sombras",
        style_paragraph: "Escorpio es el agua fija, el océano profundo que guarda secretos. Actúa con intensidad emocional, buscando la verdad bajo la superficie. Es el detective psíquico, el alquimista que transmuta veneno en medicina, y el amante que se entrega totalmente o no se entrega en absoluto. Su energía es magnética, obsesiva y profundamente transformadora.",
        shadow_paragraph: "La sombra de Escorpio es la venganza, la manipulación y el control obsesivo. Puede volverse paranoico, destructivo y atrapado en ciclos de muerte sin renacimiento. Su mayor reto es soltar el resentimiento, confiar sin necesidad de controlar, y usar su poder para sanar en lugar de dominar."
    },
    Sagittarius: {
        name: "Sagitario",
        adverb: "con un entusiasmo expansivo y veraz",
        strategy: "aventurarte tras la verdad y la fe",
        style_paragraph: "Sagitario es el fuego mutable, la flecha que apunta al horizonte. Actúa con optimismo contagioso, buscando significado en la aventura. Es el filósofo viajero, el maestro que inspira, y el buscador de verdades universales. Su energía es libre, honesta y profundamente necesitada de expansión física y mental.",
        shadow_paragraph: "La sombra de Sagitario es la arrogancia intelectual y la irresponsabilidad. Puede volverse dogmático, exagerado y evasivo ante los compromisos. Su mayor reto es aterrizar sus visiones en la realidad, respetar verdades ajenas sin imponer la suya, y aprender que la libertad verdadera incluye responsabilidad."
    },
    Capricorn: {
        name: "Capricornio",
        adverb: "con una disciplina estratégica y pragmática",
        strategy: "estructurar resultados y escalar hacia la maestría",
        style_paragraph: "Capricornio es la tierra cardinal, la montaña que se escala con determinación. Actúa con ambición controlada, construyendo legados que perduran. Es el estratega paciente, el líder que asume responsabilidad, y el maestro que gana autoridad a través del esfuerzo. Su energía es seria, resiliente y profundamente comprometida con el logro.",
        shadow_paragraph: "La sombra de Capricornio es la frialdad emocional y la ambición sin escrúpulos. Puede volverse tiránico, workaholic y obsesionado con el estatus. Su mayor reto es equilibrar el éxito externo con la calidez humana, permitirse vulnerabilidad sin verla como debilidad, y recordar que el poder sin corazón es tiranía."
    },
    Aquarius: {
        name: "Acuario",
        adverb: "con una visión innovadora y desapegada",
        strategy: "idealizar el futuro y romper lo obsoleto",
        style_paragraph: "Acuario es el aire fijo, el viento que sopla desde el futuro. Actúa con originalidad rebelde, valorando la libertad y la igualdad. Es el visionario humanitario, el inventor que rompe moldes, y el amigo leal que mantiene distancia emocional. Su energía es excéntrica, progresista y profundamente comprometida con causas colectivas.",
        shadow_paragraph: "La sombra de Acuario es la frialdad emocional y el elitismo intelectual. Puede volverse distante, fanático de sus ideales y desconectado de las necesidades humanas básicas. Su mayor reto es integrar su mente brillante con su corazón, comprometerse emocionalmente sin sentirse atrapado, y recordar que la revolución empieza en lo personal antes de lo colectivo."
    },
    Pisces: {
        name: "Piscis",
        adverb: "con una empatía diluyente y mística",
        strategy: "fluir con el todo y sanar desde la entrega",
        style_paragraph: "Piscis es el agua mutable, el océano que lo contiene todo. Actúa desde la compasión universal, disolviendo fronteras entre el yo y el otro. Es el artista visionario, el sanador empático, y el místico que ve lo invisible. Su energía es fluida, sacrificada y profundamente conectada con lo trascendente.",
        shadow_paragraph: "La sombra de Piscis es la evasión, la victimización y la adicción. Puede volverse mártir, confuso y perdido en fantasías escapistas. Su mayor reto es establecer límites sin perder su compasión, aterrizar su sensibilidad en acciones concretas, y aprender que ayudar a otros no significa perderse a sí mismo."
    }
};

export const HOUSES_LIB: Record<number, {
    arena: string;
    manifestation: string;
    arena_paragraph: string;
    evolution_paragraph: string;
}> = {
    1: {
        arena: "en el escenario de tu identidad física y tu máscara al mundo",
        manifestation: "forjar tu presencia y tu estilo de ser",
        arena_paragraph: "La Casa 1 es el Ascendente, tu punto de encarnación. Es la máscara que usas para navegar el mundo, tu cuerpo físico, y la primera impresión que causas. Según Robert Hand, esta casa representa tu 'yo emergente', la forma en que inicias nuevas experiencias y cómo te defiendes del entorno. No es tu esencia profunda (eso es el Sol), sino tu vehículo de expresión inmediata.",
        evolution_paragraph: "Aquí aprendes a ser tú mismo sin disculpas, a ocupar espacio en el mundo, y a desarrollar una identidad que sea auténtica en lugar de reactiva. La maestría de la Casa 1 es la autoconciencia corporal y la valentía de mostrarte tal como eres, sin esconderte detrás de roles sociales."
    },
    2: {
        arena: "en el escenario de tus recursos, valores y autoestima material",
        manifestation: "cultivar seguridad y definir tu valor",
        arena_paragraph: "La Casa 2 gobierna tus posesiones, tu dinero, y lo que consideras valioso. Pero más profundamente, según Liz Greene, es tu sentido de autovalor: ¿qué crees que mereces? Esta casa revela cómo generas recursos, cómo los administras, y qué estás dispuesto a intercambiar por seguridad. Es tu relación con lo tangible, lo sensorial, y lo que te hace sentir arraigado.",
        evolution_paragraph: "Aquí aprendes a valorarte a ti mismo independientemente de lo que posees, a generar abundancia desde la autosuficiencia, y a entender que la verdadera riqueza es interna. La maestría de la Casa 2 es la capacidad de crear seguridad sin apego, y de dar valor a lo que realmente importa."
    },
    3: {
        arena: "en el escenario de la comunicación, el aprendizaje y las conexiones cercanas",
        manifestation: "tejer redes y articular tu mente",
        arena_paragraph: "La Casa 3 rige tu mente concreta, tu forma de comunicarte, y tus relaciones con hermanos, vecinos y el entorno inmediato. Es el aprendizaje temprano, la curiosidad cotidiana, y la habilidad de conectar puntos. Según Steven Forrest, esta casa es tu 'sistema operativo mental': cómo procesas información, cómo te mueves en tu entorno, y cómo compartes lo que sabes.",
        evolution_paragraph: "Aquí aprendes a escuchar tanto como hablas, a usar las palabras para construir puentes en lugar de muros, y a mantener tu mente abierta sin perder tu centro. La maestría de la Casa 3 es la comunicación consciente y la capacidad de aprender de cada experiencia cotidiana."
    },
    4: {
        arena: "en el escenario de tu hogar, raíces y fundamento emocional",
        manifestation: "construir tu santuario interior y honrar tu linaje",
        arena_paragraph: "La Casa 4 es el fondo del cielo, tu base emocional. Gobierna tu hogar físico, tu familia de origen, y tus raíces ancestrales. Según Liz Greene, esta casa representa tu 'madre interna', el contenedor psíquico que te sostiene. Es donde regresas cuando necesitas seguridad, donde guardas tus recuerdos más privados, y donde procesas tu herencia emocional.",
        evolution_paragraph: "Aquí aprendes a crear un hogar interno que no dependa de circunstancias externas, a sanar las heridas del linaje, y a convertirte en tu propio padre/madre. La maestría de la Casa 4 es la capacidad de nutrir sin sofocar, y de honrar el pasado sin quedar atrapado en él."
    },
    5: {
        arena: "en el escenario de la creatividad, el romance y la autoexpresión",
        manifestation: "brillar con tu don único y celebrar la vida",
        arena_paragraph: "La Casa 5 gobierna tu creatividad, tus romances, tus hijos (biológicos o creativos), y todo lo que haces por puro placer. Es el escenario del juego, del riesgo, y de la expresión del corazón. Según Robert Hand, esta casa es donde te conviertes en artista de tu propia vida, donde te permites ser visto en tu esplendor, y donde aprendes que la alegría es un acto de valentía.",
        evolution_paragraph: "Aquí aprendes a crear sin miedo al juicio, a amar sin garantías, y a celebrar tu unicidad sin arrogancia. La maestría de la Casa 5 es la capacidad de brillar sin eclipsar a otros, y de jugar con la vida sin perder la responsabilidad."
    },
    6: {
        arena: "en el escenario del servicio, la salud y el trabajo cotidiano",
        manifestation: "perfeccionar tu oficio y servir con humildad",
        arena_paragraph: "La Casa 6 rige tu rutina diaria, tu salud física, y tu forma de servir. Es el trabajo que haces no por gloria, sino por necesidad o devoción. Según Steven Forrest, esta casa es donde aprendes la disciplina del cuerpo, la humildad del servicio, y la maestría del detalle. Es tu relación con los hábitos, con los empleados o compañeros, y con la perfección práctica.",
        evolution_paragraph: "Aquí aprendes que el servicio consciente es sagrado, que tu cuerpo es un templo que merece cuidado, y que la excelencia en lo pequeño construye grandeza. La maestría de la Casa 6 es trabajar sin resentimiento, servir sin sacrificarse, y cuidar el cuerpo como vehículo del alma."
    },
    7: {
        arena: "en el escenario de las relaciones, los socios y el espejo del otro",
        manifestation: "encontrar equilibrio a través del compromiso",
        arena_paragraph: "La Casa 7 es el Descendente, el punto opuesto al Ascendente. Gobierna tus relaciones de pareja, tus socios de negocio, y todo lo que proyectas en el 'otro'. Según Liz Greene, esta casa es tu espejo: lo que ves en los demás es lo que no reconoces en ti mismo. Es el escenario del matrimonio, los contratos, y la negociación entre el yo y el tú.",
        evolution_paragraph: "Aquí aprendes a comprometerte sin perderte, a ver al otro como maestro en lugar de enemigo, y a integrar las cualidades que proyectas. La maestría de la Casa 7 es la capacidad de relacionarte desde la totalidad, no desde la carencia, y de honrar al otro sin idealizarlo ni demonizarlo."
    },
    8: {
        arena: "en el escenario de la intimidad, la muerte y la regeneración",
        manifestation: "renacer a través de la crisis y la fusión",
        arena_paragraph: "La Casa 8 gobierna los recursos compartidos, la sexualidad profunda, la muerte, y todo lo que está oculto. Es el escenario de la transformación radical, donde el ego muere para que nazca algo nuevo. Según Jeffrey Wolf Green, esta casa es donde enfrentas tus miedos más oscuros, donde te fusionas con el otro hasta perder los límites, y donde aprendes que el poder verdadero viene de la vulnerabilidad total.",
        evolution_paragraph: "Aquí aprendes a soltar el control, a confiar en procesos que no puedes manejar, y a renacer de tus propias cenizas. La maestría de la Casa 8 es la capacidad de morir simbólicamente una y otra vez sin perder tu esencia, y de usar el poder para sanar en lugar de dominar."
    },
    9: {
        arena: "en el escenario de la filosofía, los viajes y la búsqueda de sentido",
        manifestation: "expandir tu visión y encontrar tu verdad",
        arena_paragraph: "La Casa 9 rige la educación superior, los viajes largos, la filosofía, y la búsqueda de significado. Es el escenario de la expansión mental y espiritual. Según Robert Hand, esta casa es donde trasciende lo cotidiano para conectar con verdades universales, donde te conviertes en estudiante de la vida, y donde desarrollas una cosmovisión que le da sentido a tu existencia.",
        evolution_paragraph: "Aquí aprendes a cuestionar tus creencias sin perder tu fe, a viajar (física o mentalmente) para expandir tu perspectiva, y a enseñar lo que has aprendido. La maestría de la Casa 9 es la sabiduría que viene de la experiencia directa, no del dogma, y la capacidad de ver lo sagrado en lo ordinario."
    },
    10: {
        arena: "en el escenario de tu carrera, tu legado y tu autoridad pública",
        manifestation: "construir tu reputación y asumir liderazgo",
        arena_paragraph: "La Casa 10 es el Medio Cielo, el punto más alto de la carta. Gobierna tu carrera, tu reputación pública, y tu relación con la autoridad. Según Liz Greene, esta casa representa tu 'padre interno', la voz que te exige logros y te juzga por tus resultados. Es el escenario donde construyes un legado, donde asumes responsabilidad pública, y donde defines qué significa 'éxito' para ti.",
        evolution_paragraph: "Aquí aprendes a liderar con integridad, a construir algo que perdure más allá de tu vida, y a equilibrar ambición con humanidad. La maestría de la Casa 10 es la capacidad de alcanzar la cima sin perder tu alma, y de usar tu autoridad para servir en lugar de dominar."
    },
    11: {
        arena: "en el escenario de la comunidad, las amistades y los ideales colectivos",
        manifestation: "co-crear el futuro y pertenecer sin perderte",
        arena_paragraph: "La Casa 11 gobierna tus amistades, tus grupos de pertenencia, y tus sueños para el futuro. Es el escenario de la visión colectiva, donde te unes con otros para crear algo más grande que tú. Según Steven Forrest, esta casa es donde aprendes que no estás solo, que tu tribu te espera, y que tus ideales pueden manifestarse si te alineas con la frecuencia correcta.",
        evolution_paragraph: "Aquí aprendes a colaborar sin perder tu individualidad, a soñar en grande sin desconectarte del presente, y a encontrar tu tribu sin fanatismo. La maestría de la Casa 11 es la capacidad de ser único dentro del colectivo, y de usar la tecnología y las redes para elevar la consciencia."
    },
    12: {
        arena: "en el escenario del inconsciente, el sacrificio y la trascendencia",
        manifestation: "disolver el ego y conectar con lo divino",
        arena_paragraph: "La Casa 12 es la casa del karma, del inconsciente colectivo, y de todo lo que está oculto. Gobierna los hospitales, las prisiones, los retiros espirituales, y los enemigos secretos. Según Liz Greene, esta casa es donde el ego se disuelve, donde enfrentas tus miedos más profundos, y donde te conectas con lo trascendente. Es el escenario del sacrificio, la compasión, y la redención.",
        evolution_paragraph: "Aquí aprendes a soltar el control, a confiar en fuerzas invisibles, y a servir sin esperar reconocimiento. La maestría de la Casa 12 es la capacidad de estar solo sin sentirte solo, de meditar en el caos, y de usar tu sensibilidad psíquica para sanar en lugar de escapar."
    }
};
