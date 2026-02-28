import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Shield, Lock, Leaf, Flame, Moon, Brain, Heart, Trophy, RotateCcw } from 'lucide-react';
import { useProtocol21 } from '../hooks/useProtocol21';
import { cn } from '../lib/utils';
import { TempleLoading } from '../components/TempleLoading';
import { useCoherence } from '../hooks/useCoherence';
import { useProfile } from '../contexts/ProfileContext';
import { INTENT_CONFIGS } from '../lib/intentions';

interface ProtocolDetailViewProps {
    onBack: () => void;
}

// STITCH: Rune Toggle Component (Geometric/Mystic)
// STITCH: Hexagon Toggle Component (Gamification)
const HexagonToggle = ({ checked, onClick }: { checked: boolean, onClick: () => void }) => {
    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={cn(
                "relative flex-shrink-0 w-14 h-14 flex items-center justify-center transition-all duration-300 cursor-pointer group",
                checked ? "scale-100" : "scale-100 opacity-80 hover:opacity-100 hover:scale-110"
            )}
        >
            {/* Hexagon SVG */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                <path
                    d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                    fill="currentColor"
                    fillOpacity={checked ? 1 : 0}
                    stroke="currentColor"
                    strokeWidth={checked ? 0 : 2}
                    className={cn(
                        "transition-all duration-300 ease-out",
                        checked ? "text-cyan-500" : "text-zinc-700 group-hover:text-zinc-500"
                    )}
                />
            </svg>

            {/* Content / Icon inside */}
            {checked && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10 text-black font-bold"
                >
                    <div className="w-2 h-2 bg-black rounded-full shadow-white" />
                </motion.div>
            )}

            {/* Active Glow */}
            <div className={cn(
                "absolute inset-0 transition-opacity duration-300 rounded-full blur-xl pointer-events-none",
                checked ? "opacity-40 shadow-[0_0_30px_rgba(6,182,212,0.8)] bg-cyan-500/20" : "opacity-0"
            )} />
        </div>
    );
};

