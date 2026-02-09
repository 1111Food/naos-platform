import React from 'react';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';
import { cn } from '../lib/utils';
import { useGuardianState } from '../contexts/GuardianContext';

import { motion, AnimatePresence } from 'framer-motion';

interface GuardianProps {
    view: 'LANDING' | 'ONBOARDING' | 'TEMPLE' | 'ASTRO' | 'NUMERO' | 'TAROT' | 'FENGSHUI' | 'CHAT' | 'SYNASTRY' | 'MAYA' | 'TRANSITS' | 'ORIENTAL';
    onOpenChat?: () => void;
}

export const Guardian: React.FC<GuardianProps> = ({ view, onOpenChat }) => {
    const timeMode = useTimeBasedMode();
    const { state } = useGuardianState();
    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine Visibility, Scale and Position based on view
    const isHidden = view === 'LANDING' || view === 'ONBOARDING';
    const isResting = view === 'TEMPLE';
    const isChatting = view === 'CHAT';
    const isManifesting = ['ASTRO', 'NUMERO', 'TAROT', 'FENGSHUI', 'SYNASTRY', 'MAYA', 'TRANSITS', 'ORIENTAL'].includes(view);

    // Interaction states
    const isListening = state === 'LISTENING';
    const isResponding = state === 'RESPONDING';

    // Scroll-reactive transforms (base)
    const scrollScale = Math.max(0.92, 1 - scrollY / 1000);
    const scrollOpacity = Math.max(0.85, 1 - scrollY / 2000);

    // Cache busting reference
    const assetVersion = React.useMemo(() => new Date().getTime(), []);

    return (
        <AnimatePresence>
            {!isHidden && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    className={cn(
                        "fixed z-[100] left-1/2 cursor-pointer pointer-events-auto",
                        isResting && "top-[calc(120px+env(safe-area-inset-top))] md:top-[80px]",
                        isChatting && "top-[calc(120px+env(safe-area-inset-top))] md:top-[80px]",
                        isManifesting && "top-[calc(4rem+env(safe-area-inset-top))] left-6 -translate-x-0 !w-20 !h-20"
                    )}
                    animate={{
                        opacity: isManifesting ? 0.4 : scrollOpacity,
                        scale: isManifesting ? 0.6 : (isResting ? scrollScale * 1.2 : scrollScale),
                        x: isManifesting ? 0 : "-50%",
                        y: 0,
                        rotate: isManifesting ? 12 : 0,
                        width: isManifesting ? 80 : (isResting ? (window.innerWidth < 768 ? 192 : 288) : (window.innerWidth < 768 ? 128 : 160)),
                        height: isManifesting ? 80 : (isResting ? (window.innerWidth < 768 ? 192 : 288) : (window.innerWidth < 768 ? 128 : 160))
                    }}
                    style={{}}
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenChat?.();
                    }}
                >
                    {/* Sacred Breathing & Floating Wrapper */}
                    <motion.div
                        animate={{
                            y: [0, -4, 0],
                            scale: isListening ? 1.03 : isResponding ? 1.05 : [1, 1.02, 1],
                        }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            scale: isListening || isResponding
                                ? { duration: 0.5 }
                                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative w-full h-full"
                        style={isResting ? { transform: 'translateY(5vh)' } : {}}
                    >
                        {/* Halo / Aura - Intensity depends on state */}
                        <motion.div
                            animate={{
                                opacity: isResponding ? [0.4, 0.7, 0.4] : isResting ? 0.3 : 0.1,
                                scale: isListening ? 1.15 : isResponding ? 1.25 : 1,
                            }}
                            transition={{
                                opacity: isResponding ? { duration: 1, repeat: Infinity } : { duration: 1 },
                                scale: { duration: 0.8 }
                            }}
                            className={cn(
                                "absolute inset-0 bg-amber-400/20 blur-[60px] rounded-full transition-colors duration-1000",
                                isResponding && "bg-white/40 blur-[80px]"
                            )}
                        />

                        {/* Main Guardian Identity - FORCED MASKING SOLUTION */}
                        <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: 'transparent !important', boxShadow: 'none !important', border: 'none !important' }}>
                            <video
                                key={`${timeMode}-${assetVersion}`}
                                src={timeMode === 'DAY' ? `/Guardian-Day.mp4?v=${assetVersion}` : `/Guardian-Night.mp4?v=${assetVersion}`}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className={cn(
                                    "w-full h-full object-cover transition-opacity duration-1000 relative z-10",
                                    isResponding && "brightness-150"
                                )}
                                style={{
                                    objectPosition: '52% 48%',
                                    mixBlendMode: 'screen',
                                    background: 'transparent',
                                    maskImage: 'radial-gradient(closest-side, black 40%, transparent 90%)',
                                    WebkitMaskImage: 'radial-gradient(closest-side, black 40%, transparent 90%)',
                                    filter: 'contrast(1.1) brightness(0.9)'
                                }}
                            />
                        </div>

                        {/* Internal Glow - Pulses when responding */}
                        <motion.div
                            animate={{
                                opacity: isResponding ? [0.1, 0.3, 0.1] : 0.05,
                                scale: isResponding ? [1, 1.2, 1] : 1
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className={cn(
                                "absolute inset-4 rounded-full bg-amber-500/5 blur-2xl",
                                isResponding && "bg-white/20 blur-3xl"
                            )}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
