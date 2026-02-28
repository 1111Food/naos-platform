
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Wind, ArrowRight } from 'lucide-react';

interface LowEnergyWarningModalProps {
    isOpen: boolean;
    currentCoherence: number;
    onElevate: () => void;
    onProceed: () => void;
    onCancel: () => void;
}

export const LowEnergyWarningModal: React.FC<LowEnergyWarningModalProps> = ({
    isOpen,
    currentCoherence,
    onElevate,
    onProceed,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onCancel}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-md bg-[#0a0a0c] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.1)]"
                >
                    {/* Header Warning Strip */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                    <div className="p-8 space-y-6 text-center">

                        {/* Icon */}
                        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
                            <AlertTriangle className="w-8 h-8 text-amber-500/80" />
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <h2 className="text-xl font-serif text-white/90">Frecuencia Baja Detectada ({currentCoherence.toFixed(0)}%)</h2>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Arquitecto, tu energía actual podría nublar esta lectura.
                                Para mayor claridad, se recomienda calibrar primero.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-3 pt-4">
                            {/* Primary: Elevate */}
                            <button
                                onClick={onElevate}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 group"
                            >
                                <Wind size={18} className="text-white/80" />
                                <span>Elevar Frecuencia (Santuario)</span>
                                <ArrowRight size={16} className="text-white/60 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Secondary: Proceed */}
                            <button
                                onClick={onProceed}
                                className="w-full py-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors text-sm"
                            >
                                Proceder bajo mi responsabilidad
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
