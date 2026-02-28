export interface NahualData {
    id: string;
    kiche: string;
    spanish: string;
    totem: string;
    meaning: string;
    characteristics: string;
    essence: string;
    light: string;
    shadow: string;
    mission: string;
    advice: string;
}

export interface MayanCross {
    center: NahualData;
    conception: NahualData;  // Pies (Engendrado)
    destiny: NahualData;     // Cabeza (Destino)
    rightArm: NahualData;    // Brazo Derecho (Material/Desafío)
    leftArm: NahualData;     // Brazo Izquierdo (Mágico/Ayuda)
}

export const MAYAN_MANUAL = {
    intro: {
        title: "El Cholq'ij: El Telar del Tiempo",
        concept: "Tú no tienes un nahual, tú caminas con una fuerza de la naturaleza",
        content: "El calendario sagrado no cuenta el tiempo lineal, sino la evolución de la conciencia biológica y espiritual. Extraído de la milenaria cosmovisión Maya (referenciando el Libro del Destino), cada Nawal es una inteligencia pura. Al nacer, esa energía imprime su frecuencia vibratoria en el tejido de tu psique."
    },
    mayanCross: {
        title: "La Cruz Maya: La Estructura del Alma",
        metaphor: "Eres un árbol: tus pies son las raíces (tu pasado), tu cabeza es la copa (tu destino), tus brazos son el equilibrio y tu corazón es el tronco.",
        positions: [
            { id: 'centro', title: 'Centro (Corazón)', description: 'Tu esencia pura, tu Nawal de nacimiento. El tronco que sostiene tu vida.' },
            { id: 'cabeza', title: 'Destino (Cabeza)', description: 'La energía que guía tu futuro y evolución. Hacia dónde crecen tus ramas.' },
            { id: 'pies', title: 'Concepción (Pies)', description: 'La energía cósmica que te engendró, tu linaje y fuerza base.' },
            { id: 'derecha', title: 'Brazo Derecho', description: 'Tu lado activo, racional, material y los desafíos terrenos.' },
            { id: 'izquierda', title: 'Brazo Izquierdo', description: 'Tu lado mágico, intuitivo, receptivo y la fuerza espiritual que te asiste.' }
        ]
    },
    nahuales: [
        {
            id: 'batz',
            kiche: "B'atz'",
            spanish: "El Hilo / El Mono",
            totem: "El Mono",
            meaning: "El hilo del tiempo que teje la historia. Representa el principio y el fin, la vida y la infinidad. Simboliza el cordón umbilical que nos une al Creador y a la constelación de Orión.",
            characteristics: "Son personas creativas, juiciosas y planificadoras. Suelen adelantarse a los hechos y tienen un don natural para las artes, la música y la organización comunitaria.",
            essence: "La energía del inicio y la creatividad absoluta. Es el tejedor del destino.",
            light: "Artistas y maestros natos, defensores de su pueblo, resuelven problemas, gran sentido de familia, inteligentes y persuasivos.",
            shadow: "Pueden ser muy orgullosos, extremadamente exigentes consigo mismos y los demás, arrogantes o ambiciosos.",
            mission: "Tejer planes de vida comunitarios y artísticos, y enseñar el hilo conductor del amor.",
            advice: "Toma el hilo de tu vida con consciencia, pues cada pensamiento y acción es un nudo que atas o desatas en tu propia existencia."
        },
        {
            id: 'e',
            kiche: "E",
            spanish: "El Sendero / El Diente",
            totem: "El Gato de Monte",
            meaning: "Es el camino, el destino, los viajes, el guía, la autoridad natural. Simboliza el recorrido recto de la vida y la historia, el sendero sagrado entre la tierra y el cielo.",
            characteristics: "Son viajeros y líderes por naturaleza. Comprensivos, muy amables y soñadores. Necesitan espacio y libertad; les resulta asfixiante la monotonía.",
            essence: "La energía del movimiento, el intermediario que despeja las rutas físicas y espirituales.",
            light: "Enseñan y guían. Son diplomáticos excelentes, adaptables, solidarios, buscadores de la verdad cósmica.",
            shadow: "Si pierden su centro, son inestables, manipuladores, infieles a su camino o pueden sufrir incomprensión y aislamiento.",
            mission: "Abrir caminos de luz y compartir el conocimiento adquirido en todos sus viajes.",
            advice: "El camino se hace caminando; no temas a la cima, pero jamás olvides que el viaje es más importante que el destino mismo."
        },
        {
            id: 'aj',
            kiche: "Aj",
            spanish: "El Cañaveral / La Autoridad",
            totem: "El Armadillo",
            meaning: "La caña, la milpa, el hogar, la familia, el bastón de mando o autoridad (vara espiritual). El triunfo y la abundancia del grupo.",
            characteristics: "Protectores y trabajadores infatigables. Son los cimientos de su familia. Sienten un profundo amor por la naturaleza, las plantas y todo lo que germina.",
            essence: "La energía del arraigo, el renacimiento continuo y el calor del dulce hogar.",
            light: "Personas éticas, estudiosas, líderes de su linaje, guardianas del maíz, responsables y generosas.",
            shadow: "Demasiado orgullosos, destructivos de su propia siembra si se deprimen, o exageradamente variables y posesivos.",
            mission: "Sembrar la integridad y proteger el sentido sagrado de la vida en familia.",
            advice: "Garantiza que la caña de tu vida sea fuerte por fuera, pero siempre compasiva y dulce por dentro."
        },
        {
            id: 'ix',
            kiche: "I'x",
            spanish: "El Jaguar / La Magia",
            totem: "El Jaguar",
            meaning: "La fuerza de la Madre Tierra, la energía felina, femenina y del altar maya. Simboliza el corazón del planeta y el poder de la magia natural.",
            characteristics: "Misteriosos, valientes y estratégicos. Poseen un magnetismo felino y una alta intuición. Captan las energías de los lugares y personas instantáneamente.",
            essence: "La potencia vital y protectora de la noche y de los lugares sagrados.",
            light: "Guardianes asombrosos, sanadores con alta magia, investigadores profundos, defensores feroces de su clan.",
            shadow: "Si vibran bajo, son vengativos, envidiosos, coléricos o manipulan la materia para beneficio egoísta.",
            mission: "Proteger el altar cósmico de la Madre Tierra con sigilo y pureza de corazón.",
            advice: "En el silencio absoluto de la selva y de tu propio interior encontrarás tu fuerza más pura."
        },
        {
            id: 'tzikin',
            kiche: "Tz'ikin",
            spanish: "El Águila / El Quetzal",
            totem: "El Águila",
            meaning: "El intermediario entre el Creador Corazón del Cielo y la humanidad. Simboliza la fortuna, el amor, el equilibrio, la abundancia mercantil y espiritual.",
            characteristics: "Independientes, carismáticos, negociantes por excelencia. Tienen una visión panorámica de la vida que les permite ver el éxito donde otros no lo ven.",
            essence: "La visión elevada y la libertad del viento. Atraen por inercia la buena suerte.",
            light: "Ideólogos brillantes, creadores de abundancia, intuitivos, con dotes de premonición y muy sociables.",
            shadow: "Si caen, pueden volverse avaros, traicioneros en el amor o los negocios, derrochadores e impacientes.",
            mission: "Elevar la conciencia material y traer libertad e independencia al espíritu.",
            advice: "Vuela tan alto como tus alas te permitan, pero recuerda que un pájaro jamás desprecia la rama que lo sostiene: usa tu abundancia para elevar a otros."
        },
        {
            id: 'ajmaq',
            kiche: "Ajmaq",
            spanish: "El Perdón / La Culpa",
            totem: "La Abeja",
            meaning: "Representa a los abuelos y ancestros. Es la energía de la curiosidad, pero también de ocultar lo íntimo. Simboliza el perdón, la luz y la oscuridad, el pecado y el arrepentimiento.",
            characteristics: "Observadores silenciosos y analíticos. Personas muy dulces pero retraídas al principio. Saben escuchar como nadie y ven lo invisible.",
            essence: "La fuerza profunda que transita por la oscuridad para encontrar la absolución.",
            light: "Consejeros sabios, grandes médicos del alma, investigadores psíquicos, profundamente apacibles y pacientes.",
            shadow: "Atrapados por la culpa, la mentira y el vicio si no se perdonan a sí mismos y a otros. Tendencia a guardar rencor en silencio.",
            mission: "Limpiar el camino ancestral a través del perdón y enseñar el arte de la redención.",
            advice: "El perdón verdadero no es regalar tu justificación al ofensor, es simplemente abrir la puerta de tu propia prisión emocional."
        },
        {
            id: 'noj',
            kiche: "No'j",
            spanish: "La Sabiduría / El Pensamiento",
            totem: "El Pájaro Carpintero",
            meaning: "El cerebro, el conocimiento, la lógica y las ideas cósmicas. Representa el poder de la mente, la memoria universal y la conexión con el Gran Espíritu.",
            characteristics: "Lógicos, estudiosos e intelectuales. Muy idealistas, siempre buscan la perfección y el orden de todas las cosas. Llevan una revolución en la cabeza.",
            essence: "La sintonización con la red de conocimiento universal y terrestre.",
            light: "Líderes justos e inventores brillantes. Su prudencia y sabiduría los convierte en consejeros de élite. Ideólogos por excelencia.",
            shadow: "Si se desconectan del corazón, son prepotentes intelectuales, orgullosos, manipuladores o neuróticos por sobre pensamiento.",
            mission: "Manifestar pensamientos virtuosos y traer soluciones mentales para el progreso de la humanidad.",
            advice: "Una mente brillante sin compasión humana es como un desierto de cristales perfectos pero muertos. Conecta tu razón con tu pecho."
        },
        {
            id: 'tijax',
            kiche: "Tijax",
            spanish: "El Pedernal / El Relámpago",
            totem: "Pez Espada",
            meaning: "El cuchillo de obsidiana, de doble filo. Es la fuerza para cortar los males y las enfermedades. Representa lo tajante, el sufrimiento curativo y las pirámides reveladoras.",
            characteristics: "Radicales, protectores y de carácter firme. Personas que no toleran rodeos. Sufren el dolor humano y tienen manos que curan la energía estancada.",
            essence: "El poder purificador del rayo que corta la ilusión para revelar la verdad.",
            light: "Médicos excelsos (cirujanos), justicieros sociales inflexibles, protectores incorruptibles, místicos sin miedo.",
            shadow: "Cortantes y agresivos, hirientes con las palabras. Generan conflicto crónico si no aprenden a manejar su cuchillo interior.",
            mission: "Extirpar aquello que envenena la vida de la familia y sociedad, desde lo físico hasta lo energético.",
            advice: "Aprende a blandir la espada de la verdad. A veces es necesario cortar ramas secas, pero cuida de no cortar a quienes amas por error."
        },
        {
            id: 'kawoq',
            kiche: "Kawoq",
            spanish: "La Tormenta / La Familia",
            totem: "La Tortuga",
            meaning: "La comunidad humana, la mujer como proveedora y consolidadora del grupo. Es el aguacero fuerte que nutre, pero también puede inundar y arrasar.",
            characteristics: "Maternales, patriarcales y expansivos. Absorben el dolor ajeno. Para ellos todo trata del grupo; la soledad no suele ser su aliada predilecta.",
            essence: "La fuerza colectiva impenetrable y la nutrición cósmica que riega a la familia entera.",
            light: "Atraen profunda abundancia, parteras y curanderos innatos (psicólogos de comunidad), defienden a los suyos vehementemente.",
            shadow: "Metiches y entrometidos crónicos, manipuladores emocionales. Pueden explotar arrasando todo como un huracán si reprimen sus emociones.",
            mission: "Agrupar a los dispersos, liderar con amor e instaurar el orden compasivo.",
            advice: "Después del fragor tempestuoso de estar con los demás, encuéntrate contigo mismo. Atrévete a brillar fuera de tu caparazón colectivo."
        },
        {
            id: 'ajpu',
            kiche: "Ajpu",
            spanish: "El Sol / El Cerbatanero",
            totem: "El León",
            meaning: "Es el señor, la deidad, el sol, el gran guerrero y caminante de luz que vence las pruebas del inframundo. Certeza y plenitud material o espiritual.",
            characteristics: "Nobles, valientes, cazadores natos de oportunidades y desafíos. Poseen una energía inagotable y un fuerte ego. Superan obstáculos porque siempre confían.",
            essence: "La brillantez absoluta de alcanzar la realización tras la última batalla.",
            light: "Campeones defensores, visionarios espirituales, artistas talentosos. Sus proezas físicas e intelectuales cautivan a todos.",
            shadow: "Si el ego los domina, son déspotas, egolatras infalibles verbalmente pero irresponsables en la acción. Pueden dejar proyectos a medias.",
            mission: "Traer el fuego y la divinidad interior a la superficie de los hombres. Ser victoria espiritual hecha carne.",
            advice: "Tú mayor enemigo jamás es el mundo; es el tirano interior. Véncelo, y tu sol dará vida permanentemente."
        },
        {
            id: 'imox',
            kiche: "Imox",
            spanish: "El Cocodrilo / El Mar",
            totem: "El Cocodrilo / Dragón",
            meaning: "Representa la locura y el lado oculto/izquierdo del cerebro. Son las aguas primigenias, los sueños densos, el océano místico interior.",
            characteristics: "Sumamente sensibles, psíquicos naturales, artistas bohemios y creadores. Captan lo que nadie más capta. Son mares de profundidad indescifrable.",
            essence: "La cuna del cosmos en su estado acuático e ilógico, de donde nace la intuición suprema.",
            light: "Sanadores e intérpretes espirituales únicos. Sus canales creativos cambian paradigmas. Profundos receptores del dolor del mundo.",
            shadow: "Extrema inestabilidad anímica, tendencia al caos mental (locura pasajera), depresiones, paranoia y pereza.",
            mission: "Hacer puentes hacia las dimensiones sutiles y enseñar a navegar las aguas de las emociones turbulentas.",
            advice: "Ningún marinero se hizo experto en mares calmos. Aprende a bailar con tus sombras, pero jamás les cedas el timón de tu cordura."
        },
        {
            id: 'iq',
            kiche: "Iq'",
            spanish: "El Viento / La Ráfaga",
            totem: "El Colibrí",
            meaning: "El aliento de la Muerte y del Creador. Es la ráfaga que limpia energías estancadas, pero también la cólera y las fuerzas sutiles del espíritu invisible.",
            characteristics: "Puros, transparentes como el cristal, imaginativos. Suelen ser muy comunicativos pero volubles. Se les dificulta anclarse; viven en constante transformación.",
            essence: "El soplo de la creación vital. La renovación perpetua y la oxigenación celestial.",
            light: "Comunicadores maestros, pacificadores mediadores, puros de intenciones y dotados de inspiración divina.",
            shadow: "Histéricos ante el pánico, infieles o inestables en el amor, arrasadores sin propósito, olvidan sus promesas.",
            mission: "Ser el aliento frío que aleja la enfermedad y la voz clara que comunica el espíritu a la materia.",
            advice: "Permite que tu aliento cure, pero recuerda encender raíces en la tierra para no perderte a ti mismo volando en vendavales sin rumbo."
        },
        {
            id: 'aqabal',
            kiche: "Aq'ab'al",
            spanish: "El Amanecer / La Aurora",
            totem: "El Guacamayo / Murciélago",
            meaning: "La luz y la oscuridad, lo dual. El momento preciso entre el sol saliendo y el ocaso. Es el misterio nocturno abriendo paso al nuevo ciclo vital.",
            characteristics: "Elegantes, conservadores y enigmáticos. Grandes trabajadores durante las horas de sombra. Pueden ver las dos caras de la moneda siempre.",
            essence: "La ventana mística donde todo muere para renacer. La esperanza infinita de los albores.",
            light: "Pacíficos, consejeros inmensamente objetivos, renovadores de la luz y con alta suerte económica. Serios y amorosos a la vez.",
            shadow: "Proclives a la melancolía trágica, embusteros peligrosos o robadores crónicos de energía si se quedan en lo oscuro.",
            mission: "Iluminar los conceptos sombríos de los hombres y separar la falsedad de la verdad sagrada.",
            advice: "No puedes amarrar el tiempo al instante en donde nace la luz. Deja que el día brille, incluso si extrañas la profundidad mística de la medianoche."
        },
        {
            id: 'kat',
            kiche: "K'at",
            spanish: "La Red / La Telaraña",
            totem: "La Araña",
            meaning: "Representa el fuego sagrado de la red; lo que atrapa sutilmente y lo que encarcela. Es la unión de mentes humanas en forma de enjambre sabio.",
            characteristics: "Organizados al milímetro, dinámicos e impulsivos en su actuar. Grandes comerciantes que tienden la red al éxito natural.",
            essence: "La arquitectura que entreteje toda la vida material y organiza sociedades.",
            light: "Líderes estratégicos natos, maestros de la abundancia sistemática, honestos en su quehacer social, cuidadores eficientes.",
            shadow: "Caen presa de sus propias pasiones (vicios crónicos) o terminan en enredos legales/financieros. Manipuladores de su círculo.",
            mission: "Unificar el conocimiento humano en una red invisible de ayuda mutua inquebrantable.",
            advice: "Tu red no debe ser utilizada para apresar a otros ni para atraparte en tus miedos; úsala solo para recoger los frutos de tu esfuerzo honorable."
        },
        {
            id: 'kan',
            kiche: "Kan",
            spanish: "La Serpiente / La Pluma",
            totem: "La Serpiente emplumada",
            meaning: "Representa a Kukulcán, el creador emplumado. La energía del sistema nervioso, el fuego interior que sube, el magnetismo pasional y la espiritualidad altísima.",
            characteristics: "Inteligentes, sabios supremos. Respetados porque radian respeto. Tienen un porte aristocrático místico y nunca pasan desapercibidos.",
            essence: "El torrente ascendente de poder, la evolución de la humanidad que muda de piel para avanzar.",
            light: "Influenciadores de gran alcance, justos defensores incansables, alquimistas de su propia abundancia y curanderos de fuego.",
            shadow: "Si vibran mal, son mordaces inyectando venenos verbales despiadados. Vengativos, elitistas, y peligrosamente egoístas y controladores.",
            mission: "Equilibrar y canalizar la energía del fuego interior para unificar el cielo místico y la fuerza terrenal cruda.",
            advice: "No dudes jamás en arrojar la piel de tu ego muerto. Entre más libre te desvistes, más pura circula la chispa de tu magia original."
        },
        {
            id: 'kame',
            kiche: "Kame",
            spanish: "La Muerte / Búho",
            totem: "El Búho",
            meaning: "El símbolo de la disolución, el descanso último y el contacto supremo con los antepasados divinos. Es el renacimiento puro liberado de la dualidad.",
            characteristics: "Carismáticos a la gravedad. Intuitivos, silenciosamente protectores. Poseen una autoridad suave y una paciencia magnética incomparable.",
            essence: "La transformación eterna, el ciclo incorruptible del cambio permanente donde habitan los ancestros.",
            light: "Médicos excelsos, psicólogos de vidas pasadas, defensores pacíficos de su comunidad y portadores del don y escudo contra malas intenciones o hechicería.",
            shadow: "Tendencias muy fatalistas y destructivas con sí mismos, celos enraizados, depresiones profundas hasta buscar su muerte simbólica.",
            mission: "Guiar a los que temen al vacío, demostrando que detrás del velo de la destrucción solo reside el florecimiento infinito.",
            advice: "Muere a cada noche, para nacer intacto a cada mañana. No arrastres al día siguiente los fantasmas de vidas o circunstancias pasadas."
        },
        {
            id: 'kej',
            kiche: "Kej",
            spanish: "El Venado / Los Puntos",
            totem: "El Venado",
            meaning: "La agilidad física, los bosques profundos, los cuatro pilares de la tierra. Fuerza silenciosa de un líder espiritual. Representa la hombría y firmeza.",
            characteristics: "Orgullosos y observadores incansables. Protectores empedernidos de su familia y la naturaleza. Tienen carácter dócil pero pueden embestir si protegen su honor.",
            essence: "El perfecto equilibrio natural, la vitalidad encarnada en el rey del bosque.",
            light: "Gozan curando males físicos y guiando ceremonialmente a su aldea. Defensivos audaces y excelentes estrategas sociopolíticos.",
            shadow: "Abusivos o tercos desmedidos frente al poder. En ocasiones manipuladores emocionales para beneficio propio, destructores de bosque ajeno.",
            mission: "Ser embajadores de balance inquebrantable que conecte firmemente todos los puntos del cosmos terrenal.",
            advice: "Recuerda que tu belleza y maestría yacen en la gracia de tus movimientos, y no en la violencia de tu cornamenta. Gobierna el bosque con humildad."
        },
        {
            id: 'qanil',
            kiche: "Q'anil",
            spanish: "La Semilla / La Cosecha",
            totem: "El Conejo",
            meaning: "El inicio biológico, el amor puro incondicional, la creación entera contenida en un grano germinal. La energía planetaria de Venus; siembra exitosa y fertilidad cósmica.",
            characteristics: "Amorosísimos, comprensivos y de trato sutil infantil y sabio al mismo tiempo. Extremadamente creativos e ingeniosos, trabajan arduamente pero saben gozarse la tierra.",
            essence: "El potencial prístino. Toda la historia del árbol ya late dentro de este milagro diminuto.",
            light: "Atracción inmensa de amor en todas sus formas. Prolíficos y prósperos, adaptables, armónicos en discusiones grupales. Excelentes pedagogos y agricultores.",
            shadow: "Enemigos formidables, extremadamente acomplejados en su fase estéril. Desplantes, envidias tóxicas que bloquean sus propias raíces de vida.",
            mission: "Plantar ideas divinas y sembrar amor con esmero para ver a la civilización reverdecer en gracia infinita.",
            advice: "No temas regalar todas tus semillas a un campo desolado. Eres la abundancia misma y en tus manos vacías está tu eternidad asegurada."
        },
        {
            id: 'toj',
            kiche: "Toj",
            spanish: "La Ofrenda / El Fuego",
            totem: "El Puma",
            meaning: "La nivelación de la justicia social y cósmica mediante el sacrificio de uno para beneficio de otros (pagar la deuda). Representa al fuego y a los abuelos sabios.",
            characteristics: "Poseen una naturaleza extremadamente activa, dinámica e impaciente. Muy impulsivos y directos. Su carácter resolutivo levanta imperios, y siempre solucionan la urgencia.",
            essence: "El precio místico y la purificación del karma material de todo y todos a través del sagrado rito.",
            light: "Imaginativos creadores que cargan y curan responsabilidades ajenas. Honestidad admirable, amorosos y sinceros para alivianar la angustia del oprimido.",
            shadow: "Tendencia fortísima a caer bajo enfermedad si su vida es egoísta. Adictos a las emociones extremas, coléricos irracionales. Se sabotean duramente si no agradecen.",
            mission: "Pagar al universo la bendición de la existencia encendiendo sin pausas el Fuego de la Gratitud colectiva.",
            advice: "Mantén un fuego visible en la habitación de tu ser. Agradecer no te merma; al contrario, sana infinitamente cualquier karma material oculto de tu sangre."
        },
        {
            id: 'tzi',
            kiche: "Tz'i'",
            spanish: "El Perro / La Ley Suprema",
            totem: "El Perro / El Coyote",
            meaning: "La vara legal y ética de los altos tribunales físicos y espirituales. Encarna la fidelidad canina, la inteligencia aguda y la justicia absoluta e implacable.",
            characteristics: "Equilibrados, cuestionadores incansables. Buscan la verdad en absolutamente todo. Son amigos confiables, amistosos, analistas natos y con una brújula moral estoica.",
            essence: "El guardián leal que dicta y obedece exclusivamente el mandato universal del amor equilibrado.",
            light: "Jueces de nobleza admirable y compasiva. Abogados justos, curanderos espirituales de confianza intachable que defienden a quienes nadie más ve.",
            shadow: "Extremadamente tiranos y dictadores implacables frente a quienes cometen error, llegando a ser vengativos y cruelmente libertinos en su vida diaria si se desconectan.",
            mission: "Instaurar en el plano terreno la justicia universal impasible de tal manera que eleve las acciones de forma comunitaria.",
            advice: "Toda ley ejecutada sin amor es solo crueldad. Hazte insobornable no mediante dureza y enojo mortal; hazlo mediante la fuerza sanadora y humilde del amor profundo."
        }
    ],
    integration: {
        title: "Integración: Alquimia y Resonancia Nawal",
        content: "Caminar e interconectar con tu Nawal (tu vibración particular en este multiverso) no es leer una hoja informativa curiosa. Es entrar deliberadamente al laboratorio interior en el santuario de nuestro pecho, observando pacientemente la magia luminosa con la que nos baña, al mismo tiempo que aprendemos a disolver suave, humilde y alquímicamente aquellos impulsos que vibran desde la trampa oscura del ego.",
        closing: "El Cholq'ij respira. No eres el efecto de un signo cerrado y condicionado; eres la gloriosa causa y expansión alquímica del mismo. Observa el espejo de la constelación Maya en los adentros de tu alma...  ¡Maltiox, Buen Viaje de Sangre y Estrellas!"
    }
};

