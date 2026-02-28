export type IntentType = 'fitness' | 'consciousness' | 'productivity' | 'creativity' | 'none';

export interface IntentConfig {
    label: string;
    description: string;
    highPriority: string[]; // Pillar IDs
    auraColor: string; // Tailwind glow class
    stoicFeedback: {
        highCoherence: string;
        lowCoherence: string;
    };
}

export const INTENT_CONFIGS: Record<IntentType, IntentConfig> = {
    fitness: {
        label: 'Fitness',
        description: 'Disciplina corporal y vitalidad.',
        highPriority: ['movement', 'sleep', 'nutrition'],
        auraColor: 'amber',
        stoicFeedback: {
            highCoherence: 'Cuerpo templado. Solo la acción es real. Supera tus límites hoy.',
            lowCoherence: 'La fatiga es una opinión. Tu templo reclama disciplina, no excusas.'
        }
    },
    consciousness: {
        label: 'Conciencia',
        description: 'Expansión del observador interno.',
        highPriority: ['connection', 'gratitude'],
        auraColor: 'cyan',
        stoicFeedback: {
            highCoherence: 'Mente clara. Tu observador interno gobierna el impulso. Medita en la inacción.',
            lowCoherence: 'Ruido mental detectado. Regresa al silencio para recuperar tu centro.'
        }
    },
    productivity: {
        label: 'Productividad',
        description: 'Ejecución y concreción material.',
        highPriority: ['movement', 'connection', 'sleep'],
        auraColor: 'indigo',
        stoicFeedback: {
            highCoherence: 'Mente afilada. Ejecuta tu plan con precisión quirúrgica hoy.',
            lowCoherence: 'Dispersión inútil. Reenfoca tu energía en el siguiente paso necesario.'
        }
    },
    creativity: {
        label: 'Creatividad',
        description: 'Canalización del flujo creativo.',
        highPriority: ['connection', 'movement'],
        auraColor: 'violet',
        stoicFeedback: {
            highCoherence: 'El orden nace del caos sintonizado. Crea sin vacilación hoy.',
            lowCoherence: 'Bloqueo detectado. Mueve el cuerpo para liberar la mente estancada.'
        }
    },
    none: {
        label: 'Ninguna',
        description: 'Buscando el equilibrio universal.',
        highPriority: [],
        auraColor: 'zinc',
        stoicFeedback: {
            highCoherence: 'Templo en armonía. Observa el flujo sin apego.',
            lowCoherence: 'Centro perdido. Regresa a lo esencial de inmediato.'
        }
    }
};
