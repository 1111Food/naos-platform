import React, { useState } from 'react';
import { Scroll, Sparkles, Lock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import { useGuardianState } from '../contexts/GuardianContext';
import { CHINESE_ZODIAC_WISDOM } from '../data/chineseZodiacData';
import { ZodiacPergaminoModal } from './ZodiacPergaminoModal';

interface SabiduriaOrientalProps {
    profile?: any;
}

export const SabiduriaOriental: React.FC<SabiduriaOrientalProps> = ({ profile: initialProfile }) => {
    const { profile: hookProfile } = useProfile();
    const profile = initialProfile || hookProfile;
    const { trackEvent } = useGuardianState();
    const [showZodiacModal, setShowZodiacModal] = useState(false);

    const isPremium = profile?.subscription?.plan === 'PREMIUM' || profile?.subscription?.plan === 'TRIAL';
    const animalData = profile?.chinese_animal ? CHINESE_ZODIAC_WISDOM[profile.chinese_animal] : null;
    const elementDescription = profile?.chinese_element ? getElementWisdom(profile.chinese_element) : '';

    const handleOpenZodiacDetails = () => {
        if (!animalData) return;
        setShowZodiacModal(true);
        trackEvent('ORIENTAL', {
            animal: profile.chinese_animal,
            action: 'OPEN_PERGAMINO',
            year: 2026
        });
    };

    if (!profile?.birthDate) {
        return (
            <div className="w-full max-w-2xl mx-auto p-12 rounded-[3rem] bg-white/[0.02] border border-rose-900/20 backdrop-blur-xl relative overflow-hidden text-center space-y-8">
                <div className="w-24 h-24 mx-auto rounded-full border border-rose-900/20 flex items-center justify-center bg-rose-900/5 relative">
                    <Scroll className="w-10 h-10 text-rose-500/40" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-[11px] uppercase tracking-[0.5em] text-rose-500/60 font-bold">Sabiduría Oriental</h2>
                    <h3 className="text-2xl text-amber-50/40 font-serif italic">EL VACÍO ES FORMA</h3>
                    <p className="text-white/30 italic font-serif">
                        "El pincel aún no toca el pergamino sagrado."
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-rose-950/20 to-black/40 border border-rose-900/20 backdrop-blur-2xl relative overflow-hidden group">
            {/* Watermark Scroll */}
            <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Scroll className="w-24 h-24 text-rose-500" />
            </div>

            <div className="relative z-10 space-y-12">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <div className="p-4 rounded-2xl bg-rose-900/20 border border-rose-900/30">
                        <Scroll className="w-8 h-8 text-rose-500" />
                    </div>
                    <div>
                        <h2 className="text-[12px] uppercase tracking-[0.4em] text-rose-500 font-bold">Sabiduría Oriental</h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/40">BaZi & Zodíaco Imperial</p>
                    </div>
                </div>

                {/* Main Identity */}
                <div className="flex flex-col md:flex-row items-center gap-12 py-6">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenZodiacDetails}
                        className="relative cursor-pointer group/animal"
                    >
                        <div className="w-40 h-40 rounded-full bg-rose-900/20 border border-rose-500/30 flex items-center justify-center relative z-10 overflow-hidden">
                            <span className="text-7xl drop-shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-transform group-hover/animal:scale-110 duration-500">
                                {getAnimalEmoji(profile.chinese_animal || '')}
                            </span>
                            {/* Tap Indicator */}
                            <div className="absolute inset-0 bg-rose-600/10 opacity-0 group-hover/animal:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[8px] uppercase tracking-[0.3em] text-white/60 translate-y-12">Profundizar</span>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-rose-500/10 blur-[50px] rounded-full animate-pulse" />
                    </motion.div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Tu Animal Interno</p>
                            <h3 className="text-4xl md:text-5xl font-serif text-white tracking-wide">
                                {profile.chinese_animal} <span className="text-amber-500/80">de {profile.chinese_element}</span>
                            </h3>
                        </div>
                        <div className="inline-block px-4 py-1.5 bg-rose-900/30 border border-rose-500/20 rounded-full text-[10px] text-rose-200/80 uppercase tracking-widest">
                            Ciclo Lunar Central
                        </div>
                    </div>
                </div>

                {/* Wisdom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-white/5">
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-rose-500 font-bold flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Naturaleza de Elemento
                        </h4>
                        <p className="text-lg text-amber-50/80 italic font-serif leading-relaxed">
                            "{elementDescription}"
                        </p>
                    </div>
                    <div className="space-y-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-bold">Horizonte 2026</h4>
                        <p className="text-[14px] text-white/50 font-serif leading-relaxed">
                            Año del <span className="text-amber-200">Caballo de Fuego (Bing Wu)</span>. {animalData?.forecast_2026_title}. Tiempo de expansión solar y decisiones audaces.
                        </p>
                    </div>
                </div>

                {/* Open Pergamino Button */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <button
                        onClick={handleOpenZodiacDetails}
                        className="group relative px-8 py-3 bg-rose-600/10 border border-rose-600/30 rounded-full text-rose-500 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-rose-600/20 transition-all flex items-center gap-3 overflow-hidden shadow-[0_0_20px_rgba(225,29,72,0.1)]"
                    >
                        <BookOpen className="w-4 h-4" />
                        Abrir Pergamino Imperial
                        {!isPremium && <Lock className="w-3 h-3 opacity-50" />}
                    </button>

                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/10 text-center pt-2 italic">
                        "El pincel de Lau y la brújula de Yap guían tu camino"
                    </p>
                </div>

                {/* Zodiac Detail Modal */}
                {animalData && (
                    <ZodiacPergaminoModal
                        isOpen={showZodiacModal}
                        onClose={() => setShowZodiacModal(false)}
                        animal={profile.chinese_animal}
                        data={animalData}
                    />
                )}
            </div>
        </div>
    );
};

function getAnimalEmoji(animal: string): string {
    const map: Record<string, string> = {
        'Rata': '🐀', 'Buey': '🐂', 'Tigre': '🐅', 'Conejo': '🐇',
        'Dragón': '🐉', 'Serpiente': '🐍', 'Caballo': '🐎', 'Cabra': '🐐',
        'Mono': '🐒', 'Gallo': '🐓', 'Perro': '🐕', 'Cerdo': '🐖'
    };
    return map[animal] || '🏮';
}

function getElementWisdom(element: string): string {
    const map: Record<string, string> = {
        "Madera": "Fuerza en la flexibilidad y regeneración constante.",
        "Fuego": "Chispa divina de liderazgo, pasión y verdad.",
        "Tierra": "Cimiento paciente, sabio y profundamente nutricio.",
        "Metal": "Espíritu forjado en silencio, claridad y firmeza.",
        "Agua": "Fluidez intuitiva que comunica verdades profundas."
    };
    return map[element] || '';
}