/**
 * Calculates the Mayan Cross for a given central Nahual ID.
 * The Cholq'ij follows a strict sequence of 20 signs.
 * Based on the true counting method (as shown in mcd.gob.gt and traditional practices):
 * - Conception (Engendramiento/Arriba): -8 (inclusive count of 9 backwards)
 * - Destiny (Destino/Abajo): +8 (inclusive count of 9 forwards)
 * - Left Arm (Auxiliar Izquierdo): -6 (inclusive count of 7 backwards)
 * - Right Arm (Auxiliar Derecho): +6 (inclusive count of 7 forwards)
 *
 * NOTE: The array `nahuales` inside MAYAN_MANUAL is strictly ordered
 * in the standard sequence: B'atz', E, Aj, I'x, Tz'ikin, Ajmaq, No'j, Tijax, Kawoq, Ajpu, Imox, Iq', Aq'ab'al, K'at, Kan, Kame, Kej, Q'anil, Toj, Tz'i'.
 */
export const getMayanCross = (centerId: string): MayanCross | null => {
    const sequence = MAYAN_MANUAL.nahuales;
    const centerIndex = sequence.findIndex(n => n.id === centerId);

    if (centerIndex === -1) return null;

    const getNahualOffset = (offset: number) => {
        let newIndex = (centerIndex + offset) % 20;
        if (newIndex < 0) newIndex += 20; // Handle negative modulo correctly in JS
        return sequence[newIndex];
    };

    return {
        center: sequence[centerIndex],
        conception: getNahualOffset(-8), // Atrás (Engendrado)
        destiny: getNahualOffset(8),     // Adelante (Destino)
        leftArm: getNahualOffset(-6),    // Lado izquierdo 
        rightArm: getNahualOffset(6)     // Lado derecho
    };
};

