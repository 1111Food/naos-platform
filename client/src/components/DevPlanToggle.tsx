import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Database } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

export const DevPlanToggle: React.FC = () => {
    const { status, togglePlan } = useSubscription();
    const [loading, setLoading] = useState(false);

    // Solo visible en desarrollo
    const isDev = window.location.hostname === 'localhost';
    if (!isDev) return null;

    const handleToggle = async () => {
        setLoading(true);
        try {
            await togglePlan();
        } catch (error) {
            console.error("Master Control Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const isPremium = status?.plan === 'PREMIUM' || status?.plan === 'EXTENDED';

    return (
        <div className="fixed bottom-6 left-6 z-[100] group">
            <div className="flex items-center gap-3 px-4 py-2 bg-black/80 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl group-hover:border-amber-500/50 transition-all duration-500">
                <Database className={`w-4 h-4 ${isPremium ? 'text-amber-500' : 'text-white/40'}`} />
                <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Modo Creador</span>
                    <span className="text-[10px] text-white/80 font-medium">
                        Plan: <span className={isPremium ? 'text-amber-500' : 'text-white/60'}>{status?.plan}</span>
                    </span>
                </div>
                <button
                    onClick={handleToggle}
                    disabled={loading}
                    className={`p-2 rounded-lg transition-all ${loading ? 'opacity-50 animate-pulse' : 'hover:bg-white/5'}`}
                >
                    {isPremium ? (
                        <ToggleRight className="w-6 h-6 text-amber-500" />
                    ) : (
                        <ToggleLeft className="w-6 h-6 text-white/30" />
                    )}
                </button>
            </div>
        </div>
    );
};
