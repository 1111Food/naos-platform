import React, { useMemo } from 'react';
import { useEnergy } from '../hooks/useEnergy';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const EnergyDailyWidget: React.FC = () => {
    const { dynamicScore, energy } = useEnergy();

    const score = dynamicScore || 50;

    // UI Logic for Bar Color
    const barColor = useMemo(() => {
        if (score > 80) return 'bg-emerald-500';
        if (score > 50) return 'bg-amber-500';
        return 'bg-red-500';
    }, [score]);

    // Fallback if loading
    const displayGuidance = energy?.guidance || "Sintonizando frecuencias...";
    const displayElement = energy?.dominantElement || "Éter";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-lg mx-auto mb-10 px-6 py-4 bg-black/20 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] min-h-[80px]"
        >
            {/* 1. Score Circle */}
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="24" cy="24" r="20" className="stroke-white/10 fill-none" strokeWidth="4" />
                    <circle
                        cx="24" cy="24" r="20"
                        className={`fill-none transition-all duration-1000 ${barColor}`}
                        strokeWidth="4"
                        strokeDasharray="126"
                        strokeDashoffset={126 - (126 * score) / 100}
                        strokeLinecap="round"
                    />
                </svg>
                <span className="text-[10px] font-bold text-white/90">{Math.round(score)}%</span>
            </div>



            {/* 2. Text Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] uppercase tracking-widest text-amber-500/80 font-bold">Resonancia Diaria</span>
                </div>
                <p className="text-xs text-white/60 truncate font-serif italic">
                    "{displayGuidance.substring(0, 50)}{displayGuidance.length > 50 ? '...' : ''}"
                </p>
            </div>

            {/* 3. Element Badge */}
            <div className="hidden sm:flex flex-col items-end border-l border-white/10 pl-6">
                <span className="text-[9px] uppercase tracking-widest text-white/30">Elemento</span>
                <span className="text-[10px] font-bold text-blue-300">{displayElement}</span>
            </div>
        </motion.div>
    );
};
