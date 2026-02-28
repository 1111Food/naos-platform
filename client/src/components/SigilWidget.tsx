import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';
import { useSigil } from '../hooks/useSigil';
import { useProfile } from '../hooks/useProfile';

interface SigilWidgetProps {
    onNavigate: (view: any) => void;
    externalMessage?: string | null;
}

export const SigilWidget: React.FC<SigilWidgetProps> = ({ onNavigate, externalMessage }) => {
    const timeMode = useTimeBasedMode();
    const { profile } = useProfile();
    const { messages: aiMessages, sendMessage, loading } = useSigil(profile?.nickname || profile?.name);
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');

    // Filter messages for the widget (only sigil/guardian role)
    // We actually use a local state for the widget chat to avoid mixing with main chat
    const [messages, setMessages] = useState<{ role: 'user' | 'sigil', text: string }[]>([
        { role: 'sigil', text: `Acceso concedido, Luis. Como Cáncer que eres, las llaves del Templo están listas. ¿A dónde deseas navegar?` }
    ]);

    // Handle External Notifications (e.g., Save Success)
    React.useEffect(() => {
        if (externalMessage) {
            setMessages(prev => [...prev, { role: 'sigil', text: externalMessage }]);
        }
    }, [externalMessage]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const cmd = input.toLowerCase();
        const userText = input;
        setInput('');

        setMessages(prev => [...prev, { role: 'user', text: userText }]);

        // Procedural commands for quick navigation (Intuitive S2 Mapping v6.5)
        if (cmd.includes('tarot') || cmd.includes('cartas')) {
            onNavigate('TAROT');
        } else if (cmd.includes('carta') || cmd.includes('astral') || cmd.includes('sol') || cmd.includes('estrellas') || cmd.includes('astros') || cmd.includes('luna')) {
            onNavigate('ASTRO');
        } else if (cmd.includes('nahual') || cmd.includes('maya') || cmd.includes('espíritu') || cmd.includes('glifo')) {
            onNavigate('MAYA');
        } else if (cmd.includes('numer') || cmd.includes('pinnac') || cmd.includes('vibración') || cmd.includes('metas')) {
            onNavigate('NUMERO');
        } else if (cmd.includes('chino') || cmd.includes('oriental') || cmd.includes('buey') || cmd.includes('dragón')) {
            onNavigate('CHINESE');
        } else if (cmd.includes(' status')) {
            setMessages(prev => [...prev, { role: 'sigil', text: 'Conexión cuántica activa. Identidad: Luis (Cáncer). Sincronización 100%.' }]);
        }

        // Call the AI Guardian (role: 'guardian')
        try {
            await sendMessage(userText, 'guardian');
        } catch (e) {
            console.error("Guardian Error:", e);
        }
    };

    // Effect to sync AI messages back to local widget display
    React.useEffect(() => {
        if (aiMessages.length > 0) {
            const lastMsg = aiMessages[aiMessages.length - 1];
            if (lastMsg.role === 'model') {
                setMessages(prev => [...prev, { role: 'sigil', text: lastMsg.text }]);
            }
        }
    }, [aiMessages]);

    return (
        <div className="fixed top-[120px] right-[20px] z-[60] flex flex-col items-end pointer-events-none">

            {/* Chat Window */}
            <div className={`pointer-events-auto bg-black/95 backdrop-blur-2xl border border-red-500/20 rounded-3xl w-[85vw] md:w-80 mb-4 overflow-hidden transition-all duration-300 origin-top-right shadow-[0_0_30px_rgba(255,0,0,0.2)] ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 h-0 overflow-hidden'}`}>
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
                        disabled={loading}
                        className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none disabled:opacity-50"
                        placeholder={loading ? 'Sincronizando...' : 'Escribe un comando...'}
                    />
                    <button onClick={handleSend} disabled={loading}>
                        <Send className={`w-4 h-4 ${loading ? 'text-white/20' : 'text-primary'}`} />
                    </button>
                </div>
            </div>

            {/* Avatar Toggle - METAMORFOSIS GUARDIÁN */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 group relative"
            >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
                    {isOpen ? (
                        <X className="w-5 h-5 md:w-6 md:h-6 text-white animate-in spin-in-90 duration-300" />
                    ) : (
                        <video
                            src={timeMode === 'DAY' ? '/Guardian-Day.mp4' : '/Guardian-Night.mp4'}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-full transition-all duration-500 group-hover:scale-[0.95]"
                            style={{
                                objectPosition: '65% 30%',
                                transform: 'scale(1.2)',
                                backgroundColor: 'black'
                            }}
                        />
                    )}
                    {/* Pulsing indicator when closed */}
                    {!isOpen && (
                        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
                    )}
                </div>
            </button>
        </div>
    );
};
