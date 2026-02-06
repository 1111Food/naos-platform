import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, RefreshCw, Layers, HelpCircle, Moon } from 'lucide-react';
import { cn } from '../lib/utils';
import { TarotCard } from '../components/TarotCard';

// --- Ritual States ---
type RitualState = 'INVOCATION' | 'SPREAD_SELECTION' | 'CARD_SELECTION' | 'REVELATION' | 'INTERPRETATION' | 'CLOSING';
type SpreadType = 'ONE_CARD' | 'THREE_CARD' | 'CELTIC' | 'YES_NO';
type OracleState = 'LOADING' | 'VOCAL' | 'SILENT';

interface TarotProps {
    onBack: () => void;
}

const THEME = {
    bg: 'bg-[#0a0a0c]', // Gris Éter
    text: 'text-amber-50/90',
    textSoft: 'text-amber-100/30',
    accent: 'text-red-500',
    accentLow: 'text-red-500/40',
    glass: 'bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.1)]',
    glassHover: 'hover:bg-white/[0.04] transition-all duration-700',
};

const MAJOR_ARCANA = [
    "El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador",
    "El Hierofante", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
    "La Rueda de la Fortuna", "La Justicia", "El Colgado", "La Muerte", "La Templanza",
    "El Diablo", "La Torre", " La Estrella", "La Luna", "El Sol", "El Juicio", "El Mundo"
];

