import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Volume2, VolumeX, RefreshCw, CheckCircle2, PlusCircle, Clock, Heart } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

const AFFIRMATIONS = [
    "Confío en mi proceso y doy hoy un paso consciente.",
    "Mi palabra tiene poder y mi intención crea mi realidad.",
    "Alineo mi energía con el propósito más elevado de mi alma.",
    "Soy el arquitecto de mi destino y el guardián de mi luz.",
    "Cada respiración es una oportunidad para manifestar mi verdad.",
    "Merezco la abundancia y la paz que el universo tiene para mí.",
    "Mi intuición me guía hacia mi mayor bien."
];

import { useAuth } from '../contexts/AuthContext';

interface IntentionRecord {
    id: string;
    intention_text: string;
    affirmation_used: string;
    created_at: string;
}

export const IntentionView: React.FC = () => {
    const { user: authUser } = useAuth();
    const [intention, setIntention] = useState('');
    const [isMuted, setIsMuted] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
    const [isEditingCustom, setIsEditingCustom] = useState(false);
    const [customAffirmation, setCustomAffirmation] = useState('');
    const [activeAffirmation, setActiveAffirmation] = useState(AFFIRMATIONS[0]);
    const [showRitualModal, setShowRitualModal] = useState(false);
    const [history, setHistory] = useState<IntentionRecord[]>([]);

    // 1. FETCH HISTORY (Reactive to authUser)
    useEffect(() => {
        if (authUser) {
            fetchHistory();
        }
    }, [authUser]);

    const fetchHistory = async () => {
        if (!authUser) return;

        const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

        const { data, error } = await supabase
            .from('intentions')
            .select('*')
            .eq('user_id', authUser.id)
            .gte('created_at', last24h)
            .order('created_at', { ascending: false });

        if (data) setHistory(data);
        if (error) console.error("Error fetching history:", error);
    };

    const rotateAffirmation = () => {
        setIsEditingCustom(false);
        const nextIndex = (currentAffirmationIndex + 1) % AFFIRMATIONS.length;
        setCurrentAffirmationIndex(nextIndex);
        setActiveAffirmation(AFFIRMATIONS[nextIndex]);
    };

    const handleUseCustom = () => {
        if (customAffirmation.trim()) {
            setActiveAffirmation(customAffirmation);
            setIsEditingCustom(false);
        } else {
            setIsEditingCustom(!isEditingCustom);
        }
    };

    const initiateRitual = () => {
        if (!intention.trim()) return;
        setShowRitualModal(true);
    };

    // 3. FINAL SEND (Simplified)
    // 3. FINAL SEND (Identidad Estricta)
    const finalizeManifestation = async () => {
        if (!authUser) {
            alert("Error de Sesión: No estás autenticado en la base de datos. Por favor, recarga la página.");
            return;
        }

        setIsLoading(true);
        try {
            // INSERT PURO (Usando el único ID válido: el UUID de Auth)
            const { error: insertError } = await supabase.from('intentions').insert({
                user_id: authUser.id,
                intention_text: intention,
                affirmation_used: activeAffirmation,
                mood_state: 'neutral'
            });

            if (insertError) throw insertError;

            // Éxito: Limpieza y refresco
            setIntention('');
            setShowRitualModal(false);
            await fetchHistory();

        } catch (err: any) {
            console.error('Error crítico guardando intención:', err);
            alert(`Hubo un problema conectando con el universo (Supabase): ${err.message || 'Error desconocido'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const getTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return 'Hace unos momentos';
        return `Hace ${hours}h`;
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-1000 overflow-visible">

            {/* 1. HEADER PREMIUM GIGANTE */}
            <div className="mb-12 text-center w-full">
                <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-amber-200">
                    ACTO DE INTENCIÓN
                </h3>
                <div className="h-[2px] w-64 mx-auto mt-6 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <p className="text-lg md:text-2xl uppercase tracking-[0.15em] text-violet-200/60 mt-8 font-light italic">
                    Un momento consciente para alinear tu energía.
                </p>
            </div>

            {/* 2. SPLIT LAYOUT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">

                {/* COLUMNA IZQUIERDA: FORMULARIO (60%) */}
                <div className="lg:col-span-6 space-y-8">

                    {/* AMBIENTE (AUDIO TOGGLE) */}
                    <div className="flex justify-start">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white/80 transition-all flex items-center gap-3 text-[10px] uppercase tracking-widest"
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
                            <span>Sintonizar Silencio</span>
                        </button>
                    </div>

                    {/* ZONA DE AFIRMACIONES */}
                    <motion.div
                        layout
                        className="relative group p-10 bg-black/40 border border-white/5 rounded-[4rem] text-center backdrop-blur-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

                        <AnimatePresence mode="wait">
                            {isEditingCustom ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="min-h-[160px] w-full flex items-center"
                                >
                                    <textarea
                                        autoFocus
                                        value={customAffirmation}
                                        onChange={(e) => setCustomAffirmation(e.target.value)}
                                        placeholder="Escribe tu propio mantra aquí..."
                                        className="w-full bg-transparent border-none text-center text-3xl md:text-4xl text-violet-300 font-serif italic outline-none resize-none placeholder:text-violet-500/20 leading-relaxed"
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeAffirmation}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="min-h-[160px] flex items-center justify-center p-6"
                                >
                                    <p className="text-3xl md:text-5xl text-white/90 font-serif italic leading-snug">
                                        "{activeAffirmation}"
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
                            <button
                                onClick={rotateAffirmation}
                                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white hover:bg-white/10 transition-all group"
                            >
                                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700 font-bold" />
                                Nueva Frecuencia
                            </button>

                            <button
                                onClick={handleUseCustom}
                                className={cn(
                                    "flex items-center gap-3 px-6 py-3 rounded-full border transition-all text-[11px] uppercase tracking-[0.25em] font-bold",
                                    isEditingCustom
                                        ? "bg-violet-500/30 border-violet-400 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                                        : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {isEditingCustom ? <CheckCircle2 size={14} /> : <PlusCircle size={14} />}
                                {isEditingCustom ? "Usar Ésta" : "Crear Mía"}
                            </button>
                        </div>
                    </motion.div>

                    {/* ZONA DE MANIFESTACIÓN */}
                    <div className="space-y-6">
                        <div className="relative group">
                            <textarea
                                value={intention}
                                onChange={(e) => setIntention(e.target.value)}
                                placeholder="Hoy alineo mi energía con..."
                                className="w-full h-56 bg-white/5 border border-white/10 rounded-[3rem] p-10 text-white placeholder:text-white/10 focus:outline-none focus:border-violet-500/40 transition-all resize-none font-serif text-2xl"
                            />
                            <Sparkles className="absolute bottom-10 right-10 text-violet-500/20 w-8 h-8 pointer-events-none group-focus-within:text-violet-500/60 transition-colors" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={initiateRitual}
                            disabled={!intention.trim() || isLoading || !authUser}
                            className="w-full py-8 rounded-[2rem] bg-gradient-to-r from-violet-600 to-indigo-700 text-white font-bold uppercase tracking-[0.4em] text-[13px] shadow-[0_10px_40px_rgba(139,92,246,0.2)] hover:shadow-[0_15px_50px_rgba(139,92,246,0.4)] transition-all disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center gap-4"
                        >
                            <Send className="w-5 h-5" />
                            {isLoading ? "ENVIANDO..." : !authUser ? "CARGANDO IDENTIDAD..." : "Manifestar Intención"}
                        </motion.button>
                    </div>
                </div>

                {/* COLUMNA DERECHA: HISTORIAL EFÍMERO (40%) */}
                <div className="lg:col-span-4 h-full">
                    <div className="sticky top-24 space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <h4 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-violet-400/80">
                                <Clock size={14} />
                                Mis Intenciones (24H)
                            </h4>
                            <span className="text-[10px] text-white/20 uppercase tracking-widest font-light italic">Efecto Efímero</span>
                        </div>

                        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                            <AnimatePresence initial={false}>
                                {history.length > 0 ? (
                                    history.map((record) => (
                                        <motion.div
                                            key={record.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-all"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <span className="text-[9px] uppercase tracking-widest text-violet-400/60 font-medium">
                                                    {getTimeAgo(record.created_at)}
                                                </span>
                                                <Heart size={10} className="text-rose-500/20 group-hover:text-rose-500/50 transition-colors" />
                                            </div>
                                            <p className="text-lg font-serif italic text-white/80 leading-relaxed mb-4">
                                                "{record.intention_text}"
                                            </p>
                                            <div className="pt-3 border-t border-white/5">
                                                <p className="text-[9px] uppercase tracking-[0.15em] text-white/20 italic">
                                                    Bajo la frecuencia: {record.affirmation_used}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center rounded-[3rem] border border-dashed border-white/10 opacity-30">
                                        <p className="text-sm font-serif italic text-white/60">"El lienzo de hoy está limpio."</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. MODAL DE RITUAL DE RESPIRACIÓN */}
            <AnimatePresence>
                {showRitualModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-2xl bg-black/60"
                    >
                        <div className="w-full max-w-xl text-center space-y-12">

                            {/* Círculo Pulsante de Respiración */}
                            <div className="relative flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.8, 1],
                                        opacity: [0.1, 0.4, 0.1]
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute w-48 h-48 bg-violet-500 rounded-full blur-3xl shadow-[0_0_100px_rgba(139,92,246,0.3)]"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.4, 1],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative w-32 h-32 border-2 border-violet-400/30 rounded-full flex items-center justify-center"
                                >
                                    <Sparkles className="text-violet-400 w-8 h-8 animate-pulse" />
                                </motion.div>
                            </div>

                            <div className="space-y-6">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="text-3xl font-serif text-white italic"
                                >
                                    Frena. Respira profundo.
                                </motion.h2>

                                <div className="space-y-4 px-8">
                                    <p className="text-white/40 text-[11px] uppercase tracking-[0.3em] leading-loose">
                                        Cierra los ojos y visualiza tu intención cumplida.<br />
                                        Sonríe y siente la emoción en tu pecho.<br />
                                        El universo escucha tu vibración.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-12">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={finalizeManifestation}
                                    disabled={isLoading || !authUser}
                                    className="px-12 py-6 rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-400 to-violet-500 text-black font-bold uppercase tracking-[0.3em] text-[11px] shadow-[0_10px_40px_rgba(251,191,36,0.3)] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isLoading ? <RefreshCw className="animate-spin" /> : <Sparkles size={16} />}
                                    {!authUser ? "VERIFICANDO..." : "Sellar y enviar al universo"}
                                </motion.button>

                                <button
                                    onClick={() => setShowRitualModal(false)}
                                    className="text-[9px] uppercase tracking-widest text-white/20 hover:text-white/50 transition-colors"
                                >
                                    Aún no estoy listo
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
