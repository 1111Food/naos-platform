import React, { useState } from 'react';
import { Heart, Sparkles, UserPlus } from 'lucide-react';

export const SynastryModule: React.FC = () => {
    const [step, setStep] = useState<'FORM' | 'RESULT'>('FORM');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        setLoading(true);
        setTimeout(() => {
            setResult({
                score: 85,
                guidance: "Vuestras almas vibran en una frecuencia armónica. El Sol de uno ilumina el camino del otro.",
                aspects: [
                    { label: "Afinidad Espiritual", value: "Muy Alta" },
                    { label: "Desafío Kármico", value: "Leve" }
                ]
            });
            setStep('RESULT');
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-700">
            <div className="text-center">
                <h3 className="font-serif text-3xl text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Tarot</h3>
                <p className="text-red-200/40 text-sm mt-2 uppercase tracking-widest">Sincronía de Almas al 100%</p>
            </div>

            {step === 'FORM' ? (
                <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] backdrop-blur-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                            <UserPlus className="text-red-400 w-6 h-6" />
                        </div>
                        <p className="text-white/60 text-sm text-center">Ingresa los datos para iniciar la lectura.</p>
                    </div>

                    <div className="space-y-4">
                        <input placeholder="Nombre de la otra esencia" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-red-500/50" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="date" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white [color-scheme:dark]" />
                            <input type="time" className="bg-white/5 border border-white/10 rounded-2xl p-4 text-white [color-scheme:dark]" />
                        </div>
                        <button
                            onClick={handleCalculate}
                            disabled={loading}
                            className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-red-500/20"
                        >
                            {loading ? "Sincronizando..." : "Invocar Lectura"}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center animate-in zoom-in duration-500">
                    <div className="relative">
                        <div className="absolute inset-0 bg-red-500/20 blur-[80px] rounded-full animate-pulse" />
                        <div className="w-48 h-48 rounded-full border-2 border-red-500/30 flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-2xl">
                            <Heart className="w-8 h-8 text-red-500 mb-2 fill-red-500/20" />
                            <div className="text-6xl font-serif text-white">{result.score}%</div>
                            <span className="text-[10px] uppercase tracking-widest text-red-400 font-bold mt-2">Sincronía</span>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-4 w-full">
                        {result.aspects.map((asp: any, i: number) => (
                            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl text-center">
                                <span className="text-[10px] uppercase text-white/30 mb-2 block">{asp.label}</span>
                                <span className="text-white font-serif text-lg">{asp.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-red-900/10 border border-red-500/20 p-8 rounded-[2rem] text-center">
                        <p className="text-red-100/70 italic font-serif text-lg leading-relaxed">"{result.guidance}"</p>
                    </div>

                    <button
                        onClick={() => setStep('FORM')}
                        className="mt-8 text-white/30 hover:text-white uppercase text-[10px] tracking-widest transition-colors flex items-center gap-2"
                    >
                        <Sparkles className="w-3 h-3" />
                        Nueva Consulta
                    </button>
                </div>
            )}
        </div>
    );
};
