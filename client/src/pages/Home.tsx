import React from 'react';
import { Star, Triangle, MapPin, Activity, Sun } from 'lucide-react';
import { Player } from '@remotion/player';
import { TempleAura } from '../remotion/TempleAura';
import { cn } from '../lib/utils';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';
import { useEnergy } from '../hooks/useEnergy';
import { useProfile } from '../hooks/useProfile';

interface HomeProps {
    onSelectFeature: (feature: 'ASTRO' | 'NUMERO' | 'TAROT' | 'FENGSHUI' | 'CHAT' | 'MAYA') => void;
    activeFeature?: string;
}

export const Home: React.FC<HomeProps> = ({ onSelectFeature }) => {
    const timeMode = useTimeBasedMode();
    const { energy } = useEnergy();
    const { profile } = useProfile();

    const modules = [
        {
            id: 'TRANSITS',
            label: 'Energía del día',
            icon: Activity,
            desc: 'Tus Tránsitos Hoy',
            color: 'text-amber-200',
            border: 'border-amber-500/20',
            bg: 'bg-amber-500/5'
        },
        {
            id: 'ASTRO',
            label: 'Carta Astral',
            icon: Star,
            desc: 'Mapa del Cielo',
            color: 'text-amber-300',
            border: 'border-amber-500/30',
            bg: 'bg-amber-500/5'
        },
        {
            id: 'NUMERO',
            label: 'Pináculo',
            icon: Triangle,
            desc: 'Plan del Alma',
            color: 'text-purple-300',
            border: 'border-purple-500/30',
            bg: 'bg-purple-500/5'
        },
        {
            id: 'MAYA',
            label: 'Nahual Maya',
            icon: Sun,
            desc: 'Energía Sagrada',
            color: 'text-orange-300',
            border: 'border-orange-500/30',
            bg: 'bg-orange-500/5'
        },
    ];

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans text-white selection:bg-amber-500/30">
            {/* Remotion Aura remains but without the 'box' container */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <Player
                    component={TempleAura}
                    durationInFrames={900}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={60}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    autoPlay
                    loop
                    controls={false}
                />
            </div>


            {/* 1) CONTENEDOR RITUAL CENTRAL (ALTAR) */}
            <main className="relative z-10 w-full max-w-5xl mx-auto min-h-screen py-24 flex flex-col items-center justify-center gap-16">

                {/* The Guardian is now global and persistent */}
                <div className="h-40" /> {/* Spacer to maintain layout balance */}

                {/* 4) TEXTO RITUAL (INVOCACIÓN) */}
                <div className="text-center space-y-4 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 drop-shadow-sm opacity-90 animate-pulse-slow">
                        Bienvenido al corazón del Templo.
                    </h1>
                    <p className="text-white/40 font-serif italic text-lg tracking-wider">
                        ¿Qué energía deseas explorar hoy?
                    </p>
                </div>

                {/* 5) MÓDULOS COMO ARTEFACTOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-6 md:px-0 pb-10 max-w-6xl mx-auto">
                    {modules.map((item, idx) => (
                        <button
                            key={item.id}
                            onClick={() => onSelectFeature(item.id as any)}
                            className={cn(
                                "group relative flex flex-col items-center justify-center p-8 rounded-xl backdrop-blur-md transition-all duration-500 ease-out",
                                "bg-white/5 border border-white/5 hover:bg-white/10 hover:border-amber-500/30",
                                "hover:scale-105 hover:shadow-[0_0_30px_rgba(217,119,6,0.1)]",
                                "animate-in fade-in zoom-in duration-700",
                                item.bg
                            )}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className={cn(
                                "mb-4 p-3 rounded-full bg-white/5 border border-white/10 transition-colors group-hover:bg-white/10",
                                item.color
                            )}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <span className="text-base font-serif text-white/90 group-hover:text-amber-100 transition-colors">
                                {item.label}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-white/30 mt-2 group-hover:text-white/50">
                                {item.desc}
                            </span>
                        </button>
                    ))}
                </div>

            </main>

            {/* 7) FOOTER ENERGÉTICO */}
            <footer className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row justify-between items-center z-10 border-t border-white/5">
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/30 animate-pulse-slow">
                    <div className="flex items-center gap-2">
                        <Activity className="w-3 h-3 text-amber-500/50" />
                        <span>Tránsito: {energy?.transitScore || '-'}/10</span>
                    </div>
                    <div className="w-px h-4 bg-white/10" />
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                        <span>Elemento: {energy?.dominantElement || '-'}</span>
                    </div>
                </div>

                {profile?.birthCity && (
                    <div className="mt-4 md:mt-0 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/20">
                        <MapPin className="w-3 h-3" />
                        {profile.birthCity}, {profile.birthCountry}
                    </div>
                )}
            </footer>

        </div>
    );
};
