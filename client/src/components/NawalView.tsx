import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Sun, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveProfile } from '../hooks/useActiveProfile';
import { useProfile } from '../contexts/ProfileContext';
import { NAHUAL_WISDOM } from '../data/nahualData';
import { useGuardianState } from '../contexts/GuardianContext';


// Placeholder for glyph path logic if needed, or use image
const GlyphPlaceholder = ({ tone }: { tone: number }) => (
    <div className="relative w-48 h-48 flex items-center justify-center border-4 border-[#D4AF37]/30 rounded-full bg-[#0a0a0a] shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        <div className="absolute inset-2 border border-[#D4AF37] rounded-full opacity-50 border-dashed animate-[spin_60s_linear_infinite]" />
        <div className="flex flex-col items-center">
            <span className="text-[#D4AF37] font-serif text-6xl">🌞</span>
        </div>
        {/* Tone Representation Dots/Bars */}
        <div className="absolute -top-12 flex flex-col items-center gap-1">
            <span className="text-[#D4AF37]/60 text-xs tracking-widest uppercase">Tono {tone}</span>
            <div className="flex gap-1">
                {Array.from({ length: tone }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < 5 ? 'bg-[#D4AF37]' : 'w-6 h-2 rounded-full bg-[#D4AF37]'}`} />
                ))}
            </div>
        </div>
    </div>
);

interface NawalViewProps {
    onBack: () => void;
}

export const NawalView: React.FC<NawalViewProps> = ({ onBack }) => {
    // --- UNIFIED STATE (v9.16) ---
    const { profile, loading: isLoading } = useActiveProfile();
    const { updateProfile } = useProfile(); // Para actualización manual de fecha
    const [inputDate, setInputDate] = useState('');
    const [calculating, setCalculating] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { trackEvent } = useGuardianState();

    const handleDateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputDate) return;

        setCalculating(true);
        try {
            await updateProfile({ birthDate: inputDate });
            // Profile update should return new profile with mayan data
        } catch (error) {
            console.error("Error updating date:", error);
        } finally {
            setCalculating(false);
        }
    };

    const nawal = profile?.mayan;

    const handleOpenModal = () => {
        if (!nawal) return;
        setShowModal(true);

        // Track for Oracle Memory
        trackEvent('ASTRO', `Consultó profundidad del Nahual ${nawal.kicheName}`);
    };

    return (
        <div className="min-h-screen bg-black text-[#D4AF37] p-6 flex flex-col items-center relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_100%)] z-0" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0 pointer-events-none" />

            <header className="w-full max-w-lg flex items-center justify-between relative z-10 mb-12">
                <button onClick={onBack} className="p-2 hover:bg-[#D4AF37]/10 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-serif tracking-[0.2em] uppercase">Sabiduría Ancestral</h1>
                <div className="w-10" /> {/* Spacer */}
            </header>

            <main className="relative z-10 w-full max-w-md flex flex-col items-center text-center">

                <AnimatePresence mode="wait">
                    {/* STATE 1: LOADING */}
                    {(isLoading || calculating) && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center min-h-[50vh]"
                        >
                            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-8" />
                            <p className="text-lg font-serif italic text-white/80 animate-pulse">
                                "Consultando a los abuelos del tiempo..."
                            </p>
                        </motion.div>
                    )}

                    {/* STATE 2: NO DATA (FORM) */}
                    {!isLoading && !calculating && !nawal && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <div className="mb-8 flex justify-center">
                                <Sun className="w-16 h-16 text-[#D4AF37] animate-pulse-slow" />
                            </div>
                            <h2 className="text-2xl font-serif mb-6 text-white">El Tiempo Sagrado</h2>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                Para revelar tu Nawal (Tu energía guardiana), el sistema necesita saber en qué momento tu espíritu descendió a este ciclo.
                            </p>

                            <form onSubmit={handleDateSubmit} className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-xs uppercase tracking-widest text-[#D4AF37]/80 ml-1">Fecha de Nacimiento</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={inputDate}
                                            onChange={(e) => setInputDate(e.target.value)}
                                            className="w-full bg-white/5 border border-[#D4AF37]/30 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all font-serif text-lg"
                                            required
                                        />
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 w-5 h-5" />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={!inputDate}
                                    className="w-full bg-[#D4AF37] text-black font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#F2D06B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#D4AF37]/20"
                                >
                                    Revelar mi Nawal
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {/* STATE 3: RESULT */}
                    {!isLoading && !calculating && nawal && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 1, type: "spring" }}
                                className="mb-8 cursor-pointer group"
                                onClick={handleOpenModal}
                                whileHover={{ scale: 1.05 }}
                            >
                                <GlyphPlaceholder tone={nawal.tone} />
                                <motion.div
                                    className="mt-4 text-[#D4AF37]/40 text-[10px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    Presiona para profundizar
                                </motion.div>
                            </motion.div>

                            <div className="space-y-2 mb-8">
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#D4AF37]">
                                    {nawal.tone} {nawal.kicheName}
                                </h2>
                                <p className="text-sm uppercase tracking-[0.3em] text-white/50">{nawal.meaning}</p>
                            </div>

                            <div className="bg-white/5 border border-[#D4AF37]/20 rounded-2xl p-6 backdrop-blur-sm relative">
                                <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-[#D4AF37] animate-pulse" />
                                <p className="text-white/80 leading-relaxed font-serif text-lg italic">
                                    "{nawal.description}"
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4 w-full text-xs uppercase tracking-widest text-[#D4AF37]/60">
                                <div className="border border-[#D4AF37]/10 rounded-lg p-3">
                                    <span className="block text-white mb-1">Tono {nawal.tone}</span>
                                    {nawal.toneName}
                                </div>
                                <div className="border border-[#D4AF37]/10 rounded-lg p-3">
                                    <span className="block text-white mb-1">Energía</span>
                                    {nawal.kicheName}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Nahual Detail Modal (Códice Sagrado) */}
            <AnimatePresence>
                {showModal && nawal && NAHUAL_WISDOM[nawal.kicheName] && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                                <div className="flex flex-col items-center text-center mb-10">
                                    <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center mb-6 bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                                        <span className="text-5xl">🌞</span> {/* Future: Replace with real SVG glyph */}
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-bold mb-2">Libro del Destino</span>
                                    <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8E7] to-[#D4AF37] uppercase tracking-tighter">
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
        </div>
    );
};
