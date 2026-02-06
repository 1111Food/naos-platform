import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface FengShuiViewProps {
    data: any;
}

export const FengShuiView: React.FC<FengShuiViewProps> = ({ data }) => {
    if (!data) return <div className="text-center text-white/50">Leyendo la energía de tu espacio...</div>;

    return (
        <div className="w-full max-w-xl mx-auto space-y-10 animate-in slide-in-from-bottom-4 duration-700">

            {/* Kua Number Circle */}
            <div className="flex flex-col items-center py-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-400/20 blur-[60px] rounded-full animate-pulse" />
                    <div className="w-40 h-40 rounded-full border-2 border-emerald-400/30 flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-2xl">
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400 mb-2 font-bold">Número Kua</span>
                        <div className="text-6xl font-serif text-white">{data.kuaNumber}</div>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 mt-1">{data.element}</span>
                    </div>
                </div>
            </div>

            {/* Directions */}
            <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                    <Compass className="text-emerald-400 w-5 h-5" />
                    <h3 className="font-serif text-xl text-white">Direcciones Favorables</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {data.favorableDirections?.map((dir: string, i: number) => (
                        <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col">
                            <span className="text-white font-serif text-sm">{dir.split(' ')[0]}</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{dir.split(' ')[1]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Advice Card */}
            <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-[2rem] flex gap-6 items-start">
                <div className="p-3 bg-emerald-500/10 rounded-full">
                    <Sparkles className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                    <h4 className="text-white font-serif text-lg mb-2">Consejo del Guardián</h4>
                    <p className="text-emerald-200/60 text-sm leading-relaxed italic font-serif">
                        "{data.guidance}"
                    </p>
                </div>
            </div>
        </div>
    );
};
