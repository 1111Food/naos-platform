import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface WisdomCardProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: LucideIcon;
    color: string; // Tailswind class for gradient or text color
    isActive: boolean;
    onClick: () => void;
    delay?: number;
}

export const WisdomCard: React.FC<WisdomCardProps> = ({
    title,
    subtitle,
    description,
    icon: Icon,
    color,
    isActive,
    onClick,
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={isActive ? { scale: 1.02, y: -5 } : {}}
            whileTap={isActive ? { scale: 0.98 } : {}}
            onClick={isActive ? onClick : undefined}
            className={cn(
                "relative group p-8 rounded-[2rem] border overflow-hidden transition-all duration-500 cursor-pointer h-[320px] flex flex-col justify-between",
                // Base Glass Style
                "bg-black/60 backdrop-blur-md",
                isActive
                    ? "border-yellow-500/10 hover:border-yellow-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                    : "border-white/5 opacity-40 grayscale pointer-events-none"
            )}
        >
            {/* Próximamente Overlay */}
            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-20">
                    <span className="px-4 py-1 bg-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">Próximamente</span>
                </div>
            )}

            {/* Gradient Blob for Glow Effect */}
            <div className={cn(
                "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 transition-all duration-1000 group-hover:opacity-40",
                color // e.g. "bg-purple-500" passed via color prop or derived
            )} />

            {/* HEADER */}
            <div className="relative z-10 flex items-start justify-between">
                <div className={cn(
                    "p-3 rounded-xl bg-white/5 border border-white/10 transition-transform duration-500 group-hover:scale-110",
                    isActive && "group-hover:border-white/20"
                )}>
                    <Icon strokeWidth={1.5} className="w-6 h-6 text-white/90" />
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-bold mb-2">{subtitle}</span>
                    <div className="h-[1px] w-8 bg-white/20 group-hover:w-16 transition-all duration-500" />
                </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 space-y-3 mt-auto">
                <h3 className="text-2xl font-light text-white leading-tight tracking-wide">{title}</h3>
                <p className="text-white/50 text-xs leading-relaxed font-light line-clamp-3">
                    {description}
                </p>
            </div>

            {/* FOOTER ACTION */}
            <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold group-hover:text-yellow-500/80 transition-colors">
                <span>Explorar</span>
                <ArrowLeft className="w-3 h-3 rotate-180 transition-transform group-hover:translate-x-1" />
            </div>

        </motion.div>
    );
};
