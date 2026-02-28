import React from 'react';
import { motion } from 'framer-motion';
import { Book, User, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { WisdomButton } from '../components/WisdomOverlay';
import { useWisdom } from '../hooks/useWisdom';
import { useSound } from '../hooks/useSound';

interface IdentityNexusProps {
    onNavigate: (view: any) => void;
    onBack: () => void;
}

export const IdentityNexus: React.FC<IdentityNexusProps> = ({ onNavigate, onBack }) => {
    const { openWisdom } = useWisdom();
    const { playSound } = useSound();

    const options = [
        {
            id: 'PROFILE',
            title: "VER MI CÓDIGO COMPLETO",
            subtitle: "Explora tu diseño original: Astral, Numerología y Nahual.",
            icon: User,
            color: "from-blue-500/20 to-cyan-500/10",
            border: "border-blue-500/30",
            glow: "shadow-[0_0_40px_-10px_rgba(30,64,175,0.4)]"
        },
        {
            id: 'MANUALS',
            title: "BIBLIOTECA DE SABIDURÍA",
            subtitle: "El repositorio de conocimientos ancestrales y guías del sistema.",
            icon: Book,
            color: "from-purple-500/20 to-magenta-500/10",
            border: "border-purple-500/30",
            glow: "shadow-[0_0_40px_-10px_rgba(139,92,246,0.4)]"
        }
    ];

    return (
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center p-6 mt-12">
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => { playSound('click'); onBack(); }}
                className="absolute top-0 left-6 flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black">Regresar al Templo</span>
            </motion.button>

            <div className="text-center mb-16 space-y-4">
                <div className="flex items-center justify-center gap-4">
                    <h2 className="text-3xl md:text-4xl font-serif italic text-white/90 tracking-wide">
                        Nexo de Identidad
                    </h2>
                    <WisdomButton color="cyan" onClick={() => { playSound('click'); openWisdom('IDENTITY'); }} />
                </div>
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">Arquitectura del Ser</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {options.map((opt, i) => (
                    <motion.div
                        key={opt.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => { playSound('click'); onNavigate(opt.id); }}
                        className={cn(
                            "relative group cursor-pointer p-10 rounded-[3rem] border transition-all duration-700 overflow-hidden bg-black/40 backdrop-blur-3xl",
                            opt.border,
                            opt.glow,
                            "hover:scale-[1.02] hover:bg-white/5"
                        )}
                    >
                        {/* Decorative Background */}
                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700", opt.color)} />

                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-500">
                                <opt.icon size={32} className="text-white/60 group-hover:text-white transition-colors" />
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xl font-serif italic tracking-wider text-white/90">
                                    {opt.title}
                                </h3>
                                <p className="text-[11px] text-white/40 uppercase tracking-widest leading-relaxed">
                                    {opt.subtitle}
                                </p>
                            </div>

                            <div className="pt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-blue-400">Acceder</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};
