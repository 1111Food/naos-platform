import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';
import { cn } from '../lib/utils';

interface NawalCardProps {
    nawal: {
        kicheName: string;
        meaning: string;
        tone: number;
        domine?: string;
        description: string;
    };
    onBack: () => void;
}

export const NawalCard: React.FC<NawalCardProps> = ({ nawal, onBack }) => {

    // Placeholder Glyph Logic (Text-based for now with ritual border)
    const GlyphPlaceholder = () => (
        <div className="relative w-40 h-40 flex items-center justify-center border-4 border-[#D4AF37]/30 rounded-full bg-[#F9F7F2]">
            {/* Inner decorative ring */}
            <div className="absolute inset-2 border border-[#D4AF37] rounded-full opacity-50 border-dashed" />

            {/* Tone Dots/Bars Representation */}
            <div className="absolute -top-8 flex flex-col items-center gap-1">
                <span className="text-[#D4AF37] font-serif text-sm tracking-widest uppercase">Tono {nawal.tone}</span>
                <div className="flex gap-1">
                    {Array.from({ length: nawal.tone }).map((_, i) => (
                        <div key={i} className={cn("w-2 h-2 rounded-full", i < 5 ? "bg-[#D4AF37]" : "w-8 h-2 rounded-none bg-[#D4AF37]")} />
                    ))}
                    {/* Note: Real Maya math (dots/bars) is complex to render dynamically in 1-shot. This is decorative. */}
                </div>
            </div>

            {/* Center Name */}
            <h1 className="text-4xl font-bold text-slate-800 font-serif tracking-tighter">
                {nawal.kicheName}
            </h1>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto p-6 text-center space-y-8"
        >
            <div className="space-y-2">
                <span className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-semibold">Tu Energía Sagrada</span>
                <h2 className="text-3xl font-serif text-white">Nawal Maya</h2>
            </div>

            {/* Card Container */}
            <div className="relative group perspective-1000">
                <div className="relative w-72 h-96 bg-[#F9F7F2] rounded-2xl border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)] p-6 flex flex-col items-center justify-between overflow-hidden">

                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 mix-blend-multiply" />
                    <div className="absolute inset-0 border-[10px] border-[#D4AF37]/5 rounded-xl pointer-events-none" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-6 mt-4">
                        <GlyphPlaceholder />

                        <div className="space-y-1">
                            <h3 className="text-lg font-serif text-slate-900 font-bold uppercase">{nawal.meaning}</h3>
                            <p className="text-slate-600 text-sm italic px-2 leading-relaxed">
                                "{nawal.description}"
                            </p>
                        </div>
                    </div>

                    {/* Bottom Aesthetic */}
                    <div className="relative z-10 w-full flex justify-center pt-4 border-t border-[#D4AF37]/20">
                        <Sun className="w-6 h-6 text-[#D4AF37] animate-spin-slow" />
                    </div>
                </div>
            </div>

            <button
                onClick={onBack}
                className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-[#D4AF37]"
            >
                Volver al Templo
            </button>
        </motion.div>
    );
};
