import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Wind, Mountain, Droplets, ChevronLeft, Play, Quote } from 'lucide-react';
import { useSound } from '../hooks/useSound';

interface EvolutionViewProps {
    onBack: () => void;
}

type ElementType = 'FUEGO' | 'AIRE' | 'TIERRA' | 'AGUA';

interface Practice {
    id: string;
    title: string;
    duration: string;
    description: string;
    type: 'RESPIRACIÓN' | 'MEDITACIÓN' | 'DECLARACIÓN';
}

const ELEMENT_DATA: Record<ElementType, {
    title: string,
    subtitle: string,
    color: string,
    accent: string,
    icon: any,
    breathwork: Practice[],
    meditations: Practice[],
    declarations: Practice[]
}> = {
    FUEGO: {
        title: 'Fuego',
        subtitle: 'Activar & Transmutar',
        color: 'rose',
        accent: '#f43f5e',
        icon: Flame,
        breathwork: [
            { id: 'f1', title: 'Aliento de Fuego (Kapalabhati)', duration: '5 min', description: 'Purifica la sangre y activa el plexo solar.', type: 'RESPIRACIÓN' },
            { id: 'f-b1', title: 'Respiración de Poder', duration: '3 min', description: 'Aumento rápido de energía y enfoque.', type: 'RESPIRACIÓN' }
        ],
        meditations: [
            { id: 'f2', title: 'Meditación de la Voluntad', duration: '10 min', description: 'Visualización de fuego interno para la acción.', type: 'MEDITACIÓN' }
        ],
        declarations: [
            { id: 'f3', title: 'Decreto de Soberanía', duration: '1 min', description: 'Afirmación de poder personal y límites.', type: 'DECLARACIÓN' }
        ]
    },
    AIRE: {
        title: 'Aire',
        subtitle: 'Fluir & Adaptar',
        color: 'cyan',
        accent: '#06b6d4',
        icon: Wind,
        breathwork: [
            { id: 'a1', title: 'Respiración Alternada (Nadi Shodhana)', duration: '7 min', description: 'Equilibra los hemisferios cerebrales.', type: 'RESPIRACIÓN' }
        ],
        meditations: [
            { id: 'a2', title: 'Meditación del Observador', duration: '12 min', description: 'Observar pensamientos como nubes que pasan.', type: 'MEDITACIÓN' }
        ],
        declarations: [
            { id: 'a3', title: 'Decreto de Claridad', duration: '1 min', description: 'Apertura a nuevas perspectivas y verdad.', type: 'DECLARACIÓN' }
        ]
    },
    TIERRA: {
        title: 'Tierra',
        subtitle: 'Concretar & Arraigar',
        color: 'emerald',
        accent: '#10b981',
        icon: Mountain,
        breathwork: [
            { id: 't1', title: 'Respiración Cuadrada (Box Breathing)', duration: '4 min', description: 'Calma el sistema nervioso y centra el cuerpo.', type: 'RESPIRACIÓN' }
        ],
        meditations: [
            { id: 't2', title: 'Visualización de Arraigo (Grounding)', duration: '15 min', description: 'Conexión profunda con el núcleo de la tierra.', type: 'MEDITACIÓN' }
        ],
        declarations: [
            { id: 't3', title: 'Decreto de Manifestación', duration: '1 min', description: 'Anclaje de intenciones en la materia.', type: 'DECLARACIÓN' }
        ]
    },
    AGUA: {
        title: 'Agua',
        subtitle: 'Regular & Sanar',
        color: 'blue',
        accent: '#3b82f6',
        icon: Droplets,
        breathwork: [
            { id: 'ag1', title: 'Respiración 4-7-8', duration: '6 min', description: 'El sedante natural del sistema nervioso.', type: 'RESPIRACIÓN' }
        ],
        meditations: [
            { id: 'ag2', title: 'Fluidez Emocional', duration: '10 min', description: 'Aceptar y liberar corrientes internas.', type: 'MEDITACIÓN' }
        ],
        declarations: [
            { id: 'ag3', title: 'Decreto de Purificación', duration: '1 min', description: 'Liberación de cargas emocionales obsoletas.', type: 'DECLARACIÓN' }
        ]
    }
};

