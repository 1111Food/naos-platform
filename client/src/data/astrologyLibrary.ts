// REFERENCIAS: Liz Greene (Psicológica), Steven Forrest (Evolutiva), Stephen Arroyo (Intercambio Energético), Robert Hand (Casas).
// v8.7: Motor de Profundidad - Párrafos Narrativos para Interpretaciones Bibliográficas

export const PLANETS_LIB: Record<string, {
    name: string;
    archetype: string;
    mission: string;
    potential: string;
    shadow: string;
    question: string;
    essence: string;
    keywords: string;
    profile: string;
    love: string;
    career: string;
    positives: string[];
    negatives: string[];
}> = {
    Sun: {
        name: "Sol",
        archetype: "El Rey / La Identidad",
        mission: "Irradiar la esencia única y el propósito vital.",
        potential: "Vitalidad, autenticidad, liderazgo consciente y calidez.",
        shadow: "Egocentrismo, arrogancia o necesidad constante de validación externa.",
        question: "¿Quién eres realmente cuando nadie te está mirando?",
        essence: "Es el núcleo radiante que otorga propósito. Como el sol físico, no busca brillar, simplemente lo hace por naturaleza propia.",
        keywords: "Esencia, Ego, Vitalidad, Propósito.",
        profile: "El Sol representa tu identidad central, la chispa divina que te hace único e irrepetible. Su signo y casa revelan dónde y cómo buscas expresar tu esencia más auténtica. Un Sol bien integrado nos da personas seguras de sí mismas, generosas y vitales. Un Sol no trabajado se expresa como ego defensivo, necesidad de protagonismo o pérdida del propósito.",
        love: "En el amor, el Sol busca ser visto, admirado y celebrado en su singularidad. No tolera relaciones donde tenga que opacarse. Necesita una pareja que lo inspire a ser más él mismo, no menos. Su regalo en el vínculo es la calidez, la generosidad y una lealtad que brilla como el astro rey.",
        career: "El Sol guía hacia vocaciones donde la persona pueda liderar, crear y dejar una huella personal. Cualquier rol que le permita brillar con sus propios talentos es terreno solar: liderazgo, arte, política, espectáculo o innovación.",
        positives: ["Vitalidad y presencia poderosa", "Autenticidad y autoconocimiento", "Liderazgo natural y carismático", "Generosidad y calidez genuinas", "Claridad de propósito y dirección"],
        negatives: ["Egocentrismo y necesidad de ser el centro", "Arrogancia cuando el ego no está integrado", "Inflexibilidad ante los puntos de vista ajenos", "Dependencia de la validación externa", "Dificultad para compartir el protagonismo"]
    },
    Moon: {
        name: "Luna",
        archetype: "La Madre Interna / El Refugio",
        mission: "Procesar las emociones y buscar seguridad interna.",
        potential: "Inteligencia emocional, cuidado, nutrición y pertenencia.",
        shadow: "Dependencia emocional, capricho, hipersensibilidad o refugio en el pasado.",
        question: "¿Qué necesita tu niño interno para sentirse a salvo hoy?",
        essence: "La memoria del alma y el refugio íntimo. Es la marea emocional que nos conecta con nuestras raíces y necesidades más profundas.",
        keywords: "Emociones, Instinto, Memoria, Refugio.",
        profile: "La Luna revela tus necesidades emocionales más profundas, tu mundo interior, tus miedos instintivos y cómo te nutres. Su signo y casa muestran dónde buscas comodidad y cómo te comportas cuando bajan las guardias. Una Luna integrada ofrece inteligencia emocional rica; una no trabajada, reactividad e inmadurez emocional.",
        love: "La Luna en el amor define lo que tu corazón necesita para sentirse seguro en una relación. Muestra tus patrones emocionales heredados de la infancia y cómo reaccionas intuitivamente ante la intimidad. Su signo revela el lenguaje del amor que más te nutre.",
        career: "La Luna profesionalmente indica los entornos donde te sientes emocionalmente seguro para crear y contribuir. Favorece vocaciones de cuidado, nutrición, memoria, hogar y arte emocional. También muestra tus ciclos naturales de productividad.",
        positives: ["Inteligencia emocional profunda", "Empatía e intuición naturales", "Capacidad de cuidar y nutrir genuinamente", "Conexión con los ritmos naturales y ciclicidad", "Creatividad e imaginación ricas"],
        negatives: ["Reactividad emocional e hipersensibilidad", "Apego al pasado y a la zona de confort", "Dependencia emocional y needs de validación constante", "Humor variable que desestabiliza las relaciones", "Patrones inconscientes heredados de la infancia"]
    },
    Mercury: {
        name: "Mercurio",
        archetype: "El Mensajero / El Traductor",
        mission: "Percibir, razonar y comunicar la realidad.",
        potential: "Curiosidad, agilidad mental, elocuencia y aprendizaje constante.",
        shadow: "Nerviosismo, dispersión, superficialidad o uso de la palabra para engañar.",
        question: "¿Estás escuchando para entender o solo para responder?",
        essence: "El puente entre mundos. Traduce la experiencia en lenguaje y los deseos en ideas, permitiendo el intercambio constante.",
        keywords: "Mente, Comunicación, Aprendizaje, Lógica.",
        profile: "Mercurio revela cómo piensas, aprendes y te comunicas. Su signo muestra el estilo mental: un Mercurio en Aries piensa rápido y direct; en Escorpio, investiga las capas profundas de todo. Su casa indica el área donde aplicas tu inteligencia con mayor naturalidad.",
        love: "En el amor, Mercurio dicta cómo te comunicas con tu pareja, cómo procesas los conflictos y qué conversaciones te nutren. Una buena compatibilidad entre Mercu rios es fundamental para la amistad dentro de la relación romántica.",
        career: "Mercurio profesionalmente favorece todo lo relacionado con la comunicación, la escritura, el análisis, la negociación, la tecnología y el aprendizaje. Su posición indica cómo brillamos intelectualmente en el trabajo.",
        positives: ["Agilidad mental e intelectual", "Elocuencia y habilidad comunicativa", "Curiosidad y amor por el aprendizaje", "Adaptabilidad y versatilidad cognitiva", "Capacidad analítica y lógica"],
        negatives: ["Tendencia al nerviosismo y la ansiedad mental", "Superficialidad que evita profundizar", "Uso de la palabra para manipular o evadir", "Exceso de pensamiento que paraliza la acción", "Dispersión entre demasiados intereses"]
    },
    Venus: {
        name: "Venus",
        archetype: "La Amante / El Imán",
        mission: "Valorar, atraer y crear armonía en los vínculos.",
        potential: "Capacidad de goce, sentido estético, diplomacia y amor propio.",
        shadow: "Vanidad, complacencia excesiva, miedo al conflicto o materialismo.",
        question: "¿Qué es lo que realmente valoras y cómo te permites recibirlo?",
        essence: "La ley de atracción y el sentido del valor. Nos enseña qué nos da placer y cómo armonizar nuestra belleza interior con el otro.",
        keywords: "Amor, Valor, Belleza, Armonía, Recursos.",
        profile: "Venus revela tus valores, tu sentido estético y cómo amas y quieres ser amado. Su signo muestra tu estilo de atracción y qué tipo de personas y experiencias te generan placer genuino. Su casa indica el escenario de vida donde buscas belleza, armonía y conexión.",
        love: "Venus ES el planeta del amor. Su posición en la carta es fundamental para entender el lenguaje amoroso de cada persona. Define lo que atrae, lo que valora en una pareja y cómo expresa su afecto. Un Venus integrado crea relaciones hermosas; uno no trabajado, crea dependencias o vacuidad afectiva.",
        career: "Venus profesionalmente favorece las artes, la música, el diseño, la moda, la diplomacia, RRHH, las finanzas (especialmente inversiones) y cualquier actividad relacionada con la belleza, el placer y las relaciones humanas.",
        positives: ["Encanto y magnetismo naturales", "Sentido estético muy desarrollado", "Capacidad de crear armonía en los vínculos", "Amor propio que se irradia al exterior", "Don para los placeres refinados de la vida"],
        negatives: ["Superficialidad y amor por las apariencias", "Complacencia que evita el conflicto a todo costo", "Vanidad y exceso de autoindulgencia", "Dependencia afectiva y miedo a la soledad", "Materialismo como sustit uto del amor real"]
    },
    Mars: {
        name: "Marte",
        archetype: "El Guerrero / El Motor",
        mission: "Afirmar la voluntad y actuar con determinación.",
        potential: "Coraje, iniciativa, sexualidad sana y capacidad de conquista.",
        shadow: "Agresividad, impaciencia, impulsividad destructiva o ira reprimida.",
        question: "¿Por qué causa vale la pena luchar hoy?",
        essence: "El motor de la acción. Es el impulso primario que nos permite separarnos del origen para conquistar nuestro propio territorio.",
        keywords: "Acción, Deseo, Agresividad, Coraje.",
        profile: "Marte revela cómo actuar, cómo pelear y cómo desear. Su signo muestra el estilo de acción y afirmación personal; su casa indica el área de vida donde aplicas más energía y donde los conflictos son más frecuentes. Un Marte integrado es energía dirigida al propósito; sin integrar, es agresividad dispersa.",
        love: "En el amor, Marte define el nivel y estilo de pasión, la sexualidad y cómo se maneja el conflicto en pareja. Un Marte activo crea aventura y fuego; mal aspectado puede generar dominancia o pasividad frustrante.",
        career: "Marte favorece vocaciones que requieren iniciativa, competición, coraje físico o mentalidad guerrera: militares, deportistas, emprendedores, cirujanos, abogados litigantes, bomberos e ingenieros de primera línea.",
        positives: ["Energía y vitalidad física poderosas", "Coraje para enfrentar desafíos directamente", "Iniciativa y capacidad de acción inmediata", "Pasión sexual y deseo genuino", "Liderazgo desde la acción, no desde el discurso"],
        negatives: ["Agresividad e impaciencia crónicas", "Impulsividad que genera errores graves", "Tendencia al conflicto y la confrontación", "Ira reprimida que explota de manera destructiva", "Competitividad que destruye la colaboración"]
    },
    Jupiter: {
        name: "Júpiter",
        archetype: "El Guía / El Explorador",
        mission: "Expandir los horizontes y encontrar sentido a la vida.",
        potential: "Optimismo, abundancia, sabiduría y confianza en la vida.",
        shadow: "Exceso de confianza, fanatismo, exageración o falta de límites.",
        question: "¿Hacia dónde te guía tu fe cuando el camino se oscurece?",
        essence: "El principio de expansión y significado. Nos invita a mirar más allá de lo evidente y a confiar en la benevolencia del cosmos.",
        keywords: "Expansión, Sabiduría, Fe, Abundancia, Suerte.",
        profile: "Júpiter indica dónde tienes suerte natural y dónde tu alma busca crecer y expandirse. Su signo revela la filosofía de vida y el estilo de búsqueda de significado; su casa, el área donde la abundancia fluye más fácilmente cuando hay apertura y generosidad.",
        love: "En el amor, Júpiter aporta generosidad, optimismo y la capacidad de ver a la pareja como un maestro. Favorece relaciones que expanden la conciencia y los horizontes de ambos. Su sombra es el exceso y la tendencia a prometer más de lo que puede cumplir.",
        career: "Júpiter profesionalmente indica los campos donde el éxito y la abundancia fluyen más naturalmente: docencia, filosofía, viajes, derecho, publicación, espiritualidad y cualquier profesión internacional o de gran impacto social.",
        positives: ["Optimismo y fe genuinos en la vida", "Capacidad de ver el potencial en todo", "Generosidad y magnanimidad naturales", "Inteligencia filosófica y cultural", "Suerte que crece con la gratitud y la apertura"],
        negatives: ["Exceso de confianza que lleva a descuidos", "Promesas que no puede cumplir", "Tendencia al exceso en comida, gastos o discurso", "Fanatismo religioso o filosófico", "Inflación del ego disfrazada de expansión"]
    },
    Saturn: {
        name: "Saturno",
        archetype: "El Maestro Severo / El Arquitecto",
        mission: "Estructurar, poner límites y construir realidades sólidas.",
        potential: "Madurez, responsabilidad, disciplina y maestría interna.",
        shadow: "Rigidez, pesimismo, miedo al fracaso o frialdad emocional.",
        question: "¿De qué área de tu vida necesitas hacerte cargo finalmente?",
        essence: "El arquitecto del tiempo. Sus límites no son cárceles, sino las paredes necesarias para que nuestra catedral interior no se derrumbe.",
        keywords: "Límite, Estructura, Tiempo, Responsabilidad, Karma.",
        profile: "Saturno indica el área de mayor esfuerzo y maduración necesaria en esta vida. Su signo y casa señalan dónde llevamos una carga de responsabilidad kármica que, una vez aceptada, se convierte en la base de nuestra mayor maestría. El retorno de Saturno (a los 29 y 58 años) marca momentos de transformación profunda.",
        love: "En el amor, Saturno crea relaciones serias, comprometidas y a largo plazo. Sin embargo, puede generar frialdad emocional, miedo a la vulnerabilidad o patrones relacionales heredados de figuras de autoridad deficientes. Su integración conduce a un amor maduro y real.",
        career: "Saturno indica el área vocacional donde el éxito llega lento pero es profundamente sólido y duradero. Favorece profesión donde la disciplina, la estructura y la autoridad ganada con mérito son valoradas: ciencia, arquitectura, derecho, política y gestión.",
        positives: ["Disciplina y perseverancia sin igual", "Capacidad de construir estructuras duraderas", "Sentido de responsabilidad y madurez", "Autoridad ganada con ética y mérito", "Maestría profunda en su área de trabajo"],
        negatives: ["Rigidez y resistencia al cambio y la espontaneidad", "Pesimismo y autocrítica severa", "Miedo al fracaso que paraliza la acción", "Frialdad emocional disfrazada de fortaleza", "Carga excesiva de responsabilidad autoimpuesta"]
    },
    Uranus: {
        name: "Urano",
        archetype: "El Revolucionario / El Rayo",
        mission: "Romper estructuras obsoletas y despertar la genialidad original.",
        potential: "Innovación, libertad, visión de futuro y desapego sanador.",
        shadow: "Rebeldía sin causa, inestabilidad crónica o frialdad radical.",
        question: "¿A qué verdad te estás resistiendo por miedo a ser diferente?",
        essence: "La chispa del cambio repentino. Despierta la conciencia individual mediante el rayo de la intuición y la ruptura con lo conocido.",
        keywords: "Revolución, Originalidad, Desapego, Genialidad.",
        profile: "Urano indica el área de vida donde buscas libertad y donde la ruptura con lo establecido es inevitable. Es el planeta generacional que marca las revoluciones de cada era. Personalmente, su signo y casa revelan dónde necesitas desprenderte de condicionamientos para descubrir tu genialidad única.",
        love: "En el amor, Urano necesita libertad y aborrece la rutina y la posesividad. Puede generar relaciones inusuales, no convencionales o cambios repentinos en los vínculos. Su mayor don es la amistad dentro del amor; su sombra, la inestabilidad y el desapego excesivo.",
        career: "Urano favorece vocaciones de vanguardia: tecnología, astronomía, programación, activismo, diseño experimental, ciencia de frontera e innovación social. Se siente atrapado en trabajos convencionales de estructura rígida.",
        positives: ["Genialidad e inventiva únicas", "Libertad de pensamiento y originalidad", "Capacidad de revolucionar sistemas obsoletos", "Desapego sano de lo material y lo convencional", "Visión de futuro muy desarrollada"],
        negatives: ["Inestabilidad y cambios abruptos sin previo aviso", "Frialdad emocional que aleja a los seres queridos", "Rebeldía sin causa como mecanismo de identidad", "Incapacidad de comprometerse a largo plazo", "Superioridad intelectual que aísla"]
    },
    Neptune: {
        name: "Neptuno",
        archetype: "El Místico / El Soñador",
        mission: "Disolver los límites del ego para conectar con la totalidad.",
        potential: "Compasión infinita, inspiración artística, intuición y espiritualidad.",
        shadow: "Evasión, confusión, victimización o adicciones.",
        question: "¿En qué sueño te has perdido y de cuál necesitas despertar?",
        essence: "El océano de la unidad. Nos recuerda que no estamos separados y que la belleza más pura nace de la entrega al misterio.",
        keywords: "Mística, Ilusión, Compasión, Disolución, Arte.",
        profile: "Neptuno indica dónde buscas trascendencia, arte y disolución del ego. Es un planeta generacional que moldea los ideales de una época. Personalmente, su casa revela el área donde tiendes a idealizar o donde los límites se vuelven difusos y es fácil perderse.",
        love: "En el amor, Neptuno crea conexiones de una profundidad casi mística. Pero también puede generar idealización peligrosa: un amor que ve lo que quiere ver y no a la persona real. Su integración lleva al amor incondicional verdadero; sin integrar, al desengaño y la dependencia.",
        career: "Neptuno favorece las artes (música, cine, danza, fotografía), la espiritualidad, la oceanografía, la medicina holística, la psicología transpersonal y el trabajo humanitario. Necesita un propósito trascendente para mantenerse motivado.",
        positives: ["Creatividad e inspiración artística profundas", "Compasión y empatía sin fronteras", "Conexión esp iritual y mística genuina", "Intuición que trasciende la lógica ordinaria", "Capacidad de ver lo sagrado en lo cotidiano"],
        negatives: ["Evasión de la realidad a través del escapismo", "Tendencia a la victimización y los roles de mártir", "Susceptibilidad a adicciones y dependencias", "Confusión crónica sobre límites y responsabilidades", "Idealización que conduce al desengañ o"]
    },
    Pluto: {
        name: "Plutón",
        archetype: "El Alquimista / El Guardián de las Sombras",
        mission: "Transformar la crisis en poder mediante la muerte y el renacimiento.",
        potential: "Resiliencia extrema, verdad profunda, sanación y empoderamiento.",
        shadow: "Control, manipulación, obsesión o miedo a la propia sombra.",
        question: "¿Qué parte de ti necesita morir para que puedas renacer?",
        essence: "El poder de la transmutación. Excava en lo profundo para destruir lo que ya no sirve y revelar el diamante del poder personal.",
        keywords: "Transformación, Poder, Renacimiento, Sombra.",
        profile: "Plutón indica dónde se producen las mayores transformaciones en tu vida. Es el planeta de la muerte-renacimiento simbólica: no muere el cuerpo, sino la versión de uno mismo que ya no sirve. Su casa revela el área donde experimentas crisis profundas que, atravesadas con consciencia, se convierten en tu mayor fuente de poder personal.",
        love: "En el amor, Plutón crea vínculos kármicos que transforman profundamente a ambas personas. Las relaciones plutónicas son intensas y nunca superficiales. Su sombra son las luchas de poder y los celos obsesivos. Integrado, conduce al amor como alquimia y transformación mutua.",
        career: "Plutón favorece vocaciones que trabajan con el poder y la transformación profunda: psicoanálisis, cirugía, investigación, finanzas internacionales, gestión de crisis y cualquier campo que implique morir y renacer simbólicamente.",
        positives: ["Resiliencia y capacidad de renacer de las cenizas", "Acceso a las profundidades del inconsciente", "Intensidad y foco transformadores", "Capacidad de detectar la verdad oculta", "Poder personal de regeneración y renovación"],
        negatives: ["Obsesión y control como mecanismo de seguridad", "Manipulación desde el poder aún no integrado", "Miedo profundo a la pérdida y el descontrol", "Tendencia a destruir lo que ama para probarlo", "Dificultad extrema para soltar y perdonar"]
    },
    Chiron: {
        name: "Quirón",
        archetype: "El Sanador Herido",
        mission: "Integrar el dolor más profundo para convertirlo en medicina para otros.",
        potential: "Empatía sagrada, enseñanza desde la vulnerabilidad y aceptación.",
        shadow: "Sentimiento constante de insuficiencia o amargura por la herida.",
        question: "¿Cómo puedes usar tu dolor para alumbrar el camino ajeno?",
        essence: "La llave entre el dolor personal y la sanación universal. Nos enseña que nuestra fragilidad es nuestra mayor fortaleza.",
        keywords: "Herida, Sanación, Vulnerabilidad, Empatía.",
        profile: "Quirón indica la herida más profunda e irresoluble del alma: aquella que jamás sana completamente, pero que al ser integrada se convierte en el mayor don. Su casa y signo revelan el área de mayor sensibilidad y el tipo de dolor que viene a transformarse en sabiduría y servicio.",
        love: "En el amor, Quirón activa las heridas más antiguas: miedo al abandono, a no ser suficiente o a ser herido de nuevo. Las relaciones quirónicas duelen porque revelan lo que necesita sanar. Integrado, el amor se convierte en un espacio de sanación mutua y profunda.",
        career: "Quirón guía hacia vocaciones de sanación: medicina, terapia, asesoría, enseñanza desde la experiencia vivida y trabajo espiritual. El mejor facilitador de Quirón es quien ha caminado su propio infierno y puede acompañar al otro con genuina compasión.",
        positives: ["Empatía profunda nacida del dolor propio", "Sabiduría sobre la condición humana", "Capacidad de sanar a otros desde la vulnerabilidad auténtica", "Enorme compasión por los que sufren", "Don para enseñar lo que más le costó aprender"],
        negatives: ["Herida que genera complejo de insuficiencia crónico", "Hipersensibilidad en el área quirónica", "Dificultad de recibir la sanación que ofrece a otros", "Amargura cuando la herida no es honrada", "Identidad construida alrededor del rol de víctima"]
    },
    NorthNode: {
        name: "Nodo Norte",
        archetype: "La Brújula Evolutiva / El Destino del Alma",
        mission: "Moverse del confort conocido hacia el propósito evolutivo.",
        potential: "Crecimiento deliberado y alineación con la vocación del alma.",
        shadow: "Estancamiento en hábitos repetitivos y miedo a lo nuevo.",
        question: "¿Qué estás dispuesto a soltar para convertirte en quien viniste a ser?",
        essence: "El punto de crecimiento futuro. Indica la dirección que el alma debe tomar para cumplir su promesa en esta vida.",
        keywords: "Destino, Evolución, Propósito, Futuro.",
        profile: "El Nodo Norte (Rahu) apunta a la dirección evolutiva del alma en esta encarnación. Moverse hacia su energía es incómodo porque es lo menos familiar; pero es exactamente lo que el alma vino a desarrollar. Su signo y casa revelan los nuevos territorios a explorar.",
        love: "En el amor, el Nodo Norte invita a conectar con personas y dinámicas relacionales que te sacan de tu zona de confort y te empujan a tu siguiente versión. Las relaciones alineadas con el Nodo Norte son transformadoras, aunque disruptivas inicialmente.",
        career: "Vocationalmente, el Nodo Norte indica el campo de acción donde el alma viene a contribuir y crecer en esta vida. Trabajar desde su energía puede sentirse extranño al principio, pero genera la más profunda sensación de prropósito y realización.",
        positives: ["Claridad sobre la dirección evolutiva del alma", "Incentivo para salir de la zona de confort", "Alineación con el propósito verdadero de esta vida", "Crecimiento deliberado y con sentido", "Las sincronicidades aumentan al avanzar hacia él"],
        negatives: ["Incomodidad ante lo nuevo y desconocido", "Tendencia a recaer en los patrones del Nodo Sur", "Resistencia inconsciente al crecimiento necesario", "Miedo a la dirección que el alma necesita tomar", "Procrastinación del propósito por confort en lo conocido"]
    }
};

