import React, { useState } from 'react';
import { Flower2, Repeat } from 'lucide-react';
import { endpoints } from '../lib/api';
import { cn } from '../lib/utils';
import { useGuardianState } from '../contexts/GuardianContext';

export const TarotView: React.FC = () => {
    const [reading, setReading] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { trackEvent } = useGuardianState();

    const drawCard = async () => {
        setLoading(true);
        try {
            const res = await fetch(endpoints.tarot);
            const data = await res.json();
            setReading(data);
            trackEvent('TAROT', { card: data.card, meaning: data.meaning, answer: data.answer });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-4">
                <h3 className="font-serif text-3xl text-white">Consultar el Oráculo</h3>
                <p className="text-white/40 text-sm mt-2 uppercase tracking-widest">Enfoca tu energía en una pregunta de Sí o No</p>
            </div>

            <div className="flex justify-center items-center py-8">
                {reading ? (
                    <div className="flex flex-col items-center animate-in zoom-in duration-500">
                        {/* Mystic Card Illustration Placeholder */}
                        <div className="w-56 h-80 rounded-[2rem] bg-gradient-to-b from-rose-500/20 to-black border-2 border-white/20 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden shadow-2xl shadow-rose-500/20">
                            <div className="absolute inset-x-0 top-0 h-2 bg-rose-500/50" />
                            <Flower2 className="w-12 h-12 text-rose-400 mb-6 animate-pulse" />
                            <h4 className="text-xl font-serif text-white mb-2 leading-tight uppercase tracking-widest">{reading.card}</h4>
                            <div className="w-10 h-[1px] bg-white/20 my-4" />
                            <div className={cn(
                                "text-2xl font-bold tracking-widest uppercase py-2 px-6 rounded-full border mb-4",
                                reading.answer === 'YES' ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/10" :
                                    reading.answer === 'NO' ? "text-rose-400 border-rose-400/30 bg-rose-400/10" :
                                        "text-amber-400 border-amber-400/30 bg-amber-400/10"
                            )}>
                                {reading.answer === 'YES' ? 'SÍ' : reading.answer === 'NO' ? 'NO' : 'QUIZÁS'}
                            </div>
                        </div>

                        <div className="mt-10 bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-md text-center max-w-md">
                            <p className="text-white/80 leading-relaxed font-serif italic text-lg">
                                "{reading.meaning}"
                            </p>
                        </div>

                        <button
                            onClick={() => setReading(null)}
                            className="mt-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest"
                        >
                            <Repeat className="w-4 h-4" />
                            Nueva Consulta
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={drawCard}
                        disabled={loading}
                        className="group w-56 h-80 rounded-[2rem] bg-black border-2 border-white/5 hover:border-rose-400/50 transition-all duration-700 flex flex-col items-center justify-center p-8 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-rose-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Flower2 className="w-8 h-8 text-white/20 group-hover:text-rose-400 transition-colors" />
                            </div>
                            <span className="text-xs text-white/30 uppercase tracking-[0.3em] font-medium group-hover:text-white transition-colors">
                                {loading ? "Sincronizando..." : "Sacar Carta"}
                            </span>
                        </div>
                        {/* Card back pattern */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none grid grid-cols-4 grid-rows-6 p-4">
                            {[...Array(24)].map((_, i) => <div key={i} className="border-[0.5px] border-white/50 m-1" />)}
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
};
