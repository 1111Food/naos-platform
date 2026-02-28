import React, { useState } from 'react';
import { Scroll, Sparkles, Lock, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProfile } from '../hooks/useProfile';
import { useGuardianState } from '../contexts/GuardianContext';
import { CHINESE_ZODIAC_WISDOM } from '../data/chineseZodiacData';
import { ZodiacPergaminoModal } from './ZodiacPergaminoModal';
import { getChineseZodiacImage } from '../utils/chineseMapper';
import { cn } from '../lib/utils';

interface SabiduriaOrientalProps {
    overrideProfile?: any;
}

// 🏮 CHINESE ANIMAL IMAGE COMPONENT
const ChineseAnimalImage = ({ animal, className }: { animal: string, className?: string }) => {
    const [imgError, setImgError] = React.useState(false);
    if (!animal) return null;

    if (imgError) {
        return <span className={cn("text-7xl drop-shadow-[0_0_20px_rgba(255,215,0,0.2)]", className)}>{getAnimalEmoji(animal)}</span>;
    }

    return (
        <img
            src={getChineseZodiacImage(animal)}
            alt={animal}
            onError={() => setImgError(true)}
            className={cn("drop-shadow-[0_0_25px_rgba(225,29,72,0.6)] brightness-125 filter", className)}
        />
    );
};

export const SabiduriaOriental: React.FC<SabiduriaOrientalProps> = ({ overrideProfile }) => {
    const { profile: hookProfile, loading } = useProfile();
    // Logic: Use passed profile (override) OR hook profile
    const profile = overrideProfile || hookProfile;

    // HOOKS FIRST:
    const { trackEvent } = useGuardianState();
    const [showZodiacModal, setShowZodiacModal] = useState(false);

    // ✨ CLIENT-SIDE CALCULATION - No server dependency!
    const calculateChineseZodiac = (birthDateISO: string) => {
        const date = new Date(birthDateISO);
        let year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        // Lichun (Start of Solar Spring) usually falls on Feb 4.
        // If birth is before Feb 4, use previous Chinese year.
        if (month < 2 || (month === 2 && day < 4)) {
            year--;
        }

        const ANIMALS = [
            "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente",
            "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"
        ];

        // Animal: Cycle starts from 1900 (Metal Rat)
        const animalIdx = (year - 1900) % 12;
        const animal = ANIMALS[animalIdx];

        // Element: Use the LAST DIGIT RULE (Heavenly Stems)
        // This is the correct traditional method
        const lastDigit = year.toString().slice(-1);
        let element: string;

        switch (lastDigit) {
            case '0':
            case '1':
                element = 'Metal';
                break;
            case '2':
            case '3':
                element = 'Agua';
                break;
            case '4':
            case '5':
                element = 'Madera';
                break;
            case '6':
            case '7':
                element = 'Fuego';  // ✅ 1986 ends in 6 -> Fuego
                break;
            case '8':
            case '9':
                element = 'Tierra';
                break;
            default:
                element = 'Fuego';
        }

        return {
            animal,
            element,
            birthYear: year
        };
    };

    // Calculate locally if we have birthDate
    const chineseData = profile?.birthDate ? calculateChineseZodiac(profile.birthDate) : null;
    const animalData = chineseData?.animal ? CHINESE_ZODIAC_WISDOM[chineseData.animal] : null;
    const elementDescription = chineseData?.element ? getElementWisdom(chineseData.element) : '';

    // --- DEBUG (can be removed later) ---
    React.useEffect(() => {
        if (chineseData) {
            console.log("🏮 SabiduriaOriental: Cálculo local completado");
            console.log("   📅 Birth Date:", profile?.birthDate);
            console.log("   🐉 Animal:", chineseData.animal);
            console.log("   🔥 Elemento:", chineseData.element);
            console.log("   📆 Año Chino:", chineseData.birthYear);
        }
    }, [chineseData, profile?.birthDate]);

    // Validación flexible (MOVED AFTER HOOKS/LOGIC)
    if (!profile || !profile.birthDate) {
        if (loading && !overrideProfile) return <div className="p-8 text-center text-white/50">Cargando sabiduría...</div>;
        return <div className="p-8 text-center text-white/50">Esencia Incompleta. Se requiere fecha de nacimiento.</div>;
    }
    const isPremium = profile?.subscription?.plan === 'PREMIUM' || profile?.subscription?.plan === 'TRIAL';

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
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <Scroll className="w-6 h-6 text-cyan-400/60" />
                    </div>
                    <div>
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-cyan-500" />
                            Sabiduría Oriental
                        </h2>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/20 mt-1">Zodíaco Imperial & BaZi</p>
                    </div>
                </div>

                {/* Main Identity */}
                <div className="flex flex-col md:flex-row items-center gap-12 py-10 border-b border-white/5">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpenZodiacDetails}
                        className="relative cursor-pointer group/animal"
                    >
                        <div className="w-48 aspect-[2/3] rounded-[2rem] bg-black/40 border border-rose-500/20 flex items-center justify-center relative z-10 overflow-hidden backdrop-blur-3xl shadow-2xl group-hover/animal:border-rose-500/40 transition-all duration-700">
                            <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover/animal:opacity-100 transition-opacity" />
                            <ChineseAnimalImage
                                animal={chineseData?.animal || ''}
                                className="w-full h-full object-cover object-center scale-[1.35] transition-transform group-hover/animal:scale-[1.45] duration-700"
                            />
                            {/* Dark Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                        </div>
                        <div className="absolute -inset-4 bg-rose-500/5 blur-[40px] rounded-full opacity-0 group-hover/animal:opacity-100 transition-opacity" />
                    </motion.div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold">Arquetipo Animal</p>
                            <h3 className="text-4xl md:text-5xl font-thin text-white tracking-widest uppercase">
                                {chineseData?.animal || '...'} <span className="text-cyan-400/40">/ {chineseData?.element || '...'}</span>
                            </h3>
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
                {animalData && chineseData && (
                    <ZodiacPergaminoModal
                        isOpen={showZodiacModal}
                        onClose={() => setShowZodiacModal(false)}
                        animal={chineseData.animal}
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
