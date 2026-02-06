import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGuardianState } from '../contexts/GuardianContext';
import { useSigil } from '../hooks/useSigil';
import { useProfile } from '../hooks/useProfile';
import { cn } from '../lib/utils';

export function ChatInterface() {
    const { profile } = useProfile();
    const { messages, sendMessage, loading } = useSigil(profile?.name);
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
        sendMessage(input);
        setInput('');
    };

    return (
        <div className="flex flex-col min-h-screen w-full max-w-[1200px] mx-auto relative pt-32 md:pt-40">

            {/* Contextual Glow */}
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
            <div className="flex-1 z-20 overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide pb-48 backdrop-blur-3xl bg-black/20 rounded-[3rem] border border-white/5 mx-4 shadow-2xl">
                {messages.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-full opacity-20 italic">
                        <p className="text-amber-100 font-serif tracking-widest uppercase text-[10px]">Silencio Sagrado</p>
                    </div>
                )}

                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={cn(
                            "flex w-full animate-in fade-in slide-in-from-bottom-6 duration-1000",
                            msg.role === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[85%] md:max-w-[70%] px-4 py-2",
                                msg.role === 'user'
                                    ? "text-amber-200/50 italic font-serif text-right text-base"
                                    : "text-white/90 text-[18px] md:text-[22px] leading-relaxed font-serif text-left drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
                            )}
                        >
                            {msg.role === 'model' ? (
                                <TypewriterText text={msg.text} />
                            ) : (
                                <p>{msg.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start animate-in fade-in duration-1000">
                        <div className="px-4 py-4 opacity-40 italic font-serif text-amber-200 animate-pulse text-xl">
                            El éter se ondula...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Ceremonial Input Area */}
            <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] md:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
                <form onSubmit={handleSubmit} className="relative flex items-center group">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl rounded-full border border-white/10 transition-all group-focus-within:border-amber-500/40 shadow-[0_0_30px_rgba(0,0,0,0.5)]" />

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setState('LISTENING')}
                        onBlur={() => setState('RESTING')}
                        placeholder="Susurra tu intención al Sigil..."
                        className="relative w-full bg-transparent py-4 px-8 text-center text-base font-serif text-white focus:outline-none transition-all placeholder:text-white/20 h-[56px]"
                        disabled={loading}
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className={cn(
                            "absolute right-4 p-2 rounded-full transition-all duration-700",
                            input.trim() ? "opacity-100 scale-100 text-amber-500" : "opacity-0 scale-50 pointer-events-none"
                        )}
                    >
                        <Send className="w-5 h-5 shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                    </button>
                </form>
            </div>
        </div>
    );
}

const TypewriterText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 20);
        return () => clearInterval(timer);
    }, [text]);

    return <p>{displayedText}</p>;
};
