import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Shield, RotateCcw } from 'lucide-react';
import { useProtocol21 } from '../../hooks/useProtocol21';
import { TempleLoading } from '../../components/TempleLoading';
import { WisdomOverlay, WisdomButton } from '../../components/WisdomOverlay';
import { ProtocolWizard } from '../../components/ProtocolWizard';
import { ProtocolVault } from '../../components/Protocol21/ProtocolVault';
import { useProfile } from '../../hooks/useProfile';
import { WISDOM_COPYS } from '../../constants/wisdomContent';
import { DailyCheckIn } from '../../components/DailyCheckIn';
import { cn } from '../../lib/utils';

interface Protocol21Props {
    onBack: () => void;
}

export const Protocol21: React.FC<Protocol21Props> = ({ onBack }) => {
    const { activeProtocol, dailyLogs, loading, completedCount, resetProtocol, startProtocol } = useProtocol21();
    const { profile } = useProfile();
    const [showDailySuccess, setShowDailySuccess] = useState(false);
    const [showWisdom, setShowWisdom] = useState(false);
    const [showVault, setShowVault] = useState(false);

    const handleReset = async () => {
        if (window.confirm("¿Reiniciar protocolo?")) {
            await resetProtocol();
        }
    };

    if (loading) return <TempleLoading text="Sincronizando Frecuencia..." />;

    if (!activeProtocol) {
        return (
            <div className="min-h-screen bg-black/40 text-white pb-24 font-sans backdrop-blur-3xl pt-12">
                <header className="sticky top-0 z-40 bg-transparent p-6 mb-8">
                    <button onClick={onBack} className="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                </header>
                <ProtocolWizard
                    userId={profile?.id || ''}
                    onProtocolCreated={async () => {
                        try {
                            await startProtocol();
                        } catch (err: any) {
                            alert(err.message || 'Error iniciando ciclo de 21 días');
                        }
                    }}
                    onCancel={onBack}
                />
            </div>
        );
    }

    if (showVault) {
        return (
            <div className="min-h-screen bg-black/40 text-white pb-24 font-sans backdrop-blur-3xl pt-12">
                <header className="sticky top-0 z-40 bg-transparent p-6 mb-8">
                    <button onClick={() => setShowVault(false)} className="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-xl font-serif italic text-cyan-400 text-center">Protocolo 21 - Archivo</h1>
                </header>
                <ProtocolVault userId={profile?.id || ''} onClose={() => setShowVault(false)} />
            </div>
        )
    }

    const currentDay = activeProtocol.current_day;
    const isDayCompletedRaw = dailyLogs.some(l => l.day_number === currentDay);

    return (
        <div className="min-h-screen bg-black/40 text-white pb-24 font-sans backdrop-blur-3xl">
            <AnimatePresence>
                {showDailySuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95">
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1.2 }} className="relative">
                            <Shield size={120} className="text-cyan-400" fill="currentColor" fillOpacity={0.2} />
                            <Check size={40} className="absolute bottom-0 right-0 text-white bg-cyan-500 rounded-full p-2" />
                        </motion.div>
                        <h2 className="mt-12 text-3xl font-serif italic text-cyan-100">¡FRECUENCIA ELEVADA!</h2>
                        <p className="mt-4 text-cyan-400 uppercase tracking-widest text-sm">Día {currentDay} Completado</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <header className="sticky top-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/5 p-6">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <div className="flex items-center gap-4">
                        <button onClick={onBack} className="p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-serif italic">Protocolo 21</h1>
                        <span className="text-[10px] uppercase tracking-widest text-cyan-400">Día {currentDay} / 21</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <WisdomButton color="emerald" onClick={() => setShowWisdom(true)} />
                        {completedCount > 0 && (
                            <button onClick={() => setShowVault(true)} className="text-[10px] uppercase tracking-wider text-cyan-500/80 hover:text-cyan-400 flex items-center gap-1 border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5 rounded-full transition-colors relative group">
                                Bóveda
                                <span className="bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full text-[8px] font-bold">{completedCount}</span>
                                <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.2)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        )}
                        <button onClick={handleReset} className="text-[10px] uppercase tracking-wider text-white/30 hover:text-red-400 flex items-center gap-1">
                            <RotateCcw size={12} /> Reiniciar
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-6 space-y-10">
                {/* 21-Day Progress Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Progreso del Ciclo</span>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-black">Día {activeProtocol.current_day} / 21</span>
                    </div>
                    <div className="grid grid-cols-7 gap-3">
                        {Array.from({ length: 21 }).map((_, i) => {
                            const dayNum = i + 1;
                            const isCompleted = dailyLogs.some(log => log.day_number === dayNum && log.is_completed);
                            const isCurrent = dayNum === activeProtocol.current_day;

                            return (
                                <div
                                    key={dayNum}
                                    className={cn(
                                        "aspect-square rounded-xl border flex items-center justify-center text-[10px] font-black transition-all duration-500 relative",
                                        isCompleted
                                            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                                            : isCurrent
                                                ? "bg-white/10 border-white/40 text-white animate-pulse"
                                                : "bg-white/5 border-white/5 text-white/20"
                                    )}
                                >
                                    {dayNum}
                                    {isCompleted && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_cyan]"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <DailyCheckIn
                    currentDay={currentDay}
                    title={activeProtocol.title}
                    purpose={activeProtocol.purpose}
                    isCompletedToday={isDayCompletedRaw}
                    onSuccess={() => {
                        setShowDailySuccess(true);
                        setTimeout(() => setShowDailySuccess(false), 3000);
                    }}
                />
            </main>

            <WisdomOverlay
                isOpen={showWisdom}
                onClose={() => setShowWisdom(false)}
                {...WISDOM_COPYS.PROTOCOL_21}
            />
        </div>
    );
};
