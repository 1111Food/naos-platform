import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface TarotCardProps {
    index: number;
    name?: string;
    isRevealed?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}

const toRoman = (num: number): string => {
    const map: Record<number, string> = {
        0: '0', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
        6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
        11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV',
        16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX', 21: 'XXI'
    };
    return map[num] || num.toString();
};

const RitualGlyphs: Record<number, React.ReactNode> = {
    0: <g><circle cx="12" cy="12" r="9" strokeWidth="1" opacity="0.3" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeWidth="0.5" /></g>,
    1: <path d="M12 12c3-4 7-4 7 0s-4 4-7 0c-3 4-7 4-7 0s4-4 7 0Z M12 3v18" />,
    2: <g><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" opacity="0.2" /><path d="M9 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" /><circle cx="15" cy="8" r="1.5" /></g>,
    3: <path d="M12 20s-7-4-7-9V6l7-2 7 2v5c0 5-7 9-7 9z M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
    4: <g><rect x="5" y="5" width="14" height="14" rx="1" strokeWidth="1.5" /><path d="M12 5v14 M5 12h14" opacity="0.4" /></g>,
    5: <path d="M12 2v20 M7 8h10 M9 16h6" />,
    6: <g><circle cx="8" cy="12" r="5" fill="none" /><circle cx="16" cy="12" r="5" fill="none" /><path d="M12 8v8" strokeWidth="0.5" /></g>,
    7: <path d="M12 2L4 20h16L12 2z M12 8v9" />,
    8: <path d="M6 12a3 3 0 1 1 6 0 3 3 0 0 1 6 0" strokeLinecap="round" />,
    9: <g><path d="M12 4L4 20h16L12 4z" opacity="0.2" /><circle cx="12" cy="14" r="2" fill="currentColor" /></g>,
    10: <g><circle cx="12" cy="12" r="8" /><path d="M12 4v16 M4 12h16 M6.3 6.3l11.4 11.4 M6.3 17.7l11.4-11.4" strokeWidth="0.5" /></g>,
    11: <path d="M12 3v18 M4 12l8-2 8 2 M6 13v3 M18 13v3" />,
    12: <path d="M12 20L4 6h16L12 20z M12 6v14" />,
    13: <path d="M5 5l14 14 M19 5L5 19" strokeWidth="2" />,
    14: <path d="M6 6c0 6 6 6 6 12s6-6 6-12" />,
    15: <path d="M12 4l3 9 h-6 l3 -9 M12 13 v 8" />,
    16: <path d="M12 2l-2 8h4l-4 6 6-10" />,
    17: <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" />,
    18: <path d="M20 12a8 8 0 1 1-8-8 4 4 0 0 0 0 8z" />,
    19: <g><circle cx="12" cy="12" r="4" /><path d="M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2" /></g>,
    20: <path d="M4 18l8-14 8 14H4z M12 10v4" />,
    21: <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 12 2 12 2z" strokeDasharray="3 3" />
};

export const TarotCard: React.FC<TarotCardProps> = ({
    index,
    name = "Arcano",
    isRevealed = false,
    isSelected = false,
    onClick,
    className
}) => {
    const CardFront = () => (
        <div className="absolute inset-0 bg-[#121214] rounded-xl border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex flex-col items-center justify-between p-4 overflow-hidden">
            {/* Ethereal Aura (Ivory/Gold) */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -inset-10 bg-amber-50/5 blur-3xl rounded-full animate-pulse-slow pointer-events-none" />

            <div className="relative z-10 w-full text-center border-b border-white/5 pb-2">
                <span className="font-serif text-amber-100/40 tracking-[0.3em] text-[11px] uppercase font-bold">
                    {toRoman(index)}
                </span>
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Symbol with Sacred Glow */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        className="w-24 h-24 text-amber-50"
                        style={{ filter: 'drop-shadow(0 0 5px #00ffff) brightness(1.5) contrast(1.2)' }}
                    >
                        {RitualGlyphs[index] || <circle cx="12" cy="12" r="10" />}
                    </svg>
                    {/* Energy Latido (Heartbeat) */}
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 bg-amber-100/10 rounded-full blur-3xl"
                    />
                </div>
            </div>

            <div className="relative z-10 w-full text-center pt-2">
                <span className="font-serif text-white/70 tracking-[0.2em] text-[11px] md:text-[13px] uppercase font-light">
                    {name}
                </span>
            </div>

            {/* Subtle Inner Frame */}
            <div className="absolute inset-2 border border-white/5 rounded-lg pointer-events-none" />
        </div>
    );

    // STITCH: Holographic Tilt Logic
    const [rotateX, setRotateX] = React.useState(0);
    const [rotateY, setRotateY] = React.useState(0);
    const [brightness, setBrightness] = React.useState(1);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isRevealed) return; // Only tilt back
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -15; // Max 15deg tilt
        const rotateYValue = ((x - centerX) / centerX) * 15;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
        setBrightness(1 + ((Math.abs(rotateXValue) + Math.abs(rotateYValue)) / 30));
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setBrightness(1);
    };

    const CardBack = () => (
        <div
            className={cn(
                "absolute inset-0 bg-[#0c0c0e] rounded-xl border border-red-500/20 shadow-[0_0_25px_rgba(239,68,68,0.15)] overflow-hidden flex items-center justify-center transition-all duration-300",
                isSelected && "border-red-500/50 bg-[#161618] shadow-[0_0_35px_rgba(239,68,68,0.4)]"
            )}
            style={{
                filter: `brightness(${brightness})`
            }}
        >
            {/* Sacred Geometry Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/sacred-geometry.png')]" />

            {/* STITCH: Holographic Overlay (Dynamic Gradient) */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay transition-opacity duration-300"
                style={{
                    background: `linear-gradient(${135 + rotateY * 2}deg, rgba(255,255,255,0) 30%, rgba(6,182,212,0.3) 50%, rgba(251,191,36,0.2) 70%, rgba(255,255,255,0) 100%)`,
                    transform: `translateX(${rotateY}px)`
                }}
            />

            {/* Energy Latido (Nucleus) */}
            <div className="relative z-10">
                <motion.div
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/5 backdrop-blur-sm"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_15px_rgba(255,248,231,1)]" />
                </motion.div>
                <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full" />
            </div>

            {isSelected && (
                <motion.div
                    layoutId="selection-glow"
                    className="absolute inset-0 border-2 border-amber-500/40 rounded-xl animate-pulse"
                />
            )}
        </div>
    );

    return (
        <motion.div
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn("relative w-full h-full cursor-pointer preserve-3d perspective-1000", className)}
            initial={isRevealed ? { opacity: 0, scale: 0.95 } : undefined}
            animate={{
                opacity: 1,
                scale: 1,
                rotateY: isRevealed ? 0 : 180,
                rotateX: isRevealed ? 0 : rotateX / 2 // Slight tilt even when revealed? No, only back.
            }}
            whileHover={{ y: isRevealed ? -4 : 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{
                transformStyle: "preserve-3d",
                transform: isRevealed ? `rotateY(0deg)` : `rotateY(180deg) rotateX(${rotateX}deg) rotateZ(${rotateY / 2}deg)`
            }}
        >
            <div className={cn("w-full h-full relative transform-style-3d transition-transform duration-700", isRevealed ? "" : "")}>
                {/* Front is separate from rotation logic in parent motion.div essentially, but we need strictly separate faces */}
                <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(0deg)" }}>
                    <CardFront />
                </div>
                <div className="absolute inset-0 backface-hidden" style={{ transform: "rotateY(180deg)" }}>
                    <CardBack />
                </div>
            </div>
        </motion.div>
    );
};
