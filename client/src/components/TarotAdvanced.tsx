import React, { useState } from 'react';
import { Flower2, ScrollText } from 'lucide-react';
import { cn } from '../lib/utils';
import { endpoints } from '../lib/api';

export const TarotAdvanced: React.FC = () => {
    const [reading, setReading] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDraw = async () => {
        setLoading(true);
        try {
            const res = await fetch(endpoints.tarot + '/celta');
            const data = await res.json();
            setReading(data);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000">
            {!reading && (
                <div className="text-center space-y-8 py-20">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-serif text-white tracking-widest uppercase">Tirada de Tres Cartas</h2>
                        <p className="text-white/40 text-sm uppercase tracking-[0.3em]">Pasado, Presente y Futuro revelados</p>
                    </div>
                    <button
                        onClick={handleDraw}
                        disabled={loading}
                        className="px-12 py-5 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-700 text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-2xl shadow-rose-900/40 group"
                    >
                        {loading ? "Mezclando el Arcano..." : "Invocar Revelación"}
                    </button>
                </div>
            )}

            {reading && (
                <div className="space-y-16">
                    <div className="flex justify-center gap-8">
                        {reading.map((card: any, idx: number) => (
                            <div
                                key={idx}
                                className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500 hover:bg-white/10 transition-all w-64"
                                style={{ animationDelay: `${idx * 150}ms` }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-bold">{card.position}</span>
                                <div className="w-16 h-24 bg-rose-500/10 border-2 border-rose-500/20 rounded-xl flex items-center justify-center">
                                    <Flower2 className="w-8 h-8 text-rose-500/40" />
                                </div>
                                <div className="text-xl font-serif text-white tracking-widest">{card.card}</div>
                            </div>
                        ))}
                    </div>

                    {/* Interpretation Detail */}
                    <div className="max-w-3xl mx-auto">
                        <div className="p-10 bg-black/40 border border-white/10 rounded-[3rem] backdrop-blur-xl">
                            <h3 className="flex items-center gap-3 font-serif text-2xl text-white mb-8">
                                <ScrollText className="w-6 h-6 text-rose-500" />
                                Mensaje del Oráculo
                            </h3>
                            <div className="space-y-8">
                                {reading.map((card: any, idx: number) => (
                                    <div key={idx} className="space-y-3 border-l-2 border-rose-500/20 pl-6 py-1">
                                        <div className="text-xs uppercase tracking-widest text-rose-400 font-bold">{card.position}: {card.card}</div>
                                        <p className="text-white/70 italic leading-relaxed">"{card.meaning}"</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => setReading(null)}
                                className="w-full mt-12 text-center text-white/30 hover:text-white uppercase text-[10px] tracking-widest transition-colors py-4 border border-white/5 rounded-2xl"
                            >
                                Nueva Lectura
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
