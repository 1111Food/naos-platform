import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Hash, Sun, Moon, ArrowLeft, ChevronDown } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { ASTROLOGY_MANUAL } from '../data/manuals/astrology';
import { PLANETS_LIB, SIGNS_LIB, HOUSES_LIB } from '../data/astrologyLibrary';
import { NUMEROLOGY_MANUAL } from '../data/manuals/numerology';
import { MAYAN_MANUAL, getMayanCross } from '../data/manuals/mayan';
import { CHINESE_MANUAL } from '../data/manuals/chinese';
import { CHINESE_LIB } from '../data/chineseLibrary';
import { SabiduriaOriental } from '../components/SabiduriaOriental';
import { WisdomCard } from '../components/WisdomCard';
import { NeonNumber } from '../components/NeonNumber';
import { getZodiacImage } from '../utils/zodiacMapper';
import { getNahualImage } from '../utils/nahualMapper';
import { getChineseZodiacImage } from '../utils/chineseMapper';

interface ManualsViewProps {
    onBack: () => void;
}

export const ManualsView: React.FC<ManualsViewProps> = ({ onBack }) => {
    const [selectedManual, setSelectedManual] = useState<string | null>(null);
    const { playSound } = useSound();

    const manuals = [
        {
            id: 'astro',
            title: 'El Teatro del Cielo',
            subtitle: 'Astrología Simbólica',
            description: 'Aprende el lenguaje de los Actores, Vestuarios y Escenarios.',
            icon: Star,
            color: 'from-purple-500/20 to-blue-500/20',
            active: true
        },
        {
            id: 'numero',
            title: 'El Código Secreto',
            subtitle: 'Numerología Pitagórica',
            description: 'Descifra el ritmo vibratorio de tu nombre y esencia.',
            icon: Hash,
            color: 'from-amber-500/20 to-orange-500/20',
            active: true
        },
        {
            id: 'maya',
            title: 'El Tiempo Sagrado',
            subtitle: 'Nahual Maya',
            description: 'Conéctate con la sabiduría ancestral del Cholq\'ij.',
            icon: Sun,
            color: 'from-emerald-500/10 to-teal-500/10',
            active: true
        },
        {
            id: 'oriental',
            title: 'El Ciclo Ancestral',
            subtitle: 'Astrología China',
            description: 'Explora tu animal guardián y el flujo de los cinco elementos.',
            icon: Moon,
            color: 'from-blue-500/10 to-indigo-500/10',
            active: true
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="flex items-center gap-6 mb-12">
                <button
                    onClick={() => { playSound('click'); onBack(); }}
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-4xl font-light text-white tracking-widest uppercase mb-1">Biblioteca de Sabiduría</h1>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Marco Pedagógico de Naos</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {manuals.map((manual, index) => (
                    <WisdomCard
                        key={manual.id}
                        id={manual.id}
                        title={manual.title}
                        subtitle={manual.subtitle}
                        description={manual.description}
                        icon={manual.icon}
                        color={manual.id === 'astro' ? 'bg-purple-500' :
                            manual.id === 'numero' ? 'bg-amber-500' :
                                manual.id === 'maya' ? 'bg-emerald-500' : 'bg-indigo-500'}
                        isActive={manual.active}
                        onClick={() => { playSound('transition'); setSelectedManual(manual.id); }}
                        delay={index * 0.1}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedManual === 'astro' && (
                    <AstroManualDetail onClose={() => setSelectedManual(null)} playSound={playSound} />
                )}
                {selectedManual === 'numero' && (
                    <NumerologyManualDetail onClose={() => setSelectedManual(null)} playSound={playSound} />
                )}
                {selectedManual === 'maya' && (
                    <MayaManualDetail onClose={() => setSelectedManual(null)} playSound={playSound} />
                )}
                {selectedManual === 'oriental' && (
                    <ChineseManualDetail onClose={() => setSelectedManual(null)} playSound={playSound} />
                )}
            </AnimatePresence>
        </div>
    );
};

