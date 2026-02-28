import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useProfile } from '../hooks/useProfile';
import { getAuthHeaders } from '../lib/api';

interface CoherenceStatus {
    score: number;
    trend: 'up' | 'down';
    lastDelta: number;
    astralMood: 'HARMONIOUS' | 'CHALLENGING' | 'NEUTRAL';
    volatility?: {
        E_usuario_current: number;
        system_recommendation: string;
        ui_adaptation: string;
    };
}

interface CoherenceContextType {
    score: number;
    trend: 'up' | 'down';
    astralMood: 'HARMONIOUS' | 'CHALLENGING' | 'NEUTRAL';
    lastDelta: number;
    volatility?: CoherenceStatus['volatility'];
    loading: boolean;
    refresh: () => Promise<void>;
    logAction: (action: string) => Promise<any>;
}

const CoherenceContext = createContext<CoherenceContextType | undefined>(undefined);

export const CoherenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { profile } = useProfile();
    const [status, setStatus] = useState<CoherenceStatus | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStatus = useCallback(async () => {
        if (!profile?.id) return;
        try {
            const response = await fetch('/api/coherence/status', {
                headers: getAuthHeaders() as HeadersInit
            });
            if (response.ok) {
                const data = await response.json();
                setStatus(data);
            }
        } catch (e) {
            console.error("CoherenceContext: Failed to fetch status", e);
        } finally {
            setLoading(false);
        }
    }, [profile?.id]);

    useEffect(() => {
        fetchStatus();
    }, [fetchStatus]);

    const logAction = async (action: string) => {
        if (!profile?.id) return;
        try {
            const response = await fetch('/api/coherence/action', {
                method: 'POST',
                headers: getAuthHeaders() as HeadersInit,
                body: JSON.stringify({ action })
            });

            if (response.ok) {
                const result = await response.json();
                setStatus(prev => prev ? {
                    ...prev,
                    score: result.newScore,
                    lastDelta: result.delta,
                    trend: result.delta >= 0 ? 'up' : 'down'
                } : null);
                return result;
            }
        } catch (e) {
            console.error("CoherenceContext: Failed to log action", e);
        }
    };

    const value = {
        score: status?.score ?? 50, // Default to 50 (Balanced)
        trend: status?.trend ?? 'up',
        astralMood: status?.astralMood ?? 'NEUTRAL',
        lastDelta: status?.lastDelta ?? 0,
        volatility: status?.volatility,
        loading,
        refresh: fetchStatus,
        logAction
    };

    return (
        <CoherenceContext.Provider value={value}>
            {children}
        </CoherenceContext.Provider>
    );
};

export const useCoherence = () => {
    const context = useContext(CoherenceContext);
    if (!context) {
        throw new Error('useCoherence must be used within a CoherenceProvider');
    }
    return context;
};
