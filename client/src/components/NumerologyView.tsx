import React, { useState } from 'react';
import { Hash, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PINNACLE_INTERPRETATIONS } from '../data/pinnacleData';
import { cn } from '../lib/utils';
import { useGuardianState } from '../contexts/GuardianContext';
import { useActiveProfile } from '../hooks/useActiveProfile';

interface NumerologyViewProps {
    data?: any; // Mantener por compatibilidad, pero no se usa
}

export const NumerologyView: React.FC<NumerologyViewProps> = () => {
    const [selectedPosition, setSelectedPosition] = useState<{ id: string, title: string, number: number } | null>(null);
    const { trackEvent } = useGuardianState();
    // --- UNIFIED STATE (v9.16) ---
    const { profile, loading } = useActiveProfile();

    // Obtener datos de numerología del perfil
    const data = profile?.numerology;

    if (loading || !data) return <div className="text-center text-white/50 animate-pulse mt-12">Escuchando tu vibración numérica...</div>;

    const handleOpenModal = (id: string, title: string, number: any) => {
        if (number === undefined || number === null || number === '?') return;
        const numValue = Number(number);
        setSelectedPosition({ id, title, number: numValue });

        // Track event for Oracle Memory
        trackEvent('PINNACLE', {
            position: title,
            number: numValue,
            archetype: PINNACLE_INTERPRETATIONS[numValue]?.archetype || "Desconocido"
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto space-y-12 animate-in fade-in duration-1000 p-4">

            {/* Header: Life Path */}
            <div className="relative group overflow-hidden bg-purple-950/20 border border-purple-500/20 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] text-center backdrop-blur-xl">
                <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                    <Hash className="w-32 h-32 md:w-48 md:h-48 text-purple-400" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-bold mb-4 block">Tu Camino de Vida</span>
                <div className="text-7xl md:text-8xl lg:text-[10rem] font-serif leading-none text-white drop-shadow-glow">
                    {data.lifePathNumber}
                </div>
                <p className="text-white/60 text-sm md:text-lg font-serif italic max-w-xl mx-auto mt-6">
                    "Tu vibración maestra es el {data.lifePathNumber}, la esencia que guía tu encarnación actual."
                </p>
            </div>

            {/* Main Content: Pinaculo (Diamond Graph) + Sidebar */}
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Visual Graph Section */}
                <div className="flex-1 bg-black/40 border border-white/5 p-8 rounded-[3rem] overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
                    <h3 className="font-serif text-2xl text-white mb-8 tracking-wider">Pináculo del Destino</h3>

                    <div className="relative w-full aspect-[4/5] max-w-lg">
                        <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 400 500">
                            {/* Definitions */}
                            <defs>
                                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#9333ea" />
                                    <stop offset="100%" stopColor="#be123c" />
                                </linearGradient>
                            </defs>

                            {/* Connection Lines (Double Triangle Logic) */}
                            <g stroke="url(#lineGrad)" strokeWidth="1.5" opacity="0.4">
                                {/* BASE LINE (A-B-C-D) */}
                                <line x1="80" y1="250" x2="370" y2="250" strokeOpacity="0.2" />

                                {/* UPDWARD TRIANGLES (Essence) */}
                                <line x1="80" y1="250" x2="140" y2="180" /> {/* A -> E */}
                                <line x1="200" y1="250" x2="140" y2="180" /> {/* B -> E */}

                                <line x1="200" y1="250" x2="260" y2="180" /> {/* B -> F */}
                                <line x1="320" y1="250" x2="260" y2="180" /> {/* C -> F */}

                                <line x1="140" y1="180" x2="200" y2="110" /> {/* E -> G */}
                                <line x1="260" y1="180" x2="200" y2="110" /> {/* F -> G */}

                                <line x1="200" y1="110" x2="200" y2="50" /> {/* G -> H (Crown) */}

                                {/* DOWNWARD TRIANGLES (Shadows) - Expanding downwards */}
                                <line x1="80" y1="250" x2="140" y2="320" /> {/* A -> P */}
                                <line x1="200" y1="250" x2="140" y2="320" /> {/* B -> P */}

                                <line x1="200" y1="250" x2="260" y2="320" /> {/* B -> O */}
                                <line x1="320" y1="250" x2="260" y2="320" /> {/* C -> O */}

                                <line x1="140" y1="320" x2="200" y2="390" /> {/* P -> Q */}
                                <line x1="260" y1="320" x2="200" y2="390" /> {/* O -> Q */}

                                <line x1="200" y1="390" x2="200" y2="450" /> {/* Q -> S (Deep) */}

                                {/* Side Flanks (Bridges) */}
                                <line x1="80" y1="250" x2="40" y2="180" strokeDasharray="4 2" opacity="0.3" /> {/* A -> I? */}
                                <line x1="320" y1="250" x2="360" y2="180" strokeDasharray="4 2" opacity="0.3" /> {/* C -> J? */}
                            </g>

                            {/* NODES RENDERING */}
                            {(() => {
                                const Node = ({ x, y, val, label, color = "#9333ea", small = false }: any) => (
                                    <g transform={`translate(${x},${y})`} className="cursor-pointer hover:filter hover:brightness-125 transition-all">
                                        <circle r={small ? 14 : 20} fill="#0a0a0a" stroke={color} strokeWidth="2" filter="url(#glow)" />
                                        <text y={small ? 4 : 6} textAnchor="middle" fill="white" fontSize={small ? 10 : 14} fontWeight="bold" fontFamily="serif">{val}</text>
                                        <text y={small ? 28 : 38} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={small ? 8 : 10} fontWeight="bold">{label}</text>
                                    </g>
                                );

                                const p = data.pinaculo || { a: '?', b: '?', c: '?', d: '?', e: '?', f: '?', g: '?', h: '?', i: '?', j: '?', k: '?', l: '?', m: '?', n: '?', o: '?', p: '?', q: '?', r: '?', s: '?' };

                                return (
                                    <>
                                        {/* MIDDLE BASE (Self) */}
                                        <Node x="80" y="250" val={p.a} label="A" color="#ef4444" />
                                        <Node x="200" y="250" val={p.b} label="B" color="#a855f7" />
                                        <Node x="320" y="250" val={p.c} label="C" color="#ef4444" />
                                        <Node x="375" y="250" val={p.d} label="D" color="#d946ef" small />

                                        {/* UPPER ESSENCE */}
                                        <Node x="140" y="180" val={p.e} label="E" color="#22c55e" />
                                        <Node x="260" y="180" val={p.f} label="F" color="#eab308" />
                                        <Node x="200" y="110" val={p.g} label="G" color="#22c55e" />
                                        <Node x="200" y="50" val={p.h} label="H" color="#fbbf24" />

                                        {/* LOWER SHADOWS */}
                                        <Node x="140" y="320" val={p.p} label="P" color="#f43f5e" small />
                                        <Node x="260" y="320" val={p.o} label="O" color="#f43f5e" small />
                                        <Node x="200" y="390" val={p.q} label="Q" color="#be123c" small />
                                        <Node x="200" y="450" val={p.s} label="S" color="#881337" small />
                                        <Node x="320" y="390" val={p.r} label="R" color="#be123c" small />

                                        {/* BRIDGES (Upper Right Quadrant) */}
                                        <Node x="280" y="110" val={p.i} label="I" color="#3b82f6" small />
                                        <Node x="320" y="50" val={p.j} label="J" color="#3b82f6" small />
                                    </>
                                )
                            })()}
                        </svg>
                    </div>
                </div>

                {/* Sidebar: Guía de Posiciones */}
                <div className="w-full lg:w-96 rounded-[2rem] md:rounded-[3rem] bg-black/40 border border-white/5 overflow-hidden flex flex-col lg:max-h-[800px]">
                    <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-10">
                        <h4 className="font-serif text-xl text-white">Guía de Posiciones</h4>
                        <p className="text-[10px] uppercase tracking-wider text-white/40 mt-1">Mapa de tu arquitectura espiritual</p>
                    </div>

                    <div className="overflow-y-auto p-4 space-y-2 custom-scrollbar flex-1">
                        {[
                            { l: 'A', t: 'Karma (Mes)', d: 'Tu tarea pendiente de otras vidas.', v: data.pinaculo?.a },
                            { l: 'B', t: 'Personalidad (Día)', d: 'La máscara que muestras al mundo y cómo te perciben.', v: data.pinaculo?.b },
                            { l: 'C', t: 'Vidas Pasadas (Año)', d: 'Lo que fuiste y traes contigo de encarnaciones previas.', v: data.pinaculo?.c },
                            { l: 'D', t: 'Esencia', d: 'Tu núcleo divino, ¿quién eres realmente en tu profundidad?', v: data.pinaculo?.d },
                            { l: 'E', t: 'Regalo Divino', d: 'Un talento concedido para esta vida.', v: data.pinaculo?.e },
                            { l: 'F', t: 'Destino', d: 'Hacia dónde te diriges inevitablemente.', v: data.pinaculo?.f },
                            { l: 'G', t: 'Misión de Vida', d: 'Tu propósito central de encarnación.', v: data.pinaculo?.g },
                            { l: 'H', t: 'Realización', d: 'El logro máximo de tu espíritu.', v: data.pinaculo?.h },
                            { l: 'I', t: 'Subconsciente', d: 'Deseos ocultos y motores internos.', v: data.pinaculo?.i },
                            { l: 'J', t: 'Inconsciente', d: 'Reacciones automáticas y sombra.', v: data.pinaculo?.j },
                            { l: 'P', t: 'Sombra Inmediata', d: 'Tu primer gran bloqueo.', v: data.pinaculo?.p },
                            { l: 'O', t: 'Inconsciente Negativo', d: 'Patrones repetitivos dañinos.', v: data.pinaculo?.o },
                            { l: 'Q', t: 'Ser Inferior Heredado', d: 'Carga ancestral no resuelta.', v: data.pinaculo?.q },
                            { l: 'R', t: 'Ser Inferior Consciente', d: 'Defectos que conoces pero no cambias.', v: data.pinaculo?.r },
                            { l: 'S', t: 'Ser Inferior Latente', d: 'El enemigo oculto final.', v: data.pinaculo?.s },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleOpenModal(item.l, item.t, item.v)}
                                className={cn(
                                    "group p-4 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-pointer",
                                    (item.v !== undefined && item.v !== null && item.v !== '?')
                                        ? "hover:bg-purple-500/10 hover:border-purple-500/30"
                                        : "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-xs font-bold text-white group-hover:bg-purple-500 group-hover:border-purple-400 transition-colors">
                                            {item.l}
                                        </div>
                                        <span className="text-sm font-bold text-white/90">{item.t}</span>
                                    </div>
                                    <span className="font-serif text-xl text-purple-400">{item.v ?? '-'}</span>
                                </div>
                                <p className="text-xs text-white/50 pl-11 leading-relaxed border-l-2 border-white/10 ml-4">
                                    {item.d}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revelation Modal */}
            <AnimatePresence>
                {selectedPosition && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPosition(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-black/60 border border-yellow-500/20 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            {/* Decorative Gold Corners */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-500/10 rounded-tl-[2.5rem]" />
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-500/10 rounded-br-[2.5rem]" />

                            <button
                                onClick={() => setSelectedPosition(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="space-y-6 flex-shrink-0 mb-6">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-yellow-500/50 font-bold mb-2 block">Revelación del Pináculo</span>
                                    <h2 className="text-3xl md:text-4xl font-serif text-white">{selectedPosition.title}</h2>
                                </div>

                                <div className="py-4 border-y border-white/5">
                                    <div className="flex items-center gap-6">
                                        <div className="text-6xl md:text-7xl font-serif text-yellow-500/80">{selectedPosition.number}</div>
                                        <div>
                                            <div className="text-[10px] uppercase tracking-wider text-white/30">Arquetipo Maestro</div>
                                            <div className="text-xl font-serif text-white/90">
                                                {PINNACLE_INTERPRETATIONS[selectedPosition.number]?.archetype || "El Buscador del Misterio"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-y-auto pr-4 custom-scrollbar space-y-8 flex-1">
                                {PINNACLE_INTERPRETATIONS[selectedPosition.number]?.blocks ? (
                                    PINNACLE_INTERPRETATIONS[selectedPosition.number].blocks.map((block, i) => (
                                        <p key={i} className="text-lg leading-relaxed text-white/80 font-serif text-justify first-letter:text-4xl first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-yellow-500/60">
                                            {block}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-lg leading-relaxed text-white/80 font-serif italic text-justify">
                                        La sabiduría para esta posición aún se encuentra velada bajo el manto del misterio. Sigo explorando tu vibración.
                                    </p>
                                )}

                                <div className="pt-6 flex justify-center pb-4">
                                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};
