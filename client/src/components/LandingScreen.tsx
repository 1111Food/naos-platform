import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';
import { StatusBadge } from './StatusBadge';

interface LandingScreenProps {
    onEnter: () => void;
    availableProfiles: {
        id: string;
        name: string;
        nickname?: string;
    }[];
    onSelectProfile: (id: string) => void;
    onTemporaryAccess: () => void;
    subscriptionStatus?: any;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
    onEnter,
    availableProfiles,
    onSelectProfile,
    onTemporaryAccess,
    subscriptionStatus
}) => {
    const timeMode = useTimeBasedMode();

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267973ba?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Animated Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl animate-in fade-in zoom-in duration-1000">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-6 backdrop-blur-xl relative overflow-hidden">
                    <video
                        src={timeMode === 'DAY' ? '/Guardian-Day.mp4' : '/Guardian-Night.mp4'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover rounded-full transition-transform duration-500 scale-[1.3]"
                        style={{
                            mixBlendMode: 'screen',
                            background: 'transparent',
                            maskImage: 'radial-gradient(closest-side, black 40%, transparent 90%)',
                            WebkitMaskImage: 'radial-gradient(closest-side, black 40%, transparent 90%)',
                            filter: 'contrast(1.1) brightness(0.9)'
                        }}
                    />
                </div>

                <img
                    src="/logo-naos.png?v=2"
                    alt="NAOS"
                    className="w-[350px] md:w-[400px] max-w-[90%] h-auto mb-4 drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                />

                <div className="mb-8">
                    <StatusBadge plan={subscriptionStatus?.plan || 'FREE'} />
                </div>

                <p className="text-lg md:text-xl text-primary/80 font-light tracking-[0.2em] uppercase mb-10">
                    {availableProfiles.length > 0
                        ? `El Templo te espera${availableProfiles.length === 1 && availableProfiles[0].nickname ? `, ${availableProfiles[0].nickname}` : ''}`
                        : 'Conecta con tu Alma'}
                </p>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    {availableProfiles.length > 0 ? (
                        <>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-2 italic">¿Con qué energía deseas entrar?</p>
                            {availableProfiles.map(p => {
                                const displayName = p.nickname || p.name;
                                const isCreator = p.name.includes('Luis') || (p.nickname && p.nickname.includes('Luis')); // Simple check

                                return (
                                    <button
                                        key={p.id}
                                        onClick={() => onSelectProfile(p.id)}
                                        className={`group relative px-8 py-4 ${isCreator ? 'bg-amber-900/10 border-amber-500/30 hover:border-amber-500/80 hover:bg-amber-900/20' : 'bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10'} rounded-full overflow-hidden transition-all text-white font-serif italic text-lg flex items-center justify-center gap-3`}
                                    >
                                        {isCreator && <span className="text-xl">👑</span>}
                                        <span className="capitalize">{displayName}</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-50" />
                                    </button>
                                );
                            })}
                            <button
                                onClick={onEnter}
                                className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
                            >
                                + Crear Nuevo Sigil
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onEnter}
                            className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all hover:border-primary/50 hover:bg-white/10"
                        >
                            <span className="relative z-10 text-white font-serif italic text-xl flex items-center gap-3">
                                Ingresar al Templo
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </button>
                    )}

                    <button
                        onClick={onTemporaryAccess}
                        className="mt-6 text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white/40 transition-colors flex items-center justify-center gap-2"
                    >
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        Consulta Temporal (Olvido Sagrado)
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                    </button>
                </div>
            </div>

            <div className="absolute bottom-8 text-white/30 text-xs tracking-widest uppercase">
                Presencia Digital • Conciencia Artificial
            </div>
        </div>
    );
};