export const ProtocolDetailView: React.FC<ProtocolDetailViewProps> = ({ onBack }) => {
    const { activeProtocol, dailyLogs, loading, completeDay, resetProtocol } = useProtocol21();
    const { logAction } = useCoherence();
    const [completing, setCompleting] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showDailySuccess, setShowDailySuccess] = useState(false); // New daily success state

    // State for the 5 Pillars (Daily Checklist)
    // We initialize this from localStorage to prevent loss on refresh, or default to false
    const getStoredChecks = (day: number) => {
        try {
            const stored = localStorage.getItem(`protocol_checks_day_${day}`);
            return stored ? JSON.parse(stored) : {
                nutrition: false,
                movement: false,
                sleep: false,
                connection: false,
                gratitude: false
            };
        } catch (e) {
            return {
                nutrition: false,
                movement: false,
                sleep: false,
                connection: false,
                gratitude: false
            };
        }
    };

    const [checks, setChecks] = useState<{
        nutrition: boolean;
        movement: boolean;
        sleep: boolean;
        connection: boolean;
        gratitude: boolean;
    }>({
        nutrition: false,
        movement: false,
        sleep: false,
        connection: false,
        gratitude: false
    });

    // Update checks when activeProtocol loads
    useEffect(() => {
        if (activeProtocol) {
            setChecks(getStoredChecks(activeProtocol.current_day));
        }
    }, [activeProtocol]);

    // Save to local storage on change
    useEffect(() => {
        if (activeProtocol) {
            localStorage.setItem(`protocol_checks_day_${activeProtocol.current_day}`, JSON.stringify(checks));
        }
    }, [checks, activeProtocol]);


    const { profile } = useProfile();
    const currentIntent = profile?.dominant_intent || 'none';
    const intentConfig = INTENT_CONFIGS[currentIntent];

    const RAW_PILLARS = [
        {
            id: 'nutrition',
            icon: Leaf,
            title: 'Alimentación & Hidratación',
            desc: 'Tu cuerpo es el vehículo del alma. Una hidratación óptima y alimentos vivos elevan tu frecuencia vibratoria.',
            baseColor: 'emerald'
        },
        {
            id: 'movement', // Fixed ID
            icon: Flame,
            title: 'Movimiento Alquímico',
            desc: 'El movimiento transmuta la energía estancada. Activa tu sistema para sostener frecuencias más altas.',
            baseColor: 'orange'
        },
        {
            id: 'sleep',
            icon: Moon,
            title: 'Sueño Reparador',
            desc: 'Un descanso profundo es vital para integrar la sabiduría del día y despertar con claridad mental.',
            baseColor: 'indigo'
        },
        {
            id: 'connection',
            icon: Brain,
            title: 'Conexión Interior (20min)',
            desc: 'El puente entre lo visible y lo invisible. Silencio y respiración para alinearte con tu propósito.',
            baseColor: 'violet'
        },
        {
            id: 'gratitude', // Fixed ID
            icon: Heart,
            title: 'Ritual de Gratitud',
            desc: 'La gratitud es la frecuencia de la recepción. Visualiza tu éxito y agradece lo que ya tienes.',
            baseColor: 'rose'
        }
    ];

    // DYNAMIC REORDERING BASED ON INTENTION
    const PILLARS = React.useMemo(() => {
        if (currentIntent === 'none') return RAW_PILLARS;

        const highPriorityIds = intentConfig.highPriority;
        const sorted = [...RAW_PILLARS].sort((a, b) => {
            const aIndex = highPriorityIds.indexOf(a.id);
            const bIndex = highPriorityIds.indexOf(b.id);

            if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
            if (aIndex !== -1) return -1;
            if (bIndex !== -1) return 1;
            return 0;
        });
        return sorted;
    }, [currentIntent]);

    const allChecked = Object.values(checks).every(Boolean);



    const handleCheck = (id: string) => {
        // Prevent interaction if day is already logged/completed in DB
        const todayLog = dailyLogs.find(l => l.day_number === activeProtocol?.current_day);
        if (todayLog) return;

        const newState = !checks[id as keyof typeof checks];
        setChecks(prev => ({ ...prev, [id]: newState }));

        // Log "Protocol Item" if checking (not unchecking)
        if (newState) {
            console.log("⚡ Logging Coherence: PROTOCOL_ITEM");
            logAction('PROTOCOL_ITEM');
        }
    };

    const handleCompleteDay = async () => {
        if (!activeProtocol || !allChecked) return;

        setCompleting(true);
        try {
            // Save checks as notes generic JSON string if needed, or structured
            const notes = JSON.stringify(checks);
            const result = await completeDay(activeProtocol.current_day, notes);

            // LOG COHERENCE SUCCESS (Bonus +3)
            await logAction('PROTOCOL_DAY_COMPLETE');

            // SHOW NEON REWARD
            setShowDailySuccess(true);

            // Wait for animation before checking final completion
            setTimeout(() => {
                setShowDailySuccess(false);
                if (result && result.status === 'completed') {
                    setShowCelebration(true);
                } else {
                    // Clear checks for the new day.
                    setChecks({
                        nutrition: false,
                        movement: false,
                        sleep: false,
                        connection: false,
                        gratitude: false
                    });
                    // Clear new day storage
                    localStorage.removeItem(`protocol_checks_day_${result.current_day}`);
                }
            }, 3000);

        } catch (e) {
            // ...
            console.error(e);
            alert("Error al guardar progreso. Intenta de nuevo.");
        } finally {
            setCompleting(false);
        }
    };

    // RESET HANDLER
    const handleReset = async () => {
        if (confirm("¿Deseas reiniciar el protocolo desde el Día 1? Todo el progreso actual se borrará.")) {
            // Call hook reset
            if (resetProtocol) {
                await resetProtocol();
                setChecks({
                    nutrition: false,
                    movement: false,
                    sleep: false,
                    connection: false,
                    gratitude: false
                });
            }
        }
    };

    if (loading) return <TempleLoading text="Sincronizando Protocolo..." />;

    if (!activeProtocol) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p>No hay protocolo activo. Inicia uno desde el Dashboard.</p>
                <button onClick={onBack} className="ml-4 underline">Volver</button>
            </div>
        );
    }

    const currentDay = activeProtocol.current_day;
    const isDayCompletedRaw = dailyLogs.some(l => l.day_number === currentDay);
    const days = Array.from({ length: 21 }, (_, i) => i + 1);

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white pb-24 font-sans selection:bg-cyan-500/30">

            {/* DAILY SUCCESS OVERLAY (NEON REWARD) */}
            <AnimatePresence>
                {showDailySuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-cyan-500 blur-[80px] opacity-40 animate-pulse" />
                            <Shield size={120} className="text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]" fill="currentColor" fillOpacity={0.2} />
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}
                                className="absolute -bottom-2 -right-2 bg-white rounded-full p-2"
                            >
                                <Check size={40} className="text-black" strokeWidth={4} />
                            </motion.div>
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 text-3xl md:text-5xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-white to-cyan-100 text-center drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        >
                            ¡FRECUENCIA ELEVADA!
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-4 text-cyan-400 uppercase tracking-[0.3em] font-bold text-sm"
                        >
                            Día {currentDay} Completado
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FINAL CELEBRATION OVERLAY */}
            <AnimatePresence>
                {showCelebration && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md"
                    >
                        <Trophy size={64} className="text-yellow-400 mb-6 animate-bounce" />
                        <h2 className="text-4xl font-serif italic text-yellow-200 mb-2">¡Misión Cumplida!</h2>
                        <p className="text-white/60 uppercase tracking-widest text-sm">Has completado el Protocolo 21</p>
                        <button onClick={onBack} className="mt-8 px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
                            Volver al Templo
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HEADER */}
            <header className="sticky top-0 z-40 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <button onClick={onBack} className="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                                <ArrowLeft size={24} />
                            </button>
                            <div>
                                <h1 className="text-xl font-serif italic">Protocolo 21</h1>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                                    {activeProtocol.status === 'completed' ? 'Finalizado' : `Día ${currentDay} de 21`}
                                </p>
                            </div>
                        </div>

                        {/* RESET BUTTON */}
                        <button
                            onClick={handleReset}
                            className="text-[10px] uppercase tracking-wider text-white/30 hover:text-red-400 flex items-center gap-1 transition-colors"
                        >
                            <RotateCcw size={12} />
                            Reiniciar
                        </button>
                    </div>

                    {/* PROGRESS BAR (ORBS) */}
                    <div className="flex items-center justify-between relative px-2">
                        {/* Line connecting orbs */}
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -z-10" />

                        <div className="flex justify-between w-full">
                            {days.map((day) => {
                                const isPast = day < currentDay;
                                const isCurrent = day === currentDay;
                                const isLogged = dailyLogs.some(l => l.day_number === day);

                                return (
                                    <div key={day} className="relative flex flex-col items-center group">
                                        <div className={cn(
                                            "w-3 h-3 md:w-4 md:h-4 rounded-full border transition-all duration-500",
                                            (isPast || isLogged) ? "bg-cyan-500 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" :
                                                isCurrent ? "bg-white border-white animate-pulse scale-125 shadow-[0_0_15px_rgba(255,255,255,0.8)]" :
                                                    "bg-[#0a0a0b] border-white/10"
                                        )}>
                                            {(isPast || isLogged) && <Check size={8} className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENT BODY */}
            <main className="max-w-3xl mx-auto px-6 py-12 space-y-8">

                <div className="text-center space-y-2 mb-12">
                    <h2 className="text-3xl md:text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-400">
                        {isDayCompletedRaw ? "Día Completado" : "Los 5 Pilares de Hoy"}
                    </h2>
                    <p className="text-white/40 text-sm max-w-lg mx-auto leading-relaxed">
                        {isDayCompletedRaw
                            ? "Has integrado estas frecuencias hoy. Descansa y prepárate para mañana."
                            : "Marca cada pilar una vez que lo hayas completado conscientemente."}
                    </p>
                </div>

                {/* 5 CARDS GRID */}
                <div className="grid gap-6">
                    {PILLARS.map((pillar) => {
                        const isChecked = checks[pillar.id as keyof typeof checks];
                        const locked = isDayCompletedRaw;
                        const isPrioritized = intentConfig.highPriority.includes(pillar.id);

                        // Dynamic styles based on baseColor
                        // Note: Tailwind classes must be complete strings or safe-listed if constructed dynamically.
                        // Ideally we use a map, but for now we'll stick to 'cn' utility logic if possible or exact classes.
                        // To be safe, I'm defining a helper for dynamic colors since string interpolation like `text-${color}-400` can be purgeable.

                        const colorMap: Record<string, any> = {
                            emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'bg-emerald-500', neon: 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
                            orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'bg-orange-500', neon: 'border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]' },
                            indigo: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', glow: 'bg-indigo-500', neon: 'border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]' },
                            violet: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', glow: 'bg-violet-500', neon: 'border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
                            rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', glow: 'bg-rose-500', neon: 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]' },
                            cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'bg-cyan-500', neon: 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' }
                        };

                        const styles = colorMap[pillar.baseColor];

                        // STITCH: Color Palette Alignment (Action vs Calm)
                        const isActionIntent = ['fitness', 'productivity'].includes(currentIntent);

                        const auraClass = isPrioritized && !isChecked
                            ? (isActionIntent ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]')
                            : styles.border;

                        return (
                            <motion.div
                                key={pillar.id}
                                aria-disabled={locked}
                                onClick={() => !locked && handleCheck(pillar.id)}
                                whileHover={!locked ? { scale: isPrioritized && !isChecked ? 1.07 : 1.01 } : {}}
                                whileTap={!locked ? { scale: 0.99 } : {}}
                                animate={{
                                    scale: isPrioritized && !isChecked ? 1.05 : 1,
                                    opacity: locked ? 0.5 : 1
                                }}
                                className={cn(
                                    "relative overflow-hidden rounded-2xl border p-6 flex gap-6 items-start transition-all cursor-pointer group",
                                    isChecked
                                        ? `bg-gradient-to-r from-black via-black to-${pillar.baseColor}-900/20 border-${pillar.baseColor}-500/50`
                                        : "bg-white/5 border-white/5 hover:bg-white/[0.07]",
                                    isPrioritized && !isChecked && auraClass,
                                    locked && "grayscale pointer-events-none"
                                )}
                            >
                                {/* AURA OF INTENTION INDICATOR */}
                                {isPrioritized && !isChecked && (
                                    <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full border border-white/10 bg-white/5">
                                        <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Foco</span>
                                    </div>
                                )}

                                {/* STITCH: Hexagon Toggle */}
                                <HexagonToggle
                                    checked={isChecked}
                                    onClick={() => !locked && handleCheck(pillar.id)}
                                />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <pillar.icon
                                            size={20}
                                            className={cn(
                                                styles.text,
                                                isChecked || isPrioritized ? "animate-pulse" : "opacity-70"
                                            )}
                                        />
                                        <h3 className={cn("text-lg font-bold uppercase tracking-wider", isChecked ? "text-white" : "text-white/70")}>
                                            {pillar.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed font-light">
                                        {pillar.desc}
                                    </p>
                                </div>

                                {/* Background Glow */}
                                {isChecked && (
                                    <div className={cn(
                                        "absolute -right-10 -top-10 w-32 h-32 blur-3xl opacity-20 pointer-events-none",
                                        styles.glow
                                    )} />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* FOOTER ACTION */}
                <div className="pt-8 flex justify-center sticky bottom-8 z-30">
                    {!isDayCompletedRaw ? (
                        <button
                            disabled={!allChecked || completing}
                            onClick={handleCompleteDay}
                            className={cn(
                                "w-full max-w-md py-5 rounded-full font-bold uppercase tracking-[0.2em] text-sm shadow-xl transition-all flex items-center justify-center gap-3",
                                allChecked
                                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-black hover:scale-105 hover:shadow-cyan-500/30"
                                    : "bg-white/10 text-white/20 cursor-not-allowed border border-white/5"
                            )}
                        >
                            {completing ? (
                                <>
                                    <TempleLoading variant="text" text="" /> Guardando...
                                </>
                            ) : (
                                <>
                                    {allChecked ? <Shield size={18} /> : <Lock size={16} />}
                                    Cerrar Día {currentDay}
                                </>
                            )}
                        </button>
                    ) : (
                        <div className="w-full max-w-md py-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-center uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                            <Check size={16} /> Día {currentDay} Completado
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
};
