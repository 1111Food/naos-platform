import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useProtocol21 } from '../hooks/useProtocol21';
import { useCoherence } from '../hooks/useCoherence';
import { useSound } from '../hooks/useSound';
import { Leaf, Flame, Moon, Brain, Heart } from 'lucide-react';
import { HexagonToggle } from './HexagonToggle';
import { useGuardianState } from '../contexts/GuardianContext';

interface DailyCheckInProps {
    currentDay: number;
    title?: string;
    purpose?: string;
    isCompletedToday?: boolean;
    onSuccess?: () => void;
}

const PILLARS = [
    { id: 'nutrition', icon: Leaf, title: 'Nutrición', color: 'emerald' },
    { id: 'movement', icon: Flame, title: 'Movimiento', color: 'orange' },
    { id: 'sleep', icon: Moon, title: 'Sueño', color: 'indigo' },
    { id: 'connection', icon: Brain, title: 'Conexión', color: 'violet' },
    { id: 'gratitude', icon: Heart, title: 'Gratitud', color: 'rose' }
];

export const DailyCheckIn: React.FC<DailyCheckInProps> = ({
    currentDay,
    title = 'Integrar un nuevo hábito',
    purpose = 'Evolución guiada por la disciplina',
    isCompletedToday = false,
    onSuccess
}) => {
    const { completeDay } = useProtocol21();
    const { logAction } = useCoherence();
    const { playSound } = useSound();
    const { saveRituals } = useGuardianState();

    const [note, setNote] = useState('');
    const [completing, setCompleting] = useState(false);
    const [checks, setChecks] = useState<Record<string, boolean>>({
        nutrition: false,
        movement: false,
        sleep: false,
        connection: false,
        gratitude: false
    });

    // Load today's checks from localStorage if any
    const todayStr = new Date().toISOString().split('T')[0];
    useEffect(() => {
        const stored = localStorage.getItem(`elemental_lab_${todayStr}`);
        if (stored) {
            try {
                setChecks(JSON.parse(stored));
            } catch (e) {
                console.error(e);
            }
        }
    }, [todayStr]);

    const handleCheck = (id: string) => {
        if (isCompletedToday) return;
        const newState = !checks[id];
        const updatedChecks = { ...checks, [id]: newState };
        setChecks(updatedChecks);
        localStorage.setItem(`elemental_lab_${todayStr}`, JSON.stringify(updatedChecks));
        playSound(newState ? 'success' : 'click');
    };

    const handleComplete = async () => {
        if (!note.trim() || isCompletedToday) return;
        setCompleting(true);
        try {
            // Include pillars in the note or save them separately if we had the field
            const pillarsSummary = Object.entries(checks)
                .filter(([_, val]) => val)
                .map(([key, _]) => key.toUpperCase())
                .join(', ');

            const fullNote = `[PILLARS: ${pillarsSummary || 'NONE'}] ${note}`;

            await completeDay(currentDay, fullNote);
            await logAction('PROTOCOL_DAY_COMPLETE');

            // Sync with Guardian Context
            await saveRituals(currentDay, checks as any);

            playSound('success');
            setNote('');

            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setCompleting(false);
        }
    };

    return (
        <div className="w-full space-y-8">
            {/* Objective Display */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-cyan-900/10 to-black/40 border border-cyan-500/10 p-6 rounded-2xl text-center relative overflow-hidden"
            >
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <p className="text-[8px] uppercase tracking-[0.3em] text-cyan-500 mb-2 font-black flex items-center justify-center gap-2">
                    <span className="w-4 h-[1px] bg-cyan-500/40"></span>
                    Objetivo Alquímico
                    <span className="w-4 h-[1px] bg-cyan-500/40"></span>
                </p>
                <h2 className="text-2xl text-white font-light tracking-wide">{title}</h2>
                <p className="text-xs text-white/40 italic mt-3 max-w-xl mx-auto leading-relaxed">"{purpose}"</p>
            </motion.div>

            {/* Daily Input */}
            <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem]">
                <h3 className="text-[10px] uppercase tracking-widest text-white/50 mb-6 px-2 text-center">Ritual de Cierre - Día {currentDay}</h3>

                {isCompletedToday ? (
                    <div className="p-6 text-center text-cyan-500/80 italic text-sm">
                        El día {currentDay} ha sido sellado exitosamente. Descansa, Arquitecto.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Biophysical Pillars */}
                        <div className="flex justify-center gap-4 py-4 px-2 overflow-x-auto pb-6 border-b border-white/5">
                            {PILLARS.map((pillar) => (
                                <div key={pillar.id} className="flex flex-col items-center gap-2 min-w-[60px]">
                                    <HexagonToggle
                                        checked={checks[pillar.id]}
                                        onClick={() => handleCheck(pillar.id)}
                                        color={pillar.color}
                                    />
                                    <span className={cn(
                                        "text-[8px] uppercase font-black tracking-widest",
                                        checks[pillar.id] ? `text-${pillar.color}-400` : "text-white/20"
                                    )}>
                                        {pillar.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <label className="text-[8px] uppercase tracking-widest text-white/30 ml-2">Bitácora de Coherencia</label>
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="¿Cómo mantuviste el pacto hoy? Escribe tus reflexiones..."
                                className="w-full h-32 bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 resize-none transition-colors"
                            />
                        </div>

                        <button
                            disabled={!note.trim() || completing}
                            onClick={handleComplete}
                            className={cn(
                                "w-full py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 relative overflow-hidden group",
                                note.trim()
                                    ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                                    : "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                            )}
                        >
                            {note.trim() && <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />}
                            <span className="relative z-10">{completing ? "Sellando..." : "Sellar Día"}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
