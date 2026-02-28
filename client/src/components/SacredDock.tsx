import React, { useState, memo } from 'react';
import { Home, Users, User, LogOut, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils';

interface SacredDockProps {
    activeView: string;
    onNavigate: (view: any) => void;
    onLogout?: () => void;
}

export const SacredDock: React.FC<SacredDockProps> = memo(({ activeView, onNavigate, onLogout }) => {
    const [audioState, setAudioState] = useState(() => {
        const saved = localStorage.getItem('naos_audio_prefs');
        return saved ? JSON.parse(saved) : { volume: 0.3, isMuted: true };
    });

    const toggleMute = () => {
        const newState = { ...audioState, isMuted: !audioState.isMuted };
        setAudioState(newState);
        (window as any).setNaosVibration?.(newState);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value);
        const newState = { ...audioState, volume, isMuted: volume === 0 };
        setAudioState(newState);
        (window as any).setNaosVibration?.(newState);
    };

    const items = [
        { id: 'TEMPLE', icon: Home, label: 'Templo', color: 'text-amber-400' },
        { id: 'SYNASTRY', icon: Users, label: 'Vínculos', color: 'text-rose-400' },
        { id: 'PROFILE', icon: User, label: 'Perfil', color: 'text-purple-400' },
    ];

    return (
        <nav className={cn(
            "fixed z-[100] transition-all duration-500",
            "bottom-0 left-0 right-0 h-auto px-2 pb-[env(safe-area-inset-bottom)] bg-black/20 backdrop-blur-xl border-t border-white/10 rounded-t-2xl md:border-t-0",
            "md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-auto md:h-auto md:max-h-[600px] md:px-3 md:py-6 md:rounded-full md:border md:border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        )}>
            <div className="flex md:flex-col items-center justify-around md:justify-center gap-2 md:gap-4 py-2 md:py-0">
                {items.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={cn(
                                "flex flex-col md:flex-row items-center gap-1 p-3 rounded-xl md:rounded-full transition-all duration-500 group relative",
                                isActive ? "bg-white/10 scale-110 shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                            )}
                        >
                            <item.icon
                                strokeWidth={1}
                                className={cn(
                                    "w-6 h-6 md:w-5 md:h-5 transition-all duration-300",
                                    isActive ? item.color : "text-white group-hover:text-white"
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

                {/* Salida Sagrada */}
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="flex flex-col md:flex-row items-center gap-1 p-2 md:p-4 rounded-xl md:rounded-full transition-all duration-300 hover:bg-red-500/10 group relative mt-auto"
                    >
                        <LogOut className="w-5 h-5 md:w-6 md:h-6 text-white/20 group-hover:text-red-400 transition-colors" />
                    </button>
                )}

                {/* Vibración de Naos (Controles de Audio) */}
                <div className="flex md:flex-col items-center gap-2 md:gap-4 p-2 md:p-4 border-t md:border-t-0 md:border-l border-white/5 md:ml-0 md:mt-4">
                    <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-white/5 border border-white/10 text-white/30 hover:text-amber-400 transition-all relative group"
                    >
                        {audioState.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        <span className="hidden md:block absolute left-full ml-4 px-3 py-1 bg-black/80 border border-white/10 rounded-lg text-[8px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {audioState.isMuted ? 'Activar Vibración' : 'Silenciar'}
                        </span>
                    </button>

                    <div className="hidden md:flex items-center group relative">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={audioState.volume}
                            onChange={handleVolumeChange}
                            className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500/50 hover:accent-amber-500 transition-all origin-left rotate-0 md:-rotate-90 md:absolute md:bottom-12 md:-left-6"
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
});
