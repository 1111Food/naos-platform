import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Flame, Moon, Brain, Heart, Activity } from 'lucide-react';
import { useProtocol21 } from '../hooks/useProtocol21';
import { useGuardianState } from '../contexts/GuardianContext';
import { PerformanceSparkline } from './PerformanceSparkline';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { useSound } from '../hooks/useSound';

// Hexagon Toggle Component (Geometric/Mystic)
const HexagonToggle = ({ checked, onClick, color }: { checked: boolean, onClick: () => void, color: string }) => {
    const colorMap: Record<string, string> = {
        emerald: "text-emerald-500",
        orange: "text-orange-500",
        indigo: "text-indigo-500",
        violet: "text-violet-500",
        rose: "text-rose-500"
    };

    return (
        <div
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className={cn(
                "relative flex-shrink-0 w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer group",
                checked ? "scale-100" : "scale-100 opacity-60 hover:opacity-100 hover:scale-110"
            )}
        >
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
                <path
                    d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z"
                    fill="currentColor"
                    fillOpacity={checked ? 1 : 0}
                    stroke="currentColor"
                    strokeWidth={checked ? 0 : 2}
                    className={cn(
                        "transition-all duration-300 ease-out",
                        checked ? colorMap[color] : "text-zinc-700 group-hover:text-zinc-500"
                    )}
                />
            </svg>
            {checked && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative z-10"
                >
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </motion.div>
            )}
        </div>
    );
};

export const ProtocolHabitChecklist: React.FC<{ onOpenDetail?: () => void }> = ({ onOpenDetail }) => {
    const { activeProtocol, completeDay, dailyLogs } = useProtocol21();
    const { oracleState, saveRituals } = useGuardianState();
    const { playSound } = useSound();
    const [history, setHistory] = useState<number[]>([]);

    // Initial State for 5 Pillars
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

    // Load from Oracle State (Supabase + Local Fallback)
    useEffect(() => {
        let newChecks = null;
        if (activeProtocol && oracleState.rituals?.day === activeProtocol.current_day) {
            newChecks = oracleState.rituals.checks;
        } else if (activeProtocol) {
            const saved = localStorage.getItem(`protocol_checks_day_${activeProtocol.current_day}`);
            if (saved) {
                try {
                    newChecks = JSON.parse(saved);
                } catch (e) {
                    console.error("Error parsing stored checks", e);
                }
            }
        }

        if (newChecks) {
            const checksStr = JSON.stringify(newChecks);
            setChecks(prev => {
                if (JSON.stringify(prev) === checksStr) return prev;
                return newChecks as any;
            });
        }
    }, [activeProtocol?.current_day, oracleState.rituals]);

    // Save to Cloud and localStorage
    // Save to Cloud and localStorage only if different from context
    useEffect(() => {
        if (activeProtocol) {
            const checksStr = JSON.stringify(checks);
            const oracleStr = JSON.stringify(oracleState.rituals?.checks || {});

            if (checksStr !== oracleStr || oracleState.rituals?.day !== activeProtocol.current_day) {
                localStorage.setItem(`protocol_checks_day_${activeProtocol.current_day}`, checksStr);
                saveRituals(activeProtocol.current_day, checks as any);
            }
        }
    }, [checks, activeProtocol, oracleState.rituals, saveRituals]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!activeProtocol?.user_id) return;
            const { data } = await supabase
                .from('coherence_history')
                .select('score')
                .eq('user_id', activeProtocol.user_id)
                .order('created_at', { ascending: false })
                .limit(30);

            if (data) {
                setHistory(data.map(d => d.score).reverse());
            }
        };
        fetchHistory();
    }, [activeProtocol?.user_id]);

    const PILLARS = [
        { id: 'nutrition', icon: Leaf, title: 'Nutrición', color: 'emerald' },
        { id: 'movement', icon: Flame, title: 'Movimiento', color: 'orange' },
        { id: 'sleep', icon: Moon, title: 'Sueño', color: 'indigo' },
        { id: 'connection', icon: Brain, title: 'Conexión', color: 'violet' },
        { id: 'gratitude', icon: Heart, title: 'Gratitud', color: 'rose' }
    ];

    const toggleCheck = (id: string) => {
        const isDayDone = dailyLogs.some(l => l.day_number === activeProtocol?.current_day);
        if (isDayDone) return;

        const newChecks = { ...checks, [id]: !checks[id as keyof typeof checks] };
        setChecks(newChecks);
        playSound(newChecks[id as keyof typeof checks] ? 'success' : 'click');

        // Auto-complete day if all checked
        if (Object.values(newChecks).every(v => v)) {
            if (activeProtocol) {
                const notes = JSON.stringify(newChecks);
                completeDay(activeProtocol.current_day, notes);
            }
        }
    };

    const isDayCompletedRaw = dailyLogs.some(l => l.day_number === activeProtocol?.current_day);

    return (
        <div className="w-full space-y-6" onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-1 gap-2">
                {PILLARS.map((pillar) => {
                    const isChecked = checks[pillar.id as keyof typeof checks];
                    return (
                        <div
                            key={pillar.id}
                            onClick={() => !isDayCompletedRaw && toggleCheck(pillar.id)}
                            className={cn(
                                "flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer",
                                isChecked
                                    ? "bg-white/10 border-white/20"
                                    : "bg-white/5 border-white/5 text-white/40 hover:border-white/10",
                                isDayCompletedRaw && "opacity-50 pointer-events-none"
                            )}
                        >
                            <HexagonToggle
                                checked={isChecked}
                                onClick={() => !isDayCompletedRaw && toggleCheck(pillar.id)}
                                color={pillar.color}
                            />

                            <div className="flex-1 flex items-center gap-3">
                                <pillar.icon size={16} className={isChecked ? `text-${pillar.color}-400` : "opacity-40"} />
                                <span className="text-[10px] uppercase tracking-wider font-bold">{pillar.title}</span>
                            </div>

                            {isChecked && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={cn("w-1 h-1 rounded-full", `bg-${pillar.color}-500 shadow-[0_0_8px_currentColor]`)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/30">
                        <Activity size={12} />
                        <span className="text-[8px] uppercase tracking-widest font-black">Historial de Coherencia</span>
                    </div>
                    {onOpenDetail && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onOpenDetail(); }}
                            className="text-[8px] uppercase tracking-widest font-black text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Ver Bitácora Completa →
                        </button>
                    )}
                </div>
                <PerformanceSparkline data={history} color="#10b981" />
            </div>
        </div>
    );
};
