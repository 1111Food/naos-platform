import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Hash, Sun, Scroll, ChevronLeft } from 'lucide-react';
import { AstrologyView } from './AstrologyView';
import { NumerologyView } from './NumerologyView';
import { NawalView } from './NawalView';
import { SabiduriaOriental } from './SabiduriaOriental';

interface DeepIdentityViewProps {
    profile: any;
    onClose: () => void;
}

type TabType = 'ASTRO' | 'NUMERO' | 'MAYA' | 'ORIENTAL';

export const DeepIdentityView: React.FC<DeepIdentityViewProps> = ({ profile, onClose }) => {
    const [activeTab, setActiveTab] = useState<TabType>('ASTRO');

    const tabs = [
        { id: 'ASTRO', label: 'Astrología', icon: Star, color: 'text-purple-400' },
        { id: 'NUMERO', label: 'Numerología', icon: Hash, color: 'text-rose-400' },
        { id: 'MAYA', label: 'Cosmogonía Maya', icon: Sun, color: 'text-amber-400' },
        { id: 'ORIENTAL', label: 'Sabiduría Oriental', icon: Scroll, color: 'text-cyan-400' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'ASTRO': return <AstrologyView overrideProfile={profile} />;
            case 'NUMERO': return <NumerologyView overrideProfile={profile} />;
            case 'MAYA': return <NawalView overrideProfile={profile} />;
            case 'ORIENTAL': return <SabiduriaOriental overrideProfile={profile} />;
            default: return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col pt-20"
        >
            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* HEADER / NAVIGATION */}
            <header className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col gap-8 pb-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors group"
                    >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Cerrar Código
                    </button>
                    <div className="text-right">
                        <h2 className="text-xl font-thin tracking-[0.3em] text-white/90 uppercase">Código de Identidad</h2>
                        <p className="text-[9px] text-white/20 uppercase tracking-widest mt-1">Deep Work Architecture</p>
                    </div>
                </div>

                {/* TABS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 custom-scrollbar lg:justify-center">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`
                                    flex items-center gap-3 px-6 py-3 rounded-full border transition-all shrink-0
                                    ${isActive
                                        ? 'bg-white/10 border-white/20 text-white shadow-lg'
                                        : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}
                                `}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-current'}`} />
                                <span className="text-[10px] uppercase tracking-widest whitespace-nowrap">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </header>

            {/* CONTENT AREA */}
            <main className="relative z-10 flex-1 overflow-y-auto px-6 pb-20 custom-scrollbar w-full max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full"
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </motion.div>
    );
};
