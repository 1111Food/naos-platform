
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../hooks/useProfile';
import { PerformanceSparkline } from './PerformanceSparkline';
import { supabase } from '../lib/supabase';
import { getAuthHeaders } from '../lib/api';

// --- GEOMETRIC ARTIFACTS (SVG COMPONENTS) ---

const BronzeArtifact = ({ unlocked }: { unlocked: boolean }) => (
    <div className={cn("relative w-full h-full flex items-center justify-center transition-all duration-700", !unlocked && "opacity-40 grayscale")}>
        <div className={cn("absolute inset-0 bg-orange-900/10 blur-xl rounded-full transition-opacity", unlocked ? "opacity-100" : "opacity-0")} />
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]">
            <defs>
                <linearGradient id="bronzeOxide" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c2d12" /> {/* Red-Brown */}
                    <stop offset="50%" stopColor="#b45309" /> {/* Rust */}
                    <stop offset="100%" stopColor="#431407" /> {/* Dark Oxide */}
                </linearGradient>
                <filter id="noiseFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                </filter>
            </defs>
            {/* Minimalist Triangle with Texture */}
            <path d="M50 20 L80 80 L20 80 Z"
                fill="url(#bronzeOxide)"
                stroke="#a16207"
                strokeWidth="1"
                className="transition-all duration-1000"
            />
            {/* Overlay Texture */}
            <path d="M50 20 L80 80 L20 80 Z" fill="black" opacity="0.2" filter="url(#noiseFilter)" />
        </svg>
        {!unlocked && <LockIcon className="absolute w-4 h-4 text-white/20" />}
    </div>
);

const SilverArtifact = ({ unlocked }: { unlocked: boolean }) => (
    <div className={cn("relative w-full h-full flex items-center justify-center transition-all duration-700", !unlocked && "opacity-30 grayscale")}>
        <div className={cn("absolute inset-0 bg-slate-400/10 blur-xl rounded-full transition-opacity", unlocked ? "opacity-100" : "opacity-0")} />
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(203,213,225,0.3)]">
            <defs>
                <linearGradient id="silverMoon" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
            </defs>
            {/* Rotating Hexagon */}
            <motion.path
                d="M50 15 L80 32.5 L80 67.5 L50 85 L20 67.5 L20 32.5 Z"
                fill="none"
                stroke="url(#silverMoon)"
                strokeWidth="2"
                initial={unlocked ? { rotate: 0 } : false}
                animate={unlocked ? { rotate: 360 } : {}}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            />
            {/* Inner Static Hexagon */}
            <path d="M50 25 L70 36 L70 64 L50 75 L30 64 L30 36 Z" fill="url(#silverMoon)" opacity="0.1" />
            <circle cx="50" cy="50" r="2" fill="cyan" className={cn(unlocked && "animate-ping")} />
        </svg>
        {!unlocked && <LockIcon className="absolute w-4 h-4 text-white/20" />}
    </div>
);

const GoldArtifact = ({ unlocked }: { unlocked: boolean }) => (
    <div className={cn("relative w-full h-full flex items-center justify-center transition-all duration-700", !unlocked && "opacity-30 grayscale")}>
        <div className={cn("absolute inset-0 bg-yellow-500/20 blur-[20px] rounded-full transition-opacity", unlocked ? "opacity-100 animate-pulse" : "opacity-0")} />
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
            <defs>
                <radialGradient id="goldSun" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="50%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#a16207" />
                </radialGradient>
            </defs>
            {/* Mandala Layers */}
            {unlocked && [...Array(12)].map((_, i) => (
                <motion.path
                    key={i}
                    d="M50 50 L50 10 L55 20 Z"
                    fill="#ca8a04"
                    opacity="0.5"
                    transform={`rotate(${i * 30} 50 50)`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, opacity: [0.5, 0.8, 0.5] }}
                    transition={{ delay: i * 0.05, duration: 2, repeat: Infinity }}
                />
            ))}
            <circle cx="50" cy="50" r="20" fill="url(#goldSun)" stroke="#fff" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#713f12" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        {!unlocked && <LockIcon className="absolute w-4 h-4 text-white/20" />}
    </div>
);

const ArchitectArtifact = ({ unlocked }: { unlocked: boolean }) => (
    <div className={cn("relative w-full h-full flex items-center justify-center transition-all duration-700 overflow-visible", !unlocked && "opacity-20 grayscale")}>
        {/* Deep 3D Glow / Glitch Container */}
        <div className={cn("absolute inset-[-10px] bg-purple-900/40 blur-xl rounded-full mix-blend-screen transition-opacity", unlocked ? "opacity-100" : "opacity-0")} />

        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
            <defs>
                <filter id="glitch">
                    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="1" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale={unlocked ? '2' : '0'} />
                </filter>
                <linearGradient id="architectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#000" />
                    <stop offset="50%" stopColor="#1e1b4b" />
                    <stop offset="100%" stopColor="#000" />
                </linearGradient>
            </defs>

            {/* The Black Diamond */}
            <motion.path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                fill="url(#architectGrad)"
                stroke="#a855f7" // Violet
                strokeWidth={unlocked ? 1.5 : 0.5}
                filter="url(#glitch)"
                className="drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            />

            {/* Inner Light Core */}
            <motion.path
                d="M50 25 L75 50 L50 75 L25 50 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.5"
                animate={unlocked ? { opacity: [0.2, 0.8, 0.2] } : {}}
                transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
        </svg>
        {!unlocked && <LockIcon className="absolute w-4 h-4 text-white/20" />}
    </div>
);

const LockIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);


const RANK_DEFINITIONS = [
    { id: 'BRONZE', label: 'Iniciado', cycles: 1, component: BronzeArtifact, textClass: 'text-amber-500' },
    { id: 'SILVER', label: 'Adepto', cycles: 3, component: SilverArtifact, textClass: 'text-slate-300' },
    { id: 'GOLD', label: 'Maestro', cycles: 7, component: GoldArtifact, textClass: 'text-yellow-400' },
    { id: 'ARCHITECT', label: 'Arquitecto', cycles: 12, component: ArchitectArtifact, textClass: 'text-cyan-400 font-bold' },
];

export const BadgeRack: React.FC<{ onRankingClick?: () => void }> = ({ onRankingClick }) => {
    const { profile } = useProfile();
    const completed = profile?.protocols_completed || 0;

    const [stats, setStats] = React.useState({
        sma_30: 0,
        current_streak: 0,
        percentile: 0,
        history: [] as number[],
        loading: true
    });

    React.useEffect(() => {
        if (!profile?.id) return;

        const fetchStats = async () => {
            try {
                // 1. Fetch Rank Stats
                const res = await fetch('/api/ranking', {
                    headers: getAuthHeaders() as HeadersInit
                });

                if (res.ok) {
                    const data = await res.json();
                    setStats(prev => ({
                        ...prev,
                        sma_30: Number(data.personal.sma_30),
                        current_streak: data.personal.current_streak,
                        percentile: parseFloat(data.personal.percentile),
                        loading: false
                    }));
                } else {
                    // Fallback/Simulated for demo if endpoint fails
                    setStats(prev => ({
                        ...prev,
                        sma_30: 82.5,
                        current_streak: 5,
                        percentile: 0.94,
                        loading: false
                    }));
                }

                // 2. Fetch History for Sparkline
                // Using direct DB query for speed (if allowed) or mock
                const { data: history } = await supabase
                    .from('coherence_history')
                    .select('score')
                    .eq('user_id', profile.id)
                    .order('created_at', { ascending: false })
                    .limit(30);

                if (history && history.length > 0) {
                    setStats(prev => ({
                        ...prev,
                        history: history.map(h => h.score).reverse(),
                        loading: false
                    }));
                } else {
                    setStats(prev => ({ ...prev, loading: false }));
                }

            } catch (e) {
                console.error("Rank fetch error", e);
                setStats(prev => ({ ...prev, loading: false }));
            }
        };
        fetchStats();
    }, [profile?.id]);

    return (
        <div className="w-full bg-[#050505] border border-white/5 p-6 rounded-[24px] relative overflow-hidden group">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 space-y-6">

                {/* HEADER - NOW CLICKABLE */}
                <div
                    onClick={onRankingClick}
                    className={cn("flex justify-between items-end transition-opacity duration-300", onRankingClick ? "cursor-pointer hover:opacity-80" : "")}
                >
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-1 flex items-center gap-2">
                            Evolución de Consciencia
                            {onRankingClick && <ArrowRight className="w-3 h-3 opacity-50" />}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-white/20 font-mono">ID: {profile?.id?.slice(0, 8) || 'ANON'}</span>
                            {stats.percentile > 0 && (
                                <span className="px-2 py-0.5 rounded bg-cyan-900/30 border border-cyan-500/30 text-[9px] text-cyan-400 font-mono animate-pulse">
                                    TOP {((1 - stats.percentile) * 100).toFixed(0)}%
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* GRAPH: Sparkline & Streak */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center gap-4">
                    <div className="flex-1">
                        <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-wider mb-2">
                            <span>Rendimiento (30 Días)</span>
                            <span className="text-white/60 font-bold">{(stats.sma_30 && typeof stats.sma_30 === 'number' && stats.sma_30 > 0) ? stats.sma_30.toFixed(1) : '--'} Ø</span>
                        </div>
                        <PerformanceSparkline data={stats.history} color={stats.sma_30 > 70 ? '#fcd34d' : '#22d3ee'} />
                    </div>

                    {/* Streak Box */}
                    <div className="flex flex-col items-center justify-center pl-4 border-l border-white/10 min-w-[80px]">
                        <span className="text-[20px] font-black text-white">{stats.current_streak}</span>
                        <span className="text-[8px] uppercase tracking-widest text-white/40">Racha</span>
                    </div>
                </div>

                {/* BADGES GRID */}
                <div className="grid grid-cols-4 gap-4 md:gap-8">
                    {RANK_DEFINITIONS.map((rank) => (
                        <div key={rank.id} className="flex flex-col items-center gap-3 group/badge cursor-default">
                            {/* Graphic Container */}
                            <motion.div
                                className="w-16 h-16 md:w-20 md:h-20"
                                whileHover={{ scale: 1.1, translateY: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <rank.component unlocked={completed >= rank.cycles} />
                            </motion.div>

                            {/* Label */}
                            <div className="text-center space-y-1">
                                <span className={cn(
                                    "text-[9px] md:text-[10px] uppercase tracking-[0.2em] block transition-colors duration-300",
                                    completed >= rank.cycles ? rank.textClass : "text-white/10"
                                )}>
                                    {rank.label}
                                </span>
                                <span className={cn("text-[8px] font-mono block", completed >= rank.cycles ? "text-white/30" : "text-white/5")}>
                                    LVL {rank.cycles}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
