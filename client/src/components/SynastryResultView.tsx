// client/src/components/SynastryResultView.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Sparkles, ShieldAlert, Zap, Brain, Heart, Target, Compass, Activity } from 'lucide-react';

interface IndexCardProps {
    label: string;
    value: number;
    icon: any;
    delay?: number;
    colorClass?: string;
}

const IndexCard: React.FC<IndexCardProps> = ({ label, value, icon: Icon, delay = 0, colorClass = "text-white" }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            let start = 0;
            const end = value;
            const duration = 1000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setDisplayValue(end);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(start));
                }
            }, 16);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl group hover:bg-white/10 transition-all flex flex-col h-full min-h-[110px]"
        >
            <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2 rounded-lg bg-black/40 flex-shrink-0", colorClass)}>
                    <Icon size={16} />
                </div>
                <span className="text-lg md:text-xl font-light text-white font-mono">{displayValue}%</span>
            </div>
            <div className="mt-auto space-y-2">
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.1em] text-white/40 font-black block leading-none" title={label}>{label}</span>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
                        className={cn("h-full", colorClass.replace('text-', 'bg-'))}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export const SynastryResultView: React.FC<{ data: any; onNew: () => void; userA: any; userB: any }> = ({ data, onNew, userA, userB }) => {
    const { report, timeWindows } = data;
    const indices = report.indices;

    const indexConfig = [
        { key: 'sexual_erotic', label: 'Erotismo/Marte', icon: Zap, color: 'text-orange-400' },
        { key: 'intellectual_mercurial', label: 'Intelecto/Mercurio', icon: Brain, color: 'text-indigo-400' },
        { key: 'emotional_lunar', label: 'Emocional/Luna', icon: Heart, color: 'text-rose-400' },
        { key: 'karmic_saturnian', label: 'Kármico/Saturno', icon: ShieldAlert, color: 'text-amber-500' },
        { key: 'spiritual_neptunian', label: 'Espiritual/Neptuno', icon: Compass, color: 'text-blue-400' },
        { key: 'action_martial', label: 'Voluntad/Sol', icon: Target, color: 'text-emerald-400' }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12">
            {/* Header: Soul Mirror */}
            {/* Header: Soul Mirror */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 py-10">
                {/* User A */}
                <div className="flex flex-col items-center md:items-end space-y-4 w-full md:w-1/3">
                    <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 bg-cyan-900/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                        <span className="text-3xl font-serif text-cyan-200">{userA?.name?.[0]}</span>
                    </div>
                    <div className="text-center md:text-right">
                        <h4 className="text-xl font-serif text-white truncate max-w-[200px]">{userA?.name}</h4>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-400/60 font-black">Arquitecto</p>
                    </div>
                </div>

                {/* Connection Score Overlay (Center) */}
                <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-20 shrink-0 my-4 md:my-0">
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-28 h-28 rounded-full bg-black border border-white/20 backdrop-blur-3xl flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] relative"
                    >
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20" />
                        <span className="text-3xl font-light text-white font-serif">{report.score}%</span>
                        <span className="text-[8px] uppercase tracking-[0.4em] text-white/40">Resonancia</span>
                    </motion.div>
                </div>

                {/* User B */}
                <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-1/3">
                    <div className="w-24 h-24 rounded-full border-2 border-amber-500/30 bg-amber-900/10 flex items-center justify-center relative shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                        <span className="text-3xl font-serif text-amber-200">{userB?.name?.[0]}</span>
                    </div>
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-serif text-white truncate max-w-[200px]">{userB?.name}</h4>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 font-black">Reflejo</p>
                    </div>
                </div>
            </div>

            {/* Indices: 6 Pillars */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {indexConfig.map((idx, i) => (
                    <IndexCard
                        key={idx.key}
                        label={idx.label}
                        value={(indices as any)[idx.key]}
                        icon={idx.icon}
                        delay={0.2 + (i * 0.1)}
                        colorClass={idx.color}
                    />
                ))}
            </div>

            {/* Qualitative Synthesis (Guardian) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-black/60 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="text-purple-400" size={20} />
                        <h3 className="text-lg font-serif italic text-white/90">Síntesis de Vínculos</h3>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-2">Fortalezas detectadas</span>
                            <div className="flex flex-wrap gap-2">
                                {report.A_StrongCompatibilities.map((s: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-2">Áreas de Tensión</span>
                            <div className="flex flex-wrap gap-2">
                                {report.B_PotentialTensions.map((t: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-[10px] text-rose-400">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTION/GROWTH */}
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold block mb-4">Misión de Crecimiento</span>
                    <ul className="space-y-4">
                        {report.C_GrowthAreas.map((g: string, i: number) => (
                            <li key={i} className="flex gap-3 text-xs text-white/60">
                                <span className="text-purple-400 mt-1">•</span>
                                <span>{g}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* TEMPORAL TIMELINE (LINEA DE VIDA) */}
            <div className="bg-black/40 border border-white/5 rounded-3xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Activity className="text-blue-400" size={20} />
                        <h3 className="text-lg font-serif italic text-white/90">Línea de Vida (30 días)</h3>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">Proyección de Volatilidad Relacional</span>
                </div>

                <div className="flex gap-2 h-40 items-end">
                    {timeWindows.map((w: any, i: number) => (
                        <div key={i} className="flex-1 flex flex-col items-center group relative">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${w.score}%` }}
                                transition={{ delay: 0.5 + (i * 0.02) }}
                                className={cn(
                                    "w-full rounded-t-sm transition-opacity duration-300",
                                    w.type === 'FLOW' ? "bg-emerald-500/40" : w.type === 'TENSION' ? "bg-rose-500/40" : "bg-white/10"
                                )}
                            />
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-32 bg-zinc-900 border border-white/10 p-2 rounded text-[8px] text-white/60 pointer-events-none shadow-2xl">
                                <p className="font-bold text-white mb-1">{new Date(w.date).toLocaleDateString()}</p>
                                <p>{w.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-[8px] text-white/20 uppercase tracking-widest">
                    <span>Presente</span>
                    <span>Zenit (+15d)</span>
                    <span>Umbral (+30d)</span>
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onNew}
                    className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-[10px] uppercase tracking-[0.3em] font-bold"
                >
                    Nueva Invocación
                </button>
            </div>
        </div>
    );
};