export const SIGNS_LIB: Record<string, {
    name: string;
    style: string;
    essence: string;
    gift: string;
    trap: string;
    mantra: string;
    profile: string;
    love: string;
    career: string;
    positives: string[];
    negatives: string[];
}> = {
    Aries: {
        name: "Aries",
        style: "con una descarga de energía pura, directa y valiente.",
        essence: "La incondicionalidad del niño interior. Aries no calcula, simplemente *es*. Su arquetipo es el guerrero inocente que se lanza a la vida sin memoria de fracasos pasados.",
        gift: "Tu Luz Radiante: Tienes el don de los comienzos absolutos. Tu franqueza desarma las mentiras del mundo, y tu coraje nato te permite arrasar obstáculos con una sinceridad inquebrantable. Aportas el milagro de lo espontáneo.",
        trap: "Tus Sombras Mágicas: La impaciencia infantil. Cuando el mundo no se rinde ante tus pies en el momento exacto, puedes estallar en berrinches destructivos. Tu lección es recordar que escuchar al otro no apaga tu propio fuego.",
        mantra: "Yo Soy, Yo Actúo",
        profile: "Aries es el primer signo del zodíaco y porta la energía del origen puro. Su regente Marte lo dota de una vitalidad que pocos pueden igualar. Quien tiene fuertes posicionamientos en Aries lleva un motor interno que difícilmente se apaga. Son los pioneros, los que no piden permiso para empezar, los que inyectan urgencia y vida allá donde los demás dudan. Su mayor evolución ocurre cuando aprenden que el valor incluye la paciencia.",
        love: "En el amor, Aries es intenso, apasionado y directo: si le gustas, lo sabrás. No juega al misterio porque no sabe. Busca la conquista y la emoción del primer instante. Su reto es mantenerse comprometido cuando la novedad se desvanece. Necesita una pareja que le dé espacio, que no lo agote con demandas de seguridad continuas, pero que tampoco se deje dominar completamente.",
        career: "Aries prospera en entornos donde la iniciativa y la velocidad son valoradas: emprendimiento, deportes de élite, cirugía, liderazgo militar, ventas y cualquier campo competitivo. Es el mejor para lanzar proyectos, aunque necesita delegar la fase de mantenimiento. Su energía marciana lo hace ideal para roles donde deba actuar antes de pensar.",
        positives: ["Valentía y decisión sin igual", "Energía e iniciativa desbordante", "Honestidad y franqueza refrescantes", "Capacidad de actuar bajo presión", "Espíritu pionero y vanguardista"],
        negatives: ["Impaciencia extrema ante los obstáculos", "Impulsividad que genera conflictos", "Dificultad para escuchar al otro", "Agresividad cuando se siente frustrado", "Abandona proyectos antes de terminarlos"]
    },
    Taurus: {
        name: "Tauro",
        style: "con pausa, sensualidad y una búsqueda constante de estabilidad.",
        essence: "La paciencia infinita de la tierra fértil. Es el constructor implacable de certezas tangibles; vive a través de los cinco sentidos anclado en la pura realidad del presente.",
        gift: "Tu Luz Radiante: Posees la fuerza serena para transformar el caos en belleza permanente. Tu terquedad, cuando se vuelve lealtad, es invencible. Eres el ancla pacífica en medio de la tormenta, manifestando paciencia suprema.",
        trap: "Tus Sombras Mágicas: El temor a soltar. Te quedas por demasiado tiempo en lo seguro (espacios, situaciones, ideas), aferrándote con obstinación cuando la vida exige que fluya. Tienes que perdonar más rápido.",
        mantra: "Yo Tengo, Yo Valoro",
        profile: "Tauro es la energía de la tierra en su manifestación más sensual y persistente. Gobernado por Venus, este signo busca construir un mundo de belleza, calidad y permanencia. Las personas con Tauro prominente son confiables, pacientes y poseen un sentido estético muy desarrollado. Su fuerza reside en la constancia: donde otros se rinden, Tauro sigue. Su mayor aprendizaje es soltar el apego cuando la vida pide renovación.",
        love: "En el amor, Tauro es leal, sensual y profundamente devoto. No cae fácil, pero cuando lo hace, es para siempre. Expresa su amor a través de la presencia física, el contacto, los detalles materiales y la estabilidad. Su mayor reto es la rigidez: puede volverse posesivo o resistirse al cambio dentro de la relación. Necesita seguridad emocional y detesta las sorpresas desestabilizadoras.",
        career: "Tauro brilla en carreras que combinan arte, dinero y materialidad: banca, gastronomía, diseño de interiores, moda, joyería, agricultura y cualquier arte visual. Su disciplina y perseverancia lo hacen excelente en cualquier campo que requiera largo plazo. Puede construir imperios si aprende a adaptarse a los cambios del mercado.",
        positives: ["Lealtad y constancia inamovibles", "Sentido estético y artístico refinado", "Paciencia y determinación para el largo plazo", "Habilidad para crear estabilidad y seguridad", "Conexión profunda con los placeres de la vida"],
        negatives: ["Terquedad y resistencia al cambio", "Posesividad en las relaciones", "Materialismo como mecanismo de seguridad", "Lentitud ante las decisiones urgentes", "Rencor sostenido cuando se siente traicionado"]
    },
    Gemini: {
        name: "Géminis",
        style: "con curiosidad lúdica, versatilidad y una mente que vuela entre opciones.",
        essence: "El centelleo de una mente brillante que no duerme. Géminis es dualidad divina: es el niño preguntón infinito jugando entre las esferas del pensamiento, buscando incansablemente conectar mundos.",
        gift: "Tu Luz Radiante: Eres electricidad verbal. Tu inteligencia ágil desmitifica la pesadez del drama con humor fresco. Tienes el don mágico de desdoblarte y entender ambos lados de una verdad a la velocidad de la luz.",
        trap: "Tus Sombras Mágicas: El nerviosismo desconectado y el vuelo constante, que a veces es solo escapismo encubierto o dificultad profunda para comprometerse a una sola decisión, de miedo a perderte todo lo demás.",
        mantra: "Yo Pienso, Yo Comunico",
        profile: "Géminis es el signo de la dualidad, la comunicación y el movimiento mental perpetuo. Mercurio le concede una mente ágil que salta de idea en idea con una facilidad asombrosa. Las personas con Géminis prominente son verbalmente brillantes, curiosas e increíblemente adaptables. Viven en dos carriles a la vez y raramente se aburren. Su mayor desafío es profundizar en lugar de limitarse a tocar la superficie de todo.",
        love: "En el amor, Géminis necesita un compañero intelectual que lo estimule constantemente. El aburrimiento es su enemigo número uno. Es encantador, juguetón y muy comunicativo, pero puede parecer frío o evasivo cuando la conversación se vuelve emocionalmente intensa. Necesita espacio mental y odia sentirse atrapado en rutinas predecibles.",
        career: "Géminis prospera en campos que requieren comunicación, adaptabilidad y velocidad: periodismo, marketing, publicidad, docencia, traducción, redes sociales, ventas y tecnología. Es el mejor conversador del zodíaco y puede seducir con palabras en cualquier contexto profesional. Su reto es la constancia.",
        positives: ["Agilidad mental e intelectual excepcional", "Habilidad para comunicarse con cualquier persona", "Adaptabilidad y versatilidad naturales", "Humor inteligente y entretenido", "Curiosidad que genera aprendizaje constante"],
        negatives: ["Inconsistencia y falta de compromiso", "Superficialidad como primera respuesta", "Nerviosismo y ansiedad mental crónica", "Dificultad para tomar decisiones definitivas", "Tendencia a la manipulación verbal"]
    },
    Cancer: {
        name: "Cáncer",
        style: "con ternura protectora, memoria emocional y mucha intuición visceral.",
        essence: "La profundidad de los océanos regidos por la Luna. Sensibilidad mística arropada por una caparazón protectora. Detrás de sus risas hay memorias psíquicas de todas sus vidas pasadas.",
        gift: "Tu Luz Radiante: Un radar infalible para leer el alma humana ajena antes de que pronuncie palabra. Tu capacidad para dotar de nutrición emocional y sentido de pertenencia a quienes amas transforma espacios fríos en verdaderos santuarios.",
        trap: "Tus Sombras Mágicas: Navegas demasiado al pasado y a veces haces de tu dolor un refugio con garras de manipulación. El humor sombrío te asalta de improvisto; aprende a soltar defensas para ser feliz hoy.",
        mantra: "Yo Siento, Yo Protejo",
        profile: "Cáncer, regido por la Luna, es el signo más profundamente conectado con el mundo emocional, la familia y la memoria. Su sensibilidad es su mayor don y, al mismo tiempo, su terreno más vulnerable. Las personas con Cáncer prominente absorben el estado emocional de su entorno como esponjas y poseen una intuición casi psíquica sobre las necesidades ajenas. Su misión es crear refugio: para sí mismos y para quienes aman.",
        love: "En el amor, Cáncer es el compañero más devoto y nutritivo del zodíaco cuando se siente seguro. Ama con una profundidad que pocos pueden igualar. Sin embargo, su miedo al abandono puede volverse asfixiante. Necesita una pareja que demuestre su compromiso constantemente y que tenga la paciencia para atravesar sus mareas emocionales sin huir.",
        career: "Cáncer florece en entornos que le permitan cuidar, nutrir o crear: psicología, enfermería, trabajo social, gastronomía, diseño de espacios íntimos y cualquier profesión ligada al hogar, la historia o la memoria. También puede brillar en el arte cuando lo usa para expresar su mundo interior. Necesita un ambiente laboral emocionalmente seguro.",
        positives: ["Profunda inteligencia emocional e intuitiva", "Capacidad de crear refugio y pertenencia", "Lealtad y devoción absolutas en el círculo íntimo", "Imaginación y creatividad muy desarrolladas", "Memoria emocional que honra la historia"],
        negatives: ["Sensibilidad extrema a la crítica", "Tendencia al repliegue defensivo y el hermetismo", "Manipulación emocional sutil cuando se siente amenazado", "Apego al pasado que impide el avance", "Humor variable que desestabiliza el entorno"]
    },
    Leo: {
        name: "Leo",
        style: "con generosidad magnética, creatividad dramática y necesidad de brillo.",
        essence: "Un corazón inmenso como un Sol radiante, pulsando dignidad, calidez estival y poder magnánimo. Como verdadero monarca interior, no vino al mundo a complacer, sino a reinar a través de un amor colosal y leal.",
        gift: "Tu Luz Radiante: Siembras valor por donde caminas. Tienes el increíble don de hacer sentir a todos como tu corte real. Si estás alineado, usas tu gran influencia dramática para iluminar a otros en lugar de opacarlos.",
        trap: "Tus Sombras Mágicas: La trágica ceguera del orgullo, y tu herida profunda ante cualquier forma de desprecio. Para protegerte terminas por rodearte de súbditos frívolos dictando a capricho, dejando al verdadero corazón aullando por validación externa.",
        mantra: "Yo Brillo, Yo Expreso",
        profile: "Leo, regido por el Sol, es el signo de la autoexpresión, el liderazgo y la creatividad. Quien tiene Leo prominente en su carta porta una presencia natural que ilumina la sala. Son generosos, leales y poseen un carisma que atrae sin esfuerzo. Su misión es aprender a brillar desde la autenticidad y no desde la necesidad de aprobación externa. Cuando Leo trabaja su ego, se convierte en el líder más inspirador del zodíaco.",
        love: "En el amor, Leo es apasionado, dramático y tremendamente leal. Ama con todo el corazón y espera la misma devoción de vuelta. Necesita sentirse admirado y celebrado por su pareja; sin ese reconocimiento, la llama se apaga. Su mayor reto es aprender que el amor no es una actuación, sino una presencia real y vulnerable.",
        career: "Leo brilla en cualquier escenario donde pueda ser visto: actuación, dirección artística, docencia inspiracional, liderazgo en cualquier nivel, política, entretenimiento y emprendimiento con visión. Necesita sentir que su trabajo tiene impacto y que su contribución es reconocida. No sirve bien en la sombra.",
        positives: ["Carisma y magnetismo naturales", "Generosidad y grandeza de corazón", "Creatividad y autoexpresión vibrantes", "Lealtad feroz con quienes ama", "Capacidad de inspirar y liderar desde la alegría"],
        negatives: ["Orgullo que impide pedir perdón o ayuda", "Necesidad excesiva de admiración y validación", "Dramaturgia cuando se siente ignorado", "Incapacidad para compartir el protagonismo", "Autoritarismo disfrazado de liderazgo"]
    },
    Virgo: {
        name: "Virgo",
        style: "con detalle, discernimiento y una búsqueda incansable de la mejora funcional.",
        essence: "La pureza incuestionable del propósito práctico. No son vírgenes literales, sino seres psíquicamente incorruptibles, obsesionados por destilar lo inútil hasta revelar la más perfecta y silenciosa eficiencia.",
        gift: "Tu Luz Radiante: La aguda alquimia del intelecto aplicado al servicio real. Ordenas impecablemente donde el mundo siembra confusión, sanas desde una humildad meticulosa y demuestras amor puro mediante actos de servicio irreprochables.",
        trap: "Tus Sombras Mágicas: El laberinto sombrío del perfeccionismo paralizante y la crítica hiriente (tanto ajena como propia). Te escondes en el micro-detalle para no enfrentar el bosque vasto de tus propias e indominables emociones.",
        mantra: "Yo Analizo, Yo Sirvo",
        profile: "Virgo, regido por Mercurio, es el signo del análisis, el servicio y la mejora continua. Quien tiene Virgo prominente posee una mente extraordinariamente detallista capaz de ver lo que otros pasan por alto. Son trabajadores, meticulosos y profundamente devotos a la función y al cuidado. Su camino evolutivo está en aprender a amar la imperfección: la suya propia y la del mundo.",
        love: "En el amor, Virgo demuestra su afecto a través de actos de servicio: organizar, cuidar, anticiparse a las necesidades. No es el más expresivo emocionalmente, pero su devoción es genuina y profunda. Su reto es dejar de analizar la relación y permitirse simplemente sentirla. Necesita una pareja que aprecie sus detalles y no lo haga sentir juzgado.",
        career: "Virgo destaca en medicina, nutrición, farmacia, contabilidad, edición, análisis de datos, artesanía y cualquier campo que exija precisión y método. Es el experto nato: el que revisa tres veces antes de entregar. Su ética de trabajo es legendaria y su atención al detalle es un superpoder profesional.",
        positives: ["Inteligencia analítica y detallista", "Ética de trabajo impecable", "Amor genuino expresado en servicio", "Habilidad para optimizar sistemas y procesos", "Discernimiento y criterio muy desarrollados"],
        negatives: ["Perfeccionismo paralizante", "Autocrítica y crítica a los demás", "Hipocondria y preocupación excesiva", "Dificultad para soltar el control", "Frialdad aparente que oculta hipersensibilidad"]
    },
    Libra: {
        name: "Libra",
        style: "con elegancia, diplomacia y una mirada siempre puesta en el otro.",
        essence: "La balanza etérea oscilando perpetuamente hacia la perfección estética e intelectual. Están enamorados de la armonía conceptual. Su intelecto es afilado pero arropado por la inmensa belleza y táctica de Venus.",
        gift: "Tu Luz Radiante: Nadie sintetiza lados opuestos de un conflicto mejor que tú, porque ves intuitivamente la paz. Tienes un magnetismo natural para suavizar el drama de la humanidad con diplomacia compasiva, civilizada y estética pura.",
        trap: "Tus Sombras Mágicas: Un pánico extremo a confrontar que los condena a una indecisión agónica. Tu constante esfuerzo por agradar y seducir artificialmente desdibuja tu propia verdad interior asfixiada en balanzas nunca quietas.",
        mantra: "Yo Equilibro, Yo Me Vínculo",
        profile: "Libra, regido por Venus, es el signo de la armonía, la justicia y el arte de la relación. Quien tiene Libra prominente posee un encanto natural que abre todas las puertas y un sentido estético muy refinado. Viven orientados hacia el 'nosotros' y son los mejores mediadores del zodíaco. Su evolución profunda reside en aprender a tomar decisiones sin necesitar el consenso de todos.",
        love: "En el amor, Libra es el gran romántico del zodíaco. Le encanta el ritual de la conquista, la elegancia del vínculo y la construcción de una sociedad emocional e intelectual. Su reto es la indecisión y la tendencia a complacer en lugar de mostrar quién es realmente. Necesita una pareja que lo inspire a ser más directo con sus deseos.",
        career: "Libra brilla en derecho, diplomacia, relaciones internacionales, arte, diseño, moda, mediación de conflictos, publicidad y cualquier campo donde la estética y el trato humano sean esenciales. Trabaja mejor en equipo o en sociedad que en solitario.",
        positives: ["Diplomacia y capacidad de mediación únicas", "Sentido estético y artístico muy desarrollado", "Encanto y sociabilidad naturales", "Sentido de la justicia y la equidad", "Habilidad para ver todos los puntos de vista"],
        negatives: ["Indecisión crónica ante las opciones", "Complacencia que borra la propia identidad", "Evasión del conflicto a cualquier costo", "Dependencia de la aprobación del entorno", "Superficialidad como primera respuesta social"]
    },
    Scorpio: {
        name: "Escorpio",
        style: "con intensidad profunda, misterio y una voluntad inquebrantable.",
        essence: "Un poder psíquico capaz de matar o resucitar. Es la intensidad sin paliativos disfrazada bajo una gélida máscara de control. Con un corazón profundamente pasional, penetra el mundo como un cirujano del alma incapaz de la mediocridad.",
        gift: "Tu Luz Radiante: Has cruzado los infiernos e irradias resiliencia extrema. Ofreces la transmutación más profunda a quienes conoces amando de manera infinita e indestructible, poseyendo también una voluntad férrea capaz de domar continentes y lograr el propósito.",
        trap: "Tus Sombras Mágicas: Tus venenos internos— los celos corrosivos, el cálculo de paranoias invisibles y una compulsión a dominarlo todo desde la retaguardia para no ceder ni una gota de control emocional de forma desvalida.",
        mantra: "Yo Deseo, Yo Transformo",
        profile: "Escorpio, regido por Plutón y Marte, es el signo de la transformación, el misterio y el poder psíquico. Las personas con Escorpio prominente sienten todo con una intensidad que los demás raramente comprenden. Son investigadores natos del alma humana: detectan las mentiras a kilómetros de distancia y no toleran la superficialidad. Su camino evolutivo es la alquimia: convertir el dolor en poder y el veneno en medicina.",
        love: "En el amor, Escorpio no conoce el término medio: ama con una profundidad que puede ser transformadora o destructiva. Es el amante más intenso y leal del zodíaco cuando confía, pero el más peligroso cuando se siente traicionado. Necesita una pareja capaz de sostener su intensidad sin huir, y que comprenda que su celo no es debilidad sino amor en su forma más primitiva.",
        career: "Escorpio prospera en psicología, terapia, investigación, criminología, medicina, ocultismo, finanzas profundas (fusiones, herencias), cirugía y cualquier campo que requiera ir al fondo de las cosas. Su capacidad de concentración y su intuición los hace excelentes estrategas y diagnosticadores en cualquier disciplina.",
        positives: ["Resiliencia y capacidad de renacer de las cenizas", "Intuición y percepción psíquica extraordinarias", "Lealtad absoluta cuando confía", "Fuerza de voluntad y determinación únicas", "Capacidad de transformación profunda y permanente"],
        negatives: ["Celos y posesividad corrosivos", "Desconfianza y paranoia como mecanismo de defensa", "Sed de venganza cuando se siente traicionado", "Manipulación sutil desde el control emocional", "Dificultad para soltar y perdonar"]
    },
    Sagittarius: {
        name: "Sagitario",
        style: "con optimismo contagioso, aventura mental y búsqueda de la verdad.",
        essence: "El flechazo indomable y luminoso ascendiendo a la galaxia. Un buscador filosófico inquebrantable que corre desesperadamente hacia la verdad y el significado. Su esperanza interior es su gran fuerza motora.",
        gift: "Tu Luz Radiante: Optimismo expansivo, inquebrantable nobleza y una honradez casi temeraria pero liberadora. Tu fuego inspira, anima y le inyecta a las masas y amigos el milagro visionario para entender lo inexplicable de la vida cósmica.",
        trap: "Tus Sombras Mágicas: Huir con ceguera y rebeldía vacua, escapando de los detalles densos del vivir para caer en la irresponsabilidad temeraria o en la brusquedad filosófica extremista, asumiendo una falsa posesión absoluta de la moral real.",
        mantra: "Yo Comprendo, Yo Me Expando",
        profile: "Sagitario, regido por Júpiter, es el signo del viajero, el filósofo y el buscador eterno de sentido. Las personas con Sagitario prominente necesitan libertad, expansión y la sensación constante de que están creciendo. Son optimistas naturales que contagian su entusiasmo por la vida. Su mayor aprendizaje es que la responsabilidad no está reñida con la aventura: ir lejos y cumplir también con lo cercano.",
        love: "En el amor, Sagitario es apasionado, divertido y enormemente generoso con sus experiencias y visiones. Sin embargo, su miedo al compromiso definitivo puede crear inestabilidad en las relaciones. Necesita una pareja que comparta su amor por la aventura y que respete su necesidad fundamental de horizonte. La convivencia es su mayor reto.",
        career: "Sagitario brilla en filosofía, derecho, docencia universitaria, viajes, turismo, editorial, publicaciones, medios de comunicación, deportes al aire libre y cualquier campo con impacto internacional. Es el eterno estudiante que un día se convierte en maestro.",
        positives: ["Optimismo y fe en la vida tremendamente contagiosos", "Amor por el conocimiento y el crecimiento", "Generosidad y nobleza de espíritu", "Honestidad directa aunque a veces brutalmente sincera", "Capacidad de ver la imagen grande y el sentido global"],
        negatives: ["Irresponsabilidad ante los compromisos concretos", "Brusquedad verbal que hiere sin querer", "Exceso de confianza que lleva a errores de cálculo", "Dogmatismo filosófico disfrazado de amplitud de miras", "Fuga ante la dificultad y el tedio"]
    },
    Capricorn: {
        name: "Capricornio",
        style: "con pragmatismo, estructura y una mirada puesta en el éxito a largo plazo.",
        essence: "El centinela cósmico conquistador incansable del abismo y de la montaña de las aspiraciones. Una vieja alma cargada con ambiciones estoicas envueltas en la profunda sabiduría práctica de sus propios silencios reflexivos solitarios y saturninos.",
        gift: "Tu Luz Radiante: Disciplina formidable e integridad incorruptible absoluta en la cumbre del éxito y un humor seco maravillosamente inteligente. Naciste un alma antigua para materializar proyectos imbatibles y servir tú mismo de roca maestra inamovible para tu familia extensa. ",
        trap: "Tus Sombras Mágicas: Resignarse melancólicamente al deber y castigar todo atisbo de frivolidad sin compasión. En el proceso construyes muros titánicos aislando el corazón en gélidos y ambiciosos cálculos pragmáticos vaciados del aliento de la espiritualidad blanda.",
        mantra: "Yo Logro, Yo Construyo",
        profile: "Capricornio, regido por Saturno, es el signo del logro, la estructura y la madurez ganada con esfuerzo. Las personas con Capricornio prominente envejecen como el buen vino: la vida tiene un sentido ascendente para ellas. Son estrategas a largo plazo que construyen imperios ladrillo a ladrillo. Su camino evolutivo es aprender a disfrutar el camino sin esperar a llegar a la cima para sentir que valen.",
        love: "En el amor, Capricornio es serio, responsable y profundamente leal. No cae enamorado de manera fácil o frivola, pero cuando lo hace, es con la intención de construir algo verdadero y duradero. Su reto es permitirse ser vulnerable y mostrarse emocionalmente ante su pareja. Necesita un amor que también tenga ambición y visión a largo plazo.",
        career: "Capricornio es el arquetipo del profesional de excelencia. Brilla en finanzas, ingeniería, derecho, política, medicina, administración, arquitectura y cualquier campo que recompense el mérito y la constancia. Es el fundador, el CEO, el artesano que domina su oficio después de años de dedicación silenciosa.",
        positives: ["Disciplina y ambición a largo plazo únicas", "Integridad y sentido del deber muy sólidos", "Capacidad de construir estructuras duraderas", "Humor seco e inteligencia práctica", "Madurez y sabiduría que crece con los años"],
        negatives: ["Frialdad emocional como mecanismo de protección", "Obsesión con el estatus y la imagen pública", "Dificultad para disfrutar sin sentir que 'lo merece'", "Pesimismo y visión restringida del futuro", "Trabajo excesivo como evasión emocional"]
    },
    Aquarius: {
        name: "Acuario",
        style: "con originalidad disruptiva, desapego y un enfoque en el bien común.",
        essence: "El mago humanitario desfasado viviendo secretamente trescientos años adelantado a esta dimensión. Operan un rayo azul errático capaz de derribar todas las normas en un instante fugaz en honor al progreso y bienestar genuino.",
        gift: "Tu Luz Radiante: Innovación desinteresada y absoluta falta de prejuicios terrenales, tienes la rebeldía del genio altruista y universal a través de intelectos agudos, permitiendo al entorno liberarse de etiquetas viejas inútiles.",
        trap: "Tus Sombras Mágicas: Enamorarse trágicamente del género humano lejano despreciando y desconectándose en rebeldías frívolas, dogmáticas intocables por una superioridad intelectual paralizante al dolor de los pocos amores individuales que tienes a medio metro.",
        mantra: "Yo Sé, Yo Innovo",
        profile: "Acuario, regido por Urano y Saturno, es el signo del genio colectivo, la innovación y la libertad. Las personas con Acuario prominente piensan de manera radicalmente original y sienten un impulso profundo de mejorar el mundo. Son visionarios que ven el futuro antes que nadie. Su mayor evolución consiste en aprender a amar a los individuos concretos con la misma pasión con la que aman a la humanidad abstracta.",
        love: "En el amor, Acuario es amigo primero y amante después. Necesita una conexión intelectual antes que cualquier otra cosa. Es leal pero detesta la posesividad y los dramas emocionales. Necesita una pareja que sea su igual, que le dé espacio y que comparta su visión del mundo. Su reto es permitirse la intimidad emocional sin sentirla como una pérdida de autonomía.",
        career: "Acuario brilla en tecnología, programación, física, astronomía, activismo social, ONG, diseño de sistemas, innovación empresarial y cualquier campo que busque soluciones disruptivas a problemas colectivos. Es el inventor, el hacker ético, el científico visionario.",
        positives: ["Inteligencia visionaria y radicalmente original", "Humanitarismo genuino y desinteresado", "Capacidad de innovar donde otros se estancan", "Desapego sano y respeto a la libertad ajena", "Pensamiento sistémico para el bien común"],
        negatives: ["Frialdad emocional que aleja a los seres queridos", "Rebeldía dogmática disfrazada de progresismo", "Distancia del amor individual por amor al colectivo", "Superioridad intelectual que aísla", "Inestabilidad y cambios repentinos sin aviso"]
    },
    Pisces: {
        name: "Piscis",
        style: "con compasión universal, ensoñación y una sensibilidad sin fronteras.",
        essence: "El místico inmanente universal capaz de nadar todos los sueños multidimensionales de una sola gota a la existencia pura. Conociendo de memoria las once lecciones kármicas anteriores que forjaron su vulnerabilidad como extrema belleza e hiper sensorialidad abstracta.",
        gift: "Tu Luz Radiante: Tienes un océano místico cósmico de empatía y sacrificio. Capacidad artística hipnótica que te permite sumergirte como psíquico sin límites y fluir diluyendo resentimientos densos que redime todo mal de almas cansadas a fuerza de amor extremo puro.",
        trap: "Tus Sombras Mágicas: Negativa suicida al anclaje en tierra; vivir arrastrado en ensoñaciones melancólicas disolutivas autoengaños que desvían por evasiones adictivas a una trágica y constante espiral pasiva, olvidando tus responsabilidades materiales.",
        mantra: "Yo Creo, Yo Fluyo",
        profile: "Piscis, regido por Neptuno y Júpiter, es el último signo del zodíaco y porta la sabiduría acumulada de todos los anteriores. Las personas con Piscis prominente tienen una sensibilidad sin límites y una conexión natural con el inconsciente colectivo. Son artistas, místicos, sanadores y soñadores. Su mayor aprendizaje es mantener un pie en el mundo material sin perder su conexión con el mundo invisible.",
        love: "En el amor, Piscis ama con una profundidad oceánica. Es el amante más compasivo y entregado del zodíaco, capaz de disolver su propio yo en el del otro. Su mayor reto es no perderse en la relación y aprender a recibir tanto como da. Necesita una pareja que lo ancle a la realidad con ternura y que no se aproveche de su entrega ilimitada.",
        career: "Piscis brilla en arte, música, danza, cine, fotografía, espiritualidad, medicina holística, psicología transpersonal, oceanografía y trabajo con comunidades vulnerables. Cualquier campo que le permita usar su compasión o su creatividad como herramienta de sanación es su territorio natural.",
        positives: ["Empatía y compasión sin fronteras", "Creatividad artística y visión poética", "Intuición y sensibilidad psíquica profundas", "Capacidad de perdonar y trascender el dolor", "Conexión espiritual natural y profunda"],
        negatives: ["Evasión de la realidad a través del escapismo", "Tendencia a la victimización pasiva", "Susceptibilidad a adicciones y dependencias", "Ingenuidad que lo expone a la manipulación", "Dificultad para establecer límites claros"]
    }
};

