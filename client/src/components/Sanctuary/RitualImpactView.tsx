
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Flame, Droplets, Mountain, Wind } from 'lucide-react';

interface RitualImpactViewProps {
    delta: number;
    newScore: number;
    element: 'WATER' | 'FIRE' | 'EARTH' | 'AIR' | null;
    onClose: () => void;
}

export const RitualImpactView: React.FC<RitualImpactViewProps> = ({ delta, newScore, element, onClose }) => {

    // Auto-close after 5 seconds if not interactive
    useEffect(() => {
        const timer = setTimeout(onClose, 6000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const getElementIcon = () => {
        switch (element) {
            case 'WATER': return Droplets;
            case 'FIRE': return Flame;
            case 'EARTH': return Mountain;
            case 'AIR': return Wind;
            default: return ShieldCheck;
        }
    };

    const Icon = getElementIcon();
    const isPositive = delta >= 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="w-full max-w-sm bg-[#0f0a1e] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent pointer-events-none" />

                {/* Icon Ring */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
                    <div className="w-20 h-20 rounded-full border border-cyan-500/30 bg-black/40 flex items-center justify-center relative z-10">
                        <Icon size={32} className="text-cyan-200" />
                    </div>
                    {/* Orbiting particle */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full"
                    >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    </motion.div>
                </div>

                <h2 className="text-2xl font-serif italic text-white mb-1">Ritual Integrado</h2>
                <p className="text-xs uppercase tracking-widest text-white/40 mb-8">
                    El Santuario ha procesado tu energía
                </p>

                <div className="gap-2 flex items-baseline justify-center mb-8">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                        {isPositive ? '+' : ''}{delta}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30">Coherencia</span>
                </div>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-8 relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, Math.max(0, newScore))}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-600 to-cyan-400"
                    />
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-4 rounded-xl bg-white text-black font-medium hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                >
                    Continuar <ArrowRight size={16} />
                </button>

            </motion.div>
        </motion.div>
    );
};
