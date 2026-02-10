import React from 'react';
import { motion } from 'framer-motion';
import { Sun, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { AnimatePresence } from 'framer-motion';
import { NAHUAL_WISDOM } from '../data/nahualData';
import { useGuardianState } from '../contexts/GuardianContext';

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
    const [showModal, setShowModal] = React.useState(false);
    const { trackEvent } = useGuardianState();

    const handleOpenModal = () => {
        setShowModal(true);
        trackEvent('NAHUAL', { name: nawal.kicheName, meaning: nawal.meaning });
    };

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
            <div className="relative group perspective-1000 cursor-pointer" onClick={handleOpenModal}>
                <div className="relative w-72 h-96 bg-[#F9F7F2] rounded-2xl border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)] p-6 flex flex-col items-center justify-between overflow-hidden group-hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] transition-all">
                    {/* ... (Existing card content) */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 mix-blend-multiply" />
                    <div className="absolute inset-0 border-[10px] border-[#D4AF37]/5 rounded-xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-6 mt-4">
                        <GlyphPlaceholder />
                        <div className="space-y-1">
                            <h3 className="text-lg font-serif text-slate-900 font-bold uppercase">{nawal.meaning}</h3>
                            <p className="text-slate-600 text-sm italic px-2 leading-relaxed">
                                "{nawal.description}"
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 w-full flex flex-col items-center gap-2 pt-4 border-t border-[#D4AF37]/20">
                        <span className="text-[10px] text-[#D4AF37]/60 font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">Ver Códice</span>
                        <Sun className="w-6 h-6 text-[#D4AF37] animate-spin-slow" />
                    </div>
                </div>
            </div>

            {/* Nahual Detail Modal (Same logic/style as NawalView) */}
            <AnimatePresence>
                {showModal && NAHUAL_WISDOM[nawal.kicheName] && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_100px_rgba(212,175,55,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37]/10 rounded-tl-[2.5rem]" />
                            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37]/10 rounded-br-[2.5rem]" />

                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#D4AF37]/40 hover:text-[#D4AF37] transition-all z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar text-left">
                                <div className="flex flex-col items-center text-center mb-10">
                                    <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center mb-6 bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                                        <span className="text-5xl">🌞</span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-bold mb-2">Libro del Destino</span>
                                    <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#D4AF37] uppercase">
                                        {nawal.kicheName}
                                    </h2>
                                    <p className="text-[#D4AF37] font-serif italic text-xl mt-2">{NAHUAL_WISDOM[nawal.kicheName].meaning}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    <div className="bg-white/5 border border-[#D4AF37]/10 rounded-2xl p-4 text-center">
                                        <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37]/50 mb-1">Tótem</span>
                                        <span className="text-white font-serif text-lg">{NAHUAL_WISDOM[nawal.kicheName].totem}</span>
                                    </div>
                                    <div className="bg-white/5 border border-[#D4AF37]/10 rounded-2xl p-4 text-center">
                                        <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37]/50 mb-1">Elemento</span>
                                        <span className="text-white font-serif text-lg">{NAHUAL_WISDOM[nawal.kicheName].element}</span>
                                    </div>
                                </div>

                                <div className="space-y-10 pb-8">
                                    <div className="space-y-4">
                                        <h4 className="text-[#D4AF37]/60 font-serif uppercase tracking-widest text-xs border-b border-[#D4AF37]/10 pb-2">Esencia del Signo</h4>
                                        <p className="text-lg leading-relaxed text-[#FFF8E7]/90 font-serif text-justify">
                                            {NAHUAL_WISDOM[nawal.kicheName].description}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-emerald-400/60 font-serif uppercase tracking-widest text-xs border-b border-emerald-400/10 pb-2">Personalidad (Luz)</h4>
                                        <p className="text-lg leading-relaxed text-[#FFF8E7]/90 font-serif text-justify">
                                            {NAHUAL_WISDOM[nawal.kicheName].personality_light}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-rose-400/60 font-serif uppercase tracking-widest text-xs border-b border-rose-400/10 pb-2">Desafíos (Sombra)</h4>
                                        <p className="text-lg leading-relaxed text-[#FFF8E7]/90 font-serif text-justify italic">
                                            {NAHUAL_WISDOM[nawal.kicheName].personality_shadow}
                                        </p>
                                    </div>
                                    <div className="space-y-4 bg-[#D4AF37]/5 p-6 rounded-3xl border border-[#D4AF37]/10">
                                        <h4 className="text-[#D4AF37] font-serif uppercase tracking-widest text-xs text-center mb-4">Misión y Legado</h4>
                                        <p className="text-xl leading-relaxed text-[#FFF8E7] font-serif text-center italic">
                                            "{NAHUAL_WISDOM[nawal.kicheName].legacy}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <button
                onClick={onBack}
                className="text-white/50 hover:text-[#D4AF37] transition-colors text-sm uppercase tracking-widest border-b border-transparent hover:border-[#D4AF37]"
            >
                Volver al Templo
            </button>
        </motion.div>
    );
};