export const HOUSES_LIB: Record<number, {
    title: string;
    scenario: string;
    challenge: string;
    essence: string;
    manifestation: string;
    shadow: string;
    profile: string;
    love: string;
    career: string;
    positives: string[];
    negatives: string[];
}> = {
    1: {
        title: "El Escenario de la Identidad",
        scenario: "el amanecer de la conciencia, tu máscara al mundo y tu primera impresión.",
        challenge: "Aprender a proyectar tu esencia auténtica con valentía y claridad.",
        essence: "El punto de entrada a la encarnación física. Es la energía que los demás perciben de ti antes de que hables.",
        manifestation: "Apariencia física, vitalidad inicial, forma de iniciar cualquier proyecto o relación.",
        shadow: "Egocentrismo extremo o falta total de conciencia sobre el impacto en los demás.",
        profile: "La Casa 1 es el Ascendente: la puerta de entrada al mundo y la energía con la que te presentas ante la vida. El signo que la rige colorea tu apariencia, tu temperamento y el primer impacto que produces en los demás. No es quien eres en profundidad, sino cómo te muestras instintivamente.",
        love: "En las relaciones, la Casa 1 define la energía que proyectas al inicio de cualquier vínculo. Las personas con mucha energía en la 1ª son magnéticas e impactantes, pero deben aprender a escuchar y ceder espacio al otro para que el amor pueda florecer más allá de la primera impresión.",
        career: "Profesionalmente, la Casa 1 habla de los roles donde la presencia y la iniciativa personal son fundamentales. Emprendimiento, roles de cara al público, liderazgo visible y cualquier carrera donde la imagen personal sea parte del éxito.",
        positives: ["Presencia magnética e impactante", "Capacidad de iniciativa y arranque", "Proyección clara de la identidad personal", "Vitalidad e impulso vital fuertes", "Autenticidad en la primera impresión"],
        negatives: ["Egocentrismo e incapacidad de ver al otro", "Impulsividad sin reflexión previa", "Impaciencia crónica en procesos largos", "Máscara que oculta la vulnerabilidad real", "Dificultad para sostener lo que inicia"]
    },
    2: {
        title: "El Escenario de los Recursos",
        scenario: "tus valores, talentos y posesiones; lo que te da seguridad.",
        challenge: "Cultivar un valor propio que no dependa de lo externo.",
        essence: "La materialización del deseo en la tierra. Representa lo que consideramos 'propio' y nuestra base de seguridad.",
        manifestation: "Ingresos propios, gestión del dinero, talentos latentes y autoestima física.",
        shadow: "Apego material obsesivo o inseguridad profunda compensada con posesiones.",
        profile: "La Casa 2 rige la relación con el mundo material, los recursos propios y el autoestima. Muestra de qué manera construyes seguridad en tu vida: a través de qué posees, qué valoras y cómo administras lo tuyo. Un planeta aquí moldea profundamente tu relación con el dinero y el propio valor.",
        love: "En el amor, la Casa 2 habla de lo que valoras en una pareja y cómo el vínculo afecta tu sentido de seguridad y autoestima. Planetas en esta casa pueden indicar que buscas estabilidad material en las relaciones o que el amor propio condiciona profundamente tu capacidad de amar.",
        career: "Profesionalmente, la Casa 2 indica los talentos propios que pueden convertirse en fuente de ingresos. Señala también el estilo financiero: si hay tendencia a ganar, a acumular o a gastar. Favorece vocaciones donde los recursos personales son el activo principal.",
        positives: ["Gestión inteligente de recursos propios", "Valores sólidos y bien definidos", "Talentos concretos que generan ingresos", "Capacidad de crear seguridad material", "Sentido del valor propio bien arraigado"],
        negatives: ["Apego excesivo a lo material como sustituto de seguridad", "Inseguridad económica crónica", "Autoestima que fluctúa con el saldo bancario", "Posesividad en las relaciones", "Dificultad para compartir o soltar recursos"]
    },
    3: {
        title: "El Escenario de la Comunicación",
        scenario: "tu entorno cercano, el aprendizaje y cómo procesas la información.",
        challenge: "Desarrollar una mente flexible y la capacidad de entender diversas perspectivas.",
        essence: "El intercambio inmediato de información. Es el puente intelectual que nos conecta con lo que está a nuestro alcance.",
        manifestation: "Hermanos, vecinos, viajes cortos, estudios primarios y estilo de comunicación cotidiana.",
        shadow: "Superficialidad intelectual, chismes o dispersión mental constante.",
        profile: "La Casa 3 rige la mente cotidiana, la comunicación, el entorno inmediato y los primeros aprendizajes. Muestra cómo piensas, cómo hablas y cómo te relacionas con el mundo más cercano: hermanos, vecinos, estudios básicos. Un planeta aquí intensifica la actividad mental y comunicativa.",
        love: "En el amor, la Casa 3 habla de la importancia de la comunicación dentro del vínculo. Si hay planetas aquí, la conversación, el humor compartido y la estimulación intelectual son fundamentales para mantener vivo el interés romántico. El amor también se expresa a través de palabras y mensajes.",
        career: "Profesionalmente, la Casa 3 favorece todo lo relacionado con la comunicación: escritura, docencia, medios, marketing, traducción y cualquier oficio que implique intercambio constante de información. También indica la capacidad de aprender con rapidez y adaptarse a nuevos entornos.",
        positives: ["Agilidad mental y verbal sobresaliente", "Curiosidad intelectual permanente", "Adaptabilidad en entornos cambiantes", "Habilidad para conectar con el entorno cercano", "Capacidad de aprender con rapidez"],
        negatives: ["Dispersión mental y falta de profundidad", "Tendencia al chisme y la información superficial", "Nerviosismo e inquietud cognitiva", "Dificultad para concentrarse en una sola cosa", "Hermanos o entorno cercano como fuente de conflicto"]
    },
    4: {
        title: "El Escenario del Hogar",
        scenario: "tus raíces, familia y tu mundo privado; la base de tu vida.",
        challenge: "Crear un refugio interno de paz y sanar la herencia familiar.",
        essence: "El fondo del cielo (IC). Es el útero emocional y la base desde donde crece todo nuestro árbol vital.",
        manifestation: "El hogar físico, la vida privada, la relación con las raíces ancestrales y la seguridad emocional.",
        shadow: "Dependencia infantil del pasado o reclusión emocional defensiva.",
        profile: "La Casa 4 es el IC (Imum Coeli), el punto más profundo de la carta. Rige las raíces familiares, el hogar, la vida privada y la herencia emocional. Lo que ocurre en esta casa define la base psicológica desde la que operamos: la tierra firme o el suelo inestable sobre el que edificamos la vida.",
        love: "En el amor, la Casa 4 habla de la vida íntima en pareja: la convivencia, el hogar compartido y los patrones de familia de origen que se replican en las relaciones. Planetas aquí indican que el amor está profundamente entretejido con la búsqueda de raíces, pertenencia y seguridad.",
        career: "Profesionalmente, la Casa 4 puede indicar vocaciones desde el hogar o relacionadas con él: bienes raíces, arqueología, psicología familiar, restauración, cocina o cualquier área que conecte con las raíces, la historia y la tierra.",
        positives: ["Profunda conexión con las raíces y la familia", "Capacidad de crear hogares nutritivos y seguros", "Intuición emocional muy desarrollada", "Lealtad y sentido de pertenencia profundos", "Fuerza interior que viene de las raíces"],
        negatives: ["Heridas familiares no resueltas que condicionan el presente", "Dificultad para independizarse emocional y físicamente", "Tendencia a refugiarse en el pasado", "Dependencia del hogar como única fuente de seguridad", "Reclusión emocional cuando el mundo exterior amenaza"]
    },
    5: {
        title: "El Escenario de la Creatividad",
        scenario: "el romance, el juego, el arte y la autoexpresión alegre.",
        challenge: "Atreverse a brillar con voz propia y celebrar el goce de estar vivo.",
        essence: "La llama creativa del corazón. Es el escenario donde buscamos ser especiales y amados por nuestra singularidad.",
        manifestation: "Hijos (propios o creativos), diversiones, romances, hobbies y expresión artística.",
        shadow: "Necesidad patológica de atención o drama excesivo para sentirse vivo.",
        profile: "La Casa 5 rige la creatividad, el juego, el romance y la expresión del yo. Es la casa del Sol, de la alegría de existir. Planetas aquí intensifican la necesidad de crear, de amar y de brillar. Es también la casa de los hijos bio lógicos y creativos, y de todas las formas en que dejamos una huella personal en el mundo.",
        love: "En el amor, la Casa 5 es el espacio del romance: aventura, cortejo, pasión, juego. Quien tiene planetas aquí busca relaciones que le hagan sentir vivo y especial. El amor para esta casa es una obra de arte: dramático, intenso y creativo.",
        career: "Profesionalmente, la Casa 5 favorece el arte, el espectáculo, la educación infantil, el diseño, el juego, el deporte y cualquier vocación que permita la autoexpresión y deje una huella creativa única en el mundo.",
        positives: ["Creatividad genuina y desbordante", "Capacidad de disfrutar y celebrar la vida", "Carisma y magnetismo en el amor y el arte", "Generosidad y calor en los vínculos", "Talento para el juego y la improvisación"],
        negatives: ["Necesidad excesiva de atención y validación", "Romance que huye del compromiso real", "Drama y teatralidad como mecanismo de presencia", "Riesgo excesivo en el juego y las apuestas", "Dificultad para lo ordinario y lo rutinario"]
    },
    6: {
        title: "El Escenario de la Rutina",
        scenario: "el trabajo cotidiano, el servicio, la salud física y los hábitos diarios.",
        challenge: "Integrar cuerpo y mente mediante el orden y el servicio humilde.",
        essence: "El perfeccionamiento del instrumento humano. Es la ritualización de la vida diaria para mantener el equilibrio.",
        manifestation: "Salud diaria, alimentación, ambiente de trabajo subordinado y servicio a otros.",
        shadow: "Hipocondria, perfeccionamiento neurótico o servidumbre sin propósito.",
        profile: "La Casa 6 rige la salud, los hábitos, la rutina di aria y el servicio. Es el escenario donde la mente y el cuerpo aprenden a funcionar en armonía. Planetas aquí indican una relación intensa con el mundo del trabajo cotidiano, la salud física y la disciplina. Es la o ficina del zodíaco.",
        love: "En el amor, la Casa 6 puede indicar relaciones que nacen en entornos de trabajo o que tienen una fuerte dimensión práctica y de servicio mutuo. Quien tiene mucha energía aquí expresa amor a través de actos cotidianos: preparar comida, organizar, cuidar la salud del otro.",
        career: "Profesionalmente, la Casa 6 es el área del trabajo diario, los compañeros, los jefes y los subordinados. Favorece vocaciones de servicio, salud, nutrición, orden y análisis: medicina, dietética, trabajo social, administración y artesanía de alta precisión.",
        positives: ["Disciplina y ética de trabajo excepcionales", "Atención a los detalles que garantiza calidad", "Cuidado genuino de la salud y el cuerpo", "Capacidad de servicio y apoyo a los demás", "Métodos y rutinas que crean resultados reales"],
        negatives: ["Perfeccionismo que paraliza la acción", "Hipocondria y preocupación excesiva por la salud", "Servilismo sin límites ni propósito propio", "Crítica constante al entorno de trabajo", "Dificultad para delegar y confiar en otros"]
    },
    7: {
        title: "El Escenario del Vínculo",
        scenario: "la pareja, los socios y el espejo que los demás nos devuelven.",
        challenge: "Aprender que el equilibrio real nace del respeto a la individualidad.",
        essence: "El encuentro con el 'Tú'. Representa aquello que proyectamos fuera de nosotros y que buscamos integrar mediante vínculos.",
        manifestation: "Matrimonio, sociedades legales, enemigos declarados y cualquier relación de cara a cara.",
        shadow: "Pérdida de identidad en el otro o dependencia de la aprobación externa.",
        profile: "La Casa 7 rige el matrimonio, las sociedades y todos los vínculos de igual a igual. Es el espejo: muestra lo que proyectamos en el otro y lo que buscamos fuera de nosotros mismos. El signo del Descendente revela el tipo de pareja que atraemos y los patrones relacionales más profundos.",
        love: "En el amor, la Casa 7 es el epicentro. Muestra qué buscamos en una pareja, qué tipo de vínculo creamos y cuáles son los patrones relacionales que se repiten. Planetas aquí intensifican la importancia de las relaciones en la vida: la identidad se construye en buena medida a través del otro.",
        career: "Profesionalmente, la Casa 7 habla de las sociedades, los clientes y las relaciones laborales de igual a igual. Favorece vocaciones donde el trato directo con otras personas es clave: mediación, asesoría, negociación, relaciones públicas y abogacía.",
        positives: ["Habilidad para crear vínculos de profundidad real", "Capacidad de negociar y encontrar acuerdos", "Visión del otro como maestro y espejo", "Equilibrio y justicia en las relaciones", "Magnetismo que atrae relaciones significativas"],
        negatives: ["Dependencia excesiva de la pareja para sentirse completo", "Pérdida de identidad en los vínculos", "Proyección de sombras propias en el otro", "Relaciones que se convierten en batallas de poder", "Miedo a la soledad que lleva a relaciones tóxicas"]
    },
    8: {
        title: "El Escenario de la Fusión",
        scenario: "las crisis profundas, la sexualidad transformadora y lo oculto.",
        challenge: "Soltar el control y permitir que lo viejo muera para que surja la potencia.",
        essence: "La casa de la transmutación. Donde las energías de dos personas se fusionan para crear algo nuevo y más poderoso.",
        manifestation: "Crisis existenciales, herencias, dinero ajeno, procesos de terapia profunda y sexualidad sagrada.",
        shadow: "Luchas de poder destructivas, obsesiones ocultas o miedo al abandono.",
        profile: "La Casa 8 rige la transformación, la muerte simbólica, la sexualidad profunda, las herencias y los recursos compartidos. Es la casa de lo oculto y de las crisis regeneradoras. Planetas aquí indican una vida marcada por intensas transformaciones que, cuando se atraviesan conscientemente, generan un poder de renacimiento excepcional.",
        love: "En el amor, la Casa 8 habla de la fusión total: intimidad sexual y psíquica que va más allá de lo superficial. Las relaciones con planetas aquí son transformadoras, intensas y a menudo kármicas. Temas de poder, control y vulnerabilidad son centrales en la dinámica amorosa.",
        career: "Profesionalmente, la Casa 8 favorece vocaciones que trabajan con lo profundo: psicoanálisis, medicina, cirugía, banca de inversión, gestión de herencias, investigación oculta y cualquier área de crisis y regeneración.",
        positives: ["Capacidad de transformación y regeneración profunda", "Acceso al inconsciente y las motivaciones ocultas", "Intensidad y profundidad en todos los vínculos", "Resiliencia ante las crisis más difíciles", "Poder de atracción y magnetismo personal"],
        negatives: ["Control y manipulación en las relaciones", "Obsesión con el poder y los recursos ajenos", "Miedo profundo al abandono y la vulnerabilidad", "Tendencia a vivir en crisis constantes", "Dificultad para confiar y abrirse genuinamente"]
    },
    9: {
        title: "El Escenario de la Filosofía",
        scenario: "estudios superiores, viajes largos y la búsqueda de significado.",
        challenge: "Construir un sistema de creencias propio basado en la experiencia directa.",
        essence: "La expansión de la conciencia superior. Es la flecha lanzada al cielo buscando los porqués de la existencia.",
        manifestation: "Extranjero, universidades, filosofía, religión y la búsqueda de maestros espirituales.",
        shadow: "Dogmatismo fanático o búsqueda incesante para escapar de la realidad presente.",
        profile: "La Casa 9 rige la filosofía, los estudios superiores, los viajes largos, la religión y la búsqueda de significado. Es el escenario donde la mente trasciende lo cotidiano para buscar las verdades más amplias. Planetas aquí señalan una vida marcada por la búsqueda espiritual, la educación superior y el encuentro con otras culturas.",
        love: "En el amor, la Casa 9 atrae relaciones con personas de otras culturas, filosofías o que representan la expansión y la aventura. La compatibilidad filosófica y los valores compartidos son esenciales para quien tiene energía en esta casa. Las relaciones deben crecer y expandir la conciencia de ambos.",
        career: "Profesionalmente, la Casa 9 favorece la docencia universitaria, la filosofía, el derecho, la espiritualidad, el turismo internacional, la editorial, la fotografía y la comunicación de impacto mundial.",
        positives: ["Apertura mental y cultural excepcional", "Búsqueda genuina de sentido y sabiduría", "Capacidad de inspirar con visiones de largo alcance", "Optimismo y fe en el futuro", "Habilidad para integrar diversas perspectivas en una síntesis mayor"],
        negatives: ["Dogmatismo filosófico o religioso", "Huida de la realidad cotidiana hacia el horizonte lejano", "Intolerancia con visiones más limitadas", "Exceso de teoría con falta de aplicación práctica", "Promesas de un futuro brillante que nunca llegan"]
    },
    10: {
        title: "El Escenario del Propósito Público",
        scenario: "tu carrera, estatus social y tu contribución al mundo.",
        challenge: "Asumir la autoridad propia y caminar hacia tu cumbre con integridad.",
        essence: "El Medio Cielo (MC). Es la máxima visibilidad social y el legado que dejamos en la estructura del mundo.",
        manifestation: "Profesión, prestigio público, figuras de autoridad y nuestras metas a largo plazo.",
        shadow: "Ambición sin alma o identificación total con el estatus externo.",
        profile: "La Casa 10 es el MC (Medio Cielo): el punto más elevado de la carta y la máxima expresión pública de quién eres. Rige la carrera, la reputación, el estatus y el legado. El signo del MC indica el área donde puedes alcanzar mayor reconocimiento y la forma en que el mundo te percibe en tu mejor versión.",
        love: "En el amor, la Casa 10 puede indicar que las relaciones tienen un impacto en la reputación social o que la pareja es vista como parte del éxito o del fracaso público. Quien tiene mucho esta casa puede priorizar el trabajo y la carrera sobre la vida afectiva.",
        career: "Profesionalmente, la Casa 10 es la más importante: señala el área vocacional de mayor potencial de reconocimiento y legado. Indica el tipo de autoridad que ejerces naturalmente y el estilo de liderazgo que el mundo ve en ti.",
        positives: ["Ambición con propósito y dirección clara", "Capacidad de construir una reputación sólida", "Liderazgo visible y con impacto social real", "Disciplina para alcanzar metas a largo plazo", "Legado duradero en el campo profesional"],
        negatives: ["Identificación total del valor propio con el éxito externo", "Ambición que sacrifica la vida personal y afectiva", "Miedo al fracaso público que paraliza", "Workaholismo y adicción al rol profesional", "Dificultad para mostrar vulnerabilidad fuera del personaje público"]
    },
    11: {
        title: "El Escenario de los Grupos",
        scenario: "amigos, comunidades, ideales colectivos y proyectos futuros.",
        challenge: "Colaborar con otros sin perder tu singularidad, sirviendo a una visión común.",
        essence: "La conciencia colectiva. El espacio donde nos unimos con personas afines para transformar la realidad social.",
        manifestation: "Redes sociales, grupos de interés voluntario, planes a futuro y esperanzas.",
        shadow: "Rebelión vacía o dilución del yo en la masa ideológica.",
        profile: "La Casa 11 rige los grupos, las amistades, los ideales colectivos y las esperanzas de futuro. Es la casa de la visión: dónde contribuimos a algo más grande que nosotros mismos. Planetas aquí indican una vida activa en comunidades, movimientos o redes de personas afines con quienes se comparte una visión transformadora.",
        love: "En el amor, la Casa 11 puede indicar relaciones que nacen dentro de grupos de amigos o comunidades de intereses compartidos. La amistad como base del amor es fundamental. Planetas aquí pueden también señalar un estilo de amor que valora la libertad individual dentro del vínculo.",
        career: "Profesionalmente, la Casa 11 favorece vocaciones con impacto colectivo: activismo, ONGs, tecnología social, redes de colaboración, política progresista e innovación para el bien común.",
        positives: ["Capacidad de unir a personas con una visión común", "Red de contactos amplia y diversa", "Ideales genuinos que inspiran a colectivos", "Originalidad dentro de la colaboración grupal", "Esperanza y visión del futuro como motor de acción"],
        negatives: ["Dilución de la identidad en el grupo o la ideología", "Rebelión vacía sin propósito constructivo", "Dificultad para comprometerse con individuos concretos", "Utopismo que choca con la realidad práctica", "Frialdad emocional en nombre del ideal colectivo"]
    },
    12: {
        title: "El Escenario del Inconsciente",
        scenario: "la espiritualidad, la soledad y la conexión con la totalidad.",
        challenge: "Rendirse al misterio de la vida y encontrar la unidad en el silencio.",
        essence: "El útero cósmico y el fin del ciclo. Donde el ego individual se disuelve para reintegrarse en la conciencia universal.",
        manifestation: "Inconsciente colectivo, karma, soledad necesaria, retiros y misticismo silencioso.",
        shadow: "Escapismo crónico, confusión psíquica o sentimiento de ser víctima del destino.",
        profile: "La Casa 12 es la más misteriosa: rige el inconsciente profundo, el karma, los retiros, la espiritualidad y la disolución del ego. Planetas aquí operan desde las sombras: son energías que no se expresan fácilmente en el mundo exterior pero que ejercen una influencia enorme desde adentro. El trabajo con esta casa es profundamente espiritual y terapéutico.",
        love: "En el amor, la Casa 12 puede indicar relaciones secretas, conexiones kármicas muy intensas o amores que se desarrollan en la esfera de lo oculto o lo no dicho. Quien tiene planetas aquí ama desde una profundidad casi invisible, y a menudo elige relaciones que le permiten disolver el ego en el otro.",
        career: "Profesionalmente, la Casa 12 favorece vocaciones de entrega silenciosa: trabajo hospitalario, monástico o espiritual, arte como práctica meditativa, psicología profunda, trabajo con personas vulnerables y cualquier campo que implique servicio desde la invisibilidad.",
        positives: ["Profunda conexión con el mundo espiritual e invisible", "Empatía y compasión universales", "Capacidad de retiro y regeneración en la soledad", "Acceso al inconsciente colectivo como fuente creativa", "Rendición al misterio que trae una paz profunda"],
        negatives: ["Escapismo y evasión de la responsabilidad cotidiana", "Exceso de sacrificio que genera resentimiento", "Confusión entre intuición pura y proyección mental", "Tendencia al victimismo o al martirio", "Enemigos ocultos o sabotajes inconscientes propios"]
    }
};


