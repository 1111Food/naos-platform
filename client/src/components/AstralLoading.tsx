import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RITUAL_TEXTS = [
    'Sintonizando con las esferas...',
    'Invocando tu número personal...',
    'Leyendo el pulso del cosmos...',
    'Alineando tu esencia con el día...',
    'Decodificando la vibración astral...'
];

export const AstralLoading: React.FC = () => {
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % RITUAL_TEXTS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-[#000000] z-[200] flex flex-col items-center justify-center overflow-hidden">
            {/* Pulsing Aura Layer */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.25, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute w-[400px] h-[400px] bg-red-600 rounded-full blur-[100px] pointer-events-none"
            />

            {/* The Sigil */}
            <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                    {/* Circle of Protection */}
                    <motion.circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="0.5"
                        strokeDasharray="0 1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    />

                    {/* Inner Geometric Sigil */}
                    <motion.path
                        d="M50 10 L90 70 L10 70 Z M50 10 L50 90 M10 40 L90 40 M25 80 L75 80"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="0.8"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                    />

                    {/* Central Energy Point */}
                    <motion.circle
                        cx="50" cy="50" r="1.5"
                        fill="#fbbf24"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>

                {/* Resplandor Rojo Pulsante */}
                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 40px rgba(239,68,68,0.1)",
                            "0 0 80px rgba(239,68,68,0.3)",
                            "0 0 40px rgba(239,68,68,0.1)"
                        ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                />
            </div>

            {/* Ritual Text */}
            <div className="mt-12 h-8 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={textIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-[11px] uppercase tracking-[0.5em] text-amber-200/40 font-light text-center"
                    >
                        {RITUAL_TEXTS[textIndex]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};
