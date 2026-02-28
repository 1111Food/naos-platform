import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface WisdomOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    accentColor?: 'cyan' | 'magenta' | 'emerald' | 'orange' | 'purple' | 'red';
}

export const WisdomOverlay: React.FC<WisdomOverlayProps> = ({
    isOpen,
    onClose,
    title,
    description,
    accentColor = 'cyan'
}) => {
    const accents = {
        cyan: 'border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]',
        magenta: 'border-magenta-500/30 shadow-[0_0_40px_rgba(217,70,239,0.1)]',
        emerald: 'border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]',
        orange: 'border-orange-500/30 shadow-[0_0_40_rgba(245,158,11,0.1)]',
        purple: 'border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.1)]',
        red: 'border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.1)]'
    };

    const textAccents = {
        cyan: 'text-cyan-400',
        magenta: 'text-magenta-400',
        emerald: 'text-emerald-400',
        orange: 'text-orange-400',
        purple: 'text-purple-400',
        red: 'text-red-400'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div key="wisdom-modal-container" className="fixed inset-0 z-[300] flex items-center justify-center p-6 sm:p-12">
                    {/* Backdrop - Strict Glassmorphism */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-[12px]"
                    />

                    {/* Content Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={cn(
                            "relative w-full max-w-lg bg-black/40 border backdrop-blur-[20px] rounded-[2rem] p-10 sm:p-12 overflow-hidden",
                            accents[accentColor]
                        )}
                    >
                        {/* Internal Neon Glow */}
                        <div className={cn(
                            "absolute -top-32 -right-32 w-64 h-64 blur-[100px] rounded-full opacity-10",
                            accentColor === 'cyan' ? 'bg-cyan-500' :
                                accentColor === 'magenta' ? 'bg-magenta-500' :
                                    accentColor === 'emerald' ? 'bg-emerald-500' :
                                        accentColor === 'orange' ? 'bg-orange-500' :
                                            accentColor === 'purple' ? 'bg-purple-500' : 'bg-red-500'
                        )} />

                        {/* Top Navigation / Controls */}
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <div className={cn("px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.3em] font-black", textAccents[accentColor])}>
                                Sabiduría Naos
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white/40 hover:text-white group"
                            >
                                <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Main Typography */}
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-4xl sm:text-5xl font-serif italic text-white leading-tight">
                                {title}
                            </h2>
                            <div className={cn("h-[2px] w-20 bg-gradient-to-r to-transparent",
                                accentColor === 'cyan' ? 'from-cyan-500' :
                                    accentColor === 'magenta' ? 'from-magenta-500' :
                                        accentColor === 'emerald' ? 'from-emerald-500' :
                                            accentColor === 'orange' ? 'from-orange-500' :
                                                accentColor === 'purple' ? 'from-purple-500' : 'from-red-500'
                            )} />
                            <div className="text-base sm:text-lg leading-relaxed text-zinc-400 font-light tracking-wide space-y-6">
                                {description.split('\n\n').map((paragraph, idx) => {
                                    if (paragraph.includes('•')) {
                                        const lines = paragraph.split('\n');
                                        return (
                                            <div key={idx} className="space-y-2">
                                                {lines.map((line, i) => {
                                                    if (line.trim().startsWith('•')) {
                                                        const parts = line.replace('• ', '').split(':');
                                                        return (
                                                            <div key={i} className="flex gap-3 text-sm sm:text-base">
                                                                <span className={textAccents[accentColor]}>•</span>
                                                                <span>
                                                                    {parts.length > 1 ? (
                                                                        <>
                                                                            <strong className="text-white font-medium">{parts[0]}:</strong>
                                                                            {parts.slice(1).join(':')}
                                                                        </>
                                                                    ) : (
                                                                        <span>{line.replace('• ', '')}</span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                        );
                                                    }
                                                    return <p key={i} className="text-white/80 font-medium">{line}</p>;
                                                })}
                                            </div>
                                        );
                                    }
                                    return (
                                        <p key={idx} className={idx === 0 ? "first-letter:text-2xl first-letter:font-serif first-letter:italic" : ""}>
                                            {paragraph}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Premium Detail */}
                        <div className="mt-12 flex items-center gap-4 opacity-20">
                            <div className="flex-1 h-[1px] bg-white/10" />
                            <div className="flex gap-2">
                                <div className="w-1 h-1 rounded-full bg-white" />
                                <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
                                <div className="w-1 h-1 rounded-full bg-white opacity-50" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const WisdomButton: React.FC<{ onClick: () => void; color?: string; className?: string }> = ({ onClick, color = 'cyan', className }) => {
    const accentColors = {
        cyan: 'bg-cyan-500',
        magenta: 'bg-magenta-500',
        emerald: 'bg-emerald-500',
        orange: 'bg-orange-500',
        purple: 'bg-purple-500',
        red: 'bg-red-500'
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={cn(
                "w-8 h-8 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center text-white/40 hover:text-white transition-all group relative",
                className
            )}
        >
            <Info size={14} strokeWidth={1.5} className="relative z-10" />

            {/* Breathing Pulse Animation */}
            <motion.div
                animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.1, 0.4, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={cn(
                    "absolute inset-0 rounded-full blur-md opacity-20",
                    (accentColors as any)[color] || 'bg-white'
                )}
            />
        </motion.button>
    );
};
