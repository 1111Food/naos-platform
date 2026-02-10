export interface PositionInterpretation {
    archetype: string;
    blocks: string[];
}

export const PINNACLE_INTERPRETATIONS: Record<number, PositionInterpretation> = {
    1: {
        archetype: "El Iniciador / El Mago",
        blocks: [
            "Esencialmente independiente, original, creativo y autodirigido. Poseen una chispa de innovación que los empuja a abrir caminos donde otros solo ven muros. Son líderes naturales que valoran su autonomía por encima de todo, portando la energía del 'Yo Soy' con una determinación inquebrantable.",
            "Esta vibración suele desarrollarse a partir de una infancia donde el individuo sintió la necesidad de valerse por sí mismo prematuramente, quizás ante figuras de autoridad ausentes o excesivamente dominantes. Creció con el imperativo psíquico de forjar su propia identidad para no ser absorbido por el entorno.",
            "Su reto radica en la propensión al aislamiento egoísta o la arrogancia ante quienes no siguen su ritmo. La sombra del 1 es el miedo paralizante al fracaso, que puede manifestarse como una tiranía defensiva o una incapacidad de colaborar, creyendo que pedir ayuda es una claudicación de su poder."
        ]
    },
    2: {
        archetype: "El Colaborador / La Gran Madre",
        blocks: [
            "Esencialmente diplomático, sensible, intuitivo y mediador. Poseen una capacidad única para percibir las corrientes emocionales subterráneas y armonizar conflictos. Son el pegamento que une comunidades, valorando la conexión y el equilibrio como pilares fundamentales de su existencia.",
            "Esta vibración surge a menudo en entornos donde el niño actuó como mediador en conflictos de pareja de sus cuidadores o donde la armonía dependía de su capacidad de adaptación. Desarrolló una antena emocional hipersensible para detectar cambios en el humor del entorno antes de que ocurrieran.",
            "Los demás los perciben como seres de gran calidez, pero su sombra radica en la dependencia emocional y el miedo al rechazo. El reto del 2 es evitar el victimismo o la manipulación pasivo-agresiva, aprendiendo a poner límites sanos sin sentir que la desaprobación ajena anula su propio valor."
        ]
    },
    3: {
        archetype: "El Comunicador / El Niño Divino",
        blocks: [
            "Esencialmente expresivo, sociable, creativo y optimista. Poseen el don de la palabra y el arte de embellecer la realidad. Son los portadores de la alegría y la inspiración, con una mente que salta entre ideas brillantes y una necesidad vital de compartir su mundo interior con los demás.",
            "Esta vibración suele originarse en una infancia donde la autoexpresión fue la principal vía para obtener atención o donde, por el contrario, hubo una falta de espacios para ser escuchado. El individuo aprendió que agradar a través del ingenio o el arte era su moneda de cambio más valiosa.",
            "Su reto radica en la dispersión y la superficialidad. La sombra del 3 es el uso de la máscara social para ocultar un vacío interior profundo. Pueden caer en el chisme, la vanidad extrema o la falta de compromiso, huyendo de la introspección dolorosa a través de una hiperactividad social incesante."
        ]
    },
    4: {
        archetype: "El Constructor / El Arquitecto",
        blocks: [
            "Esencialmente metódico, disciplinado, confiable y pragmático. Poseen una capacidad excepcional para dar forma a las ideas y construir estructuras duraderas. Son la roca de estabilidad en cualquier sistema, valorando el orden, el esfuerzo y la lealtad por encima de la gratificación inmediata.",
            "Esta vibración se gesta comúnmente en hogares con reglas rígidas o situaciones de carencia que obligaron al niño a buscar seguridad en lo tangible. Creció necesitando el control del entorno material como una forma de calmar una ansiedad profunda por la incertidumbre o el caos.",
            "Los demás los perciben como seres inquebrantables, pero su reto es la rigidez mental. La sombra del 4 es la terquedad que los lleva a cerrarse a nuevas perspectivas por miedo al cambio. Pueden volverse tiránicos con el detalle o tacaños emocionales, asfixiados por su propio reglamento interno."
        ]
    },
    5: {
        archetype: "El Viajero / El Buscador de Libertad",
        blocks: [
            "Esencialmente versátil, aventurero, magnético y curioso. Poseen una necesidad intrínseca de experimentar la vida a través de todos los sentidos. Son los catalizadores del cambio, impulsando la evolución a través de la ruptura de viejas estructuras y la búsqueda incesante de nuevos horizontes.",
            "Esta vibración suele desarrollarse como respuesta a una infancia percibida como asfixiante o rutinaria. El individuo aprendió que la única forma de preservar su esencia era el movimiento constante, desarrollando una fobia psíquica al compromiso que sintiera como una jaula o una limitación de su expansión.",
            "Su reto radica en la impulsividad y la falta de raíces. La sombra del 5 es la evasión sistemática a través de excesos o cambios erráticos. El miedo a la profundidad emocional los lleva a saltar de una experiencia a otra, dejando tras de sí un rastro de proyectos y relaciones inacabadas por temor a ser 'atrapados'."
        ]
    },
    6: {
        archetype: "El Protector / El Sanador",
        blocks: [
            "Esencialmente responsable, amoroso, idealista y protector. Poseen un instinto natural para el cuidado de la familia y la comunidad. Son los guardianes de la armonía doméstica y la justicia social, valorando la belleza y el servicio desinteresado como el propósito más alto de la vida.",
            "Esta vibración se nutre en infancias donde el niño asumió responsabilidades de adulto (parentalización) o donde el amor estaba condicionado a su utilidad como cuidador. Creció creyendo que su valor depende de cuánto puede 'salvar' o 'arreglar' la vida de quienes ama.",
            "Los demás los ven como pilares de apoyo, pero su sombra es la intromisión y la codependencia. El reto del 6 es soltar el perfeccionismo exigido a los demás y aprender que el sacrificio mártir no compra el amor. Deben cuidarse de la amargura que surge cuando el entorno no cumple con sus elevados ideales de 'perfección amorosa'."
        ]
    },
    7: {
        archetype: "El Sabio / El Místico",
        blocks: [
            "Esencialmente analítico, detallista, intuitivo y selectivo. Poseen una mente fotográfica y una curiosidad intelectual inagotable. Son los grandes pensadores y estudiosos, buscando descifrar los enigmas de la vida. Nada escapa a su poder de observación y su búsqueda de la perfección.",
            "Esta vibración suele desarrollarse porque desde pequeño percibió situaciones de indecisión o fragilidad en sus figuras de autoridad. Creció necesitando asegurarse de que todo siga un orden y un reglamento, poniendo el 'deber ser' por encima del 'querer ser' para mantener un control psíquico sobre el entorno.",
            "Los demás los perciben como seres de inteligencia y madurez sobresaliente, reservados y enigmáticos. Su reto radica en que su visión excesiva de los 'contras' les impide tomar decisiones, paralizándose por el análisis. La sombra del 7 es el aislamiento gélido y el escepticismo que los desconecta de su propia humanidad."
        ]
    },
    8: {
        archetype: "El Guerrero / El Alquimista del Poder",
        blocks: [
            "Esencialmente ambicioso, autoritario, eficiente y visionario. Poseen una capacidad innata para manejar el poder, el dinero y los recursos a gran escala. Son los grandes ejecutores del destino material, entendiendo las leyes de causa y efecto con una claridad pragmática que inspira respeto.",
            "Esta vibración suele forjarse en entornos de competencia intensa o ante la presencia de un padre/madre muy dominante que impuso un estándar de éxito implacable. El individuo aprendió que el poder y el estatus son la única garantía de seguridad y respeto en un mundo percibido como una lucha constante.",
            "Su reto radica en la tiranía y la ambición desmedida. La sombra del 8 es la pérdida de la escrupulosidad en la búsqueda del éxito, convirtiendo el fin en la única justificación de los medios. Deben evitar la autodestrucción por estrés o la soledad que genera el ver a los demás solo como recursos para sus metas."
        ]
    },
    9: {
        archetype: "El Humanitario / El Viejo Sabio",
        blocks: [
            "Esencialmente compasivo, universalista, idealista y desapegado. Poseen una conciencia transpersonal que los lleva a preocuparse por el bienestar colectivo. Son los portadores de la sabiduría de cierre de ciclos, valorando la tolerancia y el perdón como las herramientas finales de evolución del alma.",
            "Esta vibración suele aparecer en infancias donde el individuo se sintió como 'el viejo del hogar' o donde experimentó pérdidas tempranas que lo obligaron a entender la impermanencia. Aprendió a desarrollar una visión global para no ser aplastado por los dramas emocionales inmediatos.",
            "Los demás los ven como seres de gran luz y guía, pero su sombra es la amargura existencial. El reto del 9 es soltar el papel de salvador del mundo para no descuidar su propia vida. El miedo al desapego puede manifestarse como una confusión mental o una tristeza profunda al ver la imperfección humana."
        ]
    },
    11: {
        archetype: "El Mensajero de Luz / El Visionario",
        blocks: [
            "Esencialmente inspirador, intuitivo, idealista y carismático. Poseen una sensibilidad psíquica que les permite actuar como canales de verdades superiores. Son los visionarios de la Nueva Era, portando una energía eléctrica que sacude la conciencia de quienes los rodean.",
            "Esta vibración se activa en quienes desde pequeños se sintieron 'diferentes' o 'fuera de lugar', percibiendo realidades que los adultos ignoraban. El individuo creció con una tensión nerviosa constante, intentando conciliar su mundo visionario con la densidad de la realidad ordinaria.",
            "Su reto es la inestabilidad emocional y el fanatismo. La sombra del 11 es el desequilibrio nervioso por exceso de estímulos psíquicos. Pueden caer en el elitismo espiritual o en la parálisis por miedo a su propio poder, refugiándose en una fantasía mística para no enfrentar la responsabilidad de su mensaje."
        ]
    },
    22: {
        archetype: "El Maestro Constructor Universal",
        blocks: [
            "Esencialmente poderoso, pragmático, altruista y visionario. Poseen la maestría necesaria para materializar grandes proyectos que beneficien a la humanidad. Son los arquitectos de sistemas globales, combinando la mística del 11 con la estructura sólida del 4 en una escala masiva.",
            "Esta vibración suele nacer de legados familiares de gran peso o de infancias marcadas por la exigencia de grandeza. El individuo aprendió que no podía permitirse ser 'ordinario', cargando con el imperativo de dejar una huella física y sistémica que perdure más allá de su propia vida.",
            "Su reto radica en la presión interna aplastante y la ambición material mal canalizada. La sombra del 22 es la caída en la codicia de poder puro o el colapso por agotamiento. Al intentar llevar el mundo sobre sus hombros, pueden volverse fríos, calculadores y distantes de las necesidades humanas básicas."
        ]
    },
    33: {
        archetype: "El Maestro del Amor Universal",
        blocks: [
            "Esencialmente compasivo, sacrificado, sanador y protector. Poseen la vibración más alta de servicio amoroso, actuando como faros de luz incondicional. Son los maestros del corazón, cuya mera presencia genera un espacio de perdón y sanación profunda para el colectivo.",
            "Esta vibración, extremadamente rara y demandante, suele activarse tras experiencias de gran dolor que obligaron al alma a elegir entre el rencor ciego o la redención total. El individuo aprendió que el amor es la única fuerza real capaz de transmutar la sombra del mundo.",
            "Su reto es la hipersensibilidad extrema al sufrimiento ajeno. La sombra del 33 es la autoinmolación y el complejo de mártir. Pueden ser asfixiados por la demanda de ayuda del entorno, cayendo en la melancolía profunda o en la evasión mística si no logran anclar su inmenso amor en una disciplina terrenal sólida."
        ]
    }
};
