import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface BentoBlockProps {
    title: string;
    accent: 'emerald' | 'cyan' | 'magenta' | 'orange' | 'violet' | 'purple' | 'red';
    status?: string;
    summary?: { label: string; value: string }[];
    cta?: string;
    onClick?: () => void;
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    clipPath: string;
    pathData: string;
    isTopRow?: boolean;
}

export const BentoBlock: React.FC<BentoBlockProps> = memo(({ title, accent, status, summary, cta, onClick, secondaryAction, clipPath, pathData, isTopRow }) => {
    const glows = {
        cyan: 'hover:shadow-[0_0_60px_-20px_rgba(30,64,175,0.6)] border-blue-400/30',
        magenta: 'hover:shadow-[0_0_60px_-20px_rgba(139,92,246,0.6)] border-purple-400/30',
        emerald: 'hover:shadow-[0_0_60px_-20px_rgba(16,185,129,0.6)] border-emerald-400/30',
        orange: 'hover:shadow-[0_0_60px_-20px_rgba(245,158,11,0.6)] border-amber-400/30',
        violet: 'hover:shadow-[0_0_60px_-20px_rgba(139,92,246,0.6)] border-violet-400/30',
        purple: 'hover:shadow-[0_0_60px_-20px_rgba(168,85,247,0.6)] border-purple-400/30',
        red: 'hover:shadow-[0_0_60px_-20px_rgba(239,68,68,0.6)] border-red-400/30'
    };

    const textAccents = {
        cyan: 'text-blue-400',
        magenta: 'text-purple-400',
        emerald: 'text-emerald-400',
        orange: 'text-amber-400',
        violet: 'text-violet-400',
        purple: 'text-purple-400',
        red: 'text-red-400'
    };


    const bgAccents = {
        cyan: 'bg-gradient-to-br from-blue-900/40 to-blue-950/60 border-blue-500/20 shadow-[0_0_20px_-5px_rgba(30,64,175,0.3)]',
        magenta: 'bg-gradient-to-br from-purple-900/40 to-purple-950/60 border-purple-500/20 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]',
        emerald: 'bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]',
        orange: 'bg-gradient-to-br from-amber-900/30 to-orange-950/60 border-amber-500/20 shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]',
        violet: 'bg-gradient-to-br from-violet-900/40 to-fuchsia-950/60 border-violet-500/20 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]',
        purple: 'bg-gradient-to-br from-purple-900/40 to-indigo-950/60 border-purple-500/20 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]',
        red: 'bg-gradient-to-br from-red-900/40 to-red-950/60 border-red-500/20 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]'
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{
                scale: 1.02,
                zIndex: 50,
                transition: { duration: 0.5, ease: 'easeOut' }
            }}
            className="relative group transition-all duration-700 cursor-pointer min-h-[420px] flex flex-col items-center"
            onClick={onClick}
        >
            <div
                className={`absolute inset-0 backdrop-blur-3xl ${bgAccents[accent]} ${glows[accent]} transition-all duration-700`}
                style={{ clipPath }}
            >
                <div className={`absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 bg-gradient-to-br ${accent === 'cyan' ? 'from-blue-500' :
                    accent === 'magenta' ? 'from-purple-500' :
                        accent === 'emerald' ? 'from-emerald-500' :
                            accent === 'purple' ? 'from-purple-500' :
                                accent === 'red' ? 'from-red-500' : 'from-amber-500'
                    } to-transparent`} />
            </div>

            <div className="absolute inset-0 pointer-events-none p-[0.5px]">
                <svg viewBox="0 0 1 1" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <path
                        d={pathData}
                        vectorEffect="non-scaling-stroke"
                        className={`fill-none stroke-[2px] ${accent === 'cyan' ? 'stroke-blue-400' :
                            accent === 'magenta' ? 'stroke-purple-400' :
                                accent === 'emerald' ? 'stroke-emerald-400' :
                                    accent === 'purple' ? 'stroke-purple-400' :
                                        accent === 'red' ? 'stroke-red-400' : 'stroke-orange-400'} transition-all duration-700`}
                        style={{
                            strokeLinejoin: 'round',
                            opacity: 0.4,
                            filter: 'drop-shadow(0 0 8px currentColor)'
                        }}
                    />
                </svg>
            </div>

            <div className={`relative z-10 w-full px-[15%] flex flex-col items-center flex-1 justify-center space-y-8 ${isTopRow ? 'pt-2 pb-24' : 'pt-24 pb-2'}`}>
                <div className="flex flex-col items-center gap-6 text-center">
                    <div className="space-y-3 flex flex-col items-center">
                        <h3 className="text-2xl md:text-4xl font-serif italic tracking-[0.02em] text-white/90 group-hover:text-white transition-all duration-700 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {title}
                        </h3>
                        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/40 transition-all duration-1000" />
                    </div>
                    {status && (
                        <span className={`text-[10px] px-4 py-1.5 rounded-full border border-current font-black tracking-[0.2em] bg-black/40 uppercase ${textAccents[accent]}`}>
                            {status}
                        </span>
                    )}
                </div>

                {summary && summary.length > 0 && (
                    <div className="space-y-4 w-full">
                        {summary.map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-0.5">
                                <span className="text-[9px] uppercase tracking-[0.25em] text-white/30 font-black">
                                    {item.label}
                                </span>
                                <span className="text-xl md:text-2xl font-serif italic tracking-[0.05em] text-white text-center">
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {secondaryAction && (
                    <div className="pt-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); secondaryAction.onClick(); }}
                            className="flex items-center gap-3 py-2 px-6 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                        >
                            <span className="text-[9px] uppercase tracking-[0.2em] font-black text-white/60">
                                {secondaryAction.label}
                            </span>
                        </button>
                    </div>
                )}

                {cta && (
                    <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10 w-full mt-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 group-hover:text-white transition-colors">
                            {cta}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <span className="text-sm">→</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
});
