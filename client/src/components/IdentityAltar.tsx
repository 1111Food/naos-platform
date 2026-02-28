import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { User } from 'lucide-react';
import { DeepIdentityView } from './DeepIdentityView';
import { getAuthHeaders } from '../lib/api';
import { WisdomOverlay, WisdomButton } from './WisdomOverlay';
import { getZodiacImage } from '../utils/zodiacMapper';
import { getChineseZodiacImage } from '../utils/chineseMapper';
import { getNahualImage } from '../utils/nahualMapper';
import { NeonNumber } from './NeonNumber';
import { getNumberText } from '../utils/numberMapper';

interface IdentityAltarProps {
    profile: any;
    onEdit: () => void;
}

export const IdentityAltar: React.FC<IdentityAltarProps> = ({ profile, onEdit }) => {
    const [showWisdom, setShowWisdom] = React.useState(false);

    // 1. Essence Number (Life Path Number)
    const essence = profile?.numerology?.lifePathNumber || "?";

    // 2. Dominant Element / Sun Sign Logic
    const sunSign = profile?.astrology?.planets?.find((p: any) => p.name === 'Sun')?.sign || profile?.zodiac_sign || "Desconocido";

    // 3. Chinese Horoscope
    const animal = profile?.chinese_animal || profile?.astrology?.chineseSign || "Dragón";
    const chineseElement = profile?.chinese_element || "";
    const chineseSign = chineseElement ? `${animal} de ${chineseElement}` : animal;

    // 4. Mayan Energy
    const nahuatl = profile?.nawal_maya?.split(' ')[1] || "?";
    const nahualId = profile?.nawal_maya?.toLowerCase().split(' ')[1]?.replace(/'/g, '') || "";

    const [showDeepView, setShowDeepView] = React.useState(false);
    const [rank, setRank] = React.useState("Iniciado");

    // Dynamic Rank Sync
    React.useEffect(() => {
        const fetchRank = async () => {
            try {
                const response = await fetch('/api/ranking', {
                    headers: getAuthHeaders() as HeadersInit
                });
                if (response.ok) {
                    const data = await response.json();
                    setRank(data.personal?.tier || "Iniciado");
                }
            } catch (err) {
                console.error("Failed to sync rank to altar:", err);
            }
        };
        if (profile?.id) fetchRank();
    }, [profile?.id]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative min-h-[60vh] py-12">
            <WisdomOverlay
                key="wisdom-identity"
                isOpen={showWisdom}
                onClose={() => setShowWisdom(false)}
                title="Código de Identidad"
                description="El mapa de tu arquitectura espiritual. Explora tu Carta Astral, Numerología y Nahual para entender tu diseño original."
                accentColor="cyan"
            />

            <AnimatePresence>
                {showDeepView && (
                    <DeepIdentityView
                        profile={profile}
                        onClose={() => setShowDeepView(false)}
                    />
                )}
            </AnimatePresence>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="relative w-full max-w-5xl px-6 flex flex-col items-center gap-16">

                {/* HEADLINE */}
                <div className="text-center space-y-2 relative">
                    <div className="flex items-center justify-center gap-4">
                        <h2 className="text-[28px] font-thin tracking-[0.2em] text-white/80 uppercase">{profile?.name}</h2>
                        <WisdomButton onClick={() => setShowWisdom(true)} color="cyan" className="translate-y-0.5" />
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.4em] text-amber-500/60 font-bold">{profile?.nickname || "El Arquitecto"}</p>
                </div>

                {/* CENTRAL FOCAL POINT */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative group cursor-pointer"
                    onClick={() => setShowDeepView(true)}
                >
                    <div className="absolute inset-0 bg-cyan-400/20 blur-[100px] rounded-full group-hover:bg-cyan-400/40 transition-all duration-1000" />
                    <div className="absolute -inset-12 border border-cyan-500/30 rounded-full animate-spin-slow pointer-events-none drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] border-t-cyan-300" />
                    <div className="absolute -inset-6 border border-fuchsia-500/20 rounded-full animate-[spin_10s_linear_infinite_reverse] pointer-events-none drop-shadow-[0_0_15px_rgba(217,70,239,0.5)] border-b-fuchsia-400" />

                    <div className="relative w-72 h-72 rounded-full bg-black/60 border border-cyan-500/40 backdrop-blur-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden group-hover:border-cyan-400/60 transition-all duration-700 p-8 text-center group-hover:shadow-[0_0_80px_rgba(6,182,212,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-fuchsia-500/10 opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                        <span className="relative z-10 text-2xl font-black tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white leading-relaxed drop-shadow-[0_0_20px_rgba(103,232,249,0.8)]">
                            CÓDIGO DE<br />IDENTIDAD
                        </span>
                    </div>
                </motion.div>

                <div className="w-full max-w-5xl mt-2 sm:mt-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full items-stretch">
                        <StatCard
                            label="ENERGÍA MAYA"
                            value={nahuatl}
                            delay={0.2}
                            image={getNahualImage(nahualId)}
                            nahualId={nahualId}
                            assetType="nahual"
                        />
                        <StatCard
                            label="ENERGÍA NUMÉRICA"
                            value={essence}
                            delay={0.3}
                            isNeonNumber
                        />
                        <StatCard
                            label="SOL ASTRAL"
                            value={sunSign}
                            delay={0.4}
                            image={getZodiacImage(sunSign)}
                            assetType="zodiac"
                        />
                        <StatCard
                            label="ENERGÍA ORIENTAL"
                            value={chineseSign}
                            delay={0.5}
                            image={getChineseZodiacImage(animal)}
                            assetType="chinese"
                        />
                    </div>
                </div>

                {/* RANK & ACTIONS */}
                <div className="flex flex-col items-center gap-12 mt-4">
                    <StatCard label="Rango" value={rank} highlight delay={0.6} />

                    <div className="flex flex-col items-center gap-6">
                        <button
                            onClick={onEdit}
                            className="px-8 py-3 rounded-full border border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white/80 hover:bg-white/5 transition-all flex items-center gap-2"
                        >
                            <User className="w-3 h-3" />
                            <span>Re-escribir Perfil</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    label: string;
    value: any;
    image?: string;
    assetType?: 'nahual' | 'zodiac' | 'chinese' | 'none';
    isNeonNumber?: boolean;
    highlight?: boolean;
    nahualId?: string;
    delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, image, assetType, isNeonNumber, highlight, delay }) => {
    const [imgError, setImgError] = React.useState(false);

    const getNeonColor = () => {
        if (label.includes('MAYA')) return 'emerald';
        if (label.includes('ORIENTAL')) return 'rose';
        if (label.includes('ASTRAL')) return 'cyan';
        return 'fuchsia';
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, duration: 0.8 }}
            className={cn(
                "flex flex-col items-center justify-between p-2 sm:p-4 rounded-2xl border bg-black/40 backdrop-blur-md group hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden h-full min-h-[200px] sm:min-h-[280px]",
                highlight ? "border-amber-500/20 bg-amber-500/5 min-w-[160px] sm:min-w-[200px]" : "border-white/5"
            )}
        >
            {image && !imgError && (
                <img
                    src={image}
                    alt={label}
                    onError={() => setImgError(true)}
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.02] blur-md pointer-events-none"
                />
            )}
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/10 mb-0 z-10 shrink-0">{label}</span>

            <div className="flex-1 w-full relative z-10">
                {(isNeonNumber || (image && !imgError)) ? (
                    <div className="relative w-full max-w-[120px] sm:max-w-[160px] aspect-[3/4] rounded-lg border border-white/10 overflow-hidden shadow-2xl group-hover:border-white/20 transition-all duration-500 bg-black/80 mx-auto">
                        {isNeonNumber ? (
                            <NeonNumber
                                value={value}
                                color={getNeonColor()}
                                className="absolute inset-0"
                                isFullCard
                            />
                        ) : (() => {
                            if (assetType === 'nahual' || assetType === 'chinese') {
                                return (
                                    <motion.img
                                        src={image}
                                        alt={label}
                                        initial={false}
                                        animate={{ scale: 1.35 }}
                                        whileHover={{ scale: 1.45 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        onError={() => setImgError(true)}
                                        className="absolute inset-0 w-full h-full object-cover object-center brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    />
                                );
                            } else {
                                // For Zodiac and others
                                return (
                                    <motion.img
                                        src={image}
                                        alt={label}
                                        initial={false}
                                        animate={{ scale: 2.5 }}
                                        whileHover={{ scale: 2.6 }}
                                        transition={{ duration: 0.7, ease: "easeOut" }}
                                        onError={() => setImgError(true)}
                                        className="absolute inset-0 w-full h-full object-cover object-center brightness-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    />
                                );
                            }
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                        <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-4">
                        <span className={cn(
                            "text-xl sm:text-2xl font-thin tracking-widest text-center",
                            highlight ? "text-amber-100 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "text-white/80"
                        )}>
                            {value}
                        </span>
                    </div>
                )}
            </div>

            <div className="mt-0 z-10 min-h-[1.2rem] flex items-center justify-center">
                {image && !imgError && !isNeonNumber && (
                    <span className="text-[9px] sm:text-[10px] font-light text-white/30 tracking-[0.1em] uppercase text-center line-clamp-1 px-1">
                        {value}
                    </span>
                )}
                {isNeonNumber && (
                    <span className="text-[9px] sm:text-[10px] font-light text-white/30 tracking-[0.1em] uppercase text-center">
                        {getNumberText(value)}
                    </span>
                )}
                {highlight && !image && !isNeonNumber && (
                    <span className="text-[9px] text-amber-500/60 uppercase tracking-widest font-bold">Rango Actual</span>
                )}
            </div>
        </motion.div>
    );
};