const AstroManualDetail = ({ onClose, playSound }: { onClose: () => void, playSound: (type?: 'click' | 'success' | 'transition') => void }) => {
    const [openPlanet, setOpenPlanet] = useState<string | null>(null);
    const [openSign, setOpenSign] = useState<string | null>(null);
    const [openHouse, setOpenHouse] = useState<string | null>(null);
    const [openLibPlanet, setOpenLibPlanet] = useState<string | null>(null);
    const [openLibSign, setOpenLibSign] = useState<string | null>(null);
    const [openLibHouse, setOpenLibHouse] = useState<number | null>(null);
    const [activeAct, setActiveAct] = useState<'planets' | 'signs' | 'houses'>('planets');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#02020a] overflow-y-auto custom-scrollbar"
        >
            <div className="max-w-5xl mx-auto px-6 py-12 pb-32">
                {/* NAVIGATION - OBSIDIAN BAR */}
                <nav className="flex items-center justify-between mb-16 sticky top-4 rounded-full px-6 py-3 bg-[#050505]/80 backdrop-blur-xl z-50 border border-white/5 shadow-2xl">
                    <button onClick={() => { playSound('click'); onClose(); }} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all uppercase tracking-widest text-[10px] font-bold group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Biblioteca</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.3em]">Teatro de la Vida</span>
                    </div>
                </nav>

                {/* HEADER - CINEMATIC TITLES */}
                <header className="mb-24 text-center space-y-6 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

                    <h2 className="relative z-10 text-5xl md:text-8xl font-serif text-zinc-100 leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        El Teatro <br />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20">del Cielo</span>
                    </h2>

                    <div className="relative z-10 flex justify-center">
                        <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    </div>

                    <p className="relative z-10 text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed font-sans">
                        {ASTROLOGY_MANUAL.integration.content}
                    </p>
                </header>

                <div className="space-y-32 relative z-10">
                    {/* INTRO SECTION - PHILOSOPHY */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {ASTROLOGY_MANUAL.intro.sections.map((section) => (
                            <div key={section.id} className="group relative p-8 rounded-[2rem] bg-[#050505]/60 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-700">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]" />

                                <h3 className="text-2xl font-serif text-white mb-4 relative z-10">{section.title}</h3>
                                <p className="text-zinc-400 font-light leading-relaxed mb-8 relative z-10 text-sm">
                                    {section.content}
                                </p>

                                <div className="pl-6 border-l-2 border-cyan-500/20 italic text-zinc-300 text-sm relative z-10">
                                    "{section.metaphor}"
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* ACT SWITCHER - PREMIUM TABS */}
                    <div className="flex justify-center sticky top-24 z-40 py-4 -mx-6 px-6 backdrop-blur-sm pointer-events-none">
                        <div className="flex gap-1 p-1.5 bg-[#050505]/90 border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-auto">
                            {(['planets', 'signs', 'houses'] as const).map((act) => (
                                <button
                                    key={act}
                                    onClick={() => { playSound('click'); setActiveAct(act); }}
                                    className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 relative ${activeAct === act
                                        ? 'text-white'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                        }`}
                                >
                                    {activeAct === act && (
                                        <motion.div
                                            layoutId="activeActTab"
                                            className={`absolute inset-0 rounded-full -z-10 ${act === 'planets' ? 'bg-cyan-500/20 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]' :
                                                act === 'signs' ? 'bg-amber-500/20 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]' :
                                                    'bg-emerald-500/20 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                                }`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {act === 'planets' ? 'Los Actores' : act === 'signs' ? 'El Vestuario' : 'Los Escenarios'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAct}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {activeAct === 'planets' && (
                                <section className="space-y-12">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-500/70">Acto I</span>
                                        <h3 className="text-4xl font-serif text-white">Los Actores</h3>
                                        <p className="text-zinc-500 text-sm max-w-md">Fuerzas arquetípicas que impulsan la narrativa de tu alma.</p>
                                    </div>
                                    {/* ... rest of planets section as rendered below ... */}

                                    <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(ASTROLOGY_MANUAL.planets).map(([key, data]) => (
                                            <div key={key} className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openPlanet === key ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.05)]' : 'bg-[#080808]/80 border-white/5 hover:border-white/20'}`}>
                                                <button onClick={() => { playSound('click'); setOpenPlanet(openPlanet === key ? null : key); }} className="w-full p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4 gap-y-2">
                                                    <div className="flex items-center gap-6">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-light transition-all ${openPlanet === key ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-zinc-400 group-hover:bg-white/10'}`}>
                                                            {key.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xl font-serif text-zinc-200 group-hover:text-cyan-300 transition-colors">{key}</h4>
                                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{data.character}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-500 ${openPlanet === key ? 'rotate-180 text-cyan-400' : ''}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {openPlanet === key && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <div className="p-8 pt-0 space-y-6 border-t border-white/5 mt-4">
                                                                <div className="space-y-1">
                                                                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest block">Propósito:</span>
                                                                    <p className="text-zinc-300 text-lg leading-relaxed font-light">{data.intro}</p>
                                                                    <span className="text-[10px] font-black text-cyan-400/70 uppercase tracking-widest block mt-4">Naturaleza Esencial:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{data.essence}</p>
                                                                    <p className="text-cyan-500/50 text-xs italic mt-2 uppercase tracking-wide">{data.keywords}</p>
                                                                </div>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                                                    <div className="space-y-2">
                                                                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">El Don (En Luz):</span>
                                                                        <p className="text-zinc-500 text-sm leading-relaxed">{data.light}</p>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">El Reto (En Sombra):</span>
                                                                        <p className="text-zinc-500 text-sm leading-relaxed">{data.shadow}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="p-5 bg-cyan-500/5 border-l-2 border-cyan-500/40 rounded-r-xl mt-4 mb-6">
                                                                    <span className="text-[10px] font-black text-cyan-300 uppercase tracking-widest block mb-2">Consejo del Guía:</span>
                                                                    <p className="text-zinc-200 italic text-sm font-light">"{data.advice}"</p>
                                                                </div>

                                                                {/* Toggle Biblioteca Profunda */}
                                                                <div className="pt-6 border-t border-white/5 flex justify-center">
                                                                    <button
                                                                        onClick={() => { playSound('click'); setOpenLibPlanet(openLibPlanet === key ? null : key); }}
                                                                        className={`px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${openLibPlanet === key ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-white/5 text-cyan-300/70 hover:text-cyan-300 hover:bg-white/10 border border-cyan-500/20'}`}
                                                                    >
                                                                        {openLibPlanet === key ? 'Cerrar Perfil Profundo' : 'Ver Perfil Profundo'}
                                                                    </button>
                                                                </div>

                                                                <AnimatePresence>
                                                                    {openLibPlanet === key && PLANETS_LIB[key] && (() => {
                                                                        const libData = PLANETS_LIB[key];
                                                                        return (
                                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                                <div className="pt-8 space-y-6">
                                                                                    <div className="flex flex-col items-center text-center space-y-2 mb-8">
                                                                                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-cyan-400/60">Archivos de Biblioteca Profunda</span>
                                                                                        <div className="h-px w-12 bg-cyan-500/30" />
                                                                                    </div>

                                                                                    <div className="space-y-1">
                                                                                        <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest block">Análisis Psicológico</span>
                                                                                        <p className="text-zinc-300 text-sm leading-relaxed font-light">{libData.profile}</p>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
                                                                                            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block">❤ En el Amor</span>
                                                                                            <p className="text-zinc-400 text-xs leading-relaxed">{libData.love}</p>
                                                                                        </div>
                                                                                        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 space-y-2">
                                                                                            <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block">✦ Carrera y Vocación</span>
                                                                                            <p className="text-zinc-400 text-xs leading-relaxed">{libData.career}</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                                        <div className="space-y-2">
                                                                                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">+ Manifestaciones de Luz</span>
                                                                                            <ul className="space-y-1">
                                                                                                {libData.positives.map((p, i) => (
                                                                                                    <li key={i} className="text-xs text-zinc-400 flex gap-2"><span className="text-emerald-500 mt-0.5">›</span>{p}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block">– Manifestaciones de Sombra</span>
                                                                                            <ul className="space-y-1">
                                                                                                {libData.negatives.map((n, i) => (
                                                                                                    <li key={i} className="text-xs text-zinc-500 flex gap-2"><span className="text-orange-500/60 mt-0.5">›</span>{n}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </motion.div>
                                                                        );
                                                                    })()}
                                                                </AnimatePresence>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeAct === 'signs' && (
                                <section className="space-y-12">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/70">Acto II</span>
                                        <h3 className="text-4xl font-serif text-white">El Vestuario</h3>
                                        <p className="text-zinc-500 text-sm max-w-md">El estilo y temperamento con el que actúa cada planeta.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(ASTROLOGY_MANUAL.signs).map(([key, data]) => (
                                            <div key={key} className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openSign === key ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'bg-[#080808]/80 border-white/5 hover:border-white/20'}`}>
                                                <button onClick={() => { playSound('click'); setOpenSign(openSign === key ? null : key); }} className="w-full p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4 gap-y-2">
                                                    <div className="flex items-center gap-6">
                                                        <div className="flex-shrink-0 w-12 h-16 bg-black/40 rounded-md overflow-hidden border border-white/10 relative">
                                                            <img
                                                                src={getZodiacImage(key)}
                                                                alt={key}
                                                                className="absolute inset-0 w-full h-full object-cover object-center scale-[2.5] brightness-110"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold text-zinc-300 uppercase tracking-widest group-hover:text-amber-300 transition-colors">{key}</h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500/70 border border-amber-500/20 font-bold uppercase tracking-wider">{data.element}</span>
                                                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Don: {data.gift}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-500 ${openSign === key ? 'rotate-180 text-amber-400' : ''}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {openSign === key && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <div className="p-8 pt-0 space-y-6 border-t border-white/5 mt-4">
                                                                {/* Large Card Preview */}
                                                                <div className="flex w-full justify-center items-center py-6">
                                                                    <div className="w-48 md:w-64 aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl border border-amber-500/20 bg-black/40">
                                                                        <img
                                                                            src={getZodiacImage(key)}
                                                                            alt={key}
                                                                            className="absolute inset-0 w-full h-full object-cover object-center scale-[2.5] brightness-125 transition-transform duration-700 hover:scale-[2.6]"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center gap-4 mb-2 mt-2">
                                                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] uppercase tracking-widest text-zinc-400">Modalidad: <span className="text-amber-400">{data.modality}</span></span>
                                                                    <span className="px-3 py-1 rounded-full bg-white/5 text-[9px] uppercase tracking-widest text-zinc-400">Regente: <span className="text-amber-400">{data.ruler}</span></span>
                                                                </div>

                                                                <div className="space-y-1">
                                                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">Esencia Espiritual:</span>
                                                                    <p className="text-zinc-300 text-lg leading-relaxed font-light">{data.essence}</p>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                                                    <div className="space-y-2">
                                                                        <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">En Luz Suprema:</span>
                                                                        <p className="text-zinc-500 text-sm leading-relaxed">{data.light}</p>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Trampa del Ego:</span>
                                                                        <p className="text-zinc-500 text-sm leading-relaxed">{data.shadow}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="p-5 bg-amber-500/5 border-l-2 border-amber-500/40 rounded-r-xl mt-4 mb-6">
                                                                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-2">Consejo Alquímico:</span>
                                                                    <p className="text-zinc-200 italic text-sm font-light">"{data.advice}"</p>
                                                                </div>

                                                                {/* Toggle Biblioteca Profunda */}
                                                                <div className="pt-6 border-t border-white/5 flex justify-center">
                                                                    <button
                                                                        onClick={() => { playSound('click'); setOpenLibSign(openLibSign === key ? null : key); }}
                                                                        className={`px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${openLibSign === key ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'bg-white/5 text-amber-300/70 hover:text-amber-300 hover:bg-white/10 border border-amber-500/20'}`}
                                                                    >
                                                                        {openLibSign === key ? 'Cerrar Biblioteca Profunda' : 'Ver Biblioteca Profunda'}
                                                                    </button>
                                                                </div>

                                                                <AnimatePresence>
                                                                    {openLibSign === key && SIGNS_LIB[key] && (() => {
                                                                        const libData = SIGNS_LIB[key];
                                                                        return (
                                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                                <div className="pt-8 space-y-6">
                                                                                    <div className="flex flex-col items-center text-center space-y-2 mb-8">
                                                                                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-amber-400/60">Archivos de Biblioteca Profunda</span>
                                                                                        <div className="h-px w-12 bg-amber-500/30" />
                                                                                    </div>

                                                                                    <div className="space-y-1">
                                                                                        <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest block">Análisis Psicológico</span>
                                                                                        <p className="text-zinc-300 text-sm leading-relaxed font-light">{libData.profile}</p>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
                                                                                            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block">❤ En el Amor</span>
                                                                                            <p className="text-zinc-400 text-xs leading-relaxed">{libData.love}</p>
                                                                                        </div>
                                                                                        <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-2">
                                                                                            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest block">✦ Carrera y Vocación</span>
                                                                                            <p className="text-zinc-400 text-xs leading-relaxed">{libData.career}</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                                        <div className="space-y-2">
                                                                                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">+ Fortalezas</span>
                                                                                            <ul className="space-y-1">
                                                                                                {libData.positives.map((p, i) => (
                                                                                                    <li key={i} className="text-xs text-zinc-400 flex gap-2"><span className="text-emerald-500 mt-0.5">›</span>{p}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block">– Sombras</span>
                                                                                            <ul className="space-y-1">
                                                                                                {libData.negatives.map((n, i) => (
                                                                                                    <li key={i} className="text-xs text-zinc-500 flex gap-2"><span className="text-orange-500/60 mt-0.5">›</span>{n}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </motion.div>
                                                                        );
                                                                    })()}
                                                                </AnimatePresence>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeAct === 'houses' && (
                                <section className="space-y-12">
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500/70">Acto III</span>
                                        <h3 className="text-4xl font-serif text-white">Los Escenarios</h3>
                                        <p className="text-zinc-500 text-sm max-w-md">Las áreas de la vida donde ocurre la acción.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(ASTROLOGY_MANUAL.houses).map(([num, data]) => (
                                            <div key={num} className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openHouse === num ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'bg-[#080808]/80 border-white/5 hover:border-white/20'}`}>
                                                <button onClick={() => { playSound('click'); setOpenHouse(openHouse === num ? null : num); }} className="w-full p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4 gap-y-2">
                                                    <div className="flex items-center gap-6">
                                                        <div className={`w-12 h-12 flex-shrink-0 flex flex-col items-center justify-center p-1 border rounded-full transition-colors ${openHouse === num ? 'bg-emerald-500 border-emerald-400 text-black' : 'bg-black border-white/10 text-zinc-400'}`}>
                                                            <span className="text-xl font-serif">{num}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1 block group-hover:text-emerald-500/50 transition-colors">Casa {num}</span>
                                                            <p className="text-sm text-zinc-300 font-light leading-snug group-hover:text-emerald-100 transition-colors">{data.summary}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-500 ${openHouse === num ? 'rotate-180 text-emerald-400' : ''}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {openHouse === num && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                            <div className="p-8 pt-0 space-y-6 border-t border-white/5 mt-4">

                                                                <div className="space-y-1">
                                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">Tema Central:</span>
                                                                    <p className="text-zinc-200 text-xl font-serif">{data.theme}</p>
                                                                </div>

                                                                <div className="space-y-3">
                                                                    <span className="text-[10px] font-black text-emerald-500/80 uppercase tracking-widest block">Clave Evolutiva:</span>
                                                                    <p className="text-zinc-300 text-md leading-relaxed font-light">{data.essence}</p>
                                                                </div>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                                                                    <div className="space-y-2">
                                                                        <span className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest">Arquetipo Base:</span>
                                                                        <p className="text-zinc-400 text-sm leading-relaxed">{data.signs}</p>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <span className="text-[10px] font-black text-rose-400/70 uppercase tracking-widest">Sombra del Escenario:</span>
                                                                        <p className="text-zinc-500 text-sm leading-relaxed font-light">{data.shadow}</p>
                                                                    </div>
                                                                </div>

                                                                <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-6">
                                                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest block mb-2">Manifestaciones en la Vida Cotidiana:</span>
                                                                    <p className="text-emerald-100/90 text-sm leading-relaxed font-light">{data.manifestation}</p>
                                                                </div>

                                                                {/* Toggle Biblioteca Profunda */}
                                                                <div className="pt-6 border-t border-white/5 flex justify-center">
                                                                    <button
                                                                        onClick={() => { playSound('click'); setOpenLibHouse(openLibHouse === Number(num) ? null : Number(num)); }}
                                                                        className={`px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${openLibHouse === Number(num) ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white/5 text-emerald-300/70 hover:text-emerald-300 hover:bg-white/10 border border-emerald-500/20'}`}
                                                                    >
                                                                        {openLibHouse === Number(num) ? 'Cerrar Biblioteca Profunda' : 'Ver Biblioteca Profunda'}
                                                                    </button>
                                                                </div>

                                                                <AnimatePresence>
                                                                    {openLibHouse === Number(num) && HOUSES_LIB[Number(num)] && (() => {
                                                                        const libData = HOUSES_LIB[Number(num)];
                                                                        return (
                                                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                                <div className="pt-8 space-y-6">
                                                                                    <div className="flex flex-col items-center text-center space-y-2 mb-8">
                                                                                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-400/60">Archivos de Biblioteca Profunda</span>
                                                                                        <div className="h-px w-12 bg-emerald-500/30" />
                                                                                    </div>

                                                                                    <div className="space-y-1">
                                                                                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">Análisis Psicológico</span>
                                                                                        <p className="text-zinc-300 text-sm leading-relaxed font-light">{libData.profile}</p>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                                        <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
                                                                                            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block">❤ En el Amor</span>
                                                                                            <p className="text-zinc-400 text-xs leading-relaxed">{libData.love}</p>
                                                                                        </div>
                                                                                        <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/15 space-y-2">
                                                                                            <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest block">✦ Carrera y Vocación</span>
                                                                                            <p className="text-zinc-400 text-xs leading-relaxed">{libData.career}</p>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                                        <div className="space-y-2">
                                                                                            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">+ Fortalezas</span>
                                                                                            <ul className="space-y-1">
                                                                                                {libData.positives.map((p, i) => (
                                                                                                    <li key={i} className="text-xs text-zinc-400 flex gap-2"><span className="text-emerald-500 mt-0.5">›</span>{p}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="space-y-2">
                                                                                            <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block">– Sombras</span>
                                                                                            <ul className="space-y-1">
                                                                                                {libData.negatives.map((n, i) => (
                                                                                                    <li key={i} className="text-xs text-zinc-500 flex gap-2"><span className="text-orange-500/60 mt-0.5">›</span>{n}</li>
                                                                                                ))}
                                                                                            </ul>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </motion.div>
                                                                        );
                                                                    })()}
                                                                </AnimatePresence>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </motion.div>
                    </AnimatePresence >

                </div >

                <footer className="mt-40 text-center">
                    <button onClick={() => { playSound('transition'); onClose(); }} className="px-10 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all">
                        Cerrar Telón
                    </button>
                </footer>
            </div >
        </motion.div >
    );
};

const NumerologyManualDetail = ({ onClose, playSound }: { onClose: () => void, playSound: (type?: 'click' | 'success' | 'transition') => void }) => {
    const [openNumber, setOpenNumber] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'frequencies' | 'pinnacle'>('frequencies');

    // Visual component for the Soul Architecture (Pinnacle Diagram)
    const PinnacleDiagram = () => {

        const Node = ({ id, color, x, y, size = 'w-10 h-10' }: { id: string, color: string, x: string, y: string, size?: string }) => (
            <div
                className={`absolute ${x} ${y} flex flex-col items-center group cursor-help z-10 translate-x-[-50%] translate-y-[-50%]`}
                title={NUMEROLOGY_MANUAL.pinnacle.positions.find(p => p.id === id)?.title}
            >
                <div className={`${size} rounded-full border-2 ${color} flex items-center justify-center bg-black text-white font-black text-sm transition-all group-hover:scale-125 group-hover:shadow-[0_0_30px_white/40] group-hover:border-white shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                    {id}
                </div>
            </div>
        );

        return (
            <div className="relative w-full aspect-[3/4] max-w-[500px] mx-auto mb-20 bg-[#020205] border border-white/5 rounded-[3rem] p-12 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center group/pinnacle">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(70,70,200,0.1),transparent)] opacity-50" />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 tracking-[0.5em] uppercase group-hover/pinnacle:text-amber-500/40 transition-colors">Geometría del Destino</div>

                <div className="relative w-full h-full">
                    {/* Connection Lines Mesh */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <g stroke="white" strokeWidth="0.2">
                            {/* Central Pillar */}
                            <line x1="50" y1="10" x2="50" y2="22" />
                            {/* Top Triangle */}
                            <line x1="50" y1="22" x2="35" y2="38" />
                            <line x1="50" y1="22" x2="65" y2="38" />
                            {/* Mid Lattice */}
                            <line x1="35" y1="38" x2="20" y2="54" />
                            <line x1="35" y1="38" x2="50" y2="54" />
                            <line x1="65" y1="38" x2="50" y2="54" />
                            <line x1="65" y1="38" x2="80" y2="54" />
                            {/* Bottom Lattice */}
                            <line x1="20" y1="54" x2="35" y2="70" />
                            <line x1="50" y1="54" x2="35" y2="70" />
                            <line x1="50" y1="54" x2="65" y2="70" />
                            <line x1="80" y1="54" x2="65" y2="70" />
                            {/* Root Lattice */}
                            <line x1="35" y1="70" x2="50" y2="86" />
                            <line x1="65" y1="70" x2="50" y2="86" />
                            <line x1="50" y1="86" x2="50" y2="98" />
                        </g>
                    </svg>

                    {/* Row 1: Top Spirit */}
                    <Node id="H" x="left-[50%]" y="top-[10%]" color="border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" size="w-12 h-12" />
                    <Node id="J" x="left-[80%]" y="top-[10%]" color="border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]" size="w-9 h-9" />

                    {/* Row 2: Subconscious Spirit */}
                    <Node id="G" x="left-[50%]" y="top-[22%]" color="border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                    <Node id="I" x="left-[70%]" y="top-[26%]" color="border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]" size="w-9 h-9" />

                    {/* Row 3: Higher Self */}
                    <Node id="E" x="left-[35%]" y="top-[38%]" color="border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.4)]" />
                    <Node id="F" x="left-[65%]" y="top-[38%]" color="border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]" />

                    {/* Row 4: Core Identity */}
                    <Node id="A" x="left-[20%]" y="top-[54%]" color="border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                    <Node id="B" x="left-[50%]" y="top-[54%]" color="border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]" size="w-12 h-12" />
                    <Node id="C" x="left-[80%]" y="top-[54%]" color="border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                    <Node id="D" x="left-[95%]" y="top-[54%]" color="border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" size="w-8 h-8" />

                    {/* Row 5: Shadows Inner */}
                    <Node id="P" x="left-[35%]" y="top-[70%]" color="border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
                    <Node id="O" x="left-[65%]" y="top-[70%]" color="border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]" />

                    {/* Row 6: Shadows Outer */}
                    <Node id="Q" x="left-[50%]" y="top-[86%]" color="border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]" />
                    <Node id="R" x="left-[80%]" y="top-[86%]" color="border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]" size="w-8 h-8" />

                    {/* Row 7: Root Shadow */}
                    <Node id="S" x="left-[50%]" y="top-[98%]" color="border-rose-600 shadow-[0_0_15px_rgba(225,29,72,0.2)]" size="w-8 h-8" />
                </div>
            </div>
        );
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#050510] overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
                <nav className="flex items-center justify-between mb-16 sticky top-0 py-4 bg-[#050510]/80 backdrop-blur-md z-10 border-b border-white/5">
                    <button onClick={() => { playSound('click'); onClose(); }} className="flex items-center gap-3 text-white/40 hover:text-white transition-all uppercase tracking-widest text-xs font-bold">
                        <ArrowLeft size={18} /> Volver a Biblioteca
                    </button>
                    <div className="flex items-center gap-3">
                        <Hash className="text-amber-400" size={20} />
                        <span className="text-sm font-light text-white uppercase tracking-[0.3em]">El Código Secreto</span>
                    </div>
                </nav>

                <header className="mb-12 space-y-4">
                    <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">La Arquitectura <br /><span className="text-amber-500 italic">del Alma</span></h2>
                    <p className="text-xl text-white/50 font-light max-w-2xl leading-relaxed">
                        No somos una etiqueta estática, somos una frecuencia en constante aprendizaje y evolución.
                    </p>
                </header>

                <div className="flex justify-center mb-16 sticky top-24 z-20">
                    <div className="p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex gap-1">
                        {[
                            { id: 'frequencies', label: 'Frecuencias', color: 'text-amber-400' },
                            { id: 'pinnacle', label: 'El Pináculo', color: 'text-amber-400' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { playSound('click'); setActiveTab(tab.id as any); }}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabNumero"
                                        className="absolute inset-0 bg-amber-500/20 border border-amber-500/20 rounded-xl"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'frequencies' ? (
                        <motion.div
                            key="frequencies"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-32"
                        >
                            {/* Intro Section */}
                            <section className="space-y-12">
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-light text-amber-300 tracking-wide">{NUMEROLOGY_MANUAL.intro.title}</h3>
                                    <p className="text-xl text-white/70 leading-relaxed font-light">{NUMEROLOGY_MANUAL.intro.content}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                        <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-4">
                                            <h4 className="text-xl text-amber-400 font-medium">Concepto Clave</h4>
                                            <p className="text-2xl text-white/80 italic font-light leading-snug">
                                                "{NUMEROLOGY_MANUAL.intro.concept}"
                                            </p>
                                        </div>
                                        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                                            <h4 className="text-xl text-white/80 font-medium">{NUMEROLOGY_MANUAL.intro.reduction.title}</h4>
                                            <p className="text-white/50 leading-relaxed">
                                                {NUMEROLOGY_MANUAL.intro.reduction.content}
                                            </p>
                                            <p className="text-sm text-amber-200/40 italic border-l border-amber-500/30 pl-4">
                                                {NUMEROLOGY_MANUAL.intro.reduction.masters_note}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Frequencies - The Notes */}
                            <section className="space-y-12">
                                <div className="space-y-4">
                                    <h3 className="text-4xl text-white font-light tracking-wide uppercase">Las 9 Frecuencias Base <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">las notas fundamentales de tu ser</span></h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {NUMEROLOGY_MANUAL.frequencies.map((f) => (
                                        <div
                                            key={f.number}
                                            className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openNumber === f.number ? 'bg-amber-500/10 border-amber-500/40' : 'bg-white/5 border-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenNumber(openNumber === f.number ? null : f.number)}
                                                className="w-full p-6 flex items-center justify-between text-left"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-14 aspect-[3/4] rounded-lg border transition-all flex items-center justify-center overflow-hidden shadow-lg ${openNumber === f.number ? 'bg-amber-500/20 border-amber-500/50' : 'bg-black/40 border-white/10 group-hover:border-white/20'
                                                        }`}>
                                                        <NeonNumber value={Number(f.number)} className="w-full h-full" isFullCard={true} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl text-white font-light group-hover:text-amber-300 transition-colors">{f.archetype}</h4>
                                                        <p className="text-[10px] text-amber-500/50 uppercase tracking-[0.2em] font-bold">{f.keyword}</p>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 text-white/20 transition-transform duration-500 ${openNumber === f.number ? 'rotate-180 text-amber-400' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {openNumber === f.number && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-8 pt-0 space-y-8 border-t border-white/5 mt-4">
                                                            {/* Large Card Preview */}
                                                            <div className="flex justify-center py-6">
                                                                <div className="w-52 aspect-[3/4] rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/10 bg-black/40">
                                                                    <NeonNumber value={Number(f.number)} className="w-full h-full" isFullCard={true} />
                                                                </div>
                                                            </div>
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                                                            {/* Essence */}
                                                            <div className="space-y-2">
                                                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">En Esencia:</span>
                                                                <p className="text-zinc-200 text-lg leading-relaxed font-light italic">{f.essence}</p>
                                                            </div>

                                                            {/* Profile */}
                                                            <div className="space-y-2">
                                                                <span className="text-[10px] font-black text-amber-400/70 uppercase tracking-widest">Perfil Arquetípico:</span>
                                                                <p className="text-zinc-400 text-sm leading-relaxed font-light">{f.profile}</p>
                                                            </div>

                                                            {/* Love & Career */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="p-5 bg-rose-500/5 border border-rose-500/15 rounded-2xl space-y-2">
                                                                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block">En el Amor:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{f.love}</p>
                                                                </div>
                                                                <div className="p-5 bg-cyan-500/5 border border-cyan-500/15 rounded-2xl space-y-2">
                                                                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">En la Carrera:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{f.career}</p>
                                                                </div>
                                                            </div>

                                                            {/* Positives & Negatives */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="space-y-3">
                                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">En Luz (Dones):</span>
                                                                    <ul className="space-y-1.5">
                                                                        {f.positives.map((p, i) => (
                                                                            <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs font-light">
                                                                                <span className="text-emerald-400 mt-0.5 flex-shrink-0">✦</span>
                                                                                {p}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div className="space-y-3">
                                                                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block">En Sombra (Retos):</span>
                                                                    <ul className="space-y-1.5">
                                                                        {f.negatives.map((n, i) => (
                                                                            <li key={i} className="flex items-start gap-2 text-zinc-400 text-xs font-light">
                                                                                <span className="text-rose-400 mt-0.5 flex-shrink-0">✦</span>
                                                                                {n}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            {/* Lesson, Mantra, Advice */}
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="p-4 bg-emerald-500/5 border-l-2 border-emerald-500/40 rounded-r-xl">
                                                                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest block mb-1">Misión Evolutiva:</span>
                                                                    <p className="text-white italic text-sm">"{f.lesson}"</p>
                                                                </div>
                                                                <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/40 rounded-r-xl">
                                                                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-1">Mantra de Poder:</span>
                                                                    <p className="text-white italic text-sm">"{f.mantra}"</p>
                                                                </div>
                                                            </div>

                                                            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2">Consejo del Guía:</span>
                                                                <p className="text-zinc-300 text-sm font-light leading-relaxed">{f.advice}</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Master Numbers */}
                            <section className="space-y-12">
                                <div className="space-y-4">
                                    <h3 className="text-4xl text-white font-light tracking-wide uppercase">Los Maestros Constructores <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">voltajes de alta intensidad</span></h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {NUMEROLOGY_MANUAL.masters.map((m) => (
                                        <div
                                            key={m.number}
                                            className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openNumber === m.number ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.05)]' : 'bg-[#080808]/80 border-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            <button
                                                onClick={() => { playSound('click'); setOpenNumber(openNumber === m.number ? null : m.number); }}
                                                className="w-full p-6 flex items-center justify-between text-left"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-11 aspect-[3/4] rounded-lg border transition-all flex items-center justify-center overflow-hidden shadow-lg ${openNumber === m.number ? 'bg-amber-500/20 border-amber-500/50' : 'bg-black/40 border-white/10 group-hover:border-white/20'
                                                        }`}>
                                                        <NeonNumber value={Number(m.number)} className="w-full h-full" isFullCard={true} />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl text-white font-light group-hover:text-amber-300 transition-colors uppercase tracking-widest">{m.archetype}</h4>
                                                        <p className="text-[10px] text-amber-500/50 uppercase tracking-[0.2em] font-bold">{m.keyword}</p>
                                                    </div>
                                                </div>
                                                <ChevronDown className={`w-5 h-5 text-white/20 transition-transform duration-500 ${openNumber === m.number ? 'rotate-180 text-amber-400' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {openNumber === m.number && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-8 pt-0 space-y-8 border-t border-white/5 mt-4">
                                                            {/* Large Card Preview */}
                                                            <div className="flex justify-center py-6">
                                                                <div className="w-40 aspect-[3/4] rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/10 bg-black/40">
                                                                    <NeonNumber value={Number(m.number)} className="w-full h-full" isFullCard={true} />
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2">
                                                                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">Misión del Maestro:</span>
                                                                <p className="text-zinc-200 text-lg leading-relaxed font-light italic">{m.description}</p>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                                                                <div className="space-y-2">
                                                                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">El Gran Don:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{m.gift}</p>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">El Gran Reto:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{m.challenge}</p>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <div className="p-5 bg-rose-500/5 border border-rose-500/15 rounded-2xl space-y-2">
                                                                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block">En el Amor:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{m.love}</p>
                                                                </div>
                                                                <div className="p-5 bg-cyan-500/5 border border-cyan-500/15 rounded-2xl space-y-2">
                                                                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest block">En la Carrera:</span>
                                                                    <p className="text-zinc-400 text-sm leading-relaxed font-light">{m.career}</p>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="p-4 bg-amber-500/5 border-l-2 border-amber-500/40 rounded-r-xl">
                                                                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-1">Mantra del Maestro:</span>
                                                                    <p className="text-white italic text-sm">"{m.mantra}"</p>
                                                                </div>
                                                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-center">
                                                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Consejo Alquímico:</span>
                                                                    <p className="text-zinc-300 text-xs font-light italic">"{m.advice}"</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="pinnacle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-24"
                        >
                            <PinnacleDiagram />
                            <section className="space-y-16">
                                <div className="space-y-4">
                                    <h3 className="text-4xl text-white font-light tracking-wide uppercase">El Pináculo del Destino <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">tu geometría sagrada completa</span></h3>
                                    <p className="text-xl text-white/50 font-light leading-relaxed">
                                        {NUMEROLOGY_MANUAL.pinnacle.intro}
                                    </p>
                                </div>

                                {/* Calculation Logic Section */}
                                <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                                        <h4 className="text-xs font-black text-amber-500/80 uppercase tracking-[0.3em]">Alquimia del Código</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <p className="text-sm font-bold text-white/80 uppercase tracking-wider">Ascenso Espiritual (Suma)</p>
                                            <ul className="space-y-2 text-xs text-white/40 font-light leading-relaxed">
                                                <li><span className="text-emerald-400 font-bold">E (Regalo)</span> = A (Mes) + B (Día)</li>
                                                <li><span className="text-amber-400 font-bold">F (Destino)</span> = B (Día) + C (Año)</li>
                                                <li><span className="text-purple-400 font-bold">G (Misión)</span> = E + F</li>
                                            </ul>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-sm font-bold text-white/80 uppercase tracking-wider">Descenso a la Sombra (Resta)</p>
                                            <ul className="space-y-2 text-xs text-white/40 font-light leading-relaxed">
                                                <li><span className="text-rose-400 font-bold">P (Sombra 1)</span> = |A - B|</li>
                                                <li><span className="text-rose-400 font-bold">O (Sombra 2)</span> = |B - C|</li>
                                                <li><span className="text-rose-500 font-bold">Q (Ser Inferior)</span> = |P - O|</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-white/20 italic text-center pt-4 border-t border-white/5 px-8">
                                        * La reducción teosófica se aplica en cada paso para obtener frecuencias del 1 al 9, excepto en Números Maestros.
                                    </p>
                                </div>

                                <div className="space-y-12">
                                    {(['IDENTIDAD', 'BRILLO', 'MISTERIO', 'SOMBRAS'] as const).map(level => {
                                        const levelPositions = NUMEROLOGY_MANUAL.pinnacle.positions.filter(p => p.level === level);
                                        const levelTitles = {
                                            IDENTIDAD: "Los Pilares de la Identidad",
                                            BRILLO: "El Triángulo del Brillo",
                                            MISTERIO: "Los Puentes del Misterio",
                                            SOMBRAS: "El Triángulo de Sombras"
                                        };

                                        return (
                                            <div key={level} className="space-y-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                                                    <h4 className="text-xs font-black text-amber-500/80 uppercase tracking-[0.3em] whitespace-nowrap">{levelTitles[level]}</h4>
                                                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {levelPositions.map((p) => (
                                                        <div key={p.id} className="group p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-white/10 transition-all">
                                                            <div className="flex items-center gap-4 mb-3">
                                                                <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-[10px] font-black text-white group-hover:bg-amber-500 group-hover:border-amber-400 transition-colors">
                                                                    {p.id}
                                                                </div>
                                                                <h5 className="text-lg text-white font-light">{p.title}</h5>
                                                            </div>
                                                            <p className="text-xs text-white/40 leading-relaxed font-light pl-12 border-l border-white/10 ml-4 group-hover:text-white/60 transition-colors">
                                                                {p.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Integration Section */}
                            <section className="p-12 bg-white/5 border border-white/10 rounded-[3rem] space-y-12 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                                <div className="max-w-2xl mx-auto text-center space-y-8">
                                    <h3 className="text-4xl font-light text-white">{NUMEROLOGY_MANUAL.integration.title}</h3>
                                    <p className="text-xl text-white/60 leading-relaxed font-light">
                                        {NUMEROLOGY_MANUAL.integration.content}
                                    </p>
                                    <div className="pt-8 border-t border-white/5">
                                        <p className="text-2xl text-amber-400 italic font-medium">
                                            "{NUMEROLOGY_MANUAL.integration.closing}"
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>

                <footer className="mt-32 p-12 bg-white/5 border border-white/10 rounded-3xl text-center">
                    <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Fin de la Arquitectura del Alma</p>
                    <button onClick={() => { playSound('transition'); onClose(); }} className="px-8 py-3 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-full transition-all border border-amber-500/30 uppercase text-xs font-bold tracking-[0.2em]">
                        Cerrar y Volver
                    </button>
                </footer>
            </div>
        </motion.div>
    );
};

const MayaManualDetail = ({ onClose, playSound }: { onClose: () => void, playSound: (type?: 'click' | 'success' | 'transition') => void }) => {
    const [openNahual, setOpenNahual] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#020504] overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
                <nav className="flex items-center justify-between mb-16 sticky top-0 py-4 bg-[#020504]/80 backdrop-blur-md z-10 border-b border-white/5">
                    <button onClick={() => { playSound('click'); onClose(); }} className="flex items-center gap-3 text-white/40 hover:text-white transition-all uppercase tracking-widest text-xs font-bold">
                        <ArrowLeft size={18} /> Volver a Biblioteca
                    </button>
                    <div className="flex items-center gap-3">
                        <Sun className="text-emerald-400" size={20} />
                        <span className="text-sm font-light text-white uppercase tracking-[0.3em]">El Tiempo Sagrado</span>
                    </div>
                </nav>

                <header className="mb-20 space-y-4 text-center md:text-left">
                    <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">El Código <br /><span className="text-emerald-500 italic">del Tiempo</span></h2>
                    <p className="text-xl text-white/50 font-light max-w-2xl leading-relaxed">
                        {MAYAN_MANUAL.intro.content}
                    </p>
                </header>

                <div className="space-y-32">
                    {/* Mayan Cross Section */}
                    <section className="space-y-12">
                        <div className="space-y-4 text-center md:text-left">
                            <h3 className="text-4xl text-white font-light tracking-wide uppercase">La Cruz Maya <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">la arquitectura del alma</span></h3>
                            <div className="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] text-xl text-emerald-300 italic font-light relative mt-8">
                                <span className="absolute -top-4 -left-2 text-6xl text-emerald-500 opacity-20 font-serif">"</span>
                                {MAYAN_MANUAL.mayanCross.metaphor}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                            {MAYAN_MANUAL.mayanCross.positions.map((pos) => (
                                <div key={pos.id} className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-all">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        {pos.id.charAt(0).toUpperCase()}
                                    </div>
                                    <h4 className="text-lg text-white font-medium">{pos.title}</h4>
                                    <p className="text-xs text-white/40 leading-relaxed">
                                        {pos.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 20 Nahuales Section */}
                    <section className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-4xl text-white font-light tracking-wide uppercase">Las 20 Fuerzas <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">los nahuales de la creación</span></h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {MAYAN_MANUAL.nahuales.map((n) => {
                                const cross = getMayanCross(n.id);
                                return (
                                    <div
                                        key={n.id}
                                        className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openNahual === n.id ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-white/5 border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setOpenNahual(openNahual === n.id ? null : n.id)}
                                            className="w-full p-6 flex items-center justify-between text-left"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className={`w-11 aspect-[3/4] rounded-lg border transition-all flex items-center justify-center overflow-hidden shadow-lg ${openNahual === n.id ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-black/40 border-white/10 group-hover:border-white/20'
                                                    }`}>
                                                    <img
                                                        src={getNahualImage(n.id)}
                                                        alt={n.kiche}
                                                        className={`w-[145%] h-[145%] object-cover object-center transition-transform duration-700 group-hover:scale-[1.05] brightness-110`}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-xl text-white font-light group-hover:text-emerald-300 transition-colors">{n.kiche} - <span className="text-white/50">{n.spanish}</span></h4>
                                                    <p className="text-[10px] text-emerald-500/50 uppercase tracking-[0.2em]">Totem: {n.totem}</p>
                                                </div>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 text-white/20 transition-transform duration-500 ${openNahual === n.id ? 'rotate-180 text-emerald-400' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {openNahual === n.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="p-8 pt-0 space-y-8 border-t border-white/5 mt-4">

                                                        {/* Large Card Preview */}
                                                        <div className="flex w-full justify-center items-center py-6">
                                                            <div className="w-48 md:w-64 aspect-[2/3] flex items-center justify-center rounded-xl overflow-hidden shadow-2xl border border-emerald-500/20 bg-black/40 group/large">
                                                                <img
                                                                    src={getNahualImage(n.id)}
                                                                    alt={n.kiche}
                                                                    className="w-[145%] h-[145%] object-cover object-center brightness-125 transition-transform duration-700 group-hover/large:scale-[1.05]"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Significado Cósmico:</span>
                                                            <p className="text-white/70 text-sm leading-relaxed italic">{n.meaning}</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Esencia Sagrada:</span>
                                                            <p className="text-white/80 text-lg leading-relaxed font-light">{n.essence}</p>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Características del Nativo:</span>
                                                            <p className="text-white/70 text-sm leading-relaxed">{n.characteristics}</p>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                            <div className="space-y-2">
                                                                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">En Luz (Dones):</span>
                                                                <p className="text-white/60 text-sm leading-relaxed">{n.light}</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">En Sombra (Retos):</span>
                                                                <p className="text-white/60 text-sm leading-relaxed">{n.shadow}</p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Misión de Vida:</span>
                                                            <p className="text-white/80 text-sm leading-relaxed">{n.mission}</p>
                                                        </div>

                                                        <div className="p-6 bg-emerald-500/5 border-l-2 border-emerald-500/40 rounded-r-2xl mb-8">
                                                            <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest block mb-2">Consejo del Abuelo:</span>
                                                            <p className="text-white italic text-sm">"{n.advice}"</p>
                                                        </div>

                                                        {/* Graphical Mayan Cross */}
                                                        {cross && (
                                                            <div className="mt-12 pt-12 border-t border-white/5 relative">
                                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500/30 uppercase tracking-[0.3em] bg-[#020504] px-4">Cruz Maya</div>

                                                                <div className="relative w-full max-w-2xl mx-auto hidden md:flex flex-col items-center justify-center py-8">
                                                                    {/* Vertical Line */}
                                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
                                                                    {/* Horizontal Line */}
                                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

                                                                    {/* Destiny (Top) */}
                                                                    <div className="relative z-10 flex flex-col items-center text-center p-4 bg-[#020504] border border-white/10 rounded-2xl w-48 mb-8 hover:border-emerald-500/40 transition-colors">
                                                                        <span className="text-[9px] text-emerald-500 tracking-widest uppercase mb-1 font-bold">Destino (Cabeza)</span>
                                                                        <div className="w-12 aspect-[3/4] rounded-lg border border-emerald-500/30 overflow-hidden shadow-lg bg-black/40 mb-2">
                                                                            <img src={getNahualImage(cross.destiny.id)} alt={cross.destiny.kiche} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.destiny.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                        </div>
                                                                        <span className="text-white font-light">{cross.destiny.kiche}</span>
                                                                        <span className="text-white/40 text-xs">{cross.destiny.spanish}</span>
                                                                    </div>

                                                                    <div className="flex w-full justify-between relative z-10">
                                                                        {/* Left Arm */}
                                                                        <div className="flex flex-col items-center text-center p-4 bg-[#020504] border border-white/10 rounded-2xl w-40 hover:border-emerald-500/40 transition-colors">
                                                                            <span className="text-[9px] text-emerald-400 tracking-widest uppercase mb-1 font-bold">Brazo Izquierdo</span>
                                                                            <div className="w-10 aspect-[3/4] rounded-lg border border-emerald-400/30 overflow-hidden shadow-lg bg-black/40 mb-2">
                                                                                <img src={getNahualImage(cross.leftArm.id)} alt={cross.leftArm.kiche} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.leftArm.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <span className="text-white font-light">{cross.leftArm.kiche}</span>
                                                                            <span className="text-white/40 text-xs">{cross.leftArm.spanish}</span>
                                                                        </div>

                                                                        {/* Center */}
                                                                        <div className="flex flex-col items-center text-center p-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full w-32 h-32 justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] glow-pulse z-20 relative overflow-hidden">
                                                                            <img src={getNahualImage(cross.center.id)} alt={cross.center.kiche} className={`absolute inset-0 w-full h-full object-cover opacity-20 ${['IX', 'IQ', 'BATZ'].includes(cross.center.id) ? 'scale-[1.5]' : 'scale-[1.2]'}`} />
                                                                            <div className="relative z-10">
                                                                                <span className="text-[10px] text-emerald-300 tracking-[0.2em] font-black uppercase mb-1 block">Corazón</span>
                                                                                <span className="text-white font-bold text-lg">{cross.center.kiche}</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Right Arm */}
                                                                        <div className="flex flex-col items-center text-center p-4 bg-[#020504] border border-white/10 rounded-2xl w-40 hover:border-emerald-500/40 transition-colors">
                                                                            <span className="text-[9px] text-teal-400 tracking-widest uppercase mb-1 font-bold">Brazo Derecho</span>
                                                                            <div className="w-10 aspect-[3/4] rounded-lg border border-teal-400/30 overflow-hidden shadow-lg bg-black/40 mb-2">
                                                                                <img src={getNahualImage(cross.rightArm.id)} alt={cross.rightArm.kiche} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.rightArm.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <span className="text-white font-light">{cross.rightArm.kiche}</span>
                                                                            <span className="text-white/40 text-xs">{cross.rightArm.spanish}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Conception (Bottom) */}
                                                                    <div className="relative z-10 flex flex-col items-center text-center p-4 bg-[#020504] border border-white/10 rounded-2xl w-48 mt-8 hover:border-emerald-500/40 transition-colors">
                                                                        <span className="text-[9px] text-emerald-500 tracking-widest uppercase mb-1 font-bold">Engendrado (Pies)</span>
                                                                        <div className="w-12 aspect-[3/4] rounded-lg border border-emerald-500/30 overflow-hidden shadow-lg bg-black/40 mb-2">
                                                                            <img src={getNahualImage(cross.conception.id)} alt={cross.conception.kiche} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.conception.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                        </div>
                                                                        <span className="text-white font-light">{cross.conception.kiche}</span>
                                                                        <span className="text-white/40 text-xs">{cross.conception.spanish}</span>
                                                                    </div>
                                                                </div>

                                                                {/* Mobile Cross View (Vertical List) */}
                                                                <div className="md:hidden flex flex-col gap-4 py-6">
                                                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="w-8 aspect-[3/4] rounded-md border border-emerald-500/30 overflow-hidden shadow-lg bg-black/40">
                                                                                <img src={getNahualImage(cross.destiny.id)} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.destiny.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-[10px] text-emerald-500 tracking-widest uppercase block font-bold mb-1">Destino (Cabeza)</span>
                                                                                <span className="text-white font-medium block">{cross.destiny.kiche}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-white/40 text-xs border border-white/10 px-2 py-1 rounded-full">{cross.destiny.spanish}</span>
                                                                    </div>
                                                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="w-8 aspect-[3/4] rounded-md border border-emerald-400/30 overflow-hidden shadow-lg bg-black/40">
                                                                                <img src={getNahualImage(cross.leftArm.id)} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.leftArm.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-[10px] text-emerald-400 tracking-widest uppercase block font-bold mb-1">Brazo Izquierdo (Mágico)</span>
                                                                                <span className="text-white font-medium block">{cross.leftArm.kiche}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-white/40 text-xs border border-white/10 px-2 py-1 rounded-full">{cross.leftArm.spanish}</span>
                                                                    </div>
                                                                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex justify-between items-center">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="w-10 aspect-[3/4] rounded-md border border-emerald-300/30 overflow-hidden shadow-[0_0_15px_rgba(52,211,153,0.3)] bg-black/40">
                                                                                <img src={getNahualImage(cross.center.id)} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.center.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-[10px] text-emerald-300 tracking-widest uppercase block font-bold mb-1">Corazón (Centro)</span>
                                                                                <span className="text-white font-bold block">{cross.center.kiche}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-white/80 text-xs font-bold border border-emerald-500/30 px-2 py-1 rounded-full">{cross.center.spanish}</span>
                                                                    </div>
                                                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="w-8 aspect-[3/4] rounded-md border border-teal-400/30 overflow-hidden shadow-lg bg-black/40">
                                                                                <img src={getNahualImage(cross.rightArm.id)} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.rightArm.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-[10px] text-teal-400 tracking-widest uppercase block font-bold mb-1">Brazo Derecho (Material)</span>
                                                                                <span className="text-white font-medium block">{cross.rightArm.kiche}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-white/40 text-xs border border-white/10 px-2 py-1 rounded-full">{cross.rightArm.spanish}</span>
                                                                    </div>
                                                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="w-8 aspect-[3/4] rounded-md border border-emerald-500/30 overflow-hidden shadow-lg bg-black/40">
                                                                                <img src={getNahualImage(cross.conception.id)} className={`w-full h-full object-cover object-center ${['IX', 'IQ', 'BATZ'].includes(cross.conception.id) ? 'scale-[1.45]' : 'scale-[1.15]'}`} />
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-[10px] text-emerald-500 tracking-widest uppercase block font-bold mb-1">Engendrado (Pies)</span>
                                                                                <span className="text-white font-medium block">{cross.conception.kiche}</span>
                                                                            </div>
                                                                        </div>
                                                                        <span className="text-white/40 text-xs border border-white/10 px-2 py-1 rounded-full">{cross.conception.spanish}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Integration Section */}
                    <section className="p-12 bg-white/5 border border-white/10 rounded-[3rem] space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

                        <div className="max-w-2xl mx-auto text-center space-y-8">
                            <h3 className="text-4xl font-light text-white">{MAYAN_MANUAL.integration.title}</h3>
                            <p className="text-xl text-white/60 leading-relaxed font-light">
                                {MAYAN_MANUAL.integration.content}
                            </p>
                            <div className="pt-8 border-t border-white/5">
                                <p className="text-2xl text-emerald-400 italic font-medium">
                                    "{MAYAN_MANUAL.integration.closing}"
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="mt-32 p-12 bg-white/5 rounded-3xl border border-white/10 text-center">
                    <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Fin del Tiempo Sagrado</p>
                    <button onClick={() => { playSound('transition'); onClose(); }} className="px-8 py-3 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 rounded-full transition-all border border-emerald-500/30 uppercase text-xs font-bold tracking-[0.2em]">
                        Cerrar y Volver
                    </button>
                </footer>
            </div>
        </motion.div>
    );
};

const ChineseManualDetail = ({ onClose, playSound }: { onClose: () => void, playSound: (type?: 'click' | 'success' | 'transition') => void }) => {
    const [openAnimal, setOpenAnimal] = useState<string | null>(null);
    const [openLibAnimal, setOpenLibAnimal] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#02020a] overflow-y-auto"
        >
            <div className="max-w-4xl mx-auto px-6 py-12 pb-32">
                <nav className="flex items-center justify-between mb-16 sticky top-0 py-4 bg-[#02020a]/80 backdrop-blur-md z-10 border-b border-white/5">
                    <button onClick={() => { playSound('click'); onClose(); }} className="flex items-center gap-3 text-white/40 hover:text-white transition-all uppercase tracking-widest text-xs font-bold">
                        <ArrowLeft size={18} /> Volver a Biblioteca
                    </button>
                    <div className="flex items-center gap-3">
                        <Moon className="text-indigo-400" size={20} />
                        <span className="text-sm font-light text-white uppercase tracking-[0.3em]">El Ciclo Ancestral</span>
                    </div>
                </nav>

                {/* --- PERSONAL WISDOM INTEGRATION --- */}
                <div className="mb-20">
                    <SabiduriaOriental />
                </div>

                <header className="mb-20 space-y-4">
                    <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">La Ecología <br /><span className="text-indigo-500 italic">Interna</span></h2>
                    <p className="text-xl text-white/50 font-light max-w-2xl leading-relaxed">
                        {CHINESE_MANUAL.intro.content}
                    </p>
                </header>

                <div className="space-y-32">
                    {/* Intro Section - Yin/Yang & Elements */}
                    <section className="space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <h3 className="text-3xl font-light text-indigo-300 tracking-wide">Yin y Yang: El Latido</h3>
                                <p className="text-lg text-white/70 leading-relaxed font-light italic">
                                    {CHINESE_MANUAL.intro.yinyang}
                                </p>
                            </div>
                            <div className="p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl space-y-4">
                                <h4 className="text-xl text-indigo-400 font-medium">Concepto Maestro</h4>
                                <p className="text-2xl text-white/80 italic font-light leading-snug">
                                    "{CHINESE_MANUAL.intro.concept}"
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-4xl text-white font-light tracking-wide uppercase">Los 5 Elementos <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">el clima de tu alma</span></h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {CHINESE_MANUAL.elements.map((el) => (
                                    <div key={el.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-3 hover:border-indigo-500/30 transition-all">
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{el.name}</span>
                                        <p className="text-xs text-white/60 leading-relaxed h-[60px]">{el.quality}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 12 Animals Section */}
                    <section className="space-y-12">
                        <div className="space-y-4">
                            <h3 className="text-4xl text-white font-light tracking-wide uppercase">Los 12 Guardianes <span className="text-white/20 font-serif lowercase italic pt-2 block text-2xl tracking-normal">arquetipos del movimiento</span></h3>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {CHINESE_MANUAL.animals.map((a) => (
                                <div
                                    key={a.id}
                                    className={`group rounded-3xl border transition-all duration-500 overflow-hidden ${openAnimal === a.id ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-white/5 border-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <button
                                        onClick={() => setOpenAnimal(openAnimal === a.id ? null : a.id)}
                                        className="w-full p-6 flex items-center justify-between text-left"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`w-11 aspect-[3/4] rounded-lg border transition-all flex items-center justify-center overflow-hidden shadow-lg ${openAnimal === a.id ? 'bg-indigo-500/20 border-indigo-500/50' : 'bg-black/40 border-white/10 group-hover:border-white/20'
                                                }`}>
                                                <img
                                                    src={getChineseZodiacImage(a.spanish)}
                                                    alt={a.spanish}
                                                    className="w-[145%] h-[145%] object-cover object-center transition-transform duration-700 group-hover:scale-[1.05] brightness-110"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="text-xl text-white font-light group-hover:text-indigo-300 transition-colors">{a.spanish}</h4>
                                                <p className="text-[10px] text-indigo-500/50 uppercase tracking-[0.2em]">{a.archetype}</p>
                                            </div>
                                        </div>
                                        <ChevronDown className={`w-5 h-5 text-white/20 transition-transform duration-500 ${openAnimal === a.id ? 'rotate-180 text-indigo-400' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {openAnimal === a.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-8 pt-0 space-y-8 border-t border-white/5 mt-4">

                                                    {/* Large Card Preview */}
                                                    <div className="flex w-full justify-center items-center py-6">
                                                        <div className="w-48 md:w-64 aspect-[2/3] flex items-center justify-center rounded-xl overflow-hidden shadow-2xl border border-indigo-500/20 bg-black/40 group/large">
                                                            <img
                                                                src={getChineseZodiacImage(a.spanish)}
                                                                alt={a.spanish}
                                                                className="w-[145%] h-[145%] object-cover object-center brightness-125 transition-transform duration-700 group-hover/large:scale-[1.05]"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">La Esencia:</span>
                                                        <p className="text-white/80 text-lg leading-relaxed font-light">{a.essence}</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">En Luz (Dones):</span>
                                                            <p className="text-white/60 text-sm leading-relaxed">{a.light}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">En Sombra (Retos):</span>
                                                            <p className="text-white/60 text-sm leading-relaxed">{a.shadow}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Estilo de Vida:</span>
                                                        <p className="text-white/70 text-sm leading-relaxed">{a.lifestyle}</p>
                                                    </div>

                                                    <div className="p-6 bg-indigo-500/5 border-l-2 border-indigo-500/40 rounded-r-2xl mb-6">
                                                        <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest block mb-2">Consejo Taoísta:</span>
                                                        <p className="text-white italic text-sm">"{a.advice}"</p>
                                                    </div>

                                                    {/* Toggle Biblioteca Profunda */}
                                                    <div className="pt-6 border-t border-white/5 flex justify-center">
                                                        <button
                                                            onClick={() => { playSound('click'); setOpenLibAnimal(openLibAnimal === a.id ? null : a.id); }}
                                                            className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${openLibAnimal === a.id ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-white/5 text-indigo-300/70 hover:text-indigo-300 hover:bg-white/10 border border-indigo-500/20'}`}
                                                        >
                                                            {openLibAnimal === a.id ? 'Cerrar Biblioteca Profunda' : 'Ver Biblioteca Profunda'}
                                                        </button>
                                                    </div>

                                                    <AnimatePresence>
                                                        {openLibAnimal === a.id && CHINESE_LIB[a.spanish] && (() => {
                                                            const data = CHINESE_LIB[a.spanish];
                                                            return (
                                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                    <div className="pt-8 space-y-6">
                                                                        <div className="flex flex-col items-center text-center space-y-2 mb-8">
                                                                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-400">Archivos de Ludovica Squirru</span>
                                                                            <div className="h-px w-12 bg-indigo-500/30" />
                                                                        </div>

                                                                        <p className="text-indigo-400/50 text-[10px] uppercase tracking-widest">{data.years}</p>

                                                                        <div className="space-y-1">
                                                                            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block">Perfil Profundo</span>
                                                                            <p className="text-zinc-300 text-sm leading-relaxed font-light">{data.profile}</p>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/15 space-y-2">
                                                                                <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block">❤ Amor</span>
                                                                                <p className="text-zinc-400 text-xs leading-relaxed">{data.love}</p>
                                                                            </div>
                                                                            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/15 space-y-2">
                                                                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block">✦ Carrera</span>
                                                                                <p className="text-zinc-400 text-xs leading-relaxed">{data.career}</p>
                                                                            </div>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                                            <div className="space-y-2">
                                                                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest block">+ Fortalezas</span>
                                                                                <ul className="space-y-1">
                                                                                    {data.positives.map((p, i) => (
                                                                                        <li key={i} className="text-xs text-zinc-400 flex gap-2"><span className="text-emerald-500 mt-0.5">›</span>{p}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                            <div className="space-y-2">
                                                                                <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block">– Sombras</span>
                                                                                <ul className="space-y-1">
                                                                                    {data.negatives.map((n, i) => (
                                                                                        <li key={i} className="text-xs text-zinc-500 flex gap-2"><span className="text-orange-500/60 mt-0.5">›</span>{n}</li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>

                                                                        <div className="p-4 bg-indigo-500/5 border-l-2 border-indigo-400/30 rounded-r-xl">
                                                                            <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest block mb-1">Karma de vida</span>
                                                                            <p className="text-zinc-300 text-xs italic leading-relaxed">{data.karma}</p>
                                                                        </div>

                                                                        <div className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                                                                            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest flex-shrink-0">Talismán:</span>
                                                                            <span className="text-xs text-zinc-500 italic">{data.talisman}</span>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            );
                                                        })()}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Integration Section */}
                    <section className="p-12 bg-white/5 border border-white/10 rounded-[3rem] space-y-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                        <div className="max-w-2xl mx-auto text-center space-y-8">
                            <h3 className="text-4xl font-light text-white">{CHINESE_MANUAL.integration.title}</h3>
                            <p className="text-xl text-white/60 leading-relaxed font-light">
                                {CHINESE_MANUAL.integration.content}
                            </p>
                            <div className="pt-8 border-t border-white/5">
                                <p className="text-2xl text-indigo-400 italic font-medium">
                                    "{CHINESE_MANUAL.integration.closing}"
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="mt-32 p-12 bg-white/5 rounded-3xl border border-white/10 text-center">
                    <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Fin del Ciclo Ancestral</p>
                    <button onClick={() => { playSound('transition'); onClose(); }} className="px-8 py-3 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 rounded-full transition-all border border-indigo-500/30 uppercase text-xs font-bold tracking-[0.2em]">
                        Cerrar y Volver
                    </button>
                </footer>
            </div>
        </motion.div>
    );
};
