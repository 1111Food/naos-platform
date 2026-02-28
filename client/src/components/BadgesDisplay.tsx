
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Crown, Hexagon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../hooks/useProfile';

// Badge Definitions
const BADGES = [
    {
        id: 'BRONZE',
        label: 'Iniciado',
        cycles: 1,
        icon: Shield,
        color: 'text-amber-700', // Bronze
        bg: 'bg-amber-900/20',
        border: 'border-amber-700/50',
        description: 'Has completado tu primer ciclo de 21 días.',
        geometry: 'rounded-full'
    },
    {
        id: 'SILVER',
        label: 'Adepto',
        cycles: 3,
        icon: Star,
        color: 'text-slate-300', // Silver
        bg: 'bg-slate-800/20',
        border: 'border-slate-300/50',
        description: 'La constancia empieza a forjar tu espíritu (3 Ciclos).',
        geometry: 'rounded-xl'
    },
    {
        id: 'GOLD',
        label: 'Maestro',
        cycles: 7,
        icon: Crown,
        color: 'text-yellow-400', // Gold
        bg: 'bg-yellow-900/20',
        border: 'border-yellow-400/50',
        description: 'Dominio de la voluntad y la energía (7 Ciclos).',
        geometry: 'rounded-lg rotate-45'
    },
    {
        id: 'ARCHITECT',
        label: 'Arquitecto',
        cycles: 12,
        icon: Hexagon,
        color: 'text-cyan-400', // Neon Cyan
        bg: 'bg-black',
        border: 'border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]',
        description: 'Rango Máximo. Constructor de Realidades (12 Ciclos).',
        geometry: 'clip-path-hexagon' // Custom handling
    }
];

export const BadgesDisplay: React.FC = () => {
    const { profile } = useProfile();
    const completed = profile?.protocols_completed || 0;

    return (
        <div className="w-full space-y-6 py-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-serif text-white/60 uppercase tracking-widest">Insignias de Evolución</h3>
                <span className="text-xs text-white/30">{completed} Ciclos Completados</span>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {BADGES.map((badge) => {
                    const isUnlocked = completed >= badge.cycles;

                    return (
                        <div key={badge.id} className="relative group flex flex-col items-center gap-3">
                            {/* Badge Token */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                    "w-16 h-16 flex items-center justify-center border transition-all duration-500 overflow-hidden relative",
                                    badge.geometry.includes('rotate') ? "transform rotate-45" : badge.geometry,
                                    badge.id === 'ARCHITECT' && "border-2",
                                    isUnlocked
                                        ? `${badge.bg} ${badge.border} ${badge.color}`
                                        : "bg-white/5 border-white/5 text-white/10 grayscale"
                                )}
                            >
                                {/* Architect Special Glow */}
                                {badge.id === 'ARCHITECT' && isUnlocked && (
                                    <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                                )}

                                <badge.icon
                                    size={badge.id === 'ARCHITECT' ? 28 : 24}
                                    strokeWidth={1.5}
                                    className={cn(
                                        badge.geometry.includes('rotate') && "-rotate-45"
                                    )}
                                />
                            </motion.div>

                            {/* Label */}
                            <div className="text-center space-y-1">
                                <span className={cn(
                                    "text-[10px] uppercase tracking-wider font-bold block",
                                    isUnlocked ? "text-white/90" : "text-white/20"
                                )}>
                                    {badge.label}
                                </span>
                                {isUnlocked && (
                                    <span className="text-[9px] text-white/40 block">
                                        {badge.id === 'ARCHITECT' ? '∞' : `${badge.cycles} Ciclos`}
                                    </span>
                                )}
                            </div>

                            {/* Tooltip (Simple) */}
                            {isUnlocked && (
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 bg-black/90 border border-white/10 p-2 rounded-lg text-[9px] text-center text-white/70 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                    {badge.description}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
