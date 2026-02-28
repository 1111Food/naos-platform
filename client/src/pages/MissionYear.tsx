import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Shield, Zap } from 'lucide-react';
import { useWisdom } from '../hooks/useWisdom';
import { WisdomButton } from '../components/WisdomOverlay';

export const MissionYear: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { openWisdom } = useWisdom();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative min-h-screen p-6 md:p-12 flex flex-col items-center"
        >
            <header className="w-full max-w-4xl flex items-center justify-between mb-12">
                <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black">Regresar</span>
                </button>
                <WisdomButton color="red" onClick={() => openWisdom('MISSION')} />
            </header>

            <main className="w-full max-w-2xl text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl md:text-5xl font-serif italic text-white/90">Misión del Año</h1>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Arquitectura Temporal a Largo Plazo</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-12 border border-red-500/20 bg-red-500/5 rounded-[3rem] space-y-8"
                >
                    <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                        <Target className="text-red-400" size={32} />
                    </div>
                    <h2 className="text-2xl font-serif italic text-white">Horizonte 2026</h2>
                    <p className="text-zinc-400 font-light leading-relaxed">
                        En esta fase Beta, tu misión está siendo calculada basándose en tu Código de Identidad y la progresión de tus Protocolos.
                        Pronto podrás definir tu Objetivo Maestro y ver cómo tus rituales diarios construyen este camino.
                    </p>
                    <div className="flex justify-center gap-4 pt-6">
                        <Shield className="text-red-900/40" size={20} />
                        <Zap className="text-red-900/40" size={20} />
                    </div>
                </motion.div>
            </main>
        </motion.div>
    );
};