export const Tarot: React.FC<TarotProps> = ({ onBack }) => {
    const [ritualState, setRitualState] = useState<RitualState>('INVOCATION');
    const [oracleState, setOracleState] = useState<OracleState>('VOCAL');
    const [soulIntent, setSoulIntent] = useState('');
    const [spread, setSpread] = useState<SpreadType | null>(null);
    const [deck, setDeck] = useState<number[]>([]);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [reading, setReading] = useState<any>(null);

    const pageVariants = {
        initial: { opacity: 0, y: 10 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -10 },
    };

    // Initialize/Shuffle Deck
    const initDeck = () => {
        const rawDeck = Array.from({ length: 22 }, (_, i) => i);
        for (let i = rawDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rawDeck[i], rawDeck[j]] = [rawDeck[j], rawDeck[i]];
        }
        setDeck(rawDeck);
    };

    const handleSpreadSelect = (s: SpreadType) => {
        setSpread(s);
        initDeck();
        setRitualState('CARD_SELECTION');
    };

    const requiredCards = spread === 'ONE_CARD' || spread === 'YES_NO' ? 1 : spread === 'THREE_CARD' ? 3 : 10;

    const handleCardSelect = (index: number) => {
        if (selectedCards.includes(index)) return;
        const newSelection = [...selectedCards, index];
        setSelectedCards(newSelection);

        if (newSelection.length === requiredCards) {
            // First move to Revelation phase to manifest the arcanos
            setRitualState('REVELATION');
            setTimeout(() => handleFetchReading(newSelection), 1500);
        }
    };

    const handleFetchReading = async (selectedIndices: number[]) => {
        setOracleState('LOADING');
        setRitualState('INTERPRETATION');

        const finalCards = selectedIndices.map(idx => {
            const cardId = deck[idx % deck.length];
            return {
                id: cardId,
                name: MAJOR_ARCANA[cardId],
                meaning: "La esencia del arcano aguarda tu introspección.",
            };
        });

        try {
            const { endpoints } = await import('../lib/api');
            const response = await fetch(endpoints.tarot, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: soulIntent,
                    spreadType: spread || 'ONE_CARD',
                    cards: finalCards,
                    mode: 'INTERPRETATIVE'
                })
            });

            if (!response.ok) throw new Error('Silence');

            const data = await response.json();
            setReading({
                cards: finalCards,
                interpretation: data.interpretation
            });
            setOracleState('VOCAL');
        } catch (error) {
            console.error("Oracle Silence:", error);
            setReading({
                cards: finalCards,
                interpretation: "Los arcanos se han manifestado, pero la voz del oráculo está en silencio momentáneo. Permanece en la contemplación de los símbolos o intenta profundizar el ritual."
            });
            setOracleState('SILENT');
        }
    };

    // Linear flow enforcement - No automatic resets
    const handleCloseRitual = () => {
        setRitualState('CLOSING');
    };

    const AtmosphericBackground = () => (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050507]">
            {/* Gris Éter Depth Layer */}
            <div className={cn("absolute inset-0 transition-colors duration-1000", THEME.bg)} />

            {/* Altar Radial Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.5)_100%)]" />

            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

            {/* Red Ritual Accents (Subtle) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-red-900/5 blur-[120px] rounded-full" />
        </div>
    );

    return (
        <div className={cn("relative min-h-screen w-full overflow-hidden font-serif selection:bg-amber-500/10", THEME.bg, THEME.text)}>
            <AtmosphericBackground />

            {/* Header - Minimal & Ceremonial */}
            <header className="relative z-10 p-6 flex items-center justify-between max-w-6xl mx-auto w-full pt-[max(1.5rem,env(safe-area-inset-top))]">
                <button onClick={onBack} className="p-2 text-amber-50/20 hover:text-amber-50/60 transition-colors">
                    <ArrowLeft className="w-5 h-5 font-light" />
                </button>
                <div className="flex items-center gap-3 tracking-[0.6em] text-[11px] uppercase font-bold text-red-500/60 transition-all duration-1000">
                    <Moon className="w-3.5 h-3.5 opacity-40 animate-pulse" />
                    <span>Ritual de Tarot</span>
                </div>
                <div className="w-9" />
            </header>

            {/* Main Altar Area */}
            <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 min-h-[80vh] flex flex-col items-center">
                <AnimatePresence mode="wait">

                    {/* 1. INVOCATION */}
                    {ritualState === 'INVOCATION' && (
                        <motion.div
                            key="invocation" variants={pageVariants} initial="initial" animate="in" exit="out"
                            className="w-full max-w-xl text-center space-y-12 mt-20"
                        >
                            <div className="space-y-6">
                                <h1 className="text-[32px] md:text-[38px] font-light tracking-wide text-amber-50/80">¿Qué busca tu alma hoy?</h1>
                                <p className={THEME.textSoft}>Concentra tu energía en una intención clara para el universo.</p>
                            </div>

                            <div className="relative">
                                <input
                                    type="text" value={soulIntent} onChange={(e) => setSoulIntent(e.target.value)}
                                    placeholder="Manifestar intención..."
                                    className="w-full bg-transparent border-b border-white/5 px-4 py-6 text-[26px] text-center text-amber-50 placeholder:text-white/5 focus:outline-none focus:border-red-500/20 transition-all font-light italic"
                                    autoFocus
                                />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-red-500/40 transition-all duration-1000 group-focus:w-full" />
                            </div>

                            <button
                                onClick={() => soulIntent.trim() && setRitualState('SPREAD_SELECTION')}
                                disabled={!soulIntent.trim()}
                                className={cn(
                                    "px-12 py-3 rounded-full border border-white/5 uppercase tracking-[0.3em] text-[11px] transition-all duration-1000",
                                    soulIntent.trim() ? "text-amber-50 hover:border-amber-50/20 bg-white/[0.02]" : "text-white/10 opacity-50 cursor-not-allowed"
                                )}
                            >
                                Iniciar Ritual
                            </button>
                        </motion.div>
                    )}

                    {/* 2. SPREAD SELECTION */}
                    {ritualState === 'SPREAD_SELECTION' && (
                        <motion.div
                            key="selection" variants={pageVariants} initial="initial" animate="in" exit="out"
                            className="w-full text-center space-y-16 mt-10"
                        >
                            <div className="space-y-4">
                                <h2 className="text-[26px] font-light tracking-widest text-amber-50/60 uppercase">Elige la estructura del ritual</h2>
                                <div className="w-12 h-[1px] bg-red-500/20 mx-auto" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                <SpreadCard title="Carta Única" desc="Mensaje esencial del oráculo." icon={Moon} onClick={() => handleSpreadSelect('ONE_CARD')} />
                                <SpreadCard title="Temporalidad" desc="Pasado, presente y el devenir." icon={Layers} onClick={() => handleSpreadSelect('THREE_CARD')} />
                                <SpreadCard title="Cruz Sagrada" desc="Análisis profundo del camino actual." icon={Layers} onClick={() => handleSpreadSelect('CELTIC')} />
                                <SpreadCard title="Dualidad" desc="Claridad para una duda específica." icon={HelpCircle} onClick={() => handleSpreadSelect('YES_NO')} />
                            </div>
                        </motion.div>
                    )}

                    {/* 3. CARD SELECTION */}
                    {ritualState === 'CARD_SELECTION' && (
                        <motion.div
                            key="deck" variants={pageVariants} initial="initial" animate="in" exit="out"
                            className="w-full text-center space-y-10"
                        >
                            <div className="space-y-4">
                                <h2 className="text-[26px] font-light tracking-widest text-amber-50/60 uppercase">Sintoniza con los Arcanos</h2>
                                <p className={THEME.textSoft}>Selecciona {requiredCards - selectedCards.length} más según tu intuición.</p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto px-4">
                                {[...Array(22)].map((_, i) => (
                                    <div key={i} className="w-16 h-28 md:w-20 md:h-32">
                                        <TarotCard
                                            index={i} isRevealed={false} isSelected={selectedCards.includes(i)}
                                            onClick={() => handleCardSelect(i)}
                                            className={selectedCards.includes(i) ? "opacity-20 translate-y-2" : ""}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* 4. REVELATION */}
                    {ritualState === 'REVELATION' && (
                        <motion.div
                            key="revelation" variants={pageVariants} initial="initial" animate="in" exit="out"
                            className="flex flex-col items-center justify-center space-y-12 py-20"
                        >
                            <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center relative">
                                <Sparkles className="w-8 h-8 text-amber-100/20 animate-pulse" />
                                <div className="absolute inset-0 bg-amber-500/5 blur-3xl animate-pulse" />
                            </div>
                            <p className="text-amber-100/40 tracking-[0.4em] text-[11px] uppercase animate-pulse">Los arcanos se manifiestan...</p>
                        </motion.div>
                    )}

                    {/* 5. INTERPRETATION */}
                    {ritualState === 'INTERPRETATION' && (
                        <motion.div
                            key="interpretation" variants={pageVariants} initial="initial" animate="in" exit="out"
                            className="w-full text-center pb-32 space-y-16"
                        >
                            <div className="space-y-4">
                                <p className="text-[11px] uppercase tracking-[0.5em] text-red-500/40">Intención del Alma</p>
                                <h2 className="text-[26px] md:text-[32px] font-light italic text-amber-50/80">"{soulIntent}"</h2>
                            </div>

                            <div className="flex flex-wrap justify-center gap-10">
                                {reading?.cards.map((card: any, idx: number) => (
                                    <div key={idx} className="flex flex-col items-center gap-6 w-52">
                                        <div className="w-52 h-80">
                                            <TarotCard index={card.id} name={card.name} isRevealed={true} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {oracleState === 'LOADING' ? (
                                <div className="py-12 flex flex-col items-center gap-4">
                                    <div className="w-40 h-[1px] bg-white/5 relative overflow-hidden">
                                        <motion.div
                                            animate={{ x: [-160, 160] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="absolute inset-0 w-20 bg-amber-500/20"
                                        />
                                    </div>
                                    <p className="text-[11px] uppercase tracking-[0.3em] text-amber-100/20 italic">Traduciendo el lenguaje estelar...</p>
                                </div>
                            ) : (
                                <div className="max-w-2xl mx-auto space-y-12">
                                    <div className="relative p-10 bg-white/[0.01] border border-white/5 rounded-[2rem] overflow-hidden">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-red-500/20" />
                                        <p className="text-[19px] leading-relaxed text-amber-50/70 font-light italic">
                                            {reading?.interpretation}
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6">
                                        {oracleState === 'SILENT' && (
                                            <button
                                                onClick={() => handleFetchReading(selectedCards)}
                                                className="px-8 py-2 rounded-full border border-white/5 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white/80 transition-all flex items-center gap-2"
                                            >
                                                <RefreshCw className="w-3 h-3" /> Reintentar lectura
                                            </button>
                                        )}
                                        <button
                                            onClick={handleCloseRitual}
                                            className="px-10 py-3 rounded-full bg-white/5 border border-white/10 text-amber-50 hover:bg-white/10 transition-all uppercase tracking-[0.3em] text-[11px] flex items-center gap-3"
                                        >
                                            Sellar Ritual
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 6. CLOSING */}
                    {ritualState === 'CLOSING' && (
                        <motion.div
                            key="closing" variants={pageVariants} initial="initial" animate="in" exit="out"
                            className="flex flex-col items-center justify-center space-y-12 py-32 text-center"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="w-32 h-32 rounded-full border border-white/5 flex items-center justify-center"
                            >
                                <Sparkles className="w-10 h-10 text-amber-100/20" />
                            </motion.div>
                            <div className="space-y-3">
                                <h3 className="text-[21px] font-light tracking-widest text-amber-50/60 uppercase">Ritual Sellado</h3>
                                <p className={THEME.textSoft}>Que la luz de los Arcanos guíe tu camino.</p>
                            </div>
                            <button
                                onClick={onBack}
                                className="px-12 py-3 rounded-full border border-white/10 text-amber-50 hover:bg-white/5 transition-all uppercase tracking-[0.3em] text-[11px]"
                            >
                                Volver al Templo
                            </button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            {/* Ritual Red Neon Frame */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <div className="absolute inset-0 border-[1px] border-red-500/20 shadow-[inset_0_0_40px_rgba(239,68,68,0.15)]" />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-red-500/40 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-red-500/40 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                />

                {/* Subtle Pulse Atmosphere */}
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(239,68,68,0.05)_100%)]"
                />
            </div>
        </div>
    );
};

interface SpreadCardProps {
    title: string;
    desc: string;
    icon: any;
    onClick: () => void;
}

const SpreadCard = ({ title, desc, icon: Icon, onClick }: SpreadCardProps) => (
    <button
        onClick={onClick}
        className={cn("flex flex-col items-center justify-center p-10 rounded-[2rem] text-center group relative overflow-hidden", THEME.glass, THEME.glassHover)}
    >
        <div className="mb-6 p-4 rounded-full bg-white/[0.02] border border-white/5 text-amber-100/30 group-hover:text-amber-100 group-hover:border-white/10 transition-all duration-700">
            <Icon className="w-6 h-6 stroke-[1.2]" />
        </div>
        <h3 className="text-[19px] font-light mb-3 tracking-widest text-amber-50/80 uppercase">{title}</h3>
        <p className="text-[13px] leading-relaxed text-amber-100/20 group-hover:text-amber-100/40 transition-colors uppercase tracking-[0.1em]">{desc}</p>

        {/* Subtle hover indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-red-500/10 group-hover:w-12 transition-all duration-1000" />
    </button>
);
