import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, LogOut } from 'lucide-react';
import { TempleLoading } from '../components/TempleLoading';

interface WelcomeBackViewProps {
    nickname: string;
    onContinue: () => Promise<void>;
    onReset: () => void;
}

export const WelcomeBackView: React.FC<WelcomeBackViewProps> = ({ nickname, onContinue, onReset }) => {
    const [loading, setLoading] = useState(false);

    const handleEnter = async () => {
        setLoading(true);
        try {
            await onContinue();
        } catch (error) {
            console.error("Error entering temple:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black z-0" />
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0 pointer-events-none" />

            <main className="relative z-10 flex flex-col items-center gap-12 p-8 max-w-md w-full">

                {/* Avatar / Identity - Guardian Robot */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="w-40 h-40 rounded-full border border-amber-500/30 flex items-center justify-center bg-black/50 shadow-[0_0_40px_rgba(245,158,11,0.2)] overflow-hidden relative">
                        <video
                            src="/Guardian-Day.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-[150%] h-[150%] object-cover object-center opacity-90 mix-blend-screen"
                            style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                        />
                        {/* Inner Glow */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(245,158,11,0.3)] pointer-events-none" />
                    </div>

                    {/* Orbit Ring */}
                    <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-spin-slow w-56 h-56 -m-8 pointer-events-none" />
                </motion.div>

                {/* Welcome Text */}
                <div className="text-center space-y-4">
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-amber-500/60 text-xs tracking-[0.3em] uppercase"
                    >
                        El Templo te Reconoce
                    </motion.p>
                    <motion.h1
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    >
                        {nickname}
                    </motion.h1>
                </div>

                {/* Action Area */}
                <div className="w-full space-y-6 flex flex-col items-center">
                    {loading ? (
                        <div className="h-14 flex items-center justify-center">
                            <TempleLoading variant="circle" />
                        </div>
                    ) : (
                        <motion.button
                            onClick={handleEnter}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="group relative w-full py-4 px-8 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-100 font-bold tracking-widest uppercase text-xs hover:bg-amber-500/20 hover:border-amber-500/50 transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3"
                        >
                            <span>Ingresar al Templo</span>
                            <Play className="w-3 h-3 fill-current group-hover:translate-x-1 transition-transform" />

                            {/* Pulse Effect */}
                            <span className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping opacity-20" />
                        </motion.button>
                    )}

                    <motion.button
                        onClick={onReset}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-white/20 hover:text-white/40 text-[10px] uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                        <LogOut className="w-3 h-3" />
                        No soy {nickname} / Cerrar Sesión
                    </motion.button>
                </div>

            </main>
        </div>
    );
};
