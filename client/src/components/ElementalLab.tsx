import React from 'react';
import { cn } from '../lib/utils';
import { Wind, Brain, Play } from 'lucide-react';
import { WisdomButton } from './WisdomOverlay';
import { useWisdom } from '../hooks/useWisdom';
import { RITUAL_LIBRARY } from '../constants/ritualContent';
import { BookOpen } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';

interface ElementalLabProps {
    onStartTechnique: (type: 'BREATH' | 'MEDITATION', techId: string) => void;
}

export const ElementalLab: React.FC<ElementalLabProps> = ({ onStartTechnique }) => {
    const { profile } = useProfile();
    const { openWisdom } = useWisdom();

    // Determine user's native element
    const nativeElement = (profile?.astrology?.sunSignElement?.toUpperCase() || 'WATER') as keyof typeof RITUAL_LIBRARY;

    // UI State
    const [selectedElement, setSelectedElement] = React.useState<keyof typeof RITUAL_LIBRARY>(nativeElement);
    const [selectedPathIndex, setSelectedPathIndex] = React.useState(0);

    const availablePaths = RITUAL_LIBRARY[selectedElement];
    const content = availablePaths[selectedPathIndex] || availablePaths[0];

    const elements: { id: keyof typeof RITUAL_LIBRARY; icon: string; label: string }[] = [
        { id: 'FIRE', icon: '🔥', label: 'Fuego' },
        { id: 'WATER', icon: '💧', label: 'Agua' },
        { id: 'EARTH', icon: '🌱', label: 'Tierra' },
        { id: 'AIR', icon: '🌬️', label: 'Aire' }
    ];

    const accentColors = {
        WATER: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40',
        FIRE: 'text-amber-400 border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40',
        EARTH: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
        AIR: 'text-violet-400 border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40'
    };

    const activeAccents = {
        WATER: 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400',
        FIRE: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
        EARTH: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
        AIR: 'border-violet-500/50 bg-violet-500/10 text-violet-400'
    };

    return (
        <div className="w-full space-y-6" onClick={(e) => e.stopPropagation()}>

            {/* ELEMENT SELECTOR & WISDOM TRIGGER */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">Selección Elemental</span>
                    <WisdomButton color="orange" onClick={() => openWisdom('LAB')} />
                </div>

                <div className="flex justify-between gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
                    {elements.map((el) => {
                        const isActive = selectedElement === el.id;
                        const isNative = nativeElement === el.id;

                        return (
                            <button
                                key={String(el.id)}
                                onClick={() => {
                                    setSelectedElement(el.id);
                                    setSelectedPathIndex(0); // Reset path when changing element
                                }}
                                className={cn(
                                    "flex-1 flex flex-col items-center py-3 rounded-xl transition-all relative overflow-hidden",
                                    isActive ? activeAccents[el.id] : "text-white/20 hover:text-white/40 hover:bg-white/5"
                                ) as string}
                            >
                                <span className="text-lg mb-1">{el.icon}</span>
                                <span className="text-[7px] uppercase font-black tracking-widest">{el.label}</span>
                                {isNative && (
                                    <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-white/40" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* PATH SELECTOR (The "Books") */}
                <div className="flex flex-col gap-2">
                    <span className="text-[8px] uppercase tracking-widest text-white/30 font-black mb-1">Libro de Práctica</span>
                    <div className="flex gap-2">
                        {availablePaths.map((path, idx) => (
                            <button
                                key={path.id}
                                onClick={() => setSelectedPathIndex(idx)}
                                className={cn(
                                    "px-3 py-2 rounded-lg border text-[9px] uppercase tracking-tighter transition-all flex items-center gap-2",
                                    selectedPathIndex === idx
                                        ? "bg-white/10 border-white/20 text-white"
                                        : "bg-transparent border-white/5 text-white/40 hover:border-white/10"
                                )}
                            >
                                <BookOpen size={10} className={selectedPathIndex === idx ? "text-amber-400" : "opacity-40"} />
                                {path.name.replace('Manual del ', '')}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <span className="text-[8px] uppercase tracking-widest text-white/30 font-black mb-1">
                        Técnica de {selectedElement === 'AIR' ? 'Aire' : selectedElement === 'FIRE' ? 'Fuego' : selectedElement === 'EARTH' ? 'Tierra' : 'Agua'}
                    </span>
                    <button
                        onClick={() => onStartTechnique('BREATH', content.breath.id)}
                        className={cn(
                            "flex items-center justify-between p-4 rounded-xl border transition-all group",
                            accentColors[selectedElement]
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <Wind size={18} className="opacity-60" />
                            <div className="text-left">
                                <div className="text-[11px] font-bold uppercase tracking-tight">{content.breath.label}</div>
                                <div className="text-[8px] opacity-40 uppercase">{content.breath.copy}</div>
                            </div>
                        </div>
                        <Play size={14} fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-[8px] uppercase tracking-widest text-white/30 font-black mb-1">Exploración Profunda</span>
                    <div className="grid grid-cols-1 gap-2">
                        {[content.meditation, content.anchor].map((med) => (
                            <button
                                key={med.id}
                                onClick={() => onStartTechnique('MEDITATION', med.id)}
                                className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <Brain size={16} className="text-white/40" />
                                    <div className="text-left">
                                        <div className="text-[10px] font-bold text-white/80">{med.title}</div>
                                        <div className="text-[8px] text-white/30 uppercase">Integración Sistémica</div>
                                    </div>
                                </div>
                                <Play size={10} fill="white" className="opacity-0 group-hover:opacity-40 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};
