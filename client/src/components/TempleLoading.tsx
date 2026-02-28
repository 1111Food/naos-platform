import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface TempleLoadingProps {
    variant?: 'card' | 'text' | 'circle' | 'fullscreen';
    className?: string;
    text?: string;
}

export const TempleLoading: React.FC<TempleLoadingProps> = ({ variant = 'card', className, text }) => {

    const shimmer: Variants = {
        initial: { opacity: 0.3 },
        animate: {
            opacity: 0.7,
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                repeatType: "reverse"
            }
        }
    };

    if (variant === 'fullscreen') {
        return (
            <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050507] text-white", className)}>
                <div className="relative w-20 h-20">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-amber-500/30 border-t-amber-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-4 rounded-full border-2 border-purple-500/30 border-b-purple-500"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
                    </div>
                </div>
                {text && <span className="mt-8 text-xs text-white/40 animate-pulse uppercase tracking-[0.3em] font-light">{text}</span>}
            </div>
        );
    }

    if (variant === 'circle') {
        return (
            <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
                <div className="relative w-12 h-12">
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-amber-500/30 border-t-amber-500"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-2 rounded-full border-2 border-purple-500/30 border-b-purple-500"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                {text && <span className="text-xs text-white/50 animate-pulse uppercase tracking-widest">{text}</span>}
            </div>
        );
    }

    if (variant === 'text') {
        return (
            <div className={cn("flex flex-col gap-2 w-full", className)}>
                <motion.div variants={shimmer} initial="initial" animate="animate" className="h-4 w-3/4 bg-white/10 rounded-full" />
                <motion.div variants={shimmer} initial="initial" animate="animate" className="h-3 w-1/2 bg-white/5 rounded-full" />
            </div>
        );
    }

    // Default: Card
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("relative overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6", className)}
        >
            <div className="flex items-center gap-4 mb-4">
                <motion.div variants={shimmer} initial="initial" animate="animate" className="w-10 h-10 rounded-full bg-white/10" />
                <div className="space-y-2 flex-1">
                    <motion.div variants={shimmer} initial="initial" animate="animate" className="h-4 w-1/3 bg-white/10 rounded-full" />
                    <motion.div variants={shimmer} initial="initial" animate="animate" className="h-2 w-1/4 bg-white/5 rounded-full" />
                </div>
            </div>
            <div className="space-y-2">
                <motion.div variants={shimmer} initial="initial" animate="animate" className="h-20 w-full bg-white/5 rounded-lg" />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </motion.div>
    );
};
