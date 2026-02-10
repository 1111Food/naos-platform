export interface ChineseZodiacWisdom {
    title: string;
    element_fixed: string;
    totem_essence: string;
    totem_shadow: string;
    forecast_2026_title: string;
    forecast_general: string;
    forecast_love: string;
    forecast_wealth: string;
    compatibility: string;
}

export const CHINESE_ZODIAC_WISDOM: Record<string, ChineseZodiacWisdom> = {
    "Rata": {
        title: "El Conquistador del Ingenio / El Estratega",
        element_fixed: "Agua (Yang)",
        totem_essence: "Eres el primer signo del zodiaco, posees un instinto de supervivencia inigualable y una curiosidad insaciable. Tu mente es rápida, astuta y capaz de encontrar tesoros donde otros solo ven escombros. Eres sociable, carismático y posees una sabiduría práctica que te orienta siempre hacia el éxito.",
        totem_shadow: "Tu sombra es la ambición desmedida y la tendencia a la manipulación. Cuando el miedo te domina, puedes volverte excesivamente autoprotector y calculador, sacrificando la lealtad por la seguridad personal.",
        forecast_2026_title: "2026: El Galope de la Intuición",
        forecast_general: "El año del Caballo (tu signo opuesto) te desafía a salir de tu madriguera. Será un año de contrastes: alta energía que choca con tu necesidad de control. Debes aprender a fluir con la velocidad del fuego sin quemarte. No es año para grandes riesgos, sino para adaptabilidad.",
        forecast_love: "Habrá chispas y tensiones. Tu pareja puede demandar más libertad de la que te sientes cómodo dando. La comunicación honesta es tu ancla.",
        forecast_wealth: "Sé conservador. El Caballo trae imprevistos financieros. Guarda grano para el invierno y evita inversiones impulsivas.",
        compatibility: "Mejor con: Dragón, Mono, Buey. / Evitar: Caballo."
    },
    "Buey": {
        title: "La Montaña de Hierro / El Constructor",
        element_fixed: "Tierra (Yin)",
        totem_essence: "Naciste bajo la estrella del deber y la perseverancia. Eres la piedra angular que sostiene estructuras. Tu palabra es ley y tu fuerza es silenciosa. Posees una paciencia infinita y una lealtad que no conoce límites, construyendo tu destino con pasos lentos pero inamovibles.",
        totem_shadow: "Tu debilidad es la rigidez y el resentimiento acumulado. Te cuesta perdonar y soltar viejos paradigmas. Tu terquedad puede aislarte en un valle de soledad si no aprendes a ser flexible.",
        forecast_2026_title: "2026: Labranza bajo el Sol",
        forecast_general: "El Caballo de Fuego trae un ritmo que te agota, pero también calienta tus proyectos. Lo que has sembrado con esfuerzo empieza a dar frutos inesperados. Es un año para delegar y confiar en el equipo. La energía es expansiva pero requiere que sueltes el control total.",
        forecast_love: "La pasión del año puede sacarte de tu zona de confort. Abre tu corazón a la sorpresa; lo inesperado traerá alegría.",
        forecast_wealth: "Cosecha sólida. Tus ahorros previos te dan seguridad para aprovechar una oportunidad en bienes raíces o terrenos.",
        compatibility: "Mejor con: Rata, Gallo, Serpiente. / Evitar: Cabra."
    },
    "Tigre": {
        title: "El Guerrero Magnético / El Insurgente",
        element_fixed: "Madera (Yang)",
        totem_essence: "Eres pura energía vital en movimiento. El Tigre no pide permiso para existir; domina por su sola presencia. Eres rebelde, idealista y profundamente apasionado. Tu magnetismo es natural y tu valentía te lleva a defender causas nobles con ferocidad.",
        totem_shadow: "La impulsividad es tu gran enemigo. Tu intensidad puede ser destructiva para ti y para quienes amas. Debes domar tu ego para que tu rugido no aleje a quienes intentan ayudarte.",
        forecast_2026_title: "2026: La Alianza de las Llamas",
        forecast_general: "Tigre y Caballo son aliados naturales de la trilogía del Fuego. 2026 será un año de gloria y expansión. Tu carisma estará en su punto más alto. Es el momento de lanzar ese gran proyecto. El Fuego alimenta tu Madera, dándote un brillo imparable.",
        forecast_love: "Año extraordinario para el romance. Si estás soltero, un encuentro electrizante cambiará tu perspectiva. Si tienes pareja, la llama se reaviva.",
        forecast_wealth: "Abundancia por reconocimiento. Tu liderazgo te traerá beneficios económicos directos. No escatimes en invertir en tu imagen.",
        compatibility: "Mejor con: Caballo, Perro, Cerdo. / Evitar: Mono."
    },
    "Conejo": {
        title: "El Diplomático de Seda / El Soñador",
        element_fixed: "Madera (Yin)",
        totem_essence: "Posees la elegancia del espíritu y la sensibilidad del artista. El Conejo es el maestro de la diplomacia y el refugio seguro. Tu intuición te permite navegar conflictos sin mancharte, buscando siempre la armonía y la belleza en un mundo a veces demasiado rudo.",
        totem_shadow: "Tu sombra es el escapismo y la pasividad. Tu miedo al conflicto puede llevarte a la indecisión o a ignorar problemas críticos hasta que es demasiado tarde. Debes aprender a poner límites firmes.",
        forecast_2026_title: "2026: Equilibrio en el Viento",
        forecast_general: "El año del Caballo es demasiado ruidoso para tu naturaleza tranquila. Sentirás que el mundo va más rápido de lo que te gusta. 2026 te exige prudencia. No te dejes arrastrar por la euforia colectiva; mantén tu centro y cultiva tu jardín interior.",
        forecast_love: "Buscando refugio en la intimidad. Será un año para fortalecer los lazos domésticos más que para la vida social intensa.",
        forecast_wealth: "Estabilidad discreta. Evita préstamos o garantías a terceros. Tu riqueza este año reside en la gestión inteligente de lo que ya tienes.",
        compatibility: "Mejor con: Cabra, Cerdo, Perro. / Evitar: Gallo."
    },
    "Dragon": {
        title: "El Guardián de la Perla / El Emperador",
        element_fixed: "Tierra (Yang)",
        totem_essence: "Naciste bajo el signo de la suerte y el poder. El Dragón no sigue caminos, los crea. Eres magnánimo, lleno de vitalidad y con un ego saludable que, si no se controla, puede volverse tiranía. Tu presencia es un faro de inspiración para los demás.",
        totem_shadow: "Tu gran debilidad es la intolerancia hacia la ineficiencia ajena y una lengua que puede quemar puentes. Debes aprender que no todos vuelan a tu altura y que la humildad es el verdadero poder.",
        forecast_2026_title: "2026: Año de Velocidad y Transformación",
        forecast_general: "Este año del Caballo acelera tu ritmo. Habrá oportunidades rápidas que requerirán decisiones instantáneas. La energía del Fuego alimenta tu Tierra, dándote recursos, pero cuidado con el agotamiento (Burnout). Tu ambición encontrará cauce si actúas rápido.",
        forecast_love: "Las pasiones se encienden rápido pero pueden apagarse igual de rápido. Busca estabilidad y no te dejes llevar solo por el brillo superficial.",
        forecast_wealth: "Buen año para inversiones agresivas, pero evita las apuestas ciegas. Tu instinto para el negocio estará muy afilado.",
        compatibility: "Mejor con: Rata, Mono, Gallo. / Evitar: Perro."
    },
    "Serpiente": {
        title: "El Sabio Enigmático / El Alquimista",
        element_fixed: "Fuego (Yin)",
        totem_essence: "Eres el símbolo de la introspección y la sabiduría oculta. La Serpiente posee una elegancia misteriosa y una mente analítica capaz de ver a través de las máscaras. Tu fuerza no es física, sino psíquica; eres el estratega que espera el momento exacto para actuar con precisión letal.",
        totem_shadow: "Tu debilidad es la desconfianza extrema y el deseo de posesión. Tu tendencia al secretismo puede generar muros de aislamiento. Debes aprender a confiar en el flujo de la vida sin intentar controlarlo todo desde las sombras.",
        forecast_2026_title: "2026: El Espejo de Fuego",
        forecast_general: "Viniendo de tu propio año (2025), el 2026 te exige aplicar lo aprendido. El Caballo es compañero de elemento (Fuego), lo que intensifica tu carisma. Sin embargo, la energía del Caballo es hacia afuera, mientras la tuya es hacia adentro. El reto será mantener tu calma en medio de la agitación.",
        forecast_love: "Relaciones intensas y transformadoras. Es un año para sanar viejas heridas y permitirte ser vulnerable.",
        forecast_wealth: "Riqueza a través de la consultoría o la estrategia. Otros buscarán tu consejo y estarán dispuestos a pagar bien por él.",
        compatibility: "Mejor con: Buey, Gallo, Mono. / Evitar: Cerdo."
    },
    "Caballo": {
        title: "El Corcel Libertario / El Conquistador",
        element_fixed: "Fuego (Yang)",
        totem_essence: "Eres el espíritu de la libertad indomable. El Caballo vive para el horizonte, impulsado por una energía inagotable y un optimismo contagioso. Eres impaciente, noble y brillante, amando la aventura y el movimiento constante por encima de todo.",
        totem_shadow: "Tu sombra es el egoísmo involuntario y la falta de constancia. Te aburres rápido y puedes dejar un rastro de proyectos y relaciones a medias. Debes aprender que la verdadera libertad también requiere raíces.",
        forecast_2026_title: "2026: El Año de tu Propio Regreso",
        forecast_general: "¡Es tu año! Estás en el centro del escenario. La energía es explosiva y vibrante. Todo se magnifica: tus éxitos y tus errores. Es un año para brillar, pero también para practicar la autodisciplina. No intentes correr en todas direcciones a la vez.",
        forecast_love: "Magnetismo al máximo. Serás irresistible, pero cuidado con las promesas que no planeas cumplir tras el primer galope.",
        forecast_wealth: "Grandes flujos de dinero, pero también de gastos. Es un año para consolidar tu marca personal y monetizar tu talento.",
        compatibility: "Mejor con: Tigre, Perro, Cabra. / Evitar: Rata."
    },
    "Cabra": {
        title: "El Artista de la Compasión / El Guardián de la Paz",
        element_fixed: "Tierra (Yin)",
        totem_essence: "Posees un alma profunda, artística y profundamente empática. La Cabra es el signo más creativo y gentil, capaz de crear belleza del dolor. Tu fuerza reside en tu capacidad de resiliencia y en tu conexión con lo invisible.",
        totem_shadow: "Tu debilidad es la excesiva dependencia emocional y la tendencia a la autocompasión. Puedes volverte pesimista si te sientes abrumado por la dureza del mundo. Debes aprender a cultivar tu propia fuerza interna.",
        forecast_2026_title: "2026: El Refugio Caluroso",
        forecast_general: "El Caballo es tu mejor amigo del zodiaco. 2026 te trae protección y apoyo inesperado. Sentirás que el viento sopla a tu favor. Es un excelente año para proyectos creativos, colaboraciones artísticas y para encontrar patrocinadores o mentores.",
        forecast_love: "Armonía y compromiso. Si buscas pareja, el círculo social de amigos traerá a alguien muy especial. Excelente para la familia.",
        forecast_wealth: "Suerte indirecta. El dinero llega a través de otros o de legados y asociaciones. No tengas miedo de pedir lo que vales.",
        compatibility: "Mejor con: Conejo, Cerdo, Caballo. / Evitar: Buey."
    },
    "Mono": {
        title: "El Mago de la Invención / El Embaucador Sagrado",
        element_fixed: "Metal (Yang)",
        totem_essence: "Eres la inteligencia pura en juego. El Mono no ve problemas, solo rompecabezas que esperan ser resueltos. Eres ingenioso, flexible, irreverente y capaz de adaptarte a cualquier situación con una sonrisa y una solución brillante.",
        totem_shadow: "Tu sombra es la arrogancia y la falta de escrúpulos. Tu rapidez mental puede llevarte a subestimar a los demás o a actuar de forma cínica. Debes aprender que la verdad es más poderosa que el truco más ingenioso.",
        forecast_2026_title: "2026: Chispas de Metal",
        forecast_general: "El Fuego del Caballo intenta fundir tu Metal. Es un año de gran presión pero también de refinamiento. Lo que sobreviva al 2026 en tu vida será indestructible. Prepárate para cambios de ritmo y giros de guion. Tu agilidad será tu salvación.",
        forecast_love: "Divertido pero inestable. Evita los dramas innecesarios y mantén un tono ligero en tus interacciones.",
        forecast_wealth: "Dinero rápido que requiere gestión rápida. No dejes que la euforia te lleve a gastos superfluos. Invierte en tecnología.",
        compatibility: "Mejor con: Rata, Dragón, Serpiente. / Evitar: Tigre."
    },
    "Gallo": {
        title: "El Heraldo del Sol / El Perfeccionista",
        element_fixed: "Metal (Yin)",
        totem_essence: "Eres el símbolo del orden, la precisión y la valentía. El Gallo es el primero en despertar al mundo, poseyendo una disciplina férrea y un sentido agudo del detalle. Eres franco, trabajador y posees una dignidad que inspira respeto.",
        totem_shadow: "Tu debilidad es la obsesión por la apariencia y el juicio crítico hacia los demás. Tu frankeza puede volverse crueldad si no la pasas por el filtro de la compasión. Debes aprender que la perfección es una ilusión.",
        forecast_2026_title: "2026: El Clarín del Despertar",
        forecast_general: "El Caballo de Fuego te desafía a ser más espontáneo. Tu necesidad de planificación chocará con la energía caótica del año. El éxito este año vendrá de tu capacidad para brillar y mostrar tus talentos sin miedo al juicio. Es momento de liderar con el ejemplo.",
        forecast_love: "Orgullo y pasión. Aprende a ceder en las discusiones pequeñas para ganar en las batallas importantes de la relación.",
        forecast_wealth: "Reconocimiento público que se traduce en ganancias. Tu atención al detalle será valorada en niveles altos de gerencia o dirección.",
        compatibility: "Mejor con: Buey, Serpiente, Dragón. / Evitar: Conejo."
    },
    "Perro": {
        title: "El Caballero de la Lealtad / El Guardián Moral",
        element_fixed: "Tierra (Yang)",
        totem_essence: "Eres el signo más noble y fiel del zodiaco. El Perro vive por un código de honor, protegiendo a los suyos con devoción absoluta. Eres honesto, directo y posees un agudo sentido de la justicia que te convierte en un amigo y aliado invaluable.",
        totem_shadow: "Tu sombra es el pesimismo y la ansiedad defensiva. Tiendes a ver peligros donde no los hay y puedes volverte cínico o hipercrítico cuando te sientes traicionado. Debes aprender a confiar en tu propio valor.",
        forecast_2026_title: "2026: La Recompensa del Guardián",
        forecast_general: "Aliado del Caballo. 2026 es un año de paz, estabilidad y alegría para ti. Después de años de lucha, el Caballo te trae un merecido descanso y reconocimiento. Tus esfuerzos por fin son vistos y valorados. El entorno será amigable y productivo.",
        forecast_love: "Lazos profundos y duraderos. Es un año ideal para el matrimonio, el compromiso o iniciar una vida en común.",
        forecast_wealth: "Crecimiento constante. No habrá explosiones de riqueza, pero sí una solidez envidiable que te dará mucha tranquilidad mental.",
        compatibility: "Mejor con: Tigre, Caballo, Conejo. / Evitar: Dragón."
    },
    "Cerdo": {
        title: "El Noble Epicúreo / El Sabio Generoso",
        element_fixed: "Agua (Yin)",
        totem_essence: "Posees un corazón de oro y una capacidad infinita de disfrute. El Cerdo es el signo de la abundancia y la honestidad brutal. Eres valiente, trabajador y profundamente generoso, creyendo en la bondad intrínseca del ser humano.",
        totem_shadow: "Tu debilidad es la ingenuidad y el exceso. Tu búsqueda de placer puede llevarte a la pereza o a dejarte explotar por otros menos nobles. Debes aprender a distinguir entre generosidad y falta de discernimiento.",
        forecast_2026_title: "2026: El Banquete del Fuego",
        forecast_general: "El dinamismo del Caballo te obliga a moverte más de lo habitual. 2026 será un año de mucha actividad social y viajes. Disfrutarás de la energía vibrante, pero asegúrate de no descuidar tu salud física ante tantos eventos y celebraciones.",
        forecast_love: "Encuentros en viajes o celebraciones. Año muy social donde conocerás a personas que ampliarán tu mundo emocional.",
        forecast_wealth: "Abundancia compartida. El dinero llega con fluidez, pero tiende a salir con la misma rapidez en placeres y regalos. Controla el flujo.",
        compatibility: "Mejor con: Conejo, Cabra, Tigre. / Evitar: Serpiente."
    }
};
