export interface FrequencyData {
    number: string;
    archetype: string;
    keyword: string;
    essence: string;
    profile: string;
    love: string;
    career: string;
    positives: string[];
    negatives: string[];
    lesson: string;
    mantra: string;
    advice: string;
}

export interface MasterNumberData {
    number: string;
    archetype: string;
    keyword: string;
    description: string;
    gift: string;
    challenge: string;
    love: string;
    career: string;
    mantra: string;
    advice: string;
}

export interface PinnaclePositionData {
    id: string;
    title: string;
    description: string;
    level: 'IDENTIDAD' | 'BRILLO' | 'MISTERIO' | 'SOMBRAS';
}

export const NUMEROLOGY_MANUAL = {
    intro: {
        title: "El Lenguaje del Universo",
        concept: "Todo en el universo vibra, y esa vibración tiene un número",
        content: "Bienvenido al estudio de las frecuencias. La numerología en NAOS no es una herramienta de adivinación, sino un lente para observar el orden oculto que sostiene la realidad. Los números no son etiquetas frías; son notas en la sinfonía de tu existencia. Al igual que una cuerda de guitarra produce un sonido diferente según su tensión, tu alma emite una frecuencia única basada en tu nombre y tu fecha de nacimiento.",
        reduction: {
            title: "La Reducción Teosófica",
            content: "Para entender este lenguaje, utilizamos la técnica de reducción: sumar los dígitos de un número hasta llegar a uno solo (del 1 al 9). Por ejemplo, si naciste un día 25, tu frecuencia base es 2 + 5 = 7.",
            masters_note: "Excepciones llamadas Números Maestros (11, 22, 33). Estos no se reducen inicialmente. Son energías de 'alto voltaje' que requieren madurez y conciencia para ser sostenidas, como una bombilla que debe aprender a brillar con mucha intensidad sin fundirse."
        }
    },
    frequencies: [
        {
            number: "1",
            archetype: "El Pionero",
            keyword: "Inicio · Voluntad · Identidad",
            essence: "La vibración del inicio, la voluntad, la independencia y la semilla que rompe la tierra para buscar el sol.",
            profile: "Quien vibra en el 1 lleva consigo la fuerza del primer impulso del cosmos. Es el número del yo en su estado más puro y poderoso, el ser que se atreve a dar el primer paso cuando el camino aún no existe. Su misión es forjar una identidad auténtica y liderar con el ejemplo, no con la imposición. La persona con esta frecuencia posee una voluntad de hierro y una creatividad que brota de manera espontánea. Su mayor aprendizaje es equilibrar la confianza en sí mismo con la apertura a la colaboración.",
            love: "En el amor, el 1 busca a un igual, alguien que pueda admirar y caminar a su lado sin necesitar ser guiado constantemente. Puede resultar dominante si no trabaja su ego. Necesita espacio y autonomía para mantenerse enamorado. Su amor es intenso y apasionado, pero a veces teme la dependencia. El reto es aprender a ser vulnerable sin sentirlo como una derrota.",
            career: "El 1 prospera en roles de liderazgo, emprendimiento y creación. Es el arquetipo del fundador, el director, el artista pionero y el innovador. Necesita proyectos donde tenga autonomía y visión propia. No trabaja bien bajo una gestión excesivamente controladora. Sus mejores entornos son aquellos donde puede dejar una marca original y ver el fruto directo de su esfuerzo.",
            positives: ["Liderazgo natural y carismático", "Creatividad e innovación constante", "Valentía para iniciar proyectos nuevos", "Determinación y fuerza de voluntad", "Confianza en sus propias capacidades"],
            negatives: ["Tendencia al egocentrismo", "Dificultad para delegar o pedir ayuda", "Impulsividad que genera errores", "Soledad por incapacidad de abrirse", "Terquedad ante las nuevas ideas ajenas"],
            lesson: "Aprender a caminar por mi propio pie sin esperar el permiso de nadie, y a reconocer que la fortaleza real incluye saber pedir ayuda.",
            mantra: "Yo elijo mi propio camino con determinación.",
            advice: "No esperes a estar listo, el camino se hace al caminar. Tu impulso inicial es tu brújula más confiable."
        },
        {
            number: "2",
            archetype: "El Mediador",
            keyword: "Cooperación · Sensibilidad · Armonía",
            essence: "La frecuencia de la dualidad, la sensibilidad, la cooperación y el susurro que une a las partes en conflicto.",
            profile: "El 2 es la conciencia que sabe que nada existe sin su opuesto. Es el puente, el diplomático, el que transforma el caos de dos fuerzas antagónicas en una danza ordenada. Quien vibra en esta frecuencia posee una percepción emocional extraordinaria; siente el estado de ánimo de una habitación antes de entrar en ella. Su don más profundo es la capacidad de hacer que los demás se sientan escuchados y comprendidos. Su reto central es aprender a existir sin disolverse en los deseos del otro.",
            love: "El 2 es el gran amante de la numerología. Vive por y para la conexión profunda. Es atento, considerado y recuerda los pequeños detalles que hacen sentir especial a su pareja. Sin embargo, su tendencia a la complacencia puede volverse una trampa: da tanto que puede llegar a perder su propia identidad. Necesita una pareja que lo valore y le recuerde constantemente su propio valor y singularidad.",
            career: "El 2 florece en entornos colaborativos donde su inteligencia emocional es valorada. Excelente para roles de mediación, terapia, recursos humanos, asesoramiento y apoyo estratégico. Es el poder detrás del trono: el consejero leal, el asistente brillante que hace funcionar la maquinaria. No disfruta del protagonismo, pero su contribución suele ser indispensable.",
            positives: ["Empatía y sensibilidad profunda", "Habilidad diplomática excepcional", "Lealtad y compromiso en las relaciones", "Capacidad de escucha y comprensión", "Inteligencia intuitiva y receptiva"],
            negatives: ["Dependencia emocional excesiva", "Dificultad para decir 'no' asertivamente", "Tendencia a la indecisión y duda", "Sensibilidad extrema a la crítica", "Pérdida de identidad por adaptarse a otros"],
            lesson: "Encontrar el equilibrio entre dar y recibir, reconociendo que mi propio valor no depende de la aprobación ajena.",
            mantra: "En la unión de los opuestos encuentro mi armonía.",
            advice: "Tu sensibilidad es tu superpoder, no una debilidad. Aprende a decir 'no' para que tu 'sí' sea verdadero y venga del corazón."
        },
        {
            number: "3",
            archetype: "El Comunicador",
            keyword: "Expresión · Alegría · Creatividad",
            essence: "La vibración de la autoexpresión, la alegría solar, la expansión creativa y el destello de la comunicación que inspira y conecta.",
            profile: "El 3 es la chispa de luz que ilumina cualquier conversación. Es el artista, el narrador, el animador del alma. Quien vibra en esta frecuencia tiene el don de ver el lado luminoso de la vida y de convertir esa visión en palabras, imágenes o canciones que elevan a quienes los rodean. Su creatividad es explosiva e instintiva. Su reto es la disciplina: aprender a canalizar ese torrente de ideas en proyectos concretos que vean la luz del día.",
            love: "El 3 es un compañero encantador, lleno de humor, afecto y sorpresas. Llena los espacios de risas y momentos memorables. El problema surge cuando usa el humor para evadir conversaciones emocionalmente difíciles. Necesita una pareja que lo inspire intelectualmente y que no lo agobie con demandas de seriedad excesiva. Su amor es genuino pero necesita libertad creativa para no sentirse enjaulado.",
            career: "El 3 prospera en cualquier campo donde la expresión sea el medio: escritura, actuación, música, publicidad, diseño, enseñanza y redes sociales. Es el comunicador nato que puede vender ideas con una facilidad asombrosa. Su reto vocacional es evitar la superficialidad y comprometerse con un proyecto lo suficiente para llevarlo a su máxima expresión.",
            positives: ["Optimismo y alegría contagiosos", "Don natural para la comunicación y el arte", "Imaginación desbordante", "Sociabilidad y carisma genuinos", "Capacidad de inspirar y motivar a otros"],
            negatives: ["Dispersión entre múltiples proyectos", "Superficialidad emocional como mecanismo de defensa", "Tendencia al drama para llamar la atención", "Dificultad para terminar lo que empieza", "Crítica severa de los propios trabajos"],
            lesson: "Expresar mi verdad completa con el corazón, no solo la parte alegre, permitiendo que mi vulnerabilidad también se convierta en arte.",
            mantra: "Mi voz es un canal de alegría y verdad.",
            advice: "No temas a tu propia luz. El mundo necesita tu sonrisa, pero también necesita tu profundidad. Deja que ambas coexistan."
        },
        {
            number: "4",
            archetype: "El Constructor",
            keyword: "Orden · Disciplina · Fundamentos",
            essence: "La frecuencia del orden cósmico, la estructura, el trabajo constante y la raíz que sostiene el árbol para que pueda tocar el cielo.",
            profile: "El 4 es la columna vertebral de la realidad. Es la energía que toma los sueños y los convierte en planos arquitectónicos. Quien vibra en esta frecuencia tiene una capacidad innata para crear sistemas, organizar el caos y construir sobre bases sólidas. Es el arquetipo del maestro artesano: paciente, meticuloso y profundamente honesto. Su reto es aprender que la rigidez es la enemiga de la maestría, y que los mejores cimientos son aquellos que permiten el movimiento.",
            love: "El 4 es un compañero leal, confiable y dedicado hasta la médula. Cuando ama, construye: un hogar, una rutina, una vida conjunta sólida. No es el más expresivo emocionalmente, pero sus actos son su lenguaje de amor. Su reto es aprender a soltar el control y confiar en el flujo natural de la relación. Necesita una pareja que aprecie la estabilidad y que entienda que su lealtad silenciosa vale más que mil palabras.",
            career: "El 4 es el especialista, el experto, el profesional al que se llama para resolver problemas concretos. Destaca en ingeniería, arquitectura, contabilidad, derecho, gestión de proyectos, artesanía y cualquier disciplina que exija precisión y método. Su ética de trabajo es legendaria. Puede llegar a lo más alto en su campo si aprende a delegar y a no perder el bosque por mirar los árboles.",
            positives: ["Disciplina y constancia extraordinaria", "Confiabilidad y honestidad a prueba de fuego", "Sentido práctico y capacidad de concretar", "Habilidad para crear sistemas y estructuras duraderas", "Paciencia y perseverancia ante los obstáculos"],
            negatives: ["Rigidez mental y resistencia al cambio", "Tendencia al pesimismo y la negatividad", "Trabajo excesivo como forma de evitar las emociones", "Dificultad para ver las soluciones creativas", "Control y perfeccionismo paralizante"],
            lesson: "Comprender que la estructura es el camino hacia la libertad, no su opuesto, y que el cambio no destruye, transforma.",
            mantra: "Construyo sobre cimientos sólidos para ser libre.",
            advice: "La constancia vence lo que la dicha no alcanza. No subestimes el poder de los pequeños pasos diarios. Tu ritmo es tu mayor fortaleza."
        },
        {
            number: "5",
            archetype: "El Buscador de Libertad",
            keyword: "Cambio · Aventura · Magnetismo",
            essence: "La vibración del cambio, la aventura perpetua, la curiosidad insaciable y el viento que no acepta prisiones de ningún tipo.",
            profile: "El 5 es el espíritu más libre del universo numerológico. Es la energía del explorador, del periodista, del viajero del alma que necesita probar, tocar, sentir y experimentar para verdaderamente conocer. Quien vibra en esta frecuencia aprende a través de la experiencia directa y posee un magnetismo personal que atrae a personas diversas a su campo gravitacional. Su reto más profundo es aprender que la libertad más real no es la ausencia de compromiso, sino la habilidad de elegir profundamente.",
            love: "El 5 es un amante intenso y apasionado en el momento presente, pero la rutina es su mayor enemigo dentro de una relación. Necesita una conexión que se renueve constantemente, que sorprenda, que evolucione. No es infiel por naturaleza, pero puede serlo si se siente enjaulado. Necesita una pareja tan apasionada por la vida como él, que entienda que el espacio no es distancia, sino la condición para que el amor florezca.",
            career: "El 5 no fue diseñado para el escritorio de 9 a 5. Prospera en roles con variedad, movimiento y estímulo constante: periodismo de campo, ventas de alto impacto, turismo, diplomacia, actuación, marketing digital, política y emprendimiento. Es el mejor vendedor del zodíaco numerológico porque cree genuinamente en lo que comunica. Su reto es la constancia para llevar los proyectos hasta el final.",
            positives: ["Adaptabilidad y versatilidad únicas", "Magnetismo personal y encanto natural", "Aprende rápido de múltiples experiencias", "Apertura mental y cosmopolitismo", "Ingenio para resolver problemas de forma creativa"],
            negatives: ["Impulsividad que genera decisiones apresuradas", "Falta de compromiso y tendencia a dispersarse", "Uso de los excesos como escape emocional", "Dificultad para la introspección y la calma", "Huida de la responsabilidad cuando la situación se complica"],
            lesson: "Aprender a ser libre siendo el dueño de mis propios límites, descubriendo que el compromiso más profundo es el mayor acto de valentía.",
            mantra: "La libertad espiritual es mi estado natural.",
            advice: "El cambio es la única constante, sí. Pero el arte está en saber cuándo cambiar de dirección y cuándo hundir las raíces."
        },
        {
            number: "6",
            archetype: "El Sanador",
            keyword: "Amor · Responsabilidad · Belleza",
            essence: "La frecuencia de la responsabilidad sagrada, el amor incondicional que nutre, la familia y el nido que protege y embellece.",
            profile: "El 6 es el corazón de la numerología. Es el guardián del hogar, el sanador de heridas, el artista de la convivencia. Quien vibra en esta frecuencia tiene un imán para las personas que necesitan apoyo emocional, y una capacidad innata para crear ambientes de belleza y armonía. Su misión de vida está profundamente entrelazada con el servicio y el cuidado. Su mayor reto es aprender a establecer límites para no convertir su amor en una trampa de sacrificio y resentimiento.",
            love: "El 6 fue hecho para el amor profundo y la construcción de un proyecto de vida compartido. Es el compañero más atento, generoso y comprometido de toda la numerología. Sin embargo, su perfeccionismo puede llevarlo a una crítica sutil aunque constante de los seres queridos. Necesita aprender que el amor auténtico acepta la imperfección. Su mayor alegría es ver florecer a quienes ama.",
            career: "El 6 destaca en cualquier vocación de servicio: medicina, psicología, enfermería, trabajo social, enseñanza, diseño de interiores, gastronomía, jardinería y arte terapéutico. Su sentido estético es refinado y puede brillar también en el diseño de moda o la decoración. Necesita sentir que su trabajo tiene un impacto positivo en la vida de otros; sin ese propósito, pierde la motivación.",
            positives: ["Amor incondicional y generosidad genuina", "Sentido estético y artístico muy desarrollado", "Responsabilidad y compromiso inquebrantables", "Gran capacidad de sanación y apoyo emocional", "Habilidad para crear belleza y armonía en cualquier entorno"],
            negatives: ["Perfeccionismo que se vuelve control disfrazado", "Tendencia al martirio y al sacrificio innecesario", "Dificultad para establecer límites saludables", "Chantaje emocional sutil cuando se siente poco valorado", "Intromisión en los asuntos de otros bajo la máscara del cuidado"],
            lesson: "Aprender a cuidarme con la misma ternura con la que cuido a los demás, entendiendo que mi bienestar es la condición para poder dar.",
            mantra: "Soy un canal de amor y equilibrio.",
            advice: "No puedes dar lo que no tienes. Asegúrate de que tu propia copa esté llena antes de intentar nutrir a los demás."
        },
        {
            number: "7",
            archetype: "El Sabio",
            keyword: "Introspección · Análisis · Misterio",
            essence: "La vibración de la introspección profunda, el análisis agudo, la fe mística y el silencio sagrado del templo interior.",
            profile: "El 7 es el gran buscador de la verdad. Mientras otros miran la superficie, el 7 perfora capas hasta llegar al núcleo de la realidad. Es el científico, el filósofo, el monje y el detective espiritual. Quien vibra con esta frecuencia necesita tiempo y silencio para procesar la vida; el ruido excesivo lo disminuye. Su riqueza interior es inconmensurable, pero su reto es aprender a compartirla en lugar de quedarse solo con su tesorero interno.",
            love: "El 7 no ama de manera sencilla ni superficial. Cuando abre su mundo interior a alguien, es porque ha encontrado un ser que considera digno de ese honor. Necesita una pareja que respete su necesidad de soledad y silencio, que no lo presione constantemente para que 'se abra'. Su distancia emocional suele ser malinterpretada. En el fondo, es uno de los seres más leales y profundos cuando encuentra una conexión verdadera.",
            career: "El 7 prospera en campos que requieren profundidad, análisis e investigación: ciencia, filosofía, psicología analítica, teología, astrología, escritura de no ficción, tecnología especializada y cualquier disciplina que explore el 'porqué' de las cosas. No le gustan los trabajos de cara al público; prefiere el laboratorio, la biblioteca, el estudio propio como espacio sagrado de creación.",
            positives: ["Mente analítica brillante y profunda", "Conexión espiritual y filosófica natural", "Capacidad de investigación e introspección", "Sabiduría que trasciende la educación formal", "Originalidad de pensamiento que abre nuevos paradigmas"],
            negatives: ["Aislamiento social como mecanismo de defensa", "Frialdad emocional que aleja a los seres queridos", "Cinismo y desconfianza como coraza", "Tendencia a quedar paralizado en laberintos mentales", "Dificultad para actuar sin análisis previo exhaustivo"],
            lesson: "Confiar en mi sabiduría interna y en el flujo invisible de la vida, aprendiendo que la conexión con otros no es una distracción sino una parte de la verdad.",
            mantra: "En el silencio escucho la voz de la verdad.",
            advice: "No permitas que tu mente se convierta en una prisión. La verdadera sabiduría incluye también la inteligencia del corazón."
        },
        {
            number: "8",
            archetype: "El Manifestador",
            keyword: "Poder · Abundancia · Justicia",
            essence: "La frecuencia del poder personal, la autoridad ganada con mérito, el equilibrio perfecto entre el mundo material y el espiritual.",
            profile: "El 8 es el número del logro material y de la justicia cósmica. Es el arquetipo del ejecutivo con alma, del emprendedor que construye imperios para servir a un propósito mayor. Quien vibra en esta frecuencia tiene una capacidad innata para entender los sistemas de poder, el dinero y la organización. Su energía es imponente y su presencia, magnética. Su lección más importante es que el poder verdadero llega cuando se utiliza en beneficio de los demás, no para la acumulación personal.",
            love: "El 8 en el amor es tan intenso como en los negocios: comprometido, protector y generoso materialmente. Sin embargo, su tendencia al control y su adicción al trabajo pueden crear una distancia real con su pareja. Necesita aprender que el amor no es un contrato que se puede gestionar, sino un flujo que se nutre con presencia y vulnerabilidad. Su pareja ideal es alguien seguro de sí mismo que no se sienta intimidado por la fuerza del 8.",
            career: "El 8 es el arquetipo del empresario, el director ejecutivo, el abogado, el juez, el banquero y el político con visión. Cualquier campo donde se gestione el poder, los recursos o la justicia es su territorio natural. También puede brillar como cirujano, atleta de élite o líder espiritual. Necesita metas grandes para mantenerse motivado; los proyectos pequeños le aburren.",
            positives: ["Capacidad ejecutiva y de liderazgo excepcional", "Inteligencia para los negocios y las finanzas", "Determinación para alcanzar metas ambiciosas", "Sentido de la justicia y la ética profundos", "Poder de manifestación material extraordinario"],
            negatives: ["Adicción al trabajo y al éxito como validación", "Tendencia al control y la rigidez", "Materialismo que puede nublar los valores espirituales", "Arrogancia cuando el ego no está integrado", "Dificultad para perdonar los errores propios y ajenos"],
            lesson: "Aprender que el verdadero éxito llega cuando mi ambición sirve a un propósito mayor que mi ego personal.",
            mantra: "Manejo el poder con integridad y al servicio del bien mayor.",
            advice: "La verdadera abundancia es un flujo, no una acumulación. Practica el equilibrio entre el mundo físico y el espiritual cada día."
        },
        {
            number: "9",
            archetype: "El Humanista",
            keyword: "Compasión · Desapego · Universalidad",
            essence: "La vibración del amor universal, la compasión que no discrimina, el desapego sabio y el puente que conecta lo humano con lo divino.",
            profile: "El 9 es el número que contiene a todos los demás. Es el sabio que ha completado el ciclo de la experiencia terrena y regresa al origen con las manos llenas de comprensión. Quien vibra en esta frecuencia tiene un corazón tan grande que puede abrazar el dolor del mundo sin romperse. Su misión no es para el beneficio propio, sino para el de la humanidad. Su reto más profundo es soltar: personas, situaciones, identidades que ya no sirven, para que pueda seguir fluyendo.",
            love: "El 9 ama de manera profunda y universal, pero a veces esto puede volverse un obstáculo en el amor romántico. Su amor es tan incondicional que puede perder de vista sus propias necesidades. Necesita aprender a elegir una pareja que también tenga un propósito elevado, con quien pueda construir algo que trascienda la pareja misma. Su mayor reto en el amor es el desapego: comprometerse plenamente sin aferrarse con miedo.",
            career: "El 9 necesita una vocación que sirva a los demás: medicina holística, arte con propósito social, activismo, filantropía, trabajo misionero, educación transformadora y psicología espiritual. El dinero no es su motor principal, aunque curiosamente la abundancia lo encuentra cuando sirve desde su más alta expresión. Su trabajo más importante es ser un faro de humanidad en un mundo que a veces olvida lo que significa.",
            positives: ["Compasión y generosidad sin límites ni condiciones", "Visión global y conciencia humanitaria", "Profunda comprensión del alma humana", "Creatividad al servicio de un propósito mayor", "Capacidad de perdonar y sanar ciclos kármicos"],
            negatives: ["Martirio y sacrificio como identidad", "Desconexión de la realidad práctica y del cuerpo", "Dificultad para recibir y pedir ayuda", "Aferramiento al pasado como forma de evitar el cierre", "Idealismo que roza la ingenuidad peligrosa"],
            lesson: "Cerrar ciclos con gratitud y entregar mis talentos al servicio del mundo, confiando en que la vida siempre proveerá lo que mi alma necesita.",
            mantra: "Suelto con amor para abrazar lo nuevo.",
            advice: "Eres un ciudadano del cosmos. Confía en el proceso del desapego; no perderás nada que realmente te pertenezca."
        }
    ],
    masters: [
        {
            number: "11",
            archetype: "El Iluminador",
            keyword: "Inspiración · Canal · Conciencia",
            description: "Es la conexión directa entre lo divino y lo humano. Si el 2 (1+1) es el mediador, el 11 es el canal de descarga de la conciencia superior. Estas personas no reciben ideas; reciben transmisiones. Su misión es ser un puente entre dos mundos: el visible y el invisible.",
            gift: "Intuición de nivel profético, capacidad de inspirar despertares masivos con una sola frase y una sensibilidad que capta lo que está por venir mucho antes de que ocurra.",
            challenge: "El nerviosismo crónico, la ansiedad de no saber cómo manejar tanta información interna, la duda sobre si su 'voz' es real o imaginada, y la sensación profunda de no pertenecer a este mundo.",
            love: "El 11 necesita una conexión que sea también espiritual. No se satisface con el amor ordinario; busca el amor que despierte algo en ambos. Su pareja debe entender su necesidad de retiro, su hipersensibilidad y sus períodos de 'descarga'. Cuando encuentra esa conexión, su amor es capaz de despertar mundos enteros.",
            career: "El 11 puede brillar como guía espiritual, artista visionario, psicólogo, sanador, maestro transformador, filósofo, poeta o cualquier rol donde su transmisión directa de conciencia pueda impactar a otros. Su trabajo más importante es aprender a confiar en sus propias transmisiones.",
            mantra: "Soy un canal de luz y conciencia despertadora.",
            advice: "Aterriza tus visiones en la materia. Tu luz solo sirve si está encendida en este mundo. Cuida tu sistema nervioso como el instrumento sagrado que es."
        },
        {
            number: "22",
            archetype: "El Constructor Maestro",
            keyword: "Visión · Materialización · Legado",
            description: "Es la capacidad de bajar los sueños más elevados a la tierra y hacerlos realidad a escala global. Si el 4 (2+2) construye una casa, el 22 construye un sistema, una institución, un movimiento que beneficia a miles de generaciones. Su misión es ser el arquitecto de un nuevo paradigma.",
            gift: "Pragmatismo espiritual de élite, visión ilimitada que no pierde el contacto con la tierra y la capacidad de organizar el caos de las grandes ideas en estructuras duraderas que trascienden al individuo.",
            challenge: "El miedo paralizante a su propio poder, la sensación de carga desproporcionada, la tendencia a operar en la frecuencia baja del 4 (rigidez, trabajo excesivo) cuando la presión se vuelve insoportable.",
            love: "El 22 necesita una pareja que entienda que su misión no es un hobby sino una llamada del alma. Es leal y comprometido, pero su mente siempre está diseñando el siguiente gran proyecto. Necesita ser amado en su totalidad: con su ambición, su visión y sus miedos.",
            career: "El 22 puede ser arquitecto de civilizaciones: político transformador, fundador de organizaciones internacionales, inventor de sistemas que cambian el mundo, maestro de maestros o CEO de empresas con impacto global. Su vocación es siempre de largo plazo y de escala masiva.",
            mantra: "Materializo visiones elevadas para el bien mayor.",
            advice: "No temas a la magnitud de tus sueños. Tienes la capacidad innata de organizar el caos en estructuras de luz. Empieza con el primer ladrillo."
        },
        {
            number: "33",
            archetype: "El Maestro del Amor",
            keyword: "Amor Universal · Sanación · Sacrificio Consciente",
            description: "Es la vibración del avatar: el amor incondicional en su máxima expresión encarnada. Si el 6 (3+3) cuida de su familia, el 33 cuida de toda la vida. No es solo un número; es una responsabilidad cósmica. Raramente se encuentra en su frecuencia plena antes de los 40 años.",
            gift: "Compasión absoluta que regenera desde el interior, capacidad de sanar a través de la simple presencia y el don de transmitir amor de una manera tan pura que transforma todo lo que toca.",
            challenge: "La autoinmolación egoica camuflada de virtud, el complejo de mártir que sabotea la salud propia, y la hipersensibilidad al dolor del mundo que puede resultar en debilidad o inacción.",
            love: "El 33 en el amor es el amante más compasivo y desinteresado de toda la numerología. Sin embargo, su reto más profundo es este: ¿puede recibir tanto como da? Necesita aprender que aceptar amor es tan sagrado como entregarlo.",
            career: "El 33 puede operar como sanador de almas a gran escala: chamán urbano, artista espiritual, líder de movimientos de amor y paz, médico o terapeuta que cura desde la presencia. Su 'trabajo' más verdadero no suele estar en el mercado laboral convencional.",
            mantra: "Soy un faro de amor incondicional y sanación.",
            advice: "Tu amor es infinito, pero tu cuerpo físico no lo es. Cuida tu envase con la misma devoción con la que cuidas al mundo: es el templo desde el que operas."
        }
    ],
    pinnacle: {
        title: "El Pináculo del Destino: Tu Geometría Sagrada",
        intro: "Tu código o 'árbol de vida numerológico' se construye a partir de tu fecha de nacimiento (A: Mes, B: Día, C: Año). A través de la alquimia de estos tres pilares —sumando para ascender hacia el espíritu y restando para descender hacia las sombras— NAOS revela los 15 pilares fundamentales de tu Arquitectura del Alma.",
        positions: [
            { id: 'A', title: 'Mes (Karma)', level: 'IDENTIDAD', description: 'Tu energía de acción externa y el aprendizaje que vienes a equilibrar en tu relación con el mundo.' },
            { id: 'B', title: 'Día (Personalidad)', level: 'IDENTIDAD', description: 'Tu esencia en acción, la primera impresión que proyectas y cómo interactúas con tu entorno social.' },
            { id: 'C', title: 'Vidas Pasadas (Año)', level: 'IDENTIDAD', description: 'La sabiduría acumulada y los talentos dormidos de encarnaciones previas; lo que ya dominas de forma innata.' },
            { id: 'D', title: 'Esencia', level: 'IDENTIDAD', description: 'Tu núcleo divino. Es quien eres cuando estás a solas, sin máscaras. Tu verdadera naturaleza profunda.' },
            { id: 'E', title: 'Regalo Divino', level: 'BRILLO', description: 'Un talento especial que el universo te concede "gratis" para apoyarte en esta encarnación.' },
            { id: 'F', title: 'Destino', level: 'BRILLO', description: 'La dirección hacia la que te empuja tu alma. No es opcional; es tu norte inevitable.' },
            { id: 'G', title: 'Misión de Vida', level: 'BRILLO', description: 'Tu propósito central. El "para qué" estás aquí y la contribución que vienes a entregar.' },
            { id: 'H', title: 'Realización', level: 'BRILLO', description: 'El logro máximo de tu espíritu. Es la cima de tu montaña personal.' },
            { id: 'I', title: 'Subconsciente', level: 'MISTERIO', description: 'Los deseos ocultos y los motores internos que te mueven sin que te des cuenta.' },
            { id: 'J', title: 'Inconsciente', level: 'MISTERIO', description: 'Tus reacciones automáticas ante el estrés y la memoria más antigua de tu alma.' },
            { id: 'P', title: 'Sombra Inmediata', level: 'SOMBRAS', description: 'Tu primer gran bloqueo. Aquello que parece detenerte apenas intentas avanzar.' },
            { id: 'O', title: 'Inconsciente Negativo', level: 'SOMBRAS', description: 'Patrones repetitivos y dañinos que heredas de tu historia personal.' },
            { id: 'Q', title: 'Ser Inferior Heredado', level: 'SOMBRAS', description: 'Cargas y nudos ancestrales de tu linaje que vienes a desatar.' },
            { id: 'R', title: 'Ser Inferior Consciente', level: 'SOMBRAS', description: 'Esos defectos que ya conoces de ti mismo, pero que te cuesta trabajo transformar.' },
            { id: 'S', title: 'Ser Inferior Latente', level: 'SOMBRAS', description: 'El "enemigo oculto". El desafío final que solo se revela cuando has dominado los anteriores.' }
        ]
    },
    integration: {
        title: "Integración: Cómo Leer tu Código",
        content: "Tu arquitectura es una interacción dinámica de estas vibraciones. No somos una sola nota, somos un acorde. Por ejemplo, podrías tener un Número de Alma 5 (que ama la libertad y la aventura) viajando por un Camino de Vida 4 (una carretera que pide estructura y orden). Esto no es una contradicción, es tu diseño: tu misión es encontrar la expansión del 5 dentro de la estabilidad del 4. Construir una base sólida para que tu libertad pueda volar sin caerse.",
        closing: "Te invitamos a ver tus números con compasión. No hay códigos fallidos, solo partituras esperando ser interpretadas con amor y curiosidad. Eres el director de tu frecuencia. Vibra con intención."
    }
};
