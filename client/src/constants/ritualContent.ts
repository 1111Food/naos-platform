export interface RitualStep {
    id: string;
    title: string;
    copy: string;
    description?: string; // Deep explanation for the Info Modal
    durationSeconds: number;
}

export interface ElementRitual {
    id: string; // Path ID (e.g., 'path-architect')
    name: string; // Path Name (e.g., 'Manual del Arquitecto')
    breath: {
        id: string;
        label: string;
        copy: string;
        description?: string; // Deep explanation for the Info Modal
        technique: 'WATER_CALM' | 'EARTH_GROUND' | 'FIRE_ACTIVATE' | 'AIR_FLOW' | 'BHASTRIKA' | 'BOX' | 'COHERENCE' | 'UJJAYI' | 'NADI' | 'BUMBLEBEE' | 'HYPEROX' | 'INTERMITTENT';
        durationSeconds: number;
    };
    meditation: RitualStep;
    anchor: RitualStep;
}

export const RITUAL_LIBRARY: Record<'WATER' | 'FIRE' | 'EARTH' | 'AIR', ElementRitual[]> = {
    FIRE: [
        {
            id: 'fire-architect',
            name: 'Manual del Arquitecto',
            breath: {
                id: 'fire-1',
                label: 'Respiración de Fuego',
                copy: 'Enciende tu centro de mando.',
                description: 'La respiración de fuego activa el sistema nervioso simpático, aumentando la temperatura corporal y la circulación sanguínea. Ideal para generar energía inmediata y despertar la voluntad de acción antes de enfrentar desafíos importantes.',
                technique: 'FIRE_ACTIVATE',
                durationSeconds: 120
            },
            meditation: {
                id: 'fire-2',
                title: 'Arquitectura del Deseo',
                copy: 'Visualiza tu objetivo como una estructura de luz pura. Aliméntala con tu pulsación.',
                description: 'Esta práctica utiliza la energía vital generada previamente para enfocar la mente en un único objetivo claro. Al concentrar el "fuego interno", transformamos la intención difusa en un láser de manifestación directa.',
                durationSeconds: 180
            },
            anchor: {
                id: 'fire-3',
                title: 'Decreto de Poder',
                copy: 'Mi voluntad es ley. Ejecuto con precisión.',
                description: 'Ancla final para sellar el estado alterado de conciencia en la identidad, reafirmando el control ejecutivo sobre tus decisiones y acciones.',
                durationSeconds: 120
            }
        },
        {
            id: 'fire-ancestral',
            name: 'Vedas de la Llama',
            breath: {
                id: 'fire-a1',
                label: 'Fuelle de Bhastrika',
                copy: 'Aviva el fuego interno con el fuelle de tus pulmones.',
                description: 'Bhastrika es una técnica yógica ancestral que purifica los canales de energía (nadis) mediante inhalaciones y exhalaciones forzadas. Actúa como un fuelle que limpia toxinas físicas y mentales, elevando dramáticamente la energía pránica.',
                technique: 'BHASTRIKA',
                durationSeconds: 120
            },
            meditation: {
                id: 'fire-a2',
                title: 'Trataka (Candela)',
                copy: 'Fija tu mirada en la llama eterna. Deja que consuma tus pensamientos.',
                description: 'Meditación Trataka con enfoque en el elemento fuego. Al sostener la mirada fija (preferiblemente en una vela real o imaginada), se aquieta la mente discursiva, estimulando la glándula pineal y la concentración profunda (Dharana).',
                durationSeconds: 180
            },
            anchor: {
                id: 'fire-a3',
                title: 'Decreto de Transmutación',
                copy: 'Lo viejo muere, lo nuevo nace en mi fuego sagrado.',
                description: 'El fuego es el elemento alquímico de la transformación. Este decreto utiliza ese arquetipo para quemar pactos pasados y abrir espacio a resoluciones renovadas.',
                durationSeconds: 120
            }
        },
        {
            id: 'fire-biohack',
            name: 'Sintonía de Rendimiento',
            breath: {
                id: 'fire-b1',
                label: 'Hiper-Oxigenación',
                copy: 'Satura tu sangre de energía vital.',
                description: 'Inspirada en el método de Wim Hof, esta técnica hiperventila controladamente el sistema, alcalinizando la sangre temporalmente y suprimiendo la alarma de CO2. Produce un estado de euforia, alerta y resistencia física extrema.',
                technique: 'HYPEROX',
                durationSeconds: 120
            },
            meditation: {
                id: 'fire-b2',
                title: 'Focus Laser',
                copy: 'Elimina toda distracción. Tu mente es un rayo que atraviesa cualquier obstáculo.',
                description: 'Entrenamiento neuro-cognitivo de alta intensidad. Utilizando la química alterada de la respiración previa, esta sintonización programa al cerebro para ignorar estímulos irrelevantes y enfocar el 100% de la atención en una métrica clave.',
                durationSeconds: 180
            },
            anchor: {
                id: 'fire-b3',
                title: 'Estado de Flujo',
                copy: 'Ejecución perfecta sin esfuerzo. Soy la acción misma.',
                description: 'Consolidación del "Flow State" (Zero Point Field), donde la percepción del tiempo se altera y el rendimiento se vuelve automático e instintivo.',
                durationSeconds: 120
            }
        }
    ],
    EARTH: [
        {
            id: 'earth-architect',
            name: 'Manual del Arquitecto',
            breath: {
                id: 'earth-1',
                label: 'Respiración de Tierra',
                copy: 'Ancla tu energía al campo gravitatorio.',
                description: 'Técnica de respiración enfocada en exhalaciones prolongadas para activar el sistema parasimpático. Esta práctica reduce inmediatamente el cortisol vital para bajar de la mente al cuerpo y encontrar estabilidad en medio del caos.',
                technique: 'EARTH_GROUND',
                durationSeconds: 120
            },
            meditation: {
                id: 'earth-2',
                title: 'Densidad Cuántica',
                copy: 'Siente tu peso. Tus proyectos tienen raíces profundas e inamovibles.',
                description: 'Visualización de enraizamiento profundo. Mueve la conciencia desde el neocórtex hacia la base de la columna (chakra raíz), programando al subconsciente para percibir seguridad, paciencia y estructura a largo plazo.',
                durationSeconds: 180
            },
            anchor: {
                id: 'earth-3',
                title: 'Decreto de Realidad',
                copy: 'Materializo mis ideas. Soy el arquitecto de mi solidez.',
                description: 'La tierra es el elemento de la materialización. Este ancla consolida la percepción de que todo pensamiento abstracto ahora tiene un peso físico y una estructura realizable.',
                durationSeconds: 120
            }
        },
        {
            id: 'earth-ancestral',
            name: 'Crónicas de la Roca',
            breath: {
                id: 'earth-a1',
                label: 'Frecuencia de Bhramari',
                copy: 'Siente la vibración de la tierra en tu centro óseo.',
                description: 'Conocida como la respiración de la abeja. El zumbido constante crea una vibración física que masajea el cerebro y el sistema nervioso, disolviendo el estrés agudo y conectando con la frecuencia resonante de la tierra.',
                technique: 'BUMBLEBEE',
                durationSeconds: 120
            },
            meditation: {
                id: 'earth-a2',
                title: 'Raíces del Mundo',
                copy: 'Tus pies se funden con el suelo. Eres una montaña inamovible frente al tiempo.',
                description: 'Práctica meditativa de permanencia. Se basa en observar la lentitud y la inmutabilidad de los elementos geológicos para silenciar la urgencia y la prisa psicológica del ego moderno.',
                durationSeconds: 180
            },
            anchor: {
                id: 'earth-a3',
                title: 'Decreto de Estabilidad',
                copy: 'Soy piedra, soy centro, soy fundamento eterno.',
                description: 'Afirmación de centro absoluto. Te posiciona como el ojo del huracán; inamovible, constante y confiable sin importar las circunstancias externas.',
                durationSeconds: 120
            }
        },
        {
            id: 'earth-biohack',
            name: 'Sintonía de Rendimiento',
            breath: {
                id: 'earth-b1',
                label: 'Box Breathing 4x4',
                copy: 'Estabiliza tu sistema nervioso central.',
                description: 'Técnica táctica (utilizada por operadores de fuerzas especiales) que ecualiza el ritmo cardíaco. Inhalar, retener, exhalar y retener (4 segundos cada uno) balancea perfectamente el sistema simpático y parasimpático.',
                technique: 'BOX',
                durationSeconds: 120
            },
            meditation: {
                id: 'earth-b2',
                title: 'Escaneo Biométrico',
                copy: 'Recorre cada célula. Desactiva tensiones innecesarias. Optimiza tu arquitectura biológica.',
                description: 'Un "Body Scan" de alta precisión. En lugar de relajación pasiva, es una auditoría activa de tu estructura física para liberar energía bloqueada en los músculos subutilizados o tensos (Maximizando el ROI energético).',
                durationSeconds: 180
            },
            anchor: {
                id: 'earth-b3',
                title: 'Cero Absoluto',
                copy: 'Mi base es sólida. Nada altera mi centro de gravedad.',
                description: 'El comando de reinicio táctico. Establece un "Baseline" emocional y físico donde las perturbaciones externas no penetran la estructura interna.',
                durationSeconds: 120
            }
        }
    ],
    WATER: [
        {
            id: 'water-architect',
            name: 'Manual del Arquitecto',
            breath: {
                id: 'water-1',
                label: 'Respiración de Agua',
                copy: 'Limpia el ruido y fluye.',
                description: 'Respiración balanceada (ej. 4 segundos inhalar, 4 exhalar) sin retenciones. Funciona como un flujo continuo que iguala las entradas y salidas de energía, ideal para resetear el estado emocional cuando hay sobreestimulación.',
                technique: 'WATER_CALM',
                durationSeconds: 120
            },
            meditation: {
                id: 'water-2',
                title: 'Fluidez Estratégica',
                copy: 'Observa los obstáculos como piedras en un río. Rodéalos sin esfuerzo.',
                description: 'Práctica de visualización de fluidez. Entrena la mente para no chocar de frente con la resistencia (personas, situaciones técnicas complejas), sino buscar la ruta de menor fricción y continuar avanzando.',
                durationSeconds: 180
            },
            anchor: {
                id: 'water-3',
                title: 'Decreto de Coherencia',
                copy: 'Mis emociones y mi propósito son uno solo.',
                description: 'Alineación interna. Garantiza que la turbulencia emocional no desvíe la ejecución técnica, fusionando el "sentir" con el "hacer" en una misma dirección.',
                durationSeconds: 120
            }
        },
        {
            id: 'water-ancestral',
            name: 'Cánticos de la Marea',
            breath: {
                id: 'water-a1',
                label: 'Océano Ujjayi',
                copy: 'Escucha el oleaje sagrado en tu garganta.',
                description: 'Técnica de respiración victoriosa (Ujjayi). Al contraer suavemente la glotis, se crea un sonido oceánico que ancla la mente y calienta el aire antes de que entre a los pulmones, generando una calma profunda y enfocada.',
                technique: 'UJJAYI',
                durationSeconds: 120
            },
            meditation: {
                id: 'water-a2',
                title: 'El Templo de la Cascada',
                copy: 'El agua lava tu historia. Quedas puro/a y transparente como el cristal.',
                description: 'Meditación de purificación profunda. Utiliza el arquetipo del agua cayendo constantemente para lavar adherencias mentales, culpas o narrativas pasadas que ya no sirven a tu arquitectura actual.',
                durationSeconds: 180
            },
            anchor: {
                id: 'water-a3',
                title: 'Decreto de Adaptación',
                copy: 'No opongo resistencia. Fluyo con la corriente del destino universal.',
                description: 'Comando de rendición activa (no pasiva). Es el entendimiento de que pelear contra la inercia del universo gasta energía; navegarla con destreza es verdadera maestría arquitectónica.',
                durationSeconds: 120
            }
        },
        {
            id: 'water-biohack',
            name: 'Sintonía de Rendimiento',
            breath: {
                id: 'water-b1',
                label: 'Coherencia Rítmica',
                copy: 'Sincroniza corazón y mente en una sola onda.',
                description: 'Basado en investigaciones del HeartMath Institute, se inhala por 5.5 segundos y se exhala por 5.5 segundos logrando que la variabilidad de la frecuencia cardíaca (HRV) y las ondas cerebrales entren en una alineación electromagnética perfecta.',
                technique: 'COHERENCE',
                durationSeconds: 120
            },
            meditation: {
                id: 'water-b2',
                title: 'Detox Cognitivo',
                copy: 'Limpia la caché mental. Deja ir los procesos que consumen tu ancho de banda.',
                description: 'Protocolo para liberar RAM mental. Se identifican tareas abiertas en segundo plano (preocupaciones, correos pendientes) y se visualizan cerrándose activamente, deteniendo la filtración de energía cognitiva.',
                durationSeconds: 180
            },
            anchor: {
                id: 'water-b3',
                title: 'Homeostasis Total',
                copy: 'Estoy en equilibrio. Mi energía es renovable y constante.',
                description: 'Estado estacionario dinámico. Confirma que el sistema se autorregula a su estado óptimo de funcionamiento sin necesidad de intervención externa constante.',
                durationSeconds: 120
            }
        }
    ],
    AIR: [
        {
            id: 'air-architect',
            name: 'Manual del Arquitecto',
            breath: {
                id: 'air-1',
                label: 'Respiración de Aire',
                copy: 'Clarifica tu espectro mental.',
                description: 'Inhalaciones prolongadas seguidas de exhalaciones rápidas. Esta mecánica oxigena rápidamente el cerebro, disipando la niebla mental (brain fog) y preparando el terreno para la toma de decisiones complejas.',
                technique: 'AIR_FLOW',
                durationSeconds: 120
            },
            meditation: {
                id: 'air-2',
                title: 'Perspectiva de Águila',
                copy: 'Eleva tu visión. Observa el patrón completo desde el vacío.',
                description: 'Entrenamiento de disociación constructiva. Te enseña a desapegarte emocionalmente del problema inmediato para observar la arquitectura completa del sistema desde un punto de vista panorámico.',
                durationSeconds: 180
            },
            anchor: {
                id: 'air-3',
                title: 'Decreto de Visión',
                copy: 'Veo lo que otros no ven. Mi mente es información pura.',
                description: 'Alineación cognitiva que refuerza la identidad de un pensador estratégico, capaz de decodificar patrones ocultos en el ruido de la realidad.',
                durationSeconds: 120
            }
        },
        {
            id: 'air-ancestral',
            name: 'Manual del Éter',
            breath: {
                id: 'air-a1',
                label: 'Limpieza Nadi Shodhana',
                copy: 'Equilibra tus canales de luz y vacía el aire estancado.',
                description: 'Respiración alterna por las fosas nasales. Balancea los hemisferios cerebrales (lógico/intuitivo) y limpia los canales energéticos sutiles (nadis), induciendo un estado de profundo centramiento y ecuanimidad.',
                technique: 'NADI',
                durationSeconds: 120
            },
            meditation: {
                id: 'air-a2',
                title: 'Silencio en las Alturas',
                copy: 'Eres el cielo que observa las nubes pasar. Nada te encadena.',
                description: 'Práctica de Vipassana (visión clara). Desarrolla la capacidad de observar los pensamientos como eventos meteorológicos temporales en la vastedad de tu conciencia, sin identificarte con ellos.',
                durationSeconds: 180
            },
            anchor: {
                id: 'air-a3',
                title: 'Decreto de Claridad',
                copy: 'Soy aire, soy espacio, soy pensamiento libre de gravedad.',
                description: 'Afirmación de libertad absoluta. Corta las ataduras del exceso de análisis y permite la innovación ligera y sin restricciones.',
                durationSeconds: 120
            }
        },
        {
            id: 'air-biohack',
            name: 'Sintonía de Rendimiento',
            breath: {
                id: 'air-b1',
                label: 'Ciclo Intermitente',
                copy: 'Desafía tu umbral de oxígeno y expande tu capacidad.',
                description: 'Entrenamiento hipóxico intermitente. La retención de aire controlada adapta el cuerpo a funcionar con menos oxígeno, mejorando la resistencia celular y obligando al cerebro a optimizar sus recursos energéticos.',
                technique: 'AIR_FLOW',
                durationSeconds: 120
            },
            meditation: {
                id: 'air-b2',
                title: 'Visión Periférica',
                copy: 'Expande tu foco. Capta la información sutil que otros ignoran.',
                description: 'Suavizar la mirada para estimular la visión periférica desactiva el circuito de "pelear o huir" (conectado a la visión foveal enfocada) e induce un estado de alerta relajada, ideal para el pensamiento lateral y la creatividad.',
                durationSeconds: 180
            },
            anchor: {
                id: 'air-b3',
                title: 'Neuro-Plasticidad',
                copy: 'Mi mente es maleable y expansiva. Aprendo a la velocidad de la luz.',
                description: 'Comando de actualización de software. Refuerza la creencia subyacente de que la inteligencia y las habilidades no son fijas, sino sistemas dinámicos que pueden ser reconfigurados a voluntad.',
                durationSeconds: 120
            }
        }
    ]
};
