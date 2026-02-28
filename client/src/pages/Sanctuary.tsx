
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Wind, Flame, Check, Waves, Mountain, Clock, Sparkles, RotateCcw } from 'lucide-react';
import { BreathingEngine } from '../components/BreathingEngine';
import { supabase } from '../lib/supabase';
import { useProfile } from '../hooks/useProfile';
import { TempleLoading } from '../components/TempleLoading';
import { cn } from '../lib/utils';
import { useCoherence } from '../hooks/useCoherence';
import { RitualImpactView } from '../components/Sanctuary/RitualImpactView';
import { RITUAL_LIBRARY } from '../constants/ritualContent';
import type { ElementRitual } from '../constants/ritualContent';
import { useSound } from '../hooks/useSound';
import { useFrequency, ELEMENT_FREQUENCIES } from '../hooks/useFrequency';

const ELEMENT_THEMES = {
    FIRE: {
        title: 'Forja Elemental',
        subtitle: 'Sintonía de Fuego',
        color: 'text-orange-400',
        glow: 'shadow-[0_0_40px_rgba(249,115,22,0.3)]',
        bg: 'bg-orange-950/40',
        border: 'border-orange-500/50 hover:bg-orange-500/10'
    },
    WATER: {
        title: 'Inmersión Zen',
        subtitle: 'Sintonía de Agua',
        color: 'text-cyan-400',
        glow: 'shadow-[0_0_40px_rgba(6,182,212,0.3)]',
        bg: 'bg-cyan-950/40',
        border: 'border-cyan-500/50 hover:bg-cyan-500/10'
    },
    EARTH: {
        title: 'Enraizamiento Activo',
        subtitle: 'Frecuencia de Tierra',
        color: 'text-emerald-400',
        glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]',
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/50 hover:bg-emerald-500/10'
    },
    AIR: {
        title: 'Expansión Perceptiva',
        subtitle: 'Respiración de Aire',
        color: 'text-fuchsia-400',
        glow: 'shadow-[0_0_40px_rgba(217,70,239,0.3)]',
        bg: 'bg-fuchsia-950/40',
        border: 'border-fuchsia-500/50 hover:bg-fuchsia-500/10'
    }
};

interface SanctuaryProps {
    onBack: () => void;
    initialRitual?: {
        type: 'BREATH' | 'MEDITATION';
        techId: string;
    };
}

