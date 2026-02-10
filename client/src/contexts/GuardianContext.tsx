import React, { createContext, useContext, useState, useCallback } from 'react';

type GuardianState = 'RESTING' | 'LISTENING' | 'RESPONDING';

interface OracleState {
    events: {
        lastTarot?: { card: string; meaning: string; answer: string };
        lastPinnacle?: { position: string; number: number; archetype: string };
        lastAstrology?: string;
        lastOriental?: { animal: string; element: string; depth: boolean };
        lastNahual?: { name: string; meaning: string };
    };
    essence: {
        traits: string[];
        tensions: string[];
        shadows: string[];
        elementalBalance?: string;
    };
}

interface GuardianContextType {
    state: GuardianState;
    setState: (state: GuardianState) => void;
    oracleState: OracleState;
    trackEvent: (type: 'TAROT' | 'PINNACLE' | 'ASTRO' | 'ORIENTAL' | 'NAHUAL', data: any) => void;
    refineEssence: (essenceData: Partial<OracleState['essence']>) => void;
}

const GuardianContext = createContext<GuardianContextType | undefined>(undefined);

export const GuardianProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GuardianState>('RESTING');
    const [oracleState, setOracleState] = useState<OracleState>({
        events: {
            // v8.7: Perfil de Inicio para Luis
            lastAstrology: JSON.stringify({
                birthDate: '1990-01-01', // Fecha placeholder, el usuario la actualizará
                birthTime: '09:40',
                name: 'Luis Alfredo Herrera Mendez',
                location: { lat: 14.6349, lng: -90.5069 } // Guatemala City
            })
        },
        essence: {
            traits: [],
            tensions: [],
            shadows: []
        }
    });

    const trackEvent = useCallback((type: 'TAROT' | 'PINNACLE' | 'ASTRO' | 'ORIENTAL', data: any) => {
        setOracleState(prev => {
            const newEvents = { ...prev.events };
            if (type === 'TAROT') newEvents.lastTarot = data;
            if (type === 'PINNACLE') newEvents.lastPinnacle = data;
            if (type === 'ASTRO') newEvents.lastAstrology = data;
            if (type === 'ORIENTAL') newEvents.lastOriental = data;
            if (type === 'NAHUAL') newEvents.lastNahual = data;
            return { ...prev, events: newEvents };
        });
    }, []);

    const refineEssence = useCallback((essenceData: Partial<OracleState['essence']>) => {
        setOracleState(prev => ({
            ...prev,
            essence: {
                ...prev.essence,
                ...essenceData,
                traits: Array.from(new Set([...prev.essence.traits, ...(essenceData.traits || [])])),
                tensions: Array.from(new Set([...prev.essence.tensions, ...(essenceData.tensions || [])])),
                shadows: Array.from(new Set([...prev.essence.shadows, ...(essenceData.shadows || [])])),
            }
        }));
    }, []);

    return (
        <GuardianContext.Provider value={{ state, setState, oracleState, trackEvent, refineEssence }}>
            {children}
        </GuardianContext.Provider>
    );
};

export const useGuardianState = () => {
    const context = useContext(GuardianContext);
    if (!context) throw new Error('useGuardianState must be used within a GuardianProvider');
    return context;
};