export const EvolutionView: React.FC<EvolutionViewProps> = ({ onBack }) => {
    const [selectedElement, setSelectedElement] = useState<ElementType | null>(null);
    const { playSound } = useSound();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#020202] flex flex-col pt-20 overflow-hidden"
        >
            {/* BACKGROUND ANIMATION */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

            {/* HEADER */}
            <header className="relative z-10 w-full max-w-6xl mx-auto px-6 flex items-center justify-between mb-16">
                <button
                    onClick={() => { playSound('click'); onBack(); }}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Regresar
                </button>
                <div className="text-right">
                    <h2 className="text-3xl font-thin tracking-[0.4em] text-white uppercase select-none">Laboratorio</h2>
                    <p className="text-[9px] text-purple-400 font-black uppercase tracking-[0.5em] mt-2">NAOS Evolution Stream</p>
                </div>
            </header>

            <main className="relative z-10 flex-1 overflow-y-auto px-6 pb-24 custom-scrollbar w-full max-w-7xl mx-auto">

                {/* ELEMENTAL SYSTEM (Grid 4) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {(Object.keys(ELEMENT_DATA) as ElementType[]).map((key) => {
                        const data = ELEMENT_DATA[key];
                        const Icon = data.icon;
                        const isSelected = selectedElement === key;

                        return (
                            <motion.div
                                key={key}
                                layout
                                className={`
                                    relative p-1 rounded-[3rem] transition-all overflow-hidden cursor-pointer
                                    ${isSelected
                                        ? 'bg-gradient-to-br from-white/10 to-transparent'
                                        : 'bg-white/5 hover:bg-white/10'}
                                `}
                                onClick={() => {
                                    playSound('click');
                                    setSelectedElement(isSelected ? null : key);
                                }}
                            >
                                <div className={`h-full p-8 rounded-[2.9rem] bg-black/60 backdrop-blur-3xl flex flex-col items-center text-center
                                    ${isSelected ? 'border border-white/10' : 'border border-transparent'}
                                `}>
                                    {/* Icon Box */}
                                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-8 border border-white/5 transition-all
                                        ${isSelected ? `bg-${data.color}-500/20 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]` : 'bg-white/5'}
                                    `}>
                                        <Icon className={`w-8 h-8 ${isSelected ? `text-${data.color}-400` : 'text-white/20'}`} />
                                    </div>

                                    <h3 className="text-2xl font-thin tracking-[0.2em] text-white uppercase mb-2">{data.title}</h3>
                                    <p className={`text-[9px] uppercase tracking-[0.3em] font-black ${isSelected ? `text-${data.color}-400` : 'text-white/20'}`}>
                                        {data.subtitle}
                                    </p>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="mt-10 w-full space-y-8"
                                            >
                                                {/* SECTIONS: BREATH, MEDIT, DECLAR */}
                                                <PracticeSection title="Respiración y Energía" practices={ELEMENT_DATA[selectedElement].breathwork} />
                                                <PracticeSection title="Meditaciones Guiadas" practices={ELEMENT_DATA[selectedElement].meditations} />
                                                <PracticeSection title="Decretos y Declaraciones" practices={ELEMENT_DATA[selectedElement].declarations} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </main>
        </motion.div>
    );
};

const PracticeSection = ({ title, practices }: { title: string, practices: Practice[] }) => (
    <div className="space-y-4">
        <h4 className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black border-b border-white/5 pb-2 text-left">{title}</h4>
        <div className="space-y-3">
            {practices.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all text-left flex items-start gap-4 active:scale-[0.98] group/practice">
                    <div className="mt-1">
                        {p.type === 'DECLARACIÓN' ? <Quote className="w-3 h-3 text-white/20" /> : <Play className="w-3 h-3 text-white/20" />}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <h5 className="text-[11px] font-bold text-white/80 transition-colors group-hover/practice:text-white">{p.title}</h5>
                            <span className="text-[8px] text-white/20 font-black">{p.duration}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-tight">{p.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
