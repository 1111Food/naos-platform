import React from 'react';
import { X, Sparkles, Shield, Compass, Zap, Heart, Coins, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChineseZodiacWisdom } from '../data/chineseZodiacData';

interface ZodiacPergaminoModalProps {
    isOpen: boolean;
    onClose: () => void;
    animal: string;
    data: ChineseZodiacWisdom;
}

export const ZodiacPergaminoModal: React.FC<ZodiacPergaminoModalProps> = ({ isOpen, onClose, animal, data }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-rose-600/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(225,29,72,0.15)] overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Oriental Decorative Elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-rose-600/20 rounded-tl-[2.5rem] pointer-events-none" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-rose-600/20 rounded-br-[2.5rem] pointer-events-none" />

                        {/* Red "Scroll" Spine (Visual Guide) */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-rose-600/40 to-transparent" />
                        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-transparent via-rose-600/40 to-transparent" />

                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-rose-600/20 text-rose-500/40 hover:text-rose-500 transition-all z-20"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar p-8 md:p-12">
                            {/* Header Section */}
                            <div className="flex flex-col items-center text-center mb-12">
                                <motion.div
                                    initial={{ rotate: -180, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="w-32 h-32 rounded-full border-4 border-rose-600/40 flex items-center justify-center mb-8 bg-rose-950/20 shadow-[0_0_50px_rgba(225,29,72,0.3)]"
                                >
                                    <span className="text-7xl">{getAnimalEmoji(animal)}</span>
                                </motion.div>

                                <span className="text-[10px] uppercase tracking-[0.5em] text-rose-500 font-bold mb-3">Códice Imperial BaZi</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tighter uppercase mb-4">
                                    {animal}
                                </h2>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-600/10 border border-rose-600/30 rounded-full">
                                    <Sparkles className="w-3 h-3 text-rose-500" />
                                    <span className="text-[11px] text-rose-200 uppercase tracking-widest font-bold">{data.title}</span>
                                </div>
                                <p className="text-rose-500/60 text-xs uppercase tracking-widest mt-4">Elemento Fijo: {data.element_fixed}</p>
                            </div>

                            {/* Section 1: EL TÓTEM (Ref: Theodora Lau) */}
                            <div className="space-y-10">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-rose-600/20 pb-2">
                                        <Shield className="w-4 h-4 text-rose-500" />
                                        <h4 className="text-rose-500 font-serif uppercase tracking-[0.2em] text-xs font-bold">Esencia del Tótem</h4>
                                    </div>
                                    <p className="text-xl leading-relaxed text-amber-50/90 font-serif italic text-justify">
                                        "{data.totem_essence}"
                                    </p>
                                    <div className="p-6 bg-rose-950/10 border border-rose-600/10 rounded-3xl space-y-3">
                                        <div className="flex items-center gap-2 text-rose-500/60 uppercase tracking-widest text-[10px] font-bold">
                                            <Compass className="w-3 h-3" /> La Sombra Consciente
                                        </div>
                                        <p className="text-sm text-rose-200/70 font-serif italic leading-relaxed">
                                            {data.totem_shadow}
                                        </p>
                                    </div>
                                </div>

                                {/* Section 2: PREDICCIÓN 2026 (Ref: Joey Yap) */}
                                <div className="space-y-6 pt-6">
                                    <div className="flex items-center gap-3 border-b border-rose-600/20 pb-2">
                                        <Zap className="w-4 h-4 text-amber-500" />
                                        <h4 className="text-amber-500 font-serif uppercase tracking-[0.2em] text-xs font-bold">{data.forecast_2026_title}</h4>
                                    </div>
                                    <p className="text-lg leading-relaxed text-white/80 font-serif text-justify">
                                        {data.forecast_general}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 text-rose-400 text-[10px] uppercase tracking-widest font-bold">
                                                <Heart className="w-3 h-3" /> Amor y Vínculos
                                            </div>
                                            <p className="text-xs text-white/50 leading-relaxed font-serif">
                                                {data.forecast_love}
                                            </p>
                                        </div>
                                        <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl space-y-2">
                                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] uppercase tracking-widest font-bold">
                                                <Coins className="w-3 h-3" /> Abundancia y Flujo
                                            </div>
                                            <p className="text-xs text-white/50 leading-relaxed font-serif">
                                                {data.forecast_wealth}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 pt-6 opacity-40">
                                        <Users className="w-4 h-4 text-white" />
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white">Compatibilidad: {data.compatibility}</span>
                                    </div>
                                </div>

                                <div className="pt-10 flex flex-col items-center gap-4 pb-8 opacity-20">
                                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                                    <p className="text-[9px] uppercase tracking-[0.5em] text-white italic">"El destino es un lienzo; tu consciencia, el pincel"</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

function getAnimalEmoji(animal: string): string {
    const map: Record<string, string> = {
        'Rata': '🐀', 'Buey': '🐂', 'Tigre': '🐅', 'Conejo': '🐇',
        'Dragón': '🐉', 'Serpiente': '🐍', 'Caballo': '🐎', 'Cabra': '🐐',
        'Mono': '🐒', 'Gallo': '🐓', 'Perro': '🐕', 'Cerdo': '🐖'
    };
    return map[animal] || '🏮';
}
