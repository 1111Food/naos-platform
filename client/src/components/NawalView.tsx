import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Sun, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';


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
    const { profile, updateProfile, loading: isLoading } = useProfile();
    const [inputDate, setInputDate] = useState('');
    const [calculating, setCalculating] = useState(false);

    // Effect to auto-calculate if birthdate exists but mayan data missing
    useEffect(() => {
        if (profile?.birthDate && !profile.mayan && !calculating) {
            setCalculating(true);
            // Re-trigger update to force calculation on backend? 
            // Actually check if we need to locally wait or trigger something.
            // If profile exists, backend should have calculated it. 
            // If not, maybe we need to poke it.
            // For now, assume if birthDate is there, data should be coming.
            setTimeout(() => setCalculating(false), 3000); // Fake timeout if backend is slow
        }
    }, [profile]);

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
                                className="mb-8"
                            >
                                <GlyphPlaceholder tone={nawal.tone} />
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
        </div>
    );
};
