import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, ArrowLeft, Users, Eye } from 'lucide-react'; // Using Eye for Oracle, Users for Souls
import { Tarot } from './Tarot';
import { SynastryModule } from '../components/SynastryModule';
import { useCoherence } from '../hooks/useCoherence';
import { cn } from '../lib/utils';
import { LowEnergyWarningModal } from '../components/LowEnergyWarningModal';
import { useSound } from '../hooks/useSound';

interface OracleSoulsViewProps {
    onBack: () => void;
    onNavigate: (view: any) => void;
}

type Tab = 'TAROT' | 'SOULS';

export const OracleSoulsView: React.FC<OracleSoulsViewProps> = ({ onBack, onNavigate }) => {
    const { score } = useCoherence();
    const [activeTab, setActiveTab] = useState<Tab | null>(null); // Initial null to force selection or default handled carefully
    // We default to 'TAROT' but we want to intercept the *switch* too if we want strictness, 
    // but maybe just intercept the initial render? 
    // Actually, user said: "Al hacer clic, NO ENTRES DIRECTAMENTE." (From Home -> Oracle View).
    // But OracleView HAS tabs. So when switching tabs? Or just entering the view?
    // Let's assume navigating TO the features inside. 

    // Let's start with 'TAROT' active by default, but checking immediately might be annoying?
    // User said: "CurrentCoherence < 40%: opens Modal... redirects to Sanctuary or Proceeds".

    const [pendingTab, setPendingTab] = useState<Tab | null>(null);
    const [showWarning, setShowWarning] = useState(false);
    const [hasProceeded, setHasProceeded] = useState(false);

    // Initial check on mount? No, maybe just when switching.
    // Let's default activeTab to 'TAROT' but run the check logic.

    const { playSound } = useSound();

    const handleTabChange = (tab: Tab) => {
        playSound('click');
        if (score < 40 && !hasProceeded) {
            setPendingTab(tab);
            setShowWarning(true);
        } else {
            setActiveTab(tab);
        }
    };

    // Effect to set initial tab if validated? 
    // Actually, simply:
    // If score < 40, show modal immediately on mount? 
    // The user flow: Click Module -> (Home calls onNav) -> OracleView Mounts.
    // So yes, on amount check.

    // Initial check Removed - we show the menu first, validation happens on click

    const handleProceed = () => {
        playSound('success');
        setHasProceeded(true);
        setShowWarning(false);
        setActiveTab(pendingTab);
    };

    const handleElevate = () => {
        onNavigate('SANCTUARY');
    };

    const tabs = [
        {
            id: 'TAROT',
            label: 'Oráculo',
            subtitle: 'Exploración mística y respuestas del universo.',
            icon: Flower2,
            color: 'text-rose-400',
            gradient: "from-rose-500/20 to-orange-500/10",
            border: "border-rose-500/30",
            glow: "shadow-[0_0_40px_-10px_rgba(244,63,94,0.4)]"
        },
        {
            id: 'SOULS',
            label: 'Vínculos de Almas',
            subtitle: 'Sincronía, sinastría y conexiones profundas.',
            icon: Users,
            color: 'text-purple-400',
            gradient: "from-purple-500/20 to-indigo-500/10",
            border: "border-purple-500/30",
            glow: "shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]"
        },
    ];

    return (
        <div className="w-full min-h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!activeTab ? (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative min-h-screen flex flex-col items-center justify-center p-6"
                    >
                        <motion.button
                            onClick={() => { playSound('click'); onBack(); }}
                            className="absolute top-12 left-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black">Regresar al Templo</span>
                        </motion.button>

                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-serif italic text-white/90 tracking-wide">
                                ¿Qué busca tu alma hoy?
                            </h2>
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent mx-auto" />
                            <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Oráculo & Vínculos</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                            {tabs.map((tab, i) => (
                                <motion.div
                                    key={tab.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => handleTabChange(tab.id as Tab)}
                                    className={cn(
                                        "relative group cursor-pointer p-10 rounded-[3rem] border transition-all duration-700 overflow-hidden bg-black/40 backdrop-blur-3xl",
                                        tab.border,
                                        tab.glow,
                                        "hover:scale-[1.02] hover:bg-white/5"
                                    )}
                                >
                                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", tab.gradient)} />

                                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                        <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-500">
                                            <tab.icon size={32} className={cn("transition-colors", tab.color)} />
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold tracking-[0.1em] text-white/90">
                                                {tab.label.toUpperCase()}
                                            </h3>
                                            <p className="text-[11px] text-white/40 uppercase tracking-widest leading-relaxed">
                                                {tab.subtitle}
                                            </p>
                                        </div>

                                        <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-rose-400">Consultar</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full pt-20 pb-32"
                    >
                        {/* Header / Nav */}
                        <div className="fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10">
                            <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-4 w-full md:w-auto">
                                    <button onClick={() => { playSound('click'); setActiveTab(null); }} className="p-2 text-white/50 hover:text-white transition-colors">
                                        <ArrowLeft size={20} />
                                    </button>
                                    <div>
                                        <h1 className="text-xl font-serif text-white italic flex items-center gap-2">
                                            <Eye size={16} className="text-rose-400" />
                                            Oráculo & Vínculos
                                        </h1>
                                        <p className="text-[10px] uppercase tracking-widest text-white/40">
                                            Exploración Mística & Relacional
                                        </p>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                                    {tabs.map((tab) => {
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => handleTabChange(tab.id as Tab)}
                                                className={cn(
                                                    "relative px-4 py-2 rounded-full flex items-center gap-2 transition-all whitespace-nowrap",
                                                    isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                                )}
                                            >
                                                <tab.icon size={14} className={isActive ? tab.color : ""} />
                                                <span className="text-xs uppercase tracking-wider font-medium">{tab.label}</span>

                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeTabOracle"
                                                        className={cn("absolute inset-0 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]", "bg-gradient-to-r from-transparent via-white/5 to-transparent")}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Content Content */}
                        <div className="max-w-5xl mx-auto px-4 mt-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {activeTab === 'TAROT' && (
                                        <div className="bg-black/20 rounded-3xl border border-white/5 p-1 md:p-4">
                                            <Tarot onBack={() => { playSound('click'); setActiveTab(null); }} embedded />
                                        </div>
                                    )}
                                    {activeTab === 'SOULS' && (
                                        <div className="bg-black/20 rounded-3xl border border-white/5 p-4 md:p-8">
                                            <div className="flex justify-start mb-4">
                                                <button onClick={() => { playSound('click'); setActiveTab(null); }} className="p-2 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest">
                                                    <ArrowLeft size={14} /> Volver a Selección
                                                </button>
                                            </div>
                                            <SynastryModule />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Warning Modal */}
            <LowEnergyWarningModal
                isOpen={showWarning}
                currentCoherence={score}
                onElevate={handleElevate}
                onProceed={handleProceed}
                onCancel={() => setShowWarning(false)}
            />
        </div>
    );
};
