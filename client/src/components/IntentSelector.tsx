import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '../contexts/ProfileContext';
import { INTENT_CONFIGS } from '../lib/intentions';
import type { IntentType } from '../lib/intentions';
import { cn } from '../lib/utils';
import { Target } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const IntentSelector: React.FC = () => {
    const { profile, updateProfile } = useProfile();
    const currentIntent = profile?.dominant_intent || 'none';
    const [isRetuning, setIsRetuning] = React.useState(false);

    const handleSelect = async (intent: IntentType) => {
        if (intent === currentIntent) return;
        try {
            setIsRetuning(true);
            await updateProfile({ dominant_intent: intent });
            console.log(`🎯 Intento cambiado a: ${intent}`);
            setTimeout(() => setIsRetuning(false), 1000);
        } catch (e) {
            console.error("Error updating intent", e);
            setIsRetuning(false);
        }
    };

    return (
        <div className="w-full max-w-2xl px-6 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            {/* STITCH: Global Re-sintonización Scanline */}
            <AnimatePresence>
                {isRetuning && (
                    <motion.div
                        initial={{ top: '-10%', opacity: 0 }}
                        animate={{ top: '110%', opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-x-0 h-2 bg-gradient-to-b from-transparent via-white to-transparent z-[100] blur-sm pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <div className="relative p-6 rounded-[2rem] bg-black/40 backdrop-blur-3xl border border-white/5 overflow-hidden group">
                {/* Background Aura glow based on current intent */}
                <div className={cn(
                    "absolute -right-20 -top-20 w-64 h-64 blur-[100px] opacity-20 transition-colors duration-1000",
                    currentIntent === 'fitness' ? 'bg-amber-500' :
                        currentIntent === 'consciousness' ? 'bg-cyan-500' :
                            currentIntent === 'productivity' ? 'bg-indigo-500' :
                                currentIntent === 'creativity' ? 'bg-violet-500' : 'bg-white/10'
                )} />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-4 min-w-fit">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40">
                            <Target size={20} />
                        </div>
                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-1">Capa de Dirección</h4>
                            <p className="text-white/80 font-serif italic text-lg leading-tight">Intención Dominante</p>
                        </div>
                    </div>

                    <div className="h-px md:h-12 w-full md:w-px bg-white/10" />

                    <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                        {(Object.keys(INTENT_CONFIGS) as IntentType[]).map((key) => {
                            const config = INTENT_CONFIGS[key];
                            const isActive = currentIntent === key;

                            return (
                                <button
                                    key={key}
                                    onClick={() => handleSelect(key)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all duration-500 border",
                                        isActive
                                            ? `bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]`
                                            : "bg-transparent border-transparent text-white/30 hover:text-white/60 hover:border-white/5"
                                    )}
                                >
                                    {config.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-intent-dot"
                                            className="mt-1 h-0.5 w-full bg-white/40 rounded-full"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};
