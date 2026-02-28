import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wind, Play, Sparkles, Brain, Zap as ActionIcon, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useSound } from '../hooks/useSound';
import { useWisdom } from '../hooks/useWisdom';
import { useFrequency, ELEMENT_FREQUENCIES } from '../hooks/useFrequency';
import { RITUAL_LIBRARY } from '../constants/ritualContent';
import { WisdomButton } from '../components/WisdomOverlay';

interface ElementalLaboratoryViewProps {
    onBack: () => void;
    onNavigate?: (view: any, payload?: any) => void;
}

export const ElementalLaboratoryView: React.FC<ElementalLaboratoryViewProps> = ({ onBack, onNavigate }) => {
    const { playSound } = useSound();
    const { openWisdom } = useWisdom();
    const { activeElement: activeAudioElement, toggleFrequency } = useFrequency();

    const [selectedElement, setSelectedElement] = useState<keyof typeof RITUAL_LIBRARY | null>(null);
    const [selectedRitualInfo, setSelectedRitualInfo] = useState<{
        title: string;
        description: string;
        techniqueType: 'BREATH' | 'MEDITATION';
        elementId: string;
    } | null>(null);

    const availablePaths = selectedElement ? RITUAL_LIBRARY[selectedElement] : [];

    // Explicit Tailwind classes to prevent purging in production builds
    const elements: { id: keyof typeof RITUAL_LIBRARY; icon: any; label: string; desc: string; style: any }[] = [
        {
            id: 'FIRE', icon: AlchemicalFire, label: 'Fuego', desc: 'Activación y Voluntad',
            style: {
                activeBg: 'bg-red-900/20', activeBorder: 'border-red-500/60', shadow: 'shadow-[inset_0_0_30px_rgba(239,68,68,0.15)]', text: 'text-red-400', gradient: 'from-red-500/20 to-transparent',
                inactiveHover: 'hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]',
                iconBase: 'text-red-500/70'
            }
        },
        {
            id: 'WATER', icon: AlchemicalWater, label: 'Agua', desc: 'Calma y Fluidez',
            style: {
                activeBg: 'bg-cyan-900/20', activeBorder: 'border-cyan-500/60', shadow: 'shadow-[inset_0_0_30px_rgba(6,182,212,0.15)]', text: 'text-cyan-400', gradient: 'from-cyan-500/20 to-transparent',
                inactiveHover: 'hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]',
                iconBase: 'text-cyan-500/70'
            }
        },
        {
            id: 'EARTH', icon: AlchemicalEarth, label: 'Tierra', desc: 'Solidez y Enfoque',
            style: {
                activeBg: 'bg-emerald-900/20', activeBorder: 'border-emerald-500/60', shadow: 'shadow-[inset_0_0_30px_rgba(16,185,129,0.15)]', text: 'text-emerald-400', gradient: 'from-emerald-500/20 to-transparent',
                inactiveHover: 'hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]',
                iconBase: 'text-emerald-500/70'
            }
        },
        {
            id: 'AIR', icon: AlchemicalAir, label: 'Aire', desc: 'Claridad y Espacio',
            style: {
                activeBg: 'bg-fuchsia-900/20', activeBorder: 'border-fuchsia-500/60', shadow: 'shadow-[inset_0_0_30px_rgba(217,70,239,0.15)]', text: 'text-fuchsia-400', gradient: 'from-fuchsia-500/20 to-transparent',
                inactiveHover: 'hover:border-fuchsia-500/40 hover:text-fuchsia-400 hover:bg-fuchsia-500/5 hover:shadow-[0_0_20px_rgba(217,70,239,0.1)]',
                iconBase: 'text-fuchsia-500/70'
            }
        }
    ];

    const handleStartTechnique = (type: 'BREATH' | 'MEDITATION', techId: string) => {
        if (onNavigate) {
            playSound('transition');
            onNavigate('SANCTUARY', { type, techId });
        }
    };

    const emergencyActions = [
        { label: 'Calmarme', sub: 'Agua', element: 'WATER', techId: 'water-1', icon: AlchemicalWater, iconClass: 'text-cyan-500/80 group-hover:text-cyan-400' },
        { label: 'Activarme', sub: 'Fuego', element: 'FIRE', techId: 'fire-1', icon: AlchemicalFire, iconClass: 'text-red-500/80 group-hover:text-red-400' },
        { label: 'Concretar', sub: 'Tierra', element: 'EARTH', techId: 'earth-1', icon: AlchemicalEarth, iconClass: 'text-emerald-500/80 group-hover:text-emerald-400' },
        { label: 'Fluir', sub: 'Aire', element: 'AIR', techId: 'air-1', icon: AlchemicalAir, iconClass: 'text-fuchsia-500/80 group-hover:text-fuchsia-400' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pb-24 font-sans pt-12 relative overflow-hidden">
            {/* Zen Enso / Tao Background Pattern */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-screen">
                <svg viewBox="0 0 800 800" className="w-[150vw] sm:w-[120vw] max-w-none text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_240s_linear_infinite]">
                    {/* Concentric subtle circles simulating ripples/enso */}
                    <circle cx="400" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
                    <circle cx="400" cy="400" r="280" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
                    <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="12 24" />
                    <circle cx="400" cy="400" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M 400 100 Q 550 250 400 400 T 400 700" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                    <path d="M 100 400 Q 250 250 400 400 T 700 400" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                </svg>
            </div>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[120px] pointer-events-none" />
            <header className="sticky top-0 z-40 bg-transparent p-6 mb-4 flex items-center justify-between">
                <button onClick={onBack} className="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
                    <Sparkles size={16} className="text-amber-400 animate-pulse" />
                    <h1 className="text-xl md:text-2xl font-serif italic tracking-wider whitespace-nowrap">Laboratorio Elemental</h1>
                </div>
                <div className="flex items-center gap-2">
                    <WisdomButton color="orange" onClick={() => openWisdom('LAB')} />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 space-y-16 relative z-10">
                {/* 1. Kit de Respuesta Rápida (What do you need?) */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <ActionIcon size={14} className="text-amber-400" />
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">Respuesta de Emergencia</h2>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {emergencyActions.map((action) => (
                            <button
                                key={action.label}
                                onClick={() => handleStartTechnique('BREATH', action.techId)}
                                className={cn(
                                    "group p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center gap-4 text-center relative overflow-hidden backdrop-blur-xl",
                                    "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20",
                                    action.element === 'WATER' && "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
                                    action.element === 'FIRE' && "hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]",
                                    action.element === 'EARTH' && "hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
                                    action.element === 'AIR' && "hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                                )}
                            >
                                {/* Immersive Icon Container */}
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                                    <action.icon size={20} className={cn("transition-colors", action.iconClass)} />
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90 group-hover:text-white">{action.label}</div>
                                    <div className="text-[8px] text-white/30 uppercase tracking-widest">{action.sub}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                {/* 2. Element Selection Grid */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3 px-2">
                        <Sparkles size={14} className="text-white/30" />
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">Biblioteca de Frecuencias</h2>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4" />
                    </div>

                    <div className="grid grid-cols-4 gap-3 md:gap-4">
                        {elements.map((el) => {
                            const isSelected = selectedElement === el.id;

                            return (
                                <button
                                    key={el.id}
                                    onClick={() => {
                                        playSound('click');
                                        setSelectedElement(el.id);
                                    }}
                                    className={cn(
                                        "flex flex-col items-center justify-center py-6 md:py-8 rounded-[2rem] border transition-all duration-500 relative group overflow-hidden",
                                        isSelected
                                            ? `${el.style.activeBg} ${el.style.activeBorder} ${el.style.shadow} ${el.style.text}`
                                            : `bg-white/[0.02] border-white/5 text-white/30 ${el.style.inactiveHover}`
                                    )}
                                >
                                    {/* Active Glow Backdrop */}
                                    {isSelected && (
                                        <div className={cn("absolute inset-0 bg-gradient-to-b opacity-20 pointer-events-none", el.style.gradient)} />
                                    )}
                                    <div className="relative mb-3 md:mb-4">
                                        <el.icon className={cn(
                                            "w-8 h-8 md:w-10 md:h-10 transition-all duration-500 relative z-10",
                                            isSelected ? `scale-110 drop-shadow-[0_0_15px_currentColor] text-current` : `group-hover:scale-110 drop-shadow-none ${el.style.iconBase} ${el.style.text.replace('text-', 'group-hover:text-')}`
                                        )} />
                                    </div>
                                    <span className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.2em] relative z-10 mb-1">{el.label}</span>

                                </button>
                            );
                        })}
                    </div>

                    {/* Dedicated Frequency Toggles */}
                    <div className="pt-8 flex flex-col items-center space-y-6">
                        <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black flex items-center gap-4 w-full px-2">
                            <Sparkles size={14} className="text-white/30" />
                            <span>Activar Frecuencia</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        </div>

                        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full">
                            {elements.map((el) => {
                                const isAudioPlaying = activeAudioElement === el.id;
                                const hz = ELEMENT_FREQUENCIES[el.id as keyof typeof ELEMENT_FREQUENCIES].baseHz;

                                return (
                                    <button
                                        key={`freq-${el.id}`}
                                        onClick={() => toggleFrequency(el.id as any)}
                                        className={cn(
                                            "group relative flex flex-col items-center gap-3 transition-all duration-300",
                                            isAudioPlaying ? "opacity-100 scale-105" : "opacity-50 hover:opacity-100 hover:scale-105"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center relative transition-all duration-500",
                                            isAudioPlaying
                                                ? `${el.style.activeBg} ${el.style.activeBorder} ${el.style.shadow}`
                                                : "border-white/10 bg-white/5 group-hover:border-white/20 group-hover:bg-white/[0.08]"
                                        )}>
                                            {/* Equalizer when playing */}
                                            {isAudioPlaying ? (
                                                <div className="flex items-center gap-[2px]">
                                                    {[1.5, 3, 2, 4, 1.5].map((h, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className={cn("w-[2px] rounded-full")}
                                                            style={{ backgroundColor: ELEMENT_FREQUENCIES[el.id as keyof typeof ELEMENT_FREQUENCIES].color }}
                                                            animate={{ height: ['6px', `${h * 4}px`, '6px'] }}
                                                            transition={{ repeat: Infinity, duration: 0.6 + i * 0.15, ease: "easeInOut" }}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <el.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: ELEMENT_FREQUENCIES[el.id as keyof typeof ELEMENT_FREQUENCIES].color }} />
                                            )}

                                            {/* Glowing ring when active */}
                                            {isAudioPlaying && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full border border-current opacity-50"
                                                    style={{ color: ELEMENT_FREQUENCIES[el.id as keyof typeof ELEMENT_FREQUENCIES].color }}
                                                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0] }}
                                                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                                />
                                            )}
                                        </div>

                                        <div className="text-center flex flex-col items-center">
                                            <span
                                                className="text-[8px] md:text-[9px] uppercase font-black tracking-[0.2em] transition-colors"
                                            >
                                                {el.label}
                                            </span>
                                            <span className="text-[7px] md:text-[8px] font-mono tracking-wider text-white/30 uppercase mt-1">
                                                {hz} Hz
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedElement && (
                            <motion.div
                                key={selectedElement}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-10"
                            >
                                {/* Curated Techniques by Path */}
                                <div className="space-y-12">
                                    {availablePaths.map((path) => (
                                        <div key={path.id} className="space-y-5">
                                            <div className="flex items-center gap-4 px-2">
                                                <div className="h-[1px] w-8 bg-white/20" />
                                                <h3 className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-black">{path.name}</h3>
                                                <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Primary Breath for Path */}
                                                <button
                                                    onClick={() => handleStartTechnique('BREATH', path.breath.id)}
                                                    className="flex flex-col justify-between p-8 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent hover:from-white/[0.08] hover:border-white/20 transition-all duration-500 group relative overflow-hidden h-full min-h-[160px]"
                                                >
                                                    {/* Ambient Hover Glow */}
                                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-500" />

                                                    <div className="flex items-start justify-between relative z-10 w-full mb-4">
                                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white/40 group-hover:text-white group-hover:border-white/20 transition-all duration-300">
                                                            <Wind size={20} strokeWidth={1.5} />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); playSound('click'); setSelectedRitualInfo({ title: path.breath.label, description: path.breath.description || path.breath.copy, techniqueType: 'BREATH', elementId: selectedElement }); }}
                                                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-white/40 hover:text-white z-20"
                                                                title="Ver Detalles"
                                                            >
                                                                <Info size={14} />
                                                            </button>
                                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-white/10 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                                <Play size={12} fill="white" className="ml-0.5 text-white/80" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-left relative z-10">
                                                        <div className="text-sm font-black uppercase tracking-widest text-white/90 mb-1">{path.breath.label}</div>
                                                        <div className="text-[10px] text-white/40 italic font-light tracking-wide leading-relaxed">{path.breath.copy}</div>
                                                    </div>
                                                </button>

                                                {/* Primary Meditation/Anchor for Path */}
                                                <button
                                                    onClick={() => handleStartTechnique('MEDITATION', path.meditation.id)}
                                                    className="flex flex-col justify-between p-8 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent hover:from-white/[0.06] hover:border-white/20 transition-all duration-500 group relative overflow-hidden h-full min-h-[160px]"
                                                >
                                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-amber-900/10 transition-colors duration-500" />

                                                    <div className="flex items-start justify-between relative z-10 w-full mb-4">
                                                        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white/30 group-hover:text-amber-400 group-hover:border-amber-400/30 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300">
                                                            <Brain size={20} strokeWidth={1.5} />
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); playSound('click'); setSelectedRitualInfo({ title: path.meditation.title, description: path.meditation.description || path.meditation.copy, techniqueType: 'MEDITATION', elementId: selectedElement }); }}
                                                                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-white/40 hover:text-white z-20"
                                                                title="Ver Detalles"
                                                            >
                                                                <Info size={14} />
                                                            </button>
                                                            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-amber-500/20 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                                                                <Play size={12} fill="currentColor" className="ml-0.5 text-amber-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-left relative z-10">
                                                        <div className="text-sm font-black uppercase tracking-widest text-white/80 group-hover:text-white mb-1 transition-colors">{path.meditation.title}</div>
                                                        <div className="text-[9px] text-white/30 uppercase tracking-widest font-mono">Sintonización</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </main>

            {/* Ritual Info Modal */}
            <AnimatePresence>
                {selectedRitualInfo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedRitualInfo(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Elemental Glow based on active element */}
                            <div className={cn(
                                "absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none",
                                selectedRitualInfo.elementId === 'FIRE' && 'bg-red-500',
                                selectedRitualInfo.elementId === 'WATER' && 'bg-cyan-500',
                                selectedRitualInfo.elementId === 'EARTH' && 'bg-emerald-500',
                                selectedRitualInfo.elementId === 'AIR' && 'bg-fuchsia-500'
                            )} />

                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {selectedRitualInfo.techniqueType === 'BREATH' ? <Wind size={14} className="text-white/40" /> : <Brain size={14} className="text-white/40" />}
                                        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/40">
                                            {selectedRitualInfo.techniqueType === 'BREATH' ? 'Mecánica de Respiración' : 'Sintonización Meditativa'}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-wider">{selectedRitualInfo.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedRitualInfo(null)}
                                    className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    <X size={16} className="text-white/60" />
                                </button>
                            </div>

                            <div className="relative z-10 prose prose-invert max-w-none text-white/70 text-sm leading-relaxed font-light">
                                <p>{selectedRitualInfo.description}</p>
                            </div>

                            <div className="mt-8 relative z-10 flex justify-end">
                                <button
                                    onClick={() => setSelectedRitualInfo(null)}
                                    className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Entendido
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Custom Alchemical SVG Icons for a premium, esoteric aesthetic
const AlchemicalFire = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 4 4 20 20 20" />
    </svg>
);

const AlchemicalWater = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 20 4 4 20 4" />
    </svg>
);

const AlchemicalEarth = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 20 4 4 20 4" />
        <line x1="8" y1="9" x2="16" y2="9" />
    </svg>
);

const AlchemicalAir = (props: any) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 4 4 20 20 20" />
        <line x1="8" y1="15" x2="16" y2="15" />
    </svg>
);