export const Sanctuary: React.FC<SanctuaryProps> = ({ onBack, initialRitual }) => {
    const { profile, refreshProfile } = useProfile();
    const { logAction } = useCoherence();
    const { playSound } = useSound();
    const { activeElement: activeAudioElement, toggleFrequency } = useFrequency();
    const [viewMode, setViewMode] = useState<'CHECKIN' | 'CONFIG' | 'BREATHWORK' | 'MEDITATION' | 'ANCHOR' | 'CLOSURE'>('CHECKIN');
    const [saving, setSaving] = useState(false);
    const [impactData, setImpactData] = useState<{ delta: number, newScore: number } | null>(null);
    const [isStarting, setIsStarting] = useState(false);

    // v9.7 Ritual State Machine
    const [ritualState, setRitualState] = useState<{
        element: 'WATER' | 'FIRE' | 'EARTH' | 'AIR' | null;
        selectedPathId: string | null;
        need: string;
        techniqueBreath: string;
        techniqueMeditation: string;
        startTime?: number;
    }>({
        element: null,
        selectedPathId: null,
        need: '',
        techniqueBreath: '',
        techniqueMeditation: '',
    });

    const [activeIntention, setActiveIntention] = useState<string | null>(null);
    const [includeIntention, setIncludeIntention] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);

    // Handling direct jump from Elemental Lab (Deep Linking)
    useEffect(() => {
        if (initialRitual) {
            console.log("🕯️ Sanctuary: Deep Link Ritual detected:", initialRitual);

            // Derive element from techId prefix (fire-, water-, earth-, air-)
            let detectedElement: 'WATER' | 'FIRE' | 'EARTH' | 'AIR' = (profile?.astrology?.sunSignElement?.toUpperCase() || 'WATER') as any;

            if (initialRitual.techId.startsWith('fire')) detectedElement = 'FIRE';
            else if (initialRitual.techId.startsWith('water')) detectedElement = 'WATER';
            else if (initialRitual.techId.startsWith('earth')) detectedElement = 'EARTH';
            else if (initialRitual.techId.startsWith('air')) detectedElement = 'AIR';

            // Find matching path in library
            const path = RITUAL_LIBRARY[detectedElement].find(p =>
                p.breath.id === initialRitual.techId ||
                p.meditation.id === initialRitual.techId ||
                p.anchor.id === initialRitual.techId
            ) || RITUAL_LIBRARY[detectedElement][0];

            setRitualState(prev => ({
                ...prev,
                element: detectedElement,
                selectedPathId: path.id,
                techniqueBreath: initialRitual.type === 'BREATH' ? initialRitual.techId : '',
                techniqueMeditation: initialRitual.type === 'MEDITATION' ? initialRitual.techId : '',
                need: path.name // Use the path name (e.g., 'Manual del Arquitecto') as the need
            }));

            setViewMode('CONFIG');
        }
    }, [initialRitual, profile?.astrology?.sunSignElement]);

    // Fetch Last Intention for Config Step
    useEffect(() => {
        const fetchIntention = async () => {
            if (!profile?.id) return;
            const { data } = await supabase
                .from('intentions')
                .select('intention_text')
                .eq('user_id', profile.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (data) setActiveIntention(data.intention_text);
        };
        fetchIntention();
    }, [profile?.id]);

    // Global Ritual Timer
    useEffect(() => {
        let interval: any;
        if (timerActive) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // --- PHASE 1: CHECK-IN (NEEDS) ---
    const handleSelectNeed = (element: 'WATER' | 'FIRE' | 'EARTH' | 'AIR') => {
        let need = '';

        switch (element) {
            case 'WATER': // Calm
                need = 'Calmarme';
                break;
            case 'FIRE': // Energy
                need = 'Activarme';
                break;
            case 'EARTH': // Grounding
                need = 'Concretar';
                break;
            case 'AIR': // Flow
                need = 'Fluir';
                break;
        }

        setRitualState(prev => ({
            ...prev,
            element,
            need
        }));
        setViewMode('CONFIG');
    };

    // --- PHASE 2: CONFIG ---
    const startRitual = () => {
        setRitualState(prev => ({ ...prev, startTime: Date.now() }));
        setElapsedTime(0);
        setTimerActive(true);

        // Check if we requested a specific ritual type via deep link
        if (initialRitual?.type === 'MEDITATION') {
            setViewMode('MEDITATION');
        } else {
            setViewMode('BREATHWORK');
        }
    };

    const handleStartRitualWithAnimation = () => {
        setIsStarting(true);
        playSound('transition');
        setTimeout(() => {
            setIsStarting(false);
            startRitual();
        }, 1500);
    };

    // --- PHASE 3: TRANSITIONS ---
    const finishBreathwork = () => {
        setViewMode('MEDITATION');
    };

    const finishMeditation = () => {
        setViewMode('ANCHOR');
        // Anchor phase is usually a short 2m integration with a specific copy
        // We'll use a timer for this or a manual "Continue"
    };

    const finishAnchor = () => {
        setTimerActive(false);
        setViewMode('CLOSURE');
    };

    // --- PHASE 4: AUTOMATION ---
    // Helper to get active path
    const getActivePath = (): ElementRitual | null => {
        if (!ritualState.element) return null;
        return RITUAL_LIBRARY[ritualState.element].find(p => p.id === ritualState.selectedPathId) || RITUAL_LIBRARY[ritualState.element][0];
    };

    // Handle Auto-transitions for Meditation and Anchor
    useEffect(() => {
        const currentRitual = getActivePath();
        if (!timerActive || !currentRitual) return;

        // Auto-transition Meditation -> Anchor (after 2m breath + 3m meditation = 5m total)
        if (viewMode === 'MEDITATION' && elapsedTime >= (currentRitual.breath.durationSeconds + currentRitual.meditation.durationSeconds)) {
            finishMeditation();
        }

        // Auto-transition Anchor -> Closure (after 2m + 3m + 2m = 7m total)
        if (viewMode === 'ANCHOR' && elapsedTime >= (currentRitual.breath.durationSeconds + currentRitual.meditation.durationSeconds + currentRitual.anchor.durationSeconds)) {
            finishAnchor();
        }
    }, [elapsedTime, timerActive, viewMode, ritualState.element, ritualState.selectedPathId]);

    const handleExit = () => {
        if (window.confirm("¿Detener el ritual sagrado? El progreso no se guardará.")) {
            setTimerActive(false);
            setRitualState({
                element: null,
                selectedPathId: null,
                need: '',
                techniqueBreath: '',
                techniqueMeditation: ''
            });
            setViewMode('CHECKIN');
            onBack();
        }
    };

    // --- PHASE 4: CLOSURE & SAVE ---
    const handleSaveSession = async (feedback: 'CALM' | 'NEUTRAL' | 'ENERGIZED') => {
        setSaving(true);
        try {
            if (!profile || !ritualState.element) return;

            // 1. Calculate Regulation Delta (Dynamic Score)
            let timeFactor = 0;
            if (elapsedTime < 180) timeFactor = 1;
            else if (elapsedTime < 420) timeFactor = 3;
            else if (elapsedTime < 720) timeFactor = 5;
            else timeFactor = 7;

            let stateFactor = 0;
            if (feedback === 'CALM') stateFactor = 2;       // Regulated
            if (feedback === 'NEUTRAL') stateFactor = 0;    // Same
            if (feedback === 'ENERGIZED') stateFactor = -2; // Overcharged / Anxious (Contextual)

            const regulationDelta = timeFactor + stateFactor;

            // ...

            // 2. Save to sanctuary_sessions (New Logic)
            await supabase.from('sanctuary_sessions').insert({
                user_id: profile.id,
                element: ritualState.element,
                duration_seconds: elapsedTime,
                initial_state: ritualState.need,
                final_state: feedback, // 'CALM' | 'NEUTRAL' | 'ENERGIZED'
                regulation_delta: regulationDelta,
                completed_at: new Date().toISOString()
            });

            // LOG COHERENCE (Real Engine)
            // Determine if full or short (threshold 3 mins for "full")
            const actionType = elapsedTime > 180 ? 'SANCTUARY_RITUAL' : 'SANCTUARY_RITUAL_SHORT';
            const logResult = await logAction(actionType);


            // Update Anchor (Legacy/Compatibility)
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);
            await supabase.from('daily_anchor').upsert({
                user_id: profile.id,
                anchor_text: `Ciclo ${ritualState.element} Completado (+${regulationDelta}%)`,
                type: 'MEDITATION',
                expires_at: expiresAt.toISOString(),
                created_at: new Date().toISOString()
            });

            await refreshProfile();
            setSaving(false);

            // Show Impact View instead of closing appropriately
            if (logResult) {
                setImpactData({ delta: logResult.delta, newScore: logResult.newScore });
            } else {
                onBack();
            }

        } catch (e) {
            console.error(e);
            setSaving(false);
        }
    };

    // Helper for Element Colors
    const getElementColor = (el: string | null) => {
        if (el === 'WATER') return 'from-cyan-500 to-blue-600';
        if (el === 'FIRE') return 'from-amber-500 to-red-600';
        if (el === 'EARTH') return 'from-emerald-500 to-green-700';
        if (el === 'AIR') return 'from-violet-400 to-fuchsia-500';
        return 'from-slate-800 to-slate-900';
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0b] flex flex-col overflow-hidden"
        >
            {/* Dynamic Background based on Element */}
            <div className={cn(
                "absolute inset-0 opacity-20 transition-colors duration-1000 bg-gradient-to-b",
                ritualState.element ? getElementColor(ritualState.element) : "to-black"
            )} />
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0a1e]/80 to-black opacity-90" />

            {/* TOP BAR NAVIGATION */}
            <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30">
                {viewMode === 'CHECKIN' ? (
                    <button onClick={onBack} className="p-2 text-white/50 hover:text-white"><ArrowLeft size={24} /></button>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* Only show Back during Config, otherwise Exit */}
                        {viewMode === 'CONFIG' && <button onClick={() => setViewMode('CHECKIN')} className="p-2 text-white/50 hover:text-white"><ArrowLeft size={24} /></button>}

                        {(viewMode === 'BREATHWORK' || viewMode === 'MEDITATION') && (
                            <>
                                <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 animate-pulse hidden sm:flex items-center gap-2">
                                    <Clock size={12} className="text-white/50" />
                                    <span className="font-mono text-xs text-white/80 tracking-widest">{formatTime(elapsedTime)}</span>
                                </div>
                                {ritualState.element && (
                                    <button
                                        onClick={() => toggleFrequency(ritualState.element as any)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full border text-[10px] sm:text-xs tracking-widest uppercase transition-all flex items-center gap-2",
                                            activeAudioElement === ritualState.element
                                                ? `bg-white/10 border-white/40 text-white ${ELEMENT_THEMES[ritualState.element].glow}`
                                                : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
                                        )}
                                    >
                                        <span className="font-mono">{ELEMENT_FREQUENCIES[ritualState.element as keyof typeof ELEMENT_FREQUENCIES].baseHz}Hz</span>
                                        {activeAudioElement === ritualState.element ? (
                                            <span className="text-green-400 font-bold">ON</span>
                                        ) : (
                                            <span>OFF</span>
                                        )}
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                )}

                <span className="text-[10px] uppercase tracking-[0.4em] text-white/30 hidden md:block">
                    {viewMode === 'CHECKIN' ? 'El Santuario' : `Ritual de ${ritualState.element || 'Iniciación'}`}
                </span>

                {viewMode !== 'CHECKIN' && viewMode !== 'CLOSURE' && (
                    <button onClick={handleExit} className="p-2 text-white/30 hover:text-white transition-colors">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10">X</div>
                    </button>
                )}
                {(viewMode === 'CHECKIN' || viewMode === 'CLOSURE') && <div className="w-8" />}
            </header>

            <AnimatePresence mode="wait">
                {/* 1. CHECK-IN SCANNER (Reduced to Needs) */}
                {viewMode === 'CHECKIN' && (
                    <motion.div
                        key="checkin"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 w-full flex flex-col items-center justify-center p-6 z-20"
                    >
                        <div className="w-full max-w-5xl text-center">
                            <h1 className="text-3xl md:text-5xl font-serif text-white/90 italic mb-6">¿Qué necesitas ahora?</h1>
                            <p className="text-white/40 text-sm uppercase tracking-widest mb-16">Selecciona tu propósito ritual</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* WATER */}
                                <NeedCard
                                    icon={Waves} title="Necesito Calmarme" sub="Agua - Regulación Emocional"
                                    color="text-cyan-200" borderColor="hover:border-cyan-500/50"
                                    onClick={() => handleSelectNeed('WATER')}
                                />
                                {/* FIRE */}
                                <NeedCard
                                    icon={Flame} title="Necesito Activarme" sub="Fuego - Energía y Voluntad"
                                    color="text-amber-200" borderColor="hover:border-amber-500/50"
                                    onClick={() => handleSelectNeed('FIRE')}
                                />
                                {/* EARTH */}
                                <NeedCard
                                    icon={Mountain} title="Necesito Concretar" sub="Tierra - Enfoque y Materialización"
                                    color="text-emerald-200" borderColor="hover:border-emerald-500/50"
                                    onClick={() => handleSelectNeed('EARTH')}
                                />
                                {/* AIR */}
                                <NeedCard
                                    icon={Wind} title="Necesito Fluir" sub="Aire - Soltar y Perspectiva"
                                    color="text-violet-200" borderColor="hover:border-violet-500/50"
                                    onClick={() => handleSelectNeed('AIR')}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. CONFIGURATION STEP */}
                {viewMode === 'CONFIG' && ritualState.element && (
                    <motion.div
                        key="config"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, scale: isStarting ? 1.05 : 1, filter: isStarting ? 'blur(10px)' : 'blur(0px)' }} exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: isStarting ? 1.5 : 0.4 }}
                        className="flex-1 w-full flex flex-col items-center justify-center p-6 z-20 text-center relative"
                    >
                        {isStarting && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 2 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
                            >
                                <div className={cn("w-[400px] h-[400px] rounded-full blur-[80px]", ELEMENT_THEMES[ritualState.element].bg)} />
                            </motion.div>
                        )}

                        <div className={cn("max-w-md w-full space-y-12 transition-all duration-1000", isStarting ? "opacity-0" : "opacity-100")}>
                            <div>
                                <h2 className={cn("text-3xl font-serif italic mb-2", ELEMENT_THEMES[ritualState.element].color)}>
                                    {ELEMENT_THEMES[ritualState.element].title}
                                </h2>
                                <p className="text-white/40 text-sm uppercase tracking-widest">
                                    {ELEMENT_THEMES[ritualState.element].subtitle} • {ritualState.need}
                                </p>
                            </div>

                            {activeIntention && (
                                <div
                                    onClick={() => setIncludeIntention(!includeIntention)}
                                    className={cn(
                                        "p-6 rounded-xl border transition-all cursor-pointer flex items-center gap-4 text-left group select-none",
                                        includeIntention ? "bg-white/10 border-white/30" : "bg-white/5 border-white/5 hover:border-white/20"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                                        includeIntention ? "bg-white text-black border-white" : "border-white/30"
                                    )}>
                                        {includeIntention && <Check size={14} />}
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase tracking-widest text-white/50 mb-1">Integrar Intención Activa</div>
                                        <div className="text-white/90 font-serif italic line-clamp-2">"{activeIntention}"</div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleStartRitualWithAnimation}
                                className={cn(
                                    "w-full py-5 font-serif italic text-xl rounded-[2rem] transition-all duration-500",
                                    "bg-white/5 border text-white backdrop-blur-md",
                                    ELEMENT_THEMES[ritualState.element].border,
                                    ELEMENT_THEMES[ritualState.element].color,
                                    isStarting ? "scale-90 opacity-0" : `hover:scale-105 ${ELEMENT_THEMES[ritualState.element].glow}`
                                )}
                            >
                                Iniciar Ciclo
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 3. BREATHWORK PHASE */}
                {viewMode === 'BREATHWORK' && ritualState.element && (
                    <motion.div
                        key="breathwork"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center z-20 relative w-full"
                    >
                        {getActivePath() && (
                            <BreathingEngine
                                technique={getActivePath()!.breath.technique}
                                instruction={getActivePath()!.breath.copy}
                                onComplete={finishBreathwork}
                            />
                        )}

                        <div className="absolute bottom-12 w-full flex justify-center">
                            <button onClick={finishBreathwork} className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/50 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                                Saltar Respiración
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 4. MEDITATION PHASE */}
                {viewMode === 'MEDITATION' && ritualState.element && (
                    <motion.div
                        key="meditation"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center z-20 relative px-6 text-center w-full"
                    >
                        {/* Visualization */}
                        <div className="relative mb-16 h-64 w-full max-w-sm mx-auto flex items-center justify-center">
                            {ritualState.element === 'WATER' && <WaterMeditationVis />}
                            {ritualState.element === 'FIRE' && <FireMeditationVis />}
                            {ritualState.element === 'EARTH' && <EarthMeditationVis />}
                            {ritualState.element === 'AIR' && <AirMeditationVis />}
                        </div>

                        {getActivePath() && (
                            <>
                                <h2 className="text-2xl font-serif text-white/90 italic mb-4">
                                    {getActivePath()!.meditation.title}
                                </h2>
                                <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed font-light italic">
                                    {getActivePath()!.meditation.copy}
                                </p>
                            </>
                        )}

                        <button
                            onClick={finishMeditation}
                            className="absolute bottom-12 px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 text-white/50 hover:text-white transition-all text-xs uppercase tracking-widest"
                        >
                            Siguiente Paso
                        </button>
                    </motion.div>
                )}

                {/* 5. ANCHOR PHASE */}
                {viewMode === 'ANCHOR' && ritualState.element && (
                    <motion.div
                        key="anchor"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col items-center justify-center z-20 relative px-6 text-center w-full"
                    >
                        <div className="relative mb-16">
                            <motion.div
                                className="w-48 h-48 rounded-full border border-red-500/20 flex items-center justify-center relative backdrop-blur-sm shadow-[0_0_50px_rgba(239,68,68,0.1)]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Check size={40} className="text-red-500/40" />
                            </motion.div>
                        </div>

                        {getActivePath() && (
                            <>
                                <h2 className="text-2xl font-serif text-white/90 italic mb-4">
                                    {getActivePath()!.anchor.title}
                                </h2>
                                <p className="text-white/80 text-2xl max-w-xl mx-auto leading-relaxed font-serif italic">
                                    "{getActivePath()!.anchor.copy}"
                                </p>
                            </>
                        )}

                        <button
                            onClick={finishAnchor}
                            className="absolute bottom-12 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white transition-all text-xs uppercase tracking-widest font-black"
                        >
                            Sellar Ritual
                        </button>
                    </motion.div>
                )}

                {/* 5. CLOSURE PHASE */}
                {viewMode === 'CLOSURE' && (
                    <motion.div
                        key="closure"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="flex-1 flex flex-col items-center justify-center z-30 p-6 text-center w-full"
                    >
                        <h2 className="text-4xl font-serif text-white italic mb-2">Ciclo Completado</h2>
                        <p className="text-white/40 text-sm uppercase tracking-widest mb-12 flex items-center gap-2 justify-center">
                            <Clock size={14} /> Tiempo Total: <span className="text-white">{formatTime(elapsedTime)}</span>
                        </p>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 w-full max-w-md backdrop-blur-md">
                            <p className="text-white/80 mb-8 border-b border-white/5 pb-6">¿Lograste tu objetivo con esta práctica?</p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleSaveSession('CALM')}
                                    className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-emerald-200 hover:text-emerald-100 transition-colors flex items-center justify-center gap-3 group"
                                >
                                    <Sparkles size={18} className="group-hover:scale-110 transition-transform" /> Sí, logré sintonizar
                                </button>
                                <button
                                    onClick={() => handleSaveSession('NEUTRAL')}
                                    className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-amber-200 hover:text-amber-100 transition-colors flex items-center justify-center gap-3 group"
                                >
                                    <RotateCcw size={18} className="group-hover:-rotate-90 transition-transform" /> No, necesito otra técnica
                                </button>
                            </div>
                        </div>

                        {saving && <TempleLoading variant="text" text="Guardando en el éter..." className="mt-8" />}
                    </motion.div>
                )}

            </AnimatePresence>


            {/* IMPACT OVERLAY */}
            <AnimatePresence>
                {impactData && (
                    <RitualImpactView
                        delta={impactData.delta}
                        newScore={impactData.newScore}
                        element={ritualState.element}
                        onClose={onBack}
                    />
                )}
            </AnimatePresence>
        </motion.div >
    );
};

