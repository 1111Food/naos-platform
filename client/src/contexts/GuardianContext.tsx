import React, { createContext, useContext, useState } from 'react';

type GuardianState = 'RESTING' | 'LISTENING' | 'RESPONDING';

interface GuardianContextType {
    state: GuardianState;
    setState: (state: GuardianState) => void;
}

const GuardianContext = createContext<GuardianContextType | undefined>(undefined);

export const GuardianProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GuardianState>('RESTING');

    return (
        <GuardianContext.Provider value={{ state, setState }}>
            {children}
        </GuardianContext.Provider>
    );
};

export const useGuardianState = () => {
    const context = useContext(GuardianContext);
    if (!context) throw new Error('useGuardianState must be used within a GuardianProvider');
    return context;
};
