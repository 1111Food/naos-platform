import React, { createContext, useContext, useState, useCallback } from 'react';

import { WISDOM_COPYS } from '../constants/wisdomContent';

type WisdomType = 'IDENTITY' | 'ORACLE' | 'PROTOCOL' | 'LAB' | 'DECISIONS' | 'MISSION' | 'CODIGO_IDENTIDAD' | 'SYNASTRY';

interface WisdomState {
    isOpen: boolean;
    type: WisdomType | null;
    title: string;
    description: string;
    accentColor: 'cyan' | 'magenta' | 'emerald' | 'orange' | 'purple' | 'red';
}

interface WisdomContextType {
    wisdom: WisdomState;
    openWisdom: (type: WisdomType) => void;
    closeWisdom: () => void;
}

const WisdomContext = createContext<WisdomContextType | undefined>(undefined);

// Map the specific contextual types to the central repository
const WISDOM_CONTENT_MAP: Record<WisdomType, { title: string; description: string; accentColor: 'cyan' | 'magenta' | 'emerald' | 'orange' | 'purple' | 'red' }> = {
    IDENTITY: { ...WISDOM_COPYS.IDENTITY_NEXUS, accentColor: WISDOM_COPYS.IDENTITY_NEXUS.accent },
    CODIGO_IDENTIDAD: { ...WISDOM_COPYS.IDENTITY_NEXUS, accentColor: WISDOM_COPYS.IDENTITY_NEXUS.accent },
    ORACLE: { ...WISDOM_COPYS.ORACLE, accentColor: WISDOM_COPYS.ORACLE.accent },
    PROTOCOL: { ...WISDOM_COPYS.PROTOCOL_21, accentColor: WISDOM_COPYS.PROTOCOL_21.accent },
    LAB: { ...WISDOM_COPYS.ELEMENTAL_LAB, accentColor: WISDOM_COPYS.ELEMENTAL_LAB.accent },
    SYNASTRY: { ...WISDOM_COPYS.SYNASTRY, accentColor: WISDOM_COPYS.SYNASTRY.accent },
    DECISIONS: {
        title: 'Radiografía de Decisiones',
        description: 'Analiza tus elecciones bajo la luz de los símbolos. Una herramienta de estrategia para momentos de bifurcación.',
        accentColor: 'purple'
    },
    MISSION: {
        title: 'Misión del Año',
        description: 'Tu horizonte temporal de 12 meses. El enfoque maestro que coordina todas tus acciones en este ciclo.',
        accentColor: 'red'
    }
} as const;

export const WisdomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wisdom, setWisdom] = useState<WisdomState>({
        isOpen: false,
        type: null,
        title: '',
        description: '',
        accentColor: 'cyan'
    });

    const openWisdom = useCallback((type: WisdomType) => {
        const content = WISDOM_CONTENT_MAP[type];
        if (content) {
            setWisdom({
                isOpen: true,
                type,
                ...content
            });
        }
    }, []);

    const closeWisdom = useCallback(() => {
        setWisdom(prev => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <WisdomContext.Provider value={{ wisdom, openWisdom, closeWisdom }}>
            {children}
        </WisdomContext.Provider>
    );
};

export const useWisdom = () => {
    const context = useContext(WisdomContext);
    if (!context) {
        throw new Error('useWisdom must be used within a WisdomProvider');
    }
    return context;
};
