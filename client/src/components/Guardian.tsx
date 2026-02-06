import React from 'react';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';
import { cn } from '../lib/utils';
import { useGuardianState } from '../contexts/GuardianContext';

import { motion, AnimatePresence } from 'framer-motion';

interface GuardianProps {
    view: 'LANDING' | 'ONBOARDING' | 'TEMPLE' | 'ASTRO' | 'NUMERO' | 'TAROT' | 'FENGSHUI' | 'CHAT' | 'SYNASTRY' | 'MAYA' | 'TRANSITS';
}

export const Guardian: React.FC<GuardianProps> = ({ view }) => {
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
    const isManifesting = ['ASTRO', 'NUMERO', 'TAROT', 'FENGSHUI', 'SYNASTRY', 'MAYA', 'TRANSITS'].includes(view);

    // Interaction states
    const isListening = state === 'LISTENING';
    const isResponding = state === 'RESPONDING';

    // Scroll-reactive transforms (base)
    const scrollScale = Math.max(0.92, 1 - scrollY / 1000);
    const scrollOpacity = Math.max(0.85, 1 - scrollY / 2000);

    return (
        <AnimatePresence>
            {!isHidden && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{
                        opacity: isManifesting ? 0.4 : scrollOpacity,
                        scale: isManifesting ? 0.6 : (isResting ? scrollScale * 1.2 : scrollScale),
                        x: "-50%",
                        y: 0,
                        rotate: isManifesting ? 12 : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={cn(
                        "fixed z-30 pointer-events-none left-1/2",
                        isResting && "top-[calc(120px+env(safe-area-inset-top))] md:top-[80px] w-48 h-48 md:w-72 md:h-72",
                        isChatting && "top-[calc(120px+env(safe-area-inset-top))] md:top-[80px] w-32 h-32 md:w-40 md:h-40",
                        isManifesting && "top-[calc(4rem+env(safe-area-inset-top))] left-6 -translate-x-0 w-20 h-20"
                    )}
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

                        {/* Main Guardian Identity */}
                        <div className="relative w-full h-full">
                            <video
                                key={timeMode}
                                src={timeMode === 'DAY' ? "/Guardian-Day.mp4" : "/Guardian-Night.mp4"}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={cn(
                                    "w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,210,125,0.4)] transition-opacity duration-1000",
                                    isResponding && "drop-shadow-[0_0_40px_rgba(255,255,255,0.6)]"
                                )}
                                onError={(e) => {
                                    const img = e.currentTarget.parentElement?.querySelector('img');
                                    if (img) {
                                        e.currentTarget.style.display = 'none';
                                        img.style.display = 'block';
                                    }
                                }}
                            />
                            <img
                                src={timeMode === 'DAY' ? "/sigil-day.png" : "/sigil-night.png"}
                                alt="Guardian Fallback"
                                style={{ display: 'none' }}
                                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,210,125,0.4)]"
                            />

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
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
