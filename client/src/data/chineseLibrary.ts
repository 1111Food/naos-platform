// chineseLibrary.ts
// Biblioteca enriquecida del Horóscopo Chino
// Inspirada en la metodología y estilo de Ludovica Squirru Dari
// Campos: profile, love, career, positives[], negatives[], karma, talisman

export interface ChineseAnimalLib {
    name: string;
    chineseName: string;
    element: string;
    polarity: string;
    trine: string;
    years: string;
    profile: string;
    love: string;
    career: string;
    positives: string[];
    negatives: string[];
    karma: string;
    talisman: string;
}

export const CHINESE_LIB: Record<string, ChineseAnimalLib> = {
    "Rata": {
        name: "Rata",
        chineseName: "Zǐ (子)",
        element: "Agua",
        polarity: "Yang",
        trine: "Primera Tríada con Dragón y Mono",
        years: "1900, 1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020",
        profile: "La Rata es el primer signo del zodiaco chino y, según Ludovica Squirru, uno de los seres más complejos e inteligentes del ciclo. Nacida bajo el elemento Agua en su vertiente Yang, posee una curiosidad insaciable que la lleva a explorar cada rincón del mundo material e intelectual. Su instinto de supervivencia es legendario: la Rata no nace con una vida fácil, sino que la construye con la astucia de quien conoce el terreno mejor que nadie. Es sociable y encantadora, capaz de colarse en los corazones más cerrados con su carisma natural. Ama la información y la acumula como un tesoro invisible. Exigente consigo misma y con los demás, empuja en la dirección del crecimiento constante. Lidera la tríada del intelecto junto al Dragón y el Mono, siendo la mente más práctica de las tres.",
        love: "En el amor, la Rata es apasionada y profundamente leal cuando encuentra a quien considera su igual. Busca una pareja con quien compartir proyectos de vida concretos, no solo romanticismo efímero. Su naturaleza controladora y su necesidad de seguridad emocional pueden hacerla celosa o sobreprotectora. Cuando ama de verdad, lo da todo: su inteligencia, su tiempo y su lealtad. Le costará el viento si su pareja no respeta su intimidad y su espacio para pensar. Sus mejores vínculos son con el Dragón, el Mono y el Buey, con quienes construye castillos reales.",
        career: "Profesionalmente, la Rata sobresale en ámbitos donde la estrategia, la rapidez mental y la adaptabilidad son claves. Es una excelente negociadora, analista, investigadora y emprendedora. Su amor por los detalles la hace valiosa en roles financieros, periodísticos, científicos o de consultoría. Genera sus propios puestos de trabajo con frecuencia y crea estudios especializados que la comunidad valora. Su ambición no descansa, pero necesita aprender a delegar para no sobrecargarse. La Rata prospera en entornos que le den autonomía y reconocimiento intelectual.",
        positives: [
            "Inteligencia práctica e intuitiva excepcional",
            "Capacidad de adaptación a cualquier circunstancia",
            "Líder natural con gran carisma y encanto social",
            "Memoria prodigiosa y mente analítica afilada",
            "Resiliencia y capacidad de recuperación ante los golpes"
        ],
        negatives: [
            "Tendencia a la manipulación cuando se siente amenazada",
            "Ansiedad por acumulación excesiva de bienes o información",
            "Dificultad para confiar plenamente en los demás",
            "Calculadora en exceso, puede perder la espontaneidad emocional",
            "Ambición sin límites que puede derivar en egoísmo"
        ],
        karma: "La Rata viene a este mundo a aprender la diferencia entre supervivencia y abundancia. Su karma es transformar la astucia en sabiduría y el control en confianza. Su mayor desafío espiritual es abrirse a dar sin calcular el retorno.",
        talisman: "Moneda china de oro, cristal de cuarzo citrino, todo en tonos azul marino y plateado"
    },

    "Buey": {
        name: "Buey",
        chineseName: "Chǒu (丑)",
        element: "Tierra",
        polarity: "Yin",
        trine: "Segunda Tríada con Serpiente y Gallo",
        years: "1901, 1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021",
        profile: "El Buey es la roca del zodiaco chino. Para Ludovica Squirru, representa la fuerza más silenciosa y persistente del ciclo: no necesita aplausos para seguir caminando. Nacido bajo la Tierra Yin, el Buey posee una naturaleza profunda, metódica y profundamente honesta. Su palabra es sagrada y su esfuerzo, inamovible. No es el más rápido ni el más brillante en primera instancia, pero su constancia convierte sueños en estructuras reales. Es el constructor de las civilizaciones, el que trabaja cuando todos duermen. Su fidelidad es absoluta y su sentido del deber, inquebrantable. Resiste el cambio aunque esto a veces lo encierra en paradigmas del pasado.",
        love: "El Buey ama con la solidez de sus cuatro patas en la tierra: profundamente, sin aspavientos y para siempre. No es un amante expresivo ni dramático, pero su presencia constante es la forma más profunda de amor que conoce. Necesita sentirse seguro antes de abrirse emocionalmente, y puede tardar en confiar. Una vez que lo hace, es un compañero de vida incondicional. Su mayor desafío amoroso es la rigidez: le cuesta adaptar sus rutinas o ceder en conflictos. Sus mejores compañeros son la Rata, el Gallo y la Serpiente, con quienes comparte valores tradicionales y visiones de largo plazo.",
        career: "El Buey es el profesional más confiable del zodiaco. Llega temprano, se va tarde y jamás entrega un trabajo a medias. Sobresale en roles que requieren paciencia, precisión y responsabilidad: agricultura, arquitectura, medicina, derecho, contabilidad y cualquier campo que demande rigor y método. Su autoridad la gana con hechos, no con palabras. Sin embargo, su resistencia al cambio puede hacerle perder oportunidades en entornos dinámicos. Aprende despacio pero aprende para siempre. Su mundo laboral ideal es ordenado, predecible y con reconocimiento a largo plazo.",
        positives: [
            "Perseverancia y resistencia sin igual ante la adversidad",
            "Fidelidad y lealtad absolutas en todas sus relaciones",
            "Confiabilidad: su palabra tiene valor de contrato",
            "Disciplina y método que llevan cualquier proyecto a buen puerto",
            "Paciencia infinita con quienes quiere y respeta"
        ],
        negatives: [
            "Rigidez mental que dificulta la adaptación a los cambios",
            "Resentimiento acumulado que puede estallar tarde y fuerte",
            "Terquedad que puede bloquear el crecimiento personal",
            "Dificultad para expresar emociones y vulnerabilidad",
            "Tendencia al aislamiento cuando se siente incomprendido"
        ],
        karma: "El Buey viene a aprender que la fortaleza también necesita flexibilidad. Su karma es soltar el peso del pasado y confiar en que el río siempre encuentra su camino al mar, aunque cambie de cauce.",
        talisman: "Piedra de jade verde, semillas de la tierra, tonos verdes oscuros y ocre"
    },

    "Tigre": {
        name: "Tigre",
        chineseName: "Yín (寅)",
        element: "Madera",
        polarity: "Yang",
        trine: "Tercera Tríada con Caballo y Perro",
        years: "1902, 1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022",
        profile: "El Tigre es el signo del carisma indomable. Ludovica Squirru lo define como el ser más intenso y magnético del zodiaco chino: quien comparte una sala con él inevitablemente lo siente. Nacido bajo la Madera Yang, el Tigre vive según sus propias reglas y se rebela instintivamente contra cualquier restricción. Es idealista, generoso hasta el extremo y capaz de sacrificarse por causas nobles sin dudarlo. Su energía es un huracán que puede construir o destruir dependiendo de la conciencia con que la dirija. Su ego, cuando no está domado, puede ser su mayor enemigo. El Tigre necesita propósito: sin una causa que lo inflame, su energía se vuelve contra sí mismo.",
        love: "El Tigre ama con una intensidad que pocos pueden sostener. En pareja, exige lealtad absoluta y la da sin condiciones a cambio. Es apasionado, protector y enormemente generoso con quien ama. Sin embargo, su impulsividad puede crear tormentas innecesarias y su ego herido puede convertirse en explosiones emocionales. Necesita una pareja que sea su igual: alguien que no se intimide con su fuego pero tampoco intente extinguirlo. Sus vínculos más afines son con el Caballo, el Perro y el Cerdo. Con el Mono, la tensión puede ser irresoluble.",
        career: "En el trabajo, el Tigre brilla en posiciones de liderazgo, activismo, artes escénicas, política, deporte de alto rendimiento o cualquier campo donde se valoren el coraje y la originalidad. No sirve para tareas monótonas ni para seguir órdenes sin cuestionarlas. Es innovador, provocador y capaz de inspirar a equipos enteros con su visión. Su problema es la constancia: cuando la novedad se agota, puede abandonar proyectos prometedores. Aprende a gestionar su energía y su impulsividad, el Tigre se vuelve imparable.",
        positives: [
            "Magnetismo y carisma que inspiran a quienes lo rodean",
            "Valentía para defender lo justo aunque esté solo",
            "Generosidad sin límites con quienes quiere",
            "Capacidad de reinventarse tras las caídas más duras",
            "Espíritu apasionado que enciende proyectos y personas"
        ],
        negatives: [
            "Impulsividad que toma decisiones sin medir consecuencias",
            "Ego desmedido que puede alienar aliados valiosos",
            "Inconstancia cuando la novedad y el desafío se agotan",
            "Dificultad para aceptar críticas o limitaciones externas",
            "Tendencia a los extremos: todo o nada, calma o tormenta"
        ],
        karma: "El Tigre viene a transformar su intensidad en maestría. Su karma es aprender que el verdadero poder no ruge: irradia. La humildad y la paciencia son sus lecciones más difíciles y más necesarias.",
        talisman: "Ámbar dorado, figura de tigre en madera, tonos naranja y verde bosque"
    },

    "Conejo": {
        name: "Conejo",
        chineseName: "Māo (卯)",
        element: "Madera",
        polarity: "Yin",
        trine: "Cuarta Tríada con Cabra y Cerdo",
        years: "1903, 1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023",
        profile: "El Conejo es el signo de la belleza, la diplomacia y la magia suave. Según Ludovica Squirru, posee una elegancia innata que impregna todo lo que toca, con un sentido estético refinado y una intuición que raramente le falla. Es un ser dual, con el yin y el yang muy marcados: puede ser tierno y firme a la vez, soñador y calculador, abierto y hermético. Su talante es vanguardista e innovador, con una vocación artística que aparece siempre que tenga el espacio para expresarse. Es el gran diplomático del zodiaco: encuentra el camino del medio cuando todo parece irreconciliable. Pero detrás de su aparente docilidad puede haber una voluntad de acero y, en su sombra, impulsos tiránicos que sorprenden a quienes lo subestimaron.",
        love: "El Conejo es un amante refinado y culto, que seduce más con su inteligencia y sensibilidad que con gestos grandilocuentes. Detesta la vulgaridad y la soledad casi por igual. En el amor busca un refugio seguro y bello donde poder bajar la guardia. Es tierno y necesitado de muestras de afecto constantes, aunque le cueste pedirlas. Su miedo al conflicto puede llevarlo a acumular resentimientos en lugar de expresarlos, lo que a veces explota en momentos inesperados. Sus mejores parejas son la Cabra, el Cerdo y el Perro. Con el Gallo, la tensión es inevitable.",
        career: "El Conejo prospera en entornos que valoren la finura, el criterio y la capacidad de mediar: moda, diplomacia, artes, psicología, relaciones públicas, literatura, decoración y cualquier campo que combine creatividad con estrategia. Es un consejero y asesor excepcional: su objetividad y su tacto hacen que la gente confíe en él naturalmente. El Conejo disciplinado y perseverante puede llegar muy lejos. Su desafío es superar la pasividad y el miedo al riesgo que a veces lo paralizan en momentos clave.",
        positives: [
            "Elegancia y refinamiento que embellecen cada entorno",
            "Diplomacia excepcional para resolver conflictos sin heridas",
            "Intuición profunda y sentido estético muy desarrollado",
            "Adaptabilidad y talento para sobrevivir con gracia",
            "Encanto genuino que construye redes sociales sólidas"
        ],
        negatives: [
            "Escapismo: huye del conflicto en lugar de confrontarlo",
            "Pasividad que puede hacerle perder oportunidades clave",
            "Miedo al fracaso que paraliza la acción necesaria",
            "Resentimientos silenciosos que estallan de forma desproporcionada",
            "Dependencia emocional disfrazada de independencia"
        ],
        karma: "El Conejo viene a aprender que la paz verdadera no es ausencia de conflicto sino la capacidad de habitarlo con gracia. Su karma es desarrollar la valentía de decir la verdad aunque incomode.",
        talisman: "Piedra luna, flor de loto tallada, tonos blancos perla y verde salvia"
    },

    "Dragón": {
        name: "Dragón",
        chineseName: "Chén (辰)",
        element: "Tierra",
        polarity: "Yang",
        trine: "Primera Tríada con Rata y Mono",
        years: "1904, 1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024",
        profile: "El Dragón es el único ser mítico del zodiaco chino y, para Ludovica Squirru, el signo más imponente y carismático del ciclo. Nacido bajo la Tierra Yang, el Dragón no solo sueña en grande — vive en grande en cada uno de sus gestos. Posee una vitalidad arrolladora, un corazón magnánimo y una presencia que llena habitaciones sin decir una sola palabra. Es creativo, apasionado y está llamado a desplegar sus alas para guiar a otros, especialmente en tiempos de crisis. Su ego, cuando se desequilibra, puede volverse un tirano de sí mismo y de los demás. La arrogancia es su mayor trampa, pues le hace creer que todo depende exclusivamente de su genio. El Dragón que se humilla y escucha alcanza su pleno potencial mítico.",
        love: "El Dragón enamora por su presencia y su generosidad, pero mantener una relación con él no es para almas débiles. Exige admiración y necesita sentirse especial en todo momento. En el amor puede ser intensamente romántico y después completamente absorto en sus proyectos, dejando a la pareja con la sensación de que compite con una causa mayor. Cuando ama de verdad, protege y da con nobleza real. Sus mejores vínculos son con la Rata, el Mono y el Gallo. Con el Perro, el choque de personalidades puede ser irresoluble.",
        career: "El Dragón necesita una misión, no solo un trabajo. Sobresale en política, arte, dirección de empresas, emprendimientos innovadores, medicina, espiritualidad y cualquier campo donde se requiera visión de largo plazo y capacidad de liderazgo. Es un motivador nato que levanta equipos completos con su entusiasmo. Su talón de Aquiles es la impaciencia con la ineficiencia ajena y la dificultad para delegar. Cuando aprende a trabajar con otros en lugar de por encima de ellos, crea legados extraordinarios.",
        positives: [
            "Carisma y presencia que inspiran devoción y admiración",
            "Creatividad desbordante y visión estratégica de largo alcance",
            "Vitalidad y energía inagotables para sus proyectos",
            "Generosidad y magnanimidad de corazón auténtico",
            "Capacidad de liderazgo en tiempos de crisis y cambio"
        ],
        negatives: [
            "Arrogancia que lo ciega ante las necesidades de los demás",
            "Intolerancia con la ineficiencia y la lentitud ajena",
            "Impulsividad para quemar puentes importantes",
            "Necesidad de admiración que puede volverse dependencia",
            "Dificultad para ser paciente con procesos que no controla"
        ],
        karma: "El Dragón viene a aprender que el poder verdadero sirve, no domina. Su karma es descender de las nubes y comprender que los más grandes legados se construyen rodilla en tierra.",
        talisman: "Perla de río, incienso de sándalo dorado, colores dorado imperial y rojo carmesí"
    },

    "Serpiente": {
        name: "Serpiente",
        chineseName: "Sì (巳)",
        element: "Fuego",
        polarity: "Yin",
        trine: "Segunda Tríada con Buey y Gallo",
        years: "1905, 1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025",
        profile: "La Serpiente es el signo más enigmático y sabio del zodiaco chino. Según Ludovica Squirru, simboliza la regeneración y el renacimiento: cada período de su vida implica mudar una piel para emerger transformada. Nacida bajo el Fuego Yin, su fuerza no es visible sino sentida: irradia una presencia magnética y una inteligencia profunda que opera desde las capas más sutiles. Es hermosa, intuitiva y extremadamente selectiva: prefiere la calidad sobre la cantidad en absolutamente todo. Posee un carisma seductor que atrae sin intentarlo. Su mundo interior es vasto y complejo. La Serpiente observa, analiza y actúa en el momento exacto, con una precisión que asombra. Su karma es purificar la sombra del control y la desconfianza.",
        love: "La Serpiente ama con una intensidad que pocas personas pueden manejar. Es posesiva, celosa y profundamente fiel cuando entrega su corazón. Sus relaciones son total o nada: no sabe amar a medias. Necesita construir un nivel de confianza muy alto antes de abrirse, lo que puede hacerla parecer fría o distante al principio. Su sensualidad es legendaria y su inteligencia emocional, cuando está en equilibrio, la convierte en una pareja profundamente satisfactoria. Sus mejores vínculos son con el Buey, el Gallo y el Mono. Con el Cerdo, la tensión energética puede ser irresoluble.",
        career: "La Serpiente prospera en campos que requieran profundidad intelectual, intuición y estrategia: psicoanálisis, filosofía, investigación científica, artes plásticas, espiritualidad, medicina alternativa, finanzas y consultoría de alto nivel. Es la mejor estratega del zodiaco cuando confía en su instinto. Su consejo es altamente valorado y la gente paga bien por ello. Le cuesta trabajar bajo órdenes de quienes considera inferiores intelectualmente. Necesita autonomía y proyectos de largo aliento que nutran su mente profunda.",
        positives: [
            "Sabiduría profunda forjada por la introspección constante",
            "Intuición casi sobrenatural para leer personas y situaciones",
            "Elegancia y sofisticación en cada expresión personal",
            "Capacidad de transformación y renovación ante la adversidad",
            "Estrategia impecable y paciencia para el momento exacto"
        ],
        negatives: [
            "Desconfianza extrema que puede volverse paranoia",
            "Posesividad y celos que asfixian sus relaciones más íntimas",
            "Secretismo excesivo que genera muros de aislamiento",
            "Tendencia a manipular sutilmente para mantener el control",
            "Rencor que no perdona fácilmente las traiciones percibidas"
        ],
        karma: "La Serpiente viene a aprender que la vulnerabilidad no debilita: libera. Su karma es transformar el control en entrega y el secretismo en transparencia amorosa.",
        talisman: "Cornalina roja o granate, amuleto de serpiente en plata, tonos burdeos y negro profundo"
    },

    "Caballo": {
        name: "Caballo",
        chineseName: "Wǔ (午)",
        element: "Fuego",
        polarity: "Yang",
        trine: "Tercera Tríada con Tigre y Perro",
        years: "1906, 1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026",
        profile: "El Caballo es el espíritu más libre e indomable del zodiaco chino. Para Ludovica Squirru, posee excepcionales destrezas físicas y un liderazgo nato que lo lleva siempre al centro del escenario. Nacido bajo el Fuego Yang, vibra con una energía que puede convertirse en un huracán de alegría y humor que encanta a quienes le rodean. Es independiente, dinámico y su vida está marcada por la acción constante. El Caballo no entiende la quietud: necesita movimiento, horizonte y viento en la crin. Su mayor aprendizaje es reírse de sí mismo y no caer en la vanidad de quien sabe que brilla. Su inconstancia no es traición: es la naturaleza misma del ser que nació corriendo.",
        love: "El Caballo ama con la misma intensidad con que galopa: a toda velocidad y sin mirar atrás. Su compromiso en pareja es constante siempre que su autonomía y libertad no se vean amenazadas. El matrimonio es una de sus metas, pero necesita llegar a él por convicción propia, nunca por presión. Es generoso, apasionado y vital en sus relaciones. Su desafío es la inconstancia emocional y las promesas que hace en el calor del galope y no puede sostener en la calma. Sus mejores parejas son el Tigre, el Perro y la Cabra, con quienes comparte fuerza vital y complicidad.",
        career: "El Caballo prospera en entornos donde la velocidad, el liderazgo y la visibilidad son valorados: deporte de élite, política, medios de comunicación, publicidad, relaciones públicas, viajes y turismo, actuación y cualquier carrera que implique movimiento y contacto con el público. Es un vendedor nato y un motivador excepcional. Su talón de Aquiles es la constancia y la gestión de los detalles. Necesita aliados que anclen sus ideas brillantes en planes ejecutables.",
        positives: [
            "Vitalidad y entusiasmo que contagian a todo su entorno",
            "Liderazgo magnético y carisma natural irresistible",
            "Independencia y valentía para abrir nuevos caminos",
            "Versatilidad y agilidad mental para adaptarse al cambio",
            "Generosidad genuina y espíritu deportivo ante la vida"
        ],
        negatives: [
            "Inconstancia que abandona proyectos antes de verlos crecer",
            "Egoísmo involuntario que olvida las necesidades ajenas",
            "Impaciencia que no tolera la lentitud de los procesos",
            "Promesas sinceras en el momento que no puede sostener",
            "Vanidad que puede bloquear el aprendizaje de sus errores"
        ],
        karma: "El Caballo viene a aprender que la libertad real no es huir sino elegir conscientemente quedarse. Su karma es transformar la fuga en compromiso y el galope solitario en carrera compartida.",
        talisman: "Cuarzo naranja, herradura de plata, colores rojo fuego y blanco brillante"
    },

    "Cabra": {
        name: "Cabra",
        chineseName: "Wèi (未)",
        element: "Tierra",
        polarity: "Yin",
        trine: "Cuarta Tríada con Conejo y Cerdo",
        years: "1907, 1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027",
        profile: "La Cabra es el signo más creativo, compasivo y sensiblemente espiritual del zodiaco chino. Según Ludovica Squirru, vive su vida en proceso de transformación y transmutación continua. Nacida bajo la Tierra Yin, su alma es profundamente artística y su corazón enormemente empático. Tiene la capacidad de crear belleza del dolor y de encontrar significado en lo invisible. Su disponibilidad, buen corazón y espíritu samaritano son dones que ofrece con naturalidad. Es el signo que más experimenta el magnetismo emocional: en sus mejores momentos, irradia una calidez que convierte cualquier espacio en hogar. Necesita sentirse necesitada para florecer.",
        love: "La Cabra vive el amor desde la sensibilidad y la creatividad más puras. Es una pareja tierna, imaginativa y profundamente fiel. Su mayor necesidad emocional es sentirse segura y valorada: cuando no lo siente, puede caer en la dependencia o en la autocompasión. En sus mejores momentos es una compañera que potencia la vida de quien ama con delicadeza y presencia genuina. Sus relaciones más afines son con el Conejo, el Cerdo y el Caballo. Con el Buey, puede haber choques profundos de carácter que requieren gran madurez de ambas partes.",
        career: "La Cabra brilla en todas las artes: pintura, música, poesía, danza, gastronomía, diseño, moda y también en las profesiones de cuidado: medicina holística, trabajo social, psicología y terapias alternativas. Su sensibilidad artística transforma lo cotidiano en experiencia estética. Necesita un entorno nutritivo y libre de presión extrema para dar lo mejor de sí. Su mayor desafío laboral es la autodisciplina: dispersa su talento en múltiples direcciones y necesita estructura externa para concretar. Cuando encuentra patrocinadores o mentores que la apoyan, es capaz de crear obras extraordinarias.",
        positives: [
            "Creatividad artística que transforma el dolor en belleza",
            "Empatía profunda y capacidad de compasión genuina",
            "Resiliencia espiritual para reconstruirse después de cada caída",
            "Sensibilidad que detecta matices que otros no perciben",
            "Generosidad y disponibilidad para quienes necesitan ayuda"
        ],
        negatives: [
            "Dependencia emocional que puede asfixiar sus relaciones",
            "Autocompasión que puede volverse manipulación inconsciente",
            "Falta de autodisciplina para concretar su vasto potencial",
            "Pesimismo y queja cuando se siente abrumada por el mundo",
            "Exceso de sensibilidad que la hace vulnerable a energías ajenas"
        ],
        karma: "La Cabra viene a aprender que su sensibilidad es una potencia, no una fragilidad. Su karma es cultivar la fuerza interior que no dependa del reconocimiento ajeno para florecer.",
        talisman: "Amatista violeta, imagen de luna creciente, tonos lavanda y rosa pálido"
    },

    "Mono": {
        name: "Mono",
        chineseName: "Shēn (申)",
        element: "Metal",
        polarity: "Yang",
        trine: "Primera Tríada con Rata y Dragón",
        years: "1908, 1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016",
        profile: "El Mono es la inteligencia más veloz, inquieta y radicalmente dual del zodiaco chino. Para Ludovica Squirru, no ve problemas sino rompecabezas que esperan ser resueltos con un giro de muñeca. Nacido bajo el Metal Yang, su mente es extraordinariamente ágil y su capacidad de adaptación, casi sobrehumana. Es creativo, irreverente, curioso y capaz de aprender cualquier habilidad con una facilidad pasmosa. El Mono nunca aburre: su humor es ácido pero entrañable, su ingenio, una fuente inagotable de soluciones inesperadas. Su sombra es la arrogancia que subestima al otro y la falta de escrúpulos cuando el fin justifica los medios para su mente brillante.",
        love: "El Mono en el amor es divertido, sensual y eternamente joven, pero también profundamente difícil de atrapar. Necesita estimulación intelectual constante en su pareja: el aburrimiento es su mayor repelente sentimental. Puede ser impulsivo y competitivo, lo que genera roces innecesarios. Cuando madura emocionalmente, desarrolla una lealtad inesperadamente profunda. Sus mejores vínculos affectivos son con la Rata, el Dragón y la Serpiente. Con el Tigre, la tensión es casi química e irresoluble.",
        career: "El Mono es el innovador por excelencia. Prospera en tecnología, comunicación, publicidad, entretenimiento, bolsa de valores, investigación científica, escritura, teatro y cualquier campo donde la creatividad y la velocidad mental sean ventajas competitivas. Es un emprendedor brillante y un negociador hábil. Su desafío es la constancia: cuando resuelve el rompecabezas, pierde interés. Necesita ir de desafío en desafío o construir una misión lo suficientemente grande como para mantenerlo comprometido.",
        positives: [
            "Inteligencia extraordinaria y velocidad mental incomparable",
            "Humor sanador que alivia la tensión en cualquier situación",
            "Versatilidad y capacidad de aprender cualquier habilidad rápido",
            "Ingenio estratégico para resolver problemas complejos",
            "Carisma juguetón que crea conexiones instantáneas"
        ],
        negatives: [
            "Arrogancia que subestima la inteligencia de los demás",
            "Falta de escrúpulos cuando el fin justifica los medios",
            "Inconstancia y pérdida de interés tras resolver el reto",
            "Superficialidad en relaciones que podrían ser profundas",
            "Tendencia a usar la inteligencia para herir en lugar de sanar"
        ],
        karma: "El Mono viene a aprender que la inteligencia más alta es la que sirve y construye, no la que demuestra ni compite. Su karma es poner su mente prodigiosa al servicio del corazón.",
        talisman: "Pirita metálica, símbolo del Bagua, tonos plateado y azul zafiro"
    },

    "Gallo": {
        name: "Gallo",
        chineseName: "Yǒu (酉)",
        element: "Metal",
        polarity: "Yin",
        trine: "Segunda Tríada con Buey y Serpiente",
        years: "1909, 1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017",
        profile: "El Gallo es el heraldo del nuevo día: el primero en despertar al mundo y el más riguroso custodio del orden. Para Ludovica Squirru, posee un gran entusiasmo por la vida, el arte, la moda y la música, combinado con una capacidad laboral y un talento admirables. Nacido bajo el Metal Yin, el Gallo es preciso, correcto y profundamente honesto — a veces dolorosamente honesto. Su dignidad es su escudo y su sentido estético, un don que imprime en todo lo que construye. No soporta el desorden ni la mediocridad y sus estándares son altos para sí mismo y para los que lo rodean. Su sombra es la vanidad y la crítica que puede volverse mordaz cuando no pasa por el filtro de la compasión.",
        love: "El Gallo en el amor es un compañero protector, dedicado y muy trabajador para el bienestar de su hogar. Puede vivir nuevas experiencias, reconectar con sus sentimientos y sentir el deseo de construir una familia sólida. Sin embargo, su perfeccionismo puede hacer que su pareja sienta que nunca es suficientemente buena para sus estándares. Necesita aprender a ceder en los conflictos pequeños para ganar las batallas grandes de la relación. Sus mejores vínculos son con el Buey, la Serpiente y el Dragón. Con el Conejo, la tensión es constante.",
        career: "El Gallo es extraordinariamente organizado y tiene un talento y una capacidad laboral que otros envidian. Sobresale en administración, finanzas, derecho, moda, arquitectura, cirugía, gastronomía de alta gama y la función pública. Su atención al detalle, su puntualidad y su sentido estético lo hacen invaluable en posiciones de gerencia y dirección. El reconocimiento público le llega de forma natural y lo potencia enormemente. Su mayor desafío es no volverse tan crítico y exigente que genere ambientes laborales asfixiantes.",
        positives: [
            "Disciplina y organización que llevan al éxito sostenido",
            "Honestidad y rectitud que generan respeto y confianza",
            "Sentido estético refinado que imprime calidad en todo",
            "Coraje para decir la verdad aunque incomode",
            "Dedicación y eficiencia que convierten ambiciones en logros"
        ],
        negatives: [
            "Vanidad que puede convertirse en obsesión por la apariencia",
            "Crítica mordaz hacia los demás cuando pierde la compasión",
            "Perfeccionismo neurótico que paraliza o agota al equipo",
            "Dificultad para relajarse y disfrutar sin agenda",
            "Orgullo que le impide pedir ayuda o reconocer errores"
        ],
        karma: "El Gallo viene a aprender que la perfección es una ilusión y que el sol nace bello sin necesidad de demostrarlo. Su karma es transformar la exigencia en gracia y la crítica en compasión.",
        talisman: "Cuarzo rosa, plumas de colores vivos, tonos dorado solar y rojo brillante"
    },

    "Perro": {
        name: "Perro",
        chineseName: "Xū (戌)",
        element: "Tierra",
        polarity: "Yang",
        trine: "Tercera Tríada con Tigre y Caballo",
        years: "1910, 1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018",
        profile: "El Perro es el signo más noble, leal y moralmente íntegro del zodiaco chino. Según Ludovica Squirru, se caracteriza por su lealtad — que es especial porque no necesariamente implica fidelidad en el sentido convencional, sino una entrega profunda a los seres y causas que ama. Nacido bajo la Tierra Yang, el Perro posee un agudo sentido de la justicia que lo convierte en un defensor feroz de los más vulnerables. Honesto, directo y profundamente responsable, es el amigo que aparece sin ser llamado cuando la situación es difícil. Su sombra es el pesimismo y una ansiedad defensiva que lo lleva a anticipar tragedias que rara vez ocurren.",
        love: "El Perro ama con una lealtad y una profundidad que pocas veces se encuentran. Cuando elige a alguien, lo elige de verdad y para siempre. Su año le depara relaciones con proyección real: se abren puertas a alianzas profundas y compromisos auténticos. En el amor puede ser sobreprotector y ansioso, especialmente si ha sido herido anteriormente. Necesita sentirse valorado y ver la reciprocidad clara. Sus mejores vínculos afectivos son con el Tigre, el Caballo y el Conejo. Con el Dragón, los choques ideológicos pueden ser irresolubles.",
        career: "El Perro brilla en todas las profesiones relacionadas con la justicia, la protección y el servicio a los demás: derecho, activismo social, trabajo humanitario, fuerzas de seguridad, medicina de urgencias, educación y psicología. Su relación con el Caballo es especialmente estimulante en los negocios: ambos son creativos, solidarios y capaces de comenzar nuevas etapas de emprendimiento juntos. La confianza del equipo es su mejor combustible. Su mayor desafío profesional es el pesimismo que puede boicotear sus propias oportunidades.",
        positives: [
            "Lealtad y nobleza absolutas que generan vínculos de por vida",
            "Honestidad radical que construye confianza genuina",
            "Sentido de justicia que defiende lo correcto sin importar el costo",
            "Generosidad incondicional con sus seres queridos",
            "Responsabilidad y fiabilidad en todo lo que se compromete"
        ],
        negatives: [
            "Pesimismo y ansiedad que anticipan tragedias inexistentes",
            "Desconfianza paranoica tras ser herido o traicionado",
            "Cinismo que puede volverse escudo contra la alegría",
            "Terquedad que le impide cambiar de opinión aunque sea necesario",
            "Hipercriticismo consigo mismo que erosiona su autoestima"
        ],
        karma: "El Perro viene a aprender que la protección más profunda nace de confiar en el flujo de la vida, no de vigilarlo. Su karma es transformar el miedo en fe y el pesimismo en gratitud.",
        talisman: "Obsidiana negra, collar de madera de sándalo, tonos verde bosque y marrón tierra"
    },

    "Cerdo": {
        name: "Cerdo",
        chineseName: "Hài (亥)",
        element: "Agua",
        polarity: "Yin",
        trine: "Cuarta Tríada con Conejo y Cabra",
        years: "1911, 1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019",
        profile: "El Cerdo es el último signo del zodiaco chino y, para Ludovica Squirru, el símbolo de la nobleza espiritual más genuina y del placer vivido con conciencia. Nacido bajo el Agua Yin, posee un corazón de oro y una honestidad brutal que a veces lo pone en desventaja en un mundo que no siempre premia la transparencia. Es valiente, trabajador y profundamente generoso, creyendo con una fe casi ingenua en la bondad intrínseca del ser humano. Su vida suele ser un viaje de abundancia compartida y banquetes de alma. Su mayor desafío es discernir entre quienes agradecen su generosidad y quienes simplemente la consumen sin dar nada a cambio.",
        love: "El Cerdo ama con su gran corazón abierto y sin reservas. Para él, el amor y la amistad están íntimamente ligados: sus mejores relaciones comienzan en la risa compartida. Es apasionado, tierno y enormemente fiel cuando el vínculo es real. Año de banquetes emocionales: encuentros en viajes o celebraciones ampliarán su mundo sentimental. Sus mejores compañeros afectivos son el Conejo, la Cabra y el Tigre. Con la Serpiente, la tensión energética puede ser irresoluble porque los patrones de desconfianza de una chocan con la apertura ilimitada del otro.",
        career: "El Cerdo prospera en entornos donde su calidez, creatividad y sentido del placer son apreciados: gastronomía, hospitalidad, cine, teatro, moda, trabajo social, educación y cualquier campo de servicio genuino. Su compromiso con la calidad y su ética innata lo hacen un profesional excepcional. Su desafío es aprender a poner precio justo a su talento y a no subestimar su propio trabajo. La buena fe en los negocios es su virtud y su talón de Aquiles: debe aprender a protegerse de quienes se acercan por lo que puede dar.",
        positives: [
            "Nobleza de corazón y generosidad genuina sin cálculo",
            "Honestidad radical que genera confianza y respeto",
            "Vitalidad gozosa y capacidad de disfrutar la vida plenamente",
            "Fuerza de voluntad inesperada cuando tiene una causa real",
            "Capacidad de crear ambientes de calidez y abundancia"
        ],
        negatives: [
            "Ingenuidad que lo expone a ser explotado por otros",
            "Indulgencia excesiva en placeres que puede dañar su salud",
            "Despreocupación financiera que puede crear desequilibrios graves",
            "Tendencia a cargar los problemas ajenos como propios",
            "Buena fe ciega que no distingue intenciones verdaderas"
        ],
        karma: "El Cerdo viene a aprender que la generosidad sin discernimiento no es virtud: es martirio. Su karma es aprender a recibir con la misma gracia con que da y proteger su abundancia con sabiduría.",
        talisman: "Coral rosado, figura de cerdo en jade blanco, tonos blanco puro y rosa dorado"
    }
};
