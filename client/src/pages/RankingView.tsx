import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Users, Shield, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../hooks/useProfile';
import { endpoints, getAuthHeaders } from '../lib/api';

const THEME = {
    bg: 'bg-[#050505]',
    card: 'bg-white/[0.02] backdrop-blur-xl border border-white/5',
    text: 'text-zinc-400',
    accent: 'text-cyan-500',
    highlight: 'bg-cyan-500',
    muted: 'bg-zinc-800'
};

interface RankingData {
    personal: {
        sma_30: number;
        current_streak: number;
        best_streak: number;
        stability_index: string;
        percentile: string;
        tier: string;
    };
    community: {
        total_users: number;
        distribution: Record<string, number>;
    };
}

export const RankingView = ({ onBack, onNavigate }: { onBack: () => void, onNavigate?: (view: any) => void }) => {
    const { profile } = useProfile();
    const [data, setData] = useState<RankingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await fetch(endpoints.ranking, {
                    headers: {
                        ...getAuthHeaders(),
                        'x-profile-id': profile?.id || 'anonymous'
                    }
                });
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Failed to load ranking:", error);
            } finally {
                setLoading(false);
            }
        };

        if (profile) fetchRanking();
    }, [profile]);

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-[#050505]">
            <div className="text-cyan-500/50 animate-pulse tracking-[0.3em] uppercase text-xs">Sincronizando Espejo...</div>
        </div>
    );

    const TIERS = ['Fragmentado', 'Inestable', 'En Construcción', 'En Dominio', 'Arquitecto'];
    const maxCount = data ? Math.max(...Object.values(data.community.distribution)) : 10;

    return (
        <div className={cn("min-h-screen w-full relative overflow-hidden font-sans selection:bg-cyan-500/20", THEME.bg)}>

            {/* Header */}
            <header className="relative z-10 p-6 flex items-center justify-between max-w-5xl mx-auto w-full pt-[max(2rem,env(safe-area-inset-top))]">
                <button onClick={onBack} className="p-2 text-white/20 hover:text-white/60 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 tracking-[0.4em] text-[10px] uppercase font-bold text-cyan-500/40">
                    <Trophy className="w-3 h-3" />
                    <span>Semblanza Competitiva</span>
                </div>
                <div className="w-9" />
            </header>

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-8 space-y-12">

                {/* 1. MY STATUS (HERO) */}
                <motion.div
                    initial="initial" animate="in" variants={pageVariants}
                    className="flex flex-col items-center text-center space-y-6"
                >
                    <div className="space-y-2">
                        <h3 className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Nivel de Consciencia Actual</h3>
                        <h1 className="text-[42px] md:text-[56px] font-serif text-white tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            {data?.personal.tier || "Desconocido"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-8 py-6 border-y border-white/5 w-full justify-center">
                        <div className="text-center">
                            <div className="text-[24px] font-light text-cyan-400">{data?.personal.sma_30}</div>
                            <div className="text-[9px] uppercase tracking-widest text-zinc-600">SMA-30</div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/5" />
                        <div className="text-center">
                            <div className="text-[24px] font-light text-white/80">
                                {data ? (parseFloat(data.personal.percentile) * 100).toFixed(1) : "100.0"}%
                            </div>
                            <div className="text-[9px] uppercase tracking-widest text-zinc-600">En el Top</div>
                        </div>
                        <div className="w-[1px] h-8 bg-white/5" />
                        <div className="text-center">
                            <div className="text-[24px] font-light text-white/80">{data?.personal.stability_index}</div>
                            <div className="text-[9px] uppercase tracking-widest text-zinc-600">Estabilidad</div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. COMMUNITY DISTRIBUTION (THE MIRROR) */}
                <motion.div
                    initial="initial" animate="in" variants={pageVariants} transition={{ delay: 0.2 }}
                    className={cn("p-8 rounded-[2rem]", THEME.card)}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[13px] uppercase tracking-[0.2em] text-white/40">Ecosistema Global</h3>
                        <div className="flex items-center gap-2 text-[10px] text-cyan-500/60 uppercase tracking-widest">
                            <Users className="w-3 h-3" />
                            <span>{data?.community.total_users} Almas</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {TIERS.map((tier) => {
                            const count = data?.community.distribution[tier] || 0;
                            const isMyTier = data?.personal.tier === tier;
                            const widthPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;

                            return (
                                <div key={tier} className="relative group">
                                    <div className="flex items-center justify-between text-[11px] mb-2 uppercase tracking-wide">
                                        <span className={cn("transition-colors", isMyTier ? "text-cyan-400 font-bold" : "text-zinc-600")}>
                                            {tier}
                                        </span>
                                        <span className="text-zinc-700">{count}</span>
                                    </div>

                                    <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.max(widthPercent, 1)}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className={cn("h-full rounded-full transition-shadow duration-500",
                                                isMyTier ? "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "bg-zinc-800"
                                            )}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* 3. PROTOCOL 21 ACCESS (THE BEHAVIORAL ENGINE) */}
                <motion.div
                    initial="initial" animate="in" variants={pageVariants} transition={{ delay: 0.4 }}
                    className={cn("p-8 rounded-[2rem] border border-cyan-500/20 bg-cyan-500/5 flex flex-col items-center text-center space-y-4")}
                >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-lg font-serif italic text-white/90">Protocolo 21</h4>
                        <p className="text-[10px] uppercase tracking-widest text-white/40">Tu Motor de Alquimia Diaria</p>
                    </div>
                    <p className="text-sm text-white/60 max-w-xs mx-auto leading-relaxed">
                        Cumplir con tus pilares diarios es la forma más rápida de elevar tu frecuencia SMA-30 y alcanzar el rango de Arquitecto.
                    </p>
                    <button
                        onClick={() => onNavigate?.('PROTOCOL21')}
                        className="mt-4 px-8 py-3 rounded-full bg-cyan-500 text-black font-bold uppercase tracking-widest text-[10px] hover:bg-cyan-400 transition-all flex items-center gap-2"
                    >
                        Acceder al Protocolo <Check className="w-3 h-3" />
                    </button>
                </motion.div>

            </main>
        </div>
    );
};
