import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Wind, Mountain, Sparkles, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useProfile } from '../hooks/useProfile';
import { useEnergy } from '../hooks/useEnergy';
import { generateDailyInsight } from '../lib/energyUtils';



export const EnergiaDelDia: React.FC = () => {

    const ElementIcon = ({ element, className }: { element: string, className?: string }) => {
        switch (element) {
            case 'Fuego': return <Sun className={className} />;
            case 'Aire': return <Wind className={className} />;
            case 'Tierra': return <Mountain className={className} />;
            case 'Agua': return <Moon className={className} />;
            default: return <Sparkles className={className} />;
        }
    };

    // --- LOGIC: GENERATE INSIGHT ---
    const { profile } = useProfile();
    const { energy } = useEnergy();

    // 1. Calculate Universal Day
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const sumDate = day + month + year;
    const reduce = (n: number): number => {
        if (n === 11 || n === 22 || n === 33) return n;
        if (n < 10) return n;
        return reduce(n.toString().split('').reduce((a, b) => a + parseInt(b), 0));
    };
    const universalDayNumber = reduce(sumDate);

    // 2. Get User Vars
    // Personal Number B (Day of birth reduced)
    const birthDay = profile?.birthDate ? parseInt(profile.birthDate.split('-')[2]) : 1;
    const personalNumberB = reduce(birthDay);

    // Zodiac Sign
    const zodiacSign = profile?.astrology?.sunSign || 'Unknown';

    // 3. Generate Insight
    const insight = React.useMemo(() => {
        return generateDailyInsight(zodiacSign, personalNumberB, universalDayNumber);
    }, [zodiacSign, personalNumberB, universalDayNumber]);

    // Data prep for view
    const viewData = {
        personalNumber: personalNumberB,
        dayNumber: universalDayNumber,
        elementOfDay: energy?.dominantElement || 'Eter',
        userElement: 'Tu Elemento', // Todo: map sign to element
        guidance: {
            favored: insight.advice, // Using main advice for now
            sensitive: "Sintoniza con tu intuición...",
            advice: insight.advice,
            warning: undefined
        }
    };

    // --- RENDER ---
    const { guidance, personalNumber, dayNumber, elementOfDay, userElement } = viewData;

    return (
        <div className="w-full max-w-[1200px] mx-auto space-y-12 py-8 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            {/* Header Ritual */}
            <header className="text-center space-y-6 relative py-12">
                <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute inset-0 bg-red-500/5 blur-[100px] rounded-full -z-10"
                />

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center text-3xl font-serif text-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                            {personalNumber}
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-amber-500/40">Vibración Natal</span>
                    </div>

                    <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-red-500/20 to-transparent" />

                    <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-full border border-red-500/20 flex items-center justify-center text-3xl font-serif text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                            {dayNumber}
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-red-500/40">Pulso Diario</span>
                    </div>
                </div>

                <h1 className="text-[28px] sm:text-[38px] font-light tracking-[0.2em] text-amber-50/90 font-serif lowercase italic">
                    Energía del día
                </h1>
            </header>

            {/* Ritual Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Armonía Card */}
                <RitualCard
                    title="Energía en Armonía"
                    content={guidance.favored}
                    icon={<ElementIcon element={elementOfDay} className="w-6 h-6" />}
                    color="amber"
                />

                {/* Sensible Card */}
                <RitualCard
                    title="Presencia Consciente"
                    content={guidance.sensitive}
                    icon={<ElementIcon element={userElement} className="w-6 h-6" />}
                    color="red"
                />

                {/* Advice Card - Full Width */}
                <div className="md:col-span-2">
                    <RitualCard
                        title="Consejo del Oráculo"
                        content={guidance.advice}
                        icon={<Sparkles className="w-6 h-6" />}
                        color="gold"
                        big
                    />
                </div>

                {/* Warning - Conditional */}
                {guidance.warning && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="md:col-span-2 p-6 md:p-8 rounded-3xl border border-red-500/30 bg-red-950/10 flex flex-col md:flex-row items-center gap-6"
                    >
                        <div className="p-3 rounded-full bg-red-500/20 text-red-500 shrink-0">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <p className="text-[17px] text-red-200/60 font-serif italic text-center md:text-left">
                            "{guidance.warning}"
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const RitualCard: React.FC<{ title: string, content: string, icon: React.ReactNode, color: 'red' | 'amber' | 'gold', big?: boolean }> = ({ title, content, icon, color, big }) => {
    const colors = {
        red: 'border-red-500/20 shadow-red-500/10 text-red-400',
        amber: 'border-amber-500/10 shadow-amber-500/5 text-amber-400',
        gold: 'border-amber-400/20 shadow-amber-400/10 text-amber-200'
    };

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={cn(
                "p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-white/[0.01] border backdrop-blur-md relative overflow-hidden group transition-all duration-700",
                colors[color],
                big ? "md:p-14" : ""
            )}
        >
            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-700">
                        {icon}
                    </div>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-white/30">{title}</span>
                </div>
                <p className={cn(
                    "font-serif font-light italic leading-relaxed text-amber-50/70",
                    big ? "text-[18px] sm:text-[21px] md:text-[26px]" : "text-[17px] sm:text-[19px]"
                )}>
                    "{content}"
                </p>
            </div>

            {/* Decoration */}
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000">
                {icon}
            </div>
        </motion.div>
    );
};
