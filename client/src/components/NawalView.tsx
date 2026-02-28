import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActiveProfile } from '../hooks/useActiveProfile';
import { MAYAN_MANUAL, getMayanCross } from '../data/manuals/mayan';
import { useGuardianState } from '../contexts/GuardianContext';
import { getNahualImage } from '../utils/nahualMapper';
import { cn } from '../lib/utils';

// Placeholder for glyph path logic if needed, or use image
const GlyphPlaceholder = ({ tone, id, size = 'md', showTone = true }: { tone: number, id?: string, size?: 'sm' | 'md' | 'lg', showTone?: boolean }) => {
    const [imgError, setImgError] = useState(!id);

    const sizeMap = {
        sm: 'w-32',
        md: 'w-64',
        lg: 'w-80'
    };

    return (
        <div className={cn(
            "relative aspect-[2/3] flex items-center justify-center border border-white/10 rounded-[1.5rem] bg-black/40 backdrop-blur-3xl shadow-[0_0_40px_rgba(16,185,129,0.05)] overflow-hidden group/card transition-all duration-700 hover:border-emerald-500/40",
            sizeMap[size]
        )}>
            {/* Outer Glow Perimeter */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />

            {!imgError && id ? (
                <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    <img
                        src={getNahualImage(id)}
                        alt={`Nahual ${id}`}
                        onError={() => setImgError(true)}
                        className={cn(
                            "object-cover object-center brightness-125 transition-transform duration-[2s] group-hover/card:scale-[1.45] drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]",
                            "scale-[1.35]"
                        )}
                        style={{ filter: 'contrast(1.1) saturate(1.2)' }}
                    />
                    {/* Dark Vignette to focus content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
                </div>
            ) : (
                <span className={cn("text-white font-thin drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] z-10", size === 'sm' ? 'text-4xl' : 'text-6xl')}>🌞</span>
            )}

            {/* Tone Representation Dots/Bars */}
            {showTone && (
                <div className={cn("absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20", size === 'sm' ? 'top-2' : 'top-4')}>
                    <span className={cn("text-white/40 tracking-[0.5em] uppercase font-black", size === 'sm' ? 'text-[5px]' : 'text-[7px]')}>Tono {tone}</span>
                    <div className="flex gap-1.5 mt-0.5">
                        {Array.from({ length: tone }).map((_, i) => (
                            <div
                                key={i}
                                className={`
                                    ${tone > 4 && i % 5 === 0 ? (size === 'sm' ? 'w-3 h-0.5' : 'w-6 h-0.5') + ' rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : i % 5 !== 0 || tone <= 4 ? (size === 'sm' ? 'w-0.5 h-0.5' : 'w-1 h-1') + ' rounded-full bg-emerald-400/60' : 'hidden'}
                                `}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface NawalViewProps {
    overrideProfile?: any;
}

export const NawalView: React.FC<NawalViewProps> = ({ overrideProfile }) => {
    // --- UNIFIED STATE (v9.16) ---
    const { profile: activeProfile, loading: activeLoading } = useActiveProfile();

    // Logic for Profile Injection
    const profile = overrideProfile || activeProfile;
    const isLoading = overrideProfile ? false : activeLoading;

    // HOOKS FIRST:
    const [showModal, setShowModal] = useState(false);
    const { trackEvent } = useGuardianState();

    if (isLoading) return <div className="p-20 text-center text-white/20 uppercase tracking-[0.4em] text-[10px]">Consultando al tiempo...</div>;

    // GUARDIA: Si no hay perfil con fecha, mostrar estado vacío
    if (!profile || !profile.birthDate) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-white/20 text-center px-12">
                <p className="text-[10px] uppercase tracking-[0.3em] font-thin">El Tiempo espera tus coordenadas de origen para revelar tu energía guardiana.</p>
            </div>
        );
    }


    const nawal = profile?.mayan;
    const detailedNawal = nawal ? MAYAN_MANUAL.nahuales.find(n => n.kiche === nawal.kicheName) : null;
    const cross = detailedNawal ? getMayanCross(detailedNawal.id) : null;

    const handleOpenModal = () => {
        if (!nawal) return;
        setShowModal(true);
        trackEvent('ASTRO', `Consultó profundidad del Nahual ${nawal.kicheName}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative py-10">

            <header className="w-full flex items-center justify-between mb-16 px-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                <h1 className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40 mx-8">Sincronario Maya</h1>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </header>

            <main className="w-full max-w-md flex flex-col items-center text-center">
                <AnimatePresence mode="wait">

                    {nawal && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center w-full"
                        >
                            <motion.div
                                initial={{ rotate: -10, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="mb-12 cursor-pointer group relative"
                                onClick={handleOpenModal}
                                whileHover={{ scale: 1.02 }}
                            >
                                <GlyphPlaceholder tone={nawal.tone} id={detailedNawal?.id} />
                                <motion.div
                                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-amber-500/40 text-[8px] uppercase tracking-[0.3em] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                    animate={{ y: [0, 3, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                >
                                    Abrir Códice Sagrado
                                </motion.div>
                            </motion.div>

                            <div className="space-y-4 mb-10">
                                <h2 className="text-4xl md:text-5xl font-thin text-white tracking-[0.2em] uppercase">
                                    {nawal.toneName} <span className="text-amber-500/60 font-black">{nawal.kicheName}</span>
                                </h2>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">{nawal.meaning}</p>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 backdrop-blur-sm relative group hover:bg-white/[0.04] transition-colors">
                                <Info className="absolute top-6 right-6 w-4 h-4 text-white/10 group-hover:text-amber-500/20 transition-colors" />
                                <p className="text-white/60 leading-relaxed font-light text-sm uppercase tracking-widest italic">
                                    "{nawal.description}"
                                </p>
                            </div>

                            <div className="mt-12 grid grid-cols-2 gap-4 w-full">
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center group hover:bg-white/[0.04] transition-colors">
                                    <span className="block text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 font-bold">Tono del Tiempo</span>
                                    <span className="text-lg font-thin text-amber-200 uppercase tracking-widest">{nawal.toneName}</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-center group hover:bg-white/[0.04] transition-colors">
                                    <span className="block text-[9px] uppercase tracking-[0.3em] text-white/20 mb-2 font-bold">Frecuencia Estelar</span>
                                    <span className="text-lg font-thin text-cyan-200 uppercase tracking-widest">{nawal.kicheName}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Nahual Detail Modal (Códice Sagrado) */}
            <AnimatePresence>
                {showModal && nawal && detailedNawal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 text-white/20 hover:text-white transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                                <div className="flex flex-col items-center text-center mb-12">
                                    <div className="w-48 mx-auto aspect-[2/3] rounded-2xl border border-emerald-500/30 flex items-center justify-center bg-emerald-500/[0.02] relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] mb-6 bg-black/40">
                                        <img
                                            src={getNahualImage(detailedNawal.id)}
                                            alt={detailedNawal.kiche}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                const span = document.createElement('span');
                                                span.className = 'text-6xl absolute';
                                                span.innerText = '🌞';
                                                (e.target as HTMLImageElement).parentElement?.appendChild(span);
                                            }}
                                            className={cn(
                                                "w-full h-full object-cover object-center drop-shadow-[0_0_25px_rgba(16,185,129,0.9)] brightness-125 z-10 scale-[1.35]"
                                            )}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-0" />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[0.5em] text-emerald-500/40 font-black mb-2">Códice Sagrado Cholq'ij</span>
                                    <h2 className="text-4xl font-thin text-white uppercase tracking-[0.2em] mb-1">
                                        {detailedNawal.kiche}
                                    </h2>
                                    <p className="text-emerald-500/60 font-bold uppercase tracking-[0.3em] text-[10px] mt-1 mb-3">{detailedNawal.spanish}</p>
                                </div>

                                <div className="flex justify-center mb-12">
                                    <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-2xl p-6 text-center w-full max-w-xs">
                                        <span className="block text-[9px] uppercase tracking-[0.4em] text-emerald-400/50 mb-2 font-black">Tótem Guardián</span>
                                        <span className="text-white font-thin uppercase tracking-widest">{detailedNawal.totem}</span>
                                    </div>
                                </div>

                                <div className="space-y-12 pb-12">
                                    <Section title="Significado Cósmico" content={detailedNawal.meaning} />
                                    <Section title="Esencia Sagrada" content={detailedNawal.essence} />
                                    <Section title="Características del Nativo" content={detailedNawal.characteristics} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <Section title="En Luz (Dones)" content={detailedNawal.light} color="text-emerald-300" />
                                        <Section title="En Sombra (Retos)" content={detailedNawal.shadow} color="text-rose-400" italic />
                                    </div>

                                    <Section title="Misión de Vida" content={detailedNawal.mission} />

                                    <div className="p-10 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/30 text-center">
                                        <h4 className="text-[9px] uppercase tracking-[0.4em] text-emerald-300 font-black mb-6">Consejo del Abuelo</h4>
                                        <p className="text-lg font-thin text-emerald-100 italic leading-relaxed">
                                            "{detailedNawal.advice}"
                                        </p>
                                    </div>

                                    {/* Graphical Mayan Cross */}
                                    {cross && (
                                        <div className="mt-16 pt-16 border-t border-white/5 relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500/50 uppercase tracking-[0.3em] bg-[#050505] px-6 py-2 border border-emerald-500/10 rounded-full">La Cruz Maya</div>

                                            <div className="relative w-full max-w-lg mx-auto hidden md:flex flex-col items-center justify-center py-8">
                                                {/* Vertical Line */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
                                                {/* Horizontal Line */}
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

                                                {/* Destiny (Top) */}
                                                <div className="relative z-10 flex flex-col items-center text-center p-4 bg-[#050505] border border-white/10 rounded-2xl w-48 mb-6 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
                                                    <span className="text-[9px] text-emerald-500 tracking-widest uppercase mb-1 font-bold">Destino (Cabeza)</span>
                                                    <span className="text-white font-light text-xl">{cross.destiny.kiche}</span>
                                                    <span className="text-white/40 text-[10px] mt-1">{cross.destiny.spanish}</span>
                                                </div>

                                                <div className="flex w-full justify-between relative z-10">
                                                    {/* Left Arm */}
                                                    <div className="flex flex-col items-center justify-center text-center p-4 bg-[#050505] border border-white/10 rounded-2xl w-40 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
                                                        <span className="text-[9px] text-emerald-400 tracking-widest uppercase mb-1 font-bold">Brazo Mágico (Izq)</span>
                                                        <span className="text-white font-light text-lg">{cross.leftArm.kiche}</span>
                                                        <span className="text-white/40 text-[10px] mt-1">{cross.leftArm.spanish}</span>
                                                    </div>

                                                    {/* Center */}
                                                    <div className="flex flex-col items-center text-center p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-full w-32 h-32 justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] glow-pulse z-20">
                                                        <span className="text-[10px] text-emerald-300 tracking-[0.2em] font-black uppercase mb-1">Corazón</span>
                                                        <span className="text-white font-bold text-xl">{cross.center.kiche}</span>
                                                    </div>

                                                    {/* Right Arm */}
                                                    <div className="flex flex-col items-center justify-center text-center p-4 bg-[#050505] border border-white/10 rounded-2xl w-40 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
                                                        <span className="text-[9px] text-teal-400 tracking-widest uppercase mb-1 font-bold">Brazo Material (Der)</span>
                                                        <span className="text-white font-light text-lg">{cross.rightArm.kiche}</span>
                                                        <span className="text-white/40 text-[10px] mt-1">{cross.rightArm.spanish}</span>
                                                    </div>
                                                </div>

                                                {/* Conception (Bottom) */}
                                                <div className="relative z-10 flex flex-col items-center text-center p-4 bg-[#050505] border border-white/10 rounded-2xl w-48 mt-6 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
                                                    <span className="text-[9px] text-emerald-500 tracking-widest uppercase mb-1 font-bold">Engendrado (Pies)</span>
                                                    <span className="text-white font-light text-xl">{cross.conception.kiche}</span>
                                                    <span className="text-white/40 text-[10px] mt-1">{cross.conception.spanish}</span>
                                                </div>
                                            </div>

                                            {/* Mobile Cross View (Vertical List with Cards) */}
                                            <div className="md:hidden flex flex-col gap-6 py-8">
                                                <div className="p-4 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6">
                                                    <GlyphPlaceholder tone={nawal.tone} id={cross.destiny.id} size="sm" showTone={false} />
                                                    <div>
                                                        <span className="text-[10px] text-emerald-500 tracking-widest uppercase block font-black mb-1">Destino</span>
                                                        <span className="text-white/90 font-medium block text-lg font-thin">{cross.destiny.kiche}</span>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6">
                                                    <GlyphPlaceholder tone={nawal.tone} id={cross.leftArm.id} size="sm" showTone={false} />
                                                    <div>
                                                        <span className="text-[10px] text-emerald-400 tracking-widest uppercase block font-black mb-1">Pasado</span>
                                                        <span className="text-white/90 font-medium block text-lg font-thin">{cross.leftArm.kiche}</span>
                                                    </div>
                                                </div>
                                                <div className="p-5 bg-emerald-500/10 border border-emerald-500/40 rounded-[2.5rem] flex items-center gap-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                                    <GlyphPlaceholder tone={nawal.tone} id={detailedNawal.id} size="sm" showTone={false} />
                                                    <div>
                                                        <span className="text-[10px] text-emerald-300 tracking-widest uppercase block font-black mb-1">Corazón</span>
                                                        <span className="text-emerald-50 font-black block text-xl">{detailedNawal.kiche}</span>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6">
                                                    <GlyphPlaceholder tone={nawal.tone} id={cross.rightArm.id} size="sm" showTone={false} />
                                                    <div>
                                                        <span className="text-[10px] text-teal-400 tracking-widest uppercase block font-black mb-1">Futuro</span>
                                                        <span className="text-white/90 font-medium block text-lg font-thin">{cross.rightArm.kiche}</span>
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6">
                                                    <GlyphPlaceholder tone={nawal.tone} id={cross.conception.id} size="sm" showTone={false} />
                                                    <div>
                                                        <span className="text-[10px] text-emerald-500 tracking-widest uppercase block font-black mb-1">Engendrado</span>
                                                        <span className="text-white/90 font-medium block text-lg font-thin">{cross.conception.kiche}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Section = ({ title, content, color = "text-white", italic = false }: { title: string, content: string, color?: string, italic?: boolean }) => (
    <div className="space-y-4">
        <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black border-b border-white/5 pb-2">{title}</h4>
        <p className={`text-[13px] leading-relaxed tracking-wider uppercase font-light text-justify p-4 bg-white/[0.01] rounded-xl border border-white/[0.02] ${color} ${italic ? 'italic' : ''}`}>
            {content}
        </p>
    </div>
);
