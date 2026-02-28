import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Play } from 'lucide-react';
import { useProtocol21 } from '../hooks/useProtocol21';

interface ProtocolWidgetProps {
    onOpen?: () => void;
}

export const ProtocolWidget: React.FC<ProtocolWidgetProps> = ({ onOpen }) => {
    const { activeProtocol, loading, startProtocol } = useProtocol21();

    const handleStart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await startProtocol();
        } catch (e: any) {
            alert(e.message || "Error al iniciar protocolo");
        }
    };

    if (loading) return (
        <div className="h-64 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
    );

    // --- EMPTY STATE ---
    if (!activeProtocol) {
        return (
            <div className="relative h-64 rounded-3xl overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-xl group flex flex-col items-center justify-center text-center p-6 transition-all hover:border-cyan-500/40">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 mb-4 p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                    <Shield size={32} />
                </div>

                <h3 className="relative z-10 text-2xl font-serif italic text-white mb-2">Protocolo 21</h3>
                <p className="relative z-10 text-white/40 text-xs uppercase tracking-widest mb-6 max-w-[200px]">
                    Hábito. Disciplina. Transformación.
                </p>

                <button
                    onClick={handleStart}
                    className="relative z-10 px-8 py-3 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-200 text-xs uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2"
                >
                    <Play size={12} fill="currentColor" /> Iniciar Ciclo
                </button>
            </div>
        );
    }

    // --- ACTIVE STATE (SUMMARY CARD) ---
    const currentDay = activeProtocol.current_day;

    return (
        <div
            onClick={onOpen}
            className="group relative h-32 rounded-[2rem] overflow-hidden border border-white/5 bg-white/5 backdrop-blur-sm p-6 flex items-center justify-between cursor-pointer transition-all hover:border-cyan-500/20 hover:bg-white/10"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-6 relative z-10 w-full">
                <div className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Shield size={20} />
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                        <h3 className="text-xl font-serif italic text-white/90">
                            Día {currentDay} <span className="text-xs text-white/30 font-sans not-italic ml-2 uppercase tracking-tighter">de 21</span>
                        </h3>
                        <span className="text-[10px] font-bold text-cyan-500/70">{Math.round((currentDay / 21) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentDay / 21) * 100}%` }}
                            className="h-full bg-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
