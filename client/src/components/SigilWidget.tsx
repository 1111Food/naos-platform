import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';

interface SigilWidgetProps {
    onNavigate: (view: any) => void;
    externalMessage?: string | null;
}

export const SigilWidget: React.FC<SigilWidgetProps> = ({ onNavigate, externalMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'sigil', text: string }[]>([
        { role: 'sigil', text: 'Soy el Sigil, el guardián de este templo digital (Naos). ¿Qué buscas en el tejido del tiempo?' }
    ]);

    // Handle External Notifications (e.g., Save Success)
    React.useEffect(() => {
        if (externalMessage) {
            setMessages(prev => [...prev, { role: 'sigil', text: externalMessage }]);
            setIsOpen(true);
        }
    }, [externalMessage]);

    const handleSend = () => {
        if (!input.trim()) return;

        const cmd = input.toLowerCase();
        const newMsgs = [...messages, { role: 'user' as const, text: input }];
        setMessages(newMsgs);
        setInput('');

        // Command processing
        setTimeout(() => {
            let response = "No entiendo ese comando.";

            if (cmd.includes('tarot') || cmd.includes('cartas')) {
                response = "Abriendo el Oráculo...";
                onNavigate('TAROT');
            } else if (cmd.includes('carta') || cmd.includes('astral') || cmd.includes('astro')) {
                response = "Desplegando Carta Astral...";
                onNavigate('ASTRO');
            } else if (cmd.includes('neuro') || cmd.includes('numer')) {
                response = "Calculando vibración...";
                onNavigate('NUMERO');
            } else if (cmd.includes('maya') || cmd.includes('nahual')) {
                response = "Conectando con el Tzolkin...";
                onNavigate('MAYA');
            } else if (cmd.includes('inicio') || cmd.includes('home')) {
                response = "Volviendo al Templo.";
                onNavigate('TEMPLE');
            }

            setMessages(prev => [...prev, { role: 'sigil', text: response }]);
        }, 500);
    };

    return (
        <div className="fixed top-20 md:top-28 left-6 md:left-auto md:right-6 z-[60] flex flex-col items-start md:items-end pointer-events-none">

            {/* Chat Window */}
            <div className={`pointer-events-auto bg-black/95 backdrop-blur-2xl border border-red-500/20 rounded-3xl w-[85vw] md:w-80 mb-4 overflow-hidden transition-all duration-300 origin-top-left md:origin-bottom-right shadow-[0_0_30px_rgba(255,0,0,0.2)] ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 h-0'}`}>
                <div className="p-4 h-64 overflow-y-auto flex flex-col gap-3">
                    {messages.map((m, i) => (
                        <div key={i} className={`text-xs p-3 rounded-xl max-w-[80%] ${m.role === 'sigil' ? 'bg-white/10 self-start text-white' : 'bg-primary/20 self-end text-primary-foreground'}`}>
                            {m.text}
                        </div>
                    ))}
                </div>
                <div className="p-3 border-t border-white/10 flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                        placeholder="Escribe un comando..."
                    />
                    <button onClick={handleSend}>
                        <Send className="w-4 h-4 text-primary" />
                    </button>
                </div>
            </div>

            {/* Avatar Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-red-600 to-amber-600 p-[1px] shadow-[0_0_15px_rgba(255,0,0,0.4)] hover:scale-110 transition-transform group"
            >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-amber-500/20 animate-pulse" />
                    {isOpen ? <X className="w-5 h-5 md:w-6 md:h-6 text-white" /> : <SigilIconSmall className="w-5 h-5 md:w-6 md:h-6 text-white" />}
                </div>
            </button>
        </div>
    );
};

const SigilIconSmall = ({ className }: { className: string }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 2L14.5 9H21L15.5 13.5L18 20.5L12 16L6 20.5L8.5 13.5L3 9H9.5L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
    </svg>
);
