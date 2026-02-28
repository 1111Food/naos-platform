import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface StrategicCardProps {
    id: number;
    name?: string;
    isRevealed?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}

const SUPABASE_BASE_URL = 'https://avaikhukgugvcocwedsz.supabase.co/storage/v1/object/public/tarot-assets/';

// Mapper for IDs to the specific filenames in Supabase
const ARCANA_NAMES: Record<number, string> = {
    0: "El Loco", 1: "El Mago", 2: "La Sacerdotisa", 3: "La Emperatriz", 4: "El Emperador",
    5: "El Hierofante", 6: "Los Enamorados", 7: "El Carro", 8: "La Fuerza", 9: "El Ermitaño",
    10: "La Rueda de la Fortuna", 11: "La Justicia", 12: "El Colgado", 13: "La Muerte", 14: "La Templanza",
    15: "El Diablo", 16: "La Torre", 17: "La Estrella", 18: "La Luna", 19: "El Sol", 20: "El Juicio", 21: "El Mundo"
};

export const StrategicCard: React.FC<StrategicCardProps> = ({
    id,
    name,
    isRevealed = false,
    isSelected = false,
    onClick,
    className
}) => {
    const arcanaName = (name || ARCANA_NAMES[id] || "Arcano").trim();

    // Constructing the specific filename pattern: arcano-[ID].jpg (Nombre).jpg
    const filename = `arcano-${id}.jpg (${arcanaName}).jpg`;

    // encodeURI is often better for storage paths as it preserves characters like ()
    const imageUrl = `${SUPABASE_BASE_URL}${encodeURI(filename)}`;
    const backImageUrl = `${SUPABASE_BASE_URL}arcano-back.jpg`;

    return (
        <div className={cn("relative w-full h-full perspective-1000", className)}>
            <motion.div
                onClick={onClick}
                className="relative w-full h-full cursor-pointer"
                initial={false}
                animate={{
                    rotateY: isRevealed ? 180 : 0,
                }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* CARD BACK (Initial state - 0deg) */}
                <motion.div
                    className={cn(
                        "absolute inset-0 rounded-2xl border border-white/10 shadow-2xl overflow-hidden",
                        isSelected && "ring-2 ring-red-500/50"
                    )}
                    initial={false}
                    animate={{ opacity: isRevealed ? 0 : 1 }}
                    style={{
                        backgroundImage: `url("${backImageUrl}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(0deg)',
                        position: 'absolute'
                    }}
                >
                    <div className="absolute inset-0 bg-black/20" />
                </motion.div>

                {/* CARD FRONT (Revealed state - 180deg) */}
                <motion.div
                    className={cn(
                        "absolute inset-0 rounded-2xl border border-red-500/30 overflow-hidden"
                    )}
                    initial={false}
                    animate={{
                        opacity: isRevealed ? 1 : 0,
                        boxShadow: isRevealed ? "0 0 40px rgba(239,68,68,0.6)" : "none"
                    }}
                    style={{
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#1a1a1c',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        position: 'absolute'
                    }}
                >
                    {/* Neon Glow Perimeter */}
                    {isRevealed && (
                        <>
                            <div className="absolute inset-0 pointer-events-none ring-inset ring-2 ring-red-500/40 shadow-[inset_0_0_30px_rgba(239,68,68,0.4)]" />
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0 pointer-events-none bg-red-500/5"
                            />
                        </>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
};
