import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuardianState } from '../contexts/GuardianContext';
import { useSigil } from '../hooks/useSigil';
import { useProfile } from '../hooks/useProfile';
import { useEnergy } from '../hooks/useEnergy';
import { cn } from '../lib/utils';

export function ChatInterface() {
    const { profile } = useProfile();
    const { dynamicScore, regulationBoost } = useEnergy();

    const energyContext = {
        updated_energy_score: dynamicScore,
        regulation_today: regulationBoost,
        last_sanctuary_element: 'UNKNOWN', // Ideally we fetch this from last session if needed
        post_session_state: 'UNKNOWN'
    };

    const { messages, sendMessage, loading } = useSigil(profile?.name, energyContext);
    const { setState } = useGuardianState();
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    const isWarning = messages.some(m =>
        m.role === 'model' &&
        (m.text.toLowerCase().includes('error') ||
            m.text.toLowerCase().includes('turbulento') ||
            m.text.toLowerCase().includes('saturado'))
    );

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (loading) setState('RESPONDING');
        else setState('RESTING');
    }, [loading, setState]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        sendMessage(input, 'maestro');
        setInput('');
    };

    return (
        <div className="flex flex-col min-h-screen w-full max-w-[1200px] mx-auto relative pt-32 md:pt-40 overflow-hidden">

            {/* STITCH: Star Dust Particles Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Static Stars */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow" />

                {/* Floating Orbs (CSS Animation) */}
                <motion.div
                    animate={{ y: [0, -100, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{ y: [0, 100, 0], opacity: [0.05, 0.2, 0.05] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"
                />
            </div>

            {/* Contextual Glow (Dynamic) */}
            <AnimatePresence>
                <motion.div
                    key={isWarning ? 'warning' : 'normal'}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 0.15,
                        backgroundColor: isWarning ? "#ef4444" : "#d4af37"
                    }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 pointer-events-none blur-[120px] z-0"
                />
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 z-20 overflow-y-auto px-4 md:px-12 py-6 space-y-12 scrollbar-hide pb-48">
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full opacity-30">
                        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-4 animate-pulse">
                            <Send size={20} className="text-white/50" />
                        </div>
                        <p className="text-amber-100/50 font-serif tracking-[0.2em] uppercase text-[10px]">El Oráculo Escucha</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-6 duration-700",
                            msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[85%] md:max-w-[70%] px-6 py-4 rounded-2xl backdrop-blur-md",
                                msg.role === 'user'
                                    ? "bg-white/5 border border-white/10 text-right"
                                    : "bg-black/40 border border-amber-500/10 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                            )}
                        >
                            {msg.role === 'user' ? (
                                <p className="text-white/70 italic font-serif text-lg">{msg.text}</p>
                            ) : (
                                <div className="text-amber-50 text-[16px] md:text-[18px] leading-relaxed font-light tracking-wide drop-shadow-md">
                                    <TypewriterText text={msg.text} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start animate-in fade-in duration-1000">
                        <div className="px-6 py-4 bg-black/20 border border-white/5 rounded-2xl flex items-center gap-3">
                            <div className="flex gap-1">
                                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                                <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-amber-500/50 rounded-full" />
                            </div>
                            <span className="text-xs uppercase tracking-widest text-white/30">Interpretando...</span>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Ceremonial Input Area (Glass Console) */}
            <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-40">
                <form onSubmit={handleSubmit} className="relative group">
                    {/* Glass Container */}
                    <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 group-focus-within:border-amber-500/30 group-focus-within:shadow-[0_0_50px_rgba(212,175,55,0.1)]" />

                    {/* Inner Glow */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative flex items-center px-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={() => setState('LISTENING')}
                            onBlur={() => setState('RESTING')}
                            placeholder="Escribe tu consulta al oráculo..."
                            className="w-full bg-transparent py-5 px-6 text-lg font-light text-white focus:outline-none placeholder:text-white/20 placeholder:font-serif placeholder:italic h-[64px]"
                            disabled={loading}
                        />

                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className={cn(
                                "p-3 rounded-full transition-all duration-500 hover:bg-white/5",
                                input.trim() ? "text-amber-500 opacity-100 rotate-0" : "text-white/10 opacity-50 rotate-90"
                            )}
                        >
                            <Send className={cn("w-6 h-6", input.trim() && "drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]")} />
                        </button>
                    </div>
                </form>
                <p className="text-center text-[9px] text-white/10 mt-3 uppercase tracking-[0.3em]">Conexión Sigil v3.0 // Canal Seguro</p>
            </div>
        </div>
    );
}

const TypewriterText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');

    // Stitch: Faster, smoother typing
    useEffect(() => {
        let index = 0;
        setDisplayedText('');
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 15); // Faster (15ms)
        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="inline">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-4 ml-1 bg-amber-400 align-middle shadow-[0_0_5px_rgba(251,191,36,0.8)]"
            />
        </span>
    );
};
