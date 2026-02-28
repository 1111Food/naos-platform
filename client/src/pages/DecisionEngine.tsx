import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Zap, Send } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useWisdom } from '../hooks/useWisdom';
import { WisdomButton } from '../components/WisdomOverlay';

interface DecisionEngineProps {
    onBack: () => void;
}

export const DecisionEngine: React.FC<DecisionEngineProps> = ({ onBack }) => {
    const { openWisdom } = useWisdom();
    const { playSound } = useSound();
    const [dilemma, setDilemma] = useState('');
    const [analysis, setAnalysis] = useState<null | any>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!dilemma.trim()) return;
        playSound('transition');
        setIsAnalyzing(true);

        // Simulating IA Radiography
        await new Promise(r => setTimeout(r, 2000));

        playSound('success');
        setAnalysis({
            coherence: 85,
            vector: 'EXPANSIÓN',
            archetype: 'EL ARQUITECTO',
            guidance: 'Esta decisión resuena con tu diseño base. El vector de riesgo es bajo si mantienes el enfoque en la estructura.',
            pillars: [
                { name: 'PROPÓSITO', value: 90 },
                { name: 'ENERGÍA', value: 70 },
                { name: 'ESTRUCTURA', value: 85 }
            ]
        });
        setIsAnalyzing(false);
    };

    return (
        <div className="relative min-h-screen p-6 md:p-12 flex flex-col items-center">
            {/* Header */}
            <header className="w-full max-w-4xl flex items-center justify-between mb-12">
                <button onClick={() => { playSound('click'); onBack(); }} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black">Regresar</span>
                </button>
                <WisdomButton color="purple" onClick={() => { playSound('click'); openWisdom('DECISIONS'); }} />
            </header>

            <main className="w-full max-w-2xl space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif italic text-white/90">Radiografía de Decisiones</h1>
                    <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Análisis Estratégico por IA</p>
                </div>

                {/* Input Area */}
                <div className="relative">
                    <textarea
                        value={dilemma}
                        onChange={(e) => setDilemma(e.target.value)}
                        placeholder="Describe el dilema o la bifurcación estratégica..."
                        className="w-full h-40 bg-black/40 border border-white/10 rounded-3xl p-8 text-white placeholder:text-white/10 focus:border-purple-500/50 outline-none transition-all resize-none font-light leading-relaxed"
                    />
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !dilemma.trim()}
                        className="absolute bottom-4 right-4 p-4 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/40 transition-all disabled:opacity-20"
                    >
                        {isAnalyzing ? <Zap className="animate-spin" size={18} /> : <Send size={18} />}
                    </button>
                </div>

                {/* Results */}
                <AnimatePresence>
                    {analysis && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-purple-500/5 border border-purple-500/20 rounded-[2.5rem] p-8 md:p-12 space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-purple-400 font-bold">Vector de Decisión</span>
                                    <div className="text-2xl font-serif italic text-white">{analysis.vector}</div>
                                </div>
                                <div className="text-right space-y-1">
                                    <span className="text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold">Coherencia</span>
                                    <div className="text-2xl font-mono text-purple-400">{analysis.coherence}%</div>
                                </div>
                            </div>

                            <p className="text-sm md:text-base text-white/70 leading-relaxed font-light italic">
                                "{analysis.guidance}"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {analysis.pillars.map((p: any) => (
                                    <div key={p.name} className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                                        <div className="text-[8px] uppercase tracking-widest text-white/30 mb-2">{p.name}</div>
                                        <div className="text-lg font-mono text-white">{p.value}%</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};
