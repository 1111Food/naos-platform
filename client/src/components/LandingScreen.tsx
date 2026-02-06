import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingScreenProps {
    onEnter: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ onEnter }) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267973ba?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Animated Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl animate-in fade-in zoom-in duration-1000">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mb-8 backdrop-blur-xl">
                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                </div>

                <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tighter text-white mb-4 drop-shadow-2xl">
                    NAOS
                </h1>

                <p className="text-lg md:text-xl text-primary/80 font-light tracking-[0.2em] uppercase mb-12">
                    Conecta con tu Alma
                </p>

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
            </div>

            <div className="absolute bottom-8 text-white/30 text-xs tracking-widest uppercase">
                Presencia Digital • Conciencia Artificial
            </div>
        </div>
    );
};