// Sub-component for Needs
const NeedCard = ({ icon: Icon, title, sub, color, borderColor, onClick }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "group p-8 rounded-2xl border border-white/5 bg-white/[0.02] transition-all flex flex-col items-center gap-4 relative overflow-hidden h-full justify-center",
            "hover:bg-white/[0.05]",
            borderColor
        )}
    >
        <div className={cn("p-4 rounded-full bg-white/5 group-hover:scale-110 transition-transform mb-2", color)}>
            <Icon size={32} />
        </div>
        <div className="text-center relative z-10 space-y-2">
            <span className={cn("block text-xl font-serif leading-tight group-hover:text-white transition-colors", color.replace('text-', 'text-white/90 '))}>{title}</span>
            <span className="block text-[10px] text-white/40 uppercase tracking-widest">{sub}</span>
        </div>
    </button>
);

// --- MEDITATION VISUALIZATIONS ---

const WaterMeditationVis = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Base Glow */}
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl mix-blend-screen" />

            {/* Ripples */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 border border-cyan-400/30 rounded-full"
                    animate={{
                        scale: [1, 2.5],
                        opacity: [0.8, 0],
                        borderWidth: ["2px", "1px"]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: i * 2.6,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Central Drop */}
            <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-b from-cyan-300 to-blue-600 shadow-[0_0_30px_rgba(6,182,212,0.8)] z-10"
                animate={{
                    y: [0, -15, 0],
                    scale: [1, 0.95, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Floating Particles */}
            <motion.div
                className="absolute w-2 h-2 rounded-full bg-cyan-200/60"
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

const FireMeditationVis = () => {
    return (
        <div className="relative w-64 h-64 flex items-end justify-center pb-8">
            <div className="absolute top-1/2 left-1/2 -transform-x-1/2 -transform-y-1/2 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl mix-blend-screen" />

            {/* Flame Base */}
            <motion.div
                className="w-16 h-16 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full blur-[2px] shadow-[0_0_40px_rgba(249,115,22,0.8)]"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} // Triangle approximation
                animate={{
                    scaleY: [1, 1.4, 1.1, 1.5, 1],
                    scaleX: [1, 0.9, 1.1, 0.85, 1],
                    y: [0, -10, 0, -15, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Ascending Sparks */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full blur-[1px]"
                    initial={{ y: 0, x: (Math.random() - 0.5) * 40, opacity: 0 }}
                    animate={{
                        y: -150 - Math.random() * 50,
                        x: (Math.random() - 0.5) * 80,
                        opacity: [0, 1, 0],
                        scale: [1, 0.5]
                    }}
                    transition={{
                        duration: 1.5 + Math.random() * 1.5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    );
};

const EarthMeditationVis = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl mix-blend-screen" />

            {/* Grounding Hexagons */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border-2 border-emerald-500/40"
                    style={{
                        width: '120px',
                        height: '138px', // Approx hex ratio
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                    animate={{
                        scale: [1 + (i * 0.4), 1 + (i * 0.4) + 0.1, 1 + (i * 0.4)],
                        opacity: [0.8 - (i * 0.2), 0.5 - (i * 0.1), 0.8 - (i * 0.2)],
                        rotate: i % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Solid Core */}
            <motion.div
                className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-800 shadow-[0_0_30px_rgba(16,185,129,0.5)] z-10"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                animate={{
                    scale: [1, 1.05, 1],
                    filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
};

const AirMeditationVis = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-fuchsia-500/10 rounded-full blur-3xl mix-blend-screen" />

            {/* Breathing Rings */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-fuchsia-300/30"
                    style={{
                        width: `${100 + (i * 50)}px`,
                        height: `${100 + (i * 50)}px`,
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 10 + (i * 2), // Different breathing rates
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Ethereal Core */}
            <motion.div
                className="w-12 h-12 rounded-full border border-fuchsia-200 bg-fuchsia-100/10 backdrop-blur-md shadow-[0_0_30px_rgba(217,70,239,0.8)] z-10 flex items-center justify-center"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-2 h-2 rounded-full bg-white blur-[1px]" />
            </motion.div>
        </div>
    );
};
