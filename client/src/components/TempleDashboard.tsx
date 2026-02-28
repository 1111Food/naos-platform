import React from 'react';
import { Sun, Wind, MessageCircle, Flower2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';

interface TempleDashboardProps {
    onSelectFeature: (feature: 'ASTRO' | 'NUMERO' | 'TAROT' | 'FENGSHUI' | 'CHAT' | 'MAYA') => void;
    activeFeature: string;
}

export const TempleDashboard: React.FC<TempleDashboardProps> = ({ onSelectFeature, activeFeature }) => {
    const timeMode = useTimeBasedMode();

    const buttons = [
        { id: 'TAROT', label: 'Tarot Sí o No', icon: Flower2, color: 'text-rose-400', bg: 'bg-rose-400/10' },
        { id: 'MAYA', label: 'Nawal Maya', icon: Sun, color: 'text-orange-400', bg: 'bg-orange-400/10' },
        { id: 'FENGSHUI', label: 'Consejo Feng Shui', icon: Wind, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    ];

    return (
        <div
            data-energy-mode={timeMode.toLowerCase()}
            className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700"
        >

            {/* Animated Sigil Area (The Guardian) */}
            <div className="flex flex-col items-center justify-center py-12 relative">
                <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full animate-pulse" />
                <div className="relative group cursor-pointer" onClick={() => onSelectFeature('CHAT')}>
                    {/* Sigil Guardian Visualization */}
                    <div className={cn(
                        "w-64 h-64 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-1000",
                        timeMode === 'DAY' ? "scale-110" : "border-2 border-primary/20 backdrop-blur-3xl shadow-2xl shadow-primary/10"
                    )}>
                        {timeMode === 'DAY' ? (
                            <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-1000">
                                <div className="absolute inset-0 bg-amber-500/10 blur-[60px] rounded-full animate-pulse" />
                                <img
                                    src="/sigil-day.png"
                                    alt="Sigil Anthropos Solar"
                                    className="w-48 h-auto relative z-10 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-float"
                                />
                            </div>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center animate-in fade-in zoom-in duration-1000">
                                <div className="absolute inset-0 bg-primary/10 blur-[60px] rounded-full animate-pulse" />
                                <img
                                    src="/sigil-night.png"
                                    alt="Sigil Anthropos Nocturno"
                                    className="w-48 h-auto relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-float"
                                />
                            </div>
                        )}
                    </div>

                    {/* LABEL & ENERGY BOOST INDICATOR */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-full">
                        <div className={cn(
                            "px-4 py-1 border rounded-full text-[10px] uppercase tracking-widest backdrop-blur-md transition-colors duration-1000",
                            timeMode === 'DAY' ? "bg-amber-500/20 border-amber-500/30 text-amber-500" : "bg-primary/20 border-primary/30 text-primary"
                        )}>
                            {timeMode === 'DAY' ? "Sigil: Anthropos Solar" : "Sigil: Guardián Nocturno"}
                        </div>

                        {/* REGULATION BOOST INDICATOR - INJECTED VIA PROP OR CONTEXT IN FUTURE, MOCKUP LOGIC HERE IF NEEDED OR JUST PLACEHOLDER */}
                        {/* Note: Ideally pass regulationBoost as prop here, but for now we keep it visual or use context if available inside component. */}
                        {/* Since TempleDashboard doesn't have useEnergy yet, we'll need to inject it or fetch it. 
                             Wait, request was "ACTUALIZACIÓN VISUAL (ENERGY CARD)". TempleDashboard has buttons but maybe not the energy score itself explicitly displayed?
                             Ah, the prompt says "En la tarjeta de Energía del Dashboard". There isn't an explicit "Energy Card" in the code I read (only features). 
                             I see the SIGIL container. I will add it BELOW the title. 
                             Propagating useEnergy here might be needed. I'll add the hook call here.
                         */}
                    </div>
                </div>
                <p className="mt-10 text-center text-white/60 font-serif italic text-lg max-w-md">
                    "Bienvenido al corazón del Templo. ¿Qué energía deseas explorar hoy?"
                </p>
            </div>

            {/* Feature Navigation Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                {buttons.map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => onSelectFeature(btn.id as any)}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-3xl border transition-all duration-500 group relative overflow-hidden",
                            activeFeature === btn.id
                                ? "bg-white/10 border-primary shadow-2xl shadow-primary/10"
                                : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/8"
                        )}
                    >
                        <div className={cn("p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110", btn.bg)}>
                            <btn.icon className={cn("w-8 h-8", btn.color)} />
                        </div>
                        <span className="text-sm font-medium tracking-tight text-white/90">{btn.label}</span>

                        {activeFeature === btn.id && (
                            <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                        )}
                    </button>
                ))}
            </div>

            {/* Quick Access Chat Button (Small) */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => onSelectFeature('CHAT')}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                    <MessageCircle className="w-4 h-4" />
                    Chat con Sigil
                </button>
            </div>
        </div>
    );
};
