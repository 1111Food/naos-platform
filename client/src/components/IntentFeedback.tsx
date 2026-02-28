import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../contexts/ProfileContext';
import { useCoherence } from '../hooks/useCoherence';
import { INTENT_CONFIGS, type IntentType } from '../lib/intentions';
import { ShieldAlert, Zap, Quote } from 'lucide-react';

export const IntentFeedback: React.FC = () => {
    const { profile } = useProfile();
    const { score } = useCoherence();

    const currentIntent = (profile?.dominant_intent || 'none').toLowerCase();
    const config = INTENT_CONFIGS[currentIntent as IntentType] || INTENT_CONFIGS.none;

    const message = score >= 50
        ? config.stoicFeedback.highCoherence
        : config.stoicFeedback.lowCoherence;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={`${currentIntent}-${score >= 50}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full max-w-2xl px-6 mb-8 text-center"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] text-white/30 font-bold mb-1">
                        <Quote size={10} className="text-white/20" />
                        Dirección del Arquitecto
                    </div>

                    <p className="text-xl md:text-2xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-400 leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        {message}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                        <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/10" />
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                            {score < 50 ? (
                                <ShieldAlert size={10} className="text-amber-500" />
                            ) : (
                                <Zap size={10} className="text-cyan-400" />
                            )}
                            <span className="text-[10px] text-white/40 tracking-widest font-bold">
                                {score < 50 ? 'ALERTA DE RUIDO' : 'FRECUENCIA ÓPTIMA'}
                            </span>
                        </div>
                        <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/10" />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
