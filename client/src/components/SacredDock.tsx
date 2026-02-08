import React from 'react';
import { Star, Flower2, Wind, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface SacredDockProps {
    activeView: string;
    onNavigate: (view: any) => void;
}

export const SacredDock: React.FC<SacredDockProps> = ({ activeView, onNavigate }) => {
    const items = [
        { id: 'TEMPLE', icon: Star, label: 'Templo', color: 'text-amber-400' },
        { id: 'TAROT', icon: Flower2, label: 'Tarot', color: 'text-rose-400' },
        { id: 'SYNASTRY', icon: Users, label: 'Almas', color: 'text-purple-400' },
        { id: 'FENGSHUI', icon: Wind, label: 'Feng Shui', color: 'text-emerald-400' },
        { id: 'CHAT', icon: SigilIcon, label: 'Sigil', color: 'text-amber-500' },
    ];

    return (
        <nav className={cn(
            "fixed z-[100] transition-all duration-500",
            "bottom-0 left-0 right-0 h-auto px-2 pb-[env(safe-area-inset-bottom)] glass-sidebar border-t border-white/10 rounded-t-2xl md:border-t-0",
            "md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-auto md:h-auto md:max-h-[600px] md:px-4 md:py-8 md:rounded-full md:border-r"
        )}>
            <div className="flex md:flex-col items-center justify-around md:justify-center gap-2 md:gap-6 py-3 md:py-0">
                {items.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={cn(
                                "flex flex-col md:flex-row items-center gap-1 p-2 md:p-4 rounded-xl md:rounded-full transition-all duration-300 group relative",
                                isActive ? "bg-white/10 scale-110 md:scale-125" : "hover:bg-white/5"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 md:w-6 md:h-6 transition-colors",
                                isActive ? item.color : "text-white/20 group-hover:text-white/60"
                            )} />

                            <span className={cn(
                                "text-[8px] md:hidden uppercase tracking-tighter transition-colors",
                                isActive ? "text-white font-bold" : "text-white/20"
                            )}>
                                {item.label}
                            </span>

                            <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-black/80 border border-white/10 rounded-lg text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                {item.label}
                            </span>

                            {isActive && (
                                <div className={cn(
                                    "absolute inset-0 rounded-xl md:rounded-full blur-lg opacity-10 md:opacity-20 animate-pulse",
                                    item.color.replace('text-', 'bg-')
                                )} />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

const SigilIcon = ({ className }: { className: string }) => (
    <div className={cn("relative flex items-center justify-center", className)}>
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
                filter: ["blur(4px) brightness(1)", "blur(8px) brightness(1.5)", "blur(4px) brightness(1)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-amber-500/20 rounded-full"
        />
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
            <path d="M12 2L14.5 9H21L15.5 13.5L18 20.5L12 16L6 20.5L8.5 13.5L3 9H9.5L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
            <path d="M12 7V5M12 19V17M17 12H19M5 12H7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
    </div>
);
