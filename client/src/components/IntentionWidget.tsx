import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useProfile } from '../hooks/useProfile';

export const IntentionWidget: React.FC = () => {
    const { profile } = useProfile();
    const [activeIntention, setActiveIntention] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Fetch Today's Intention
    useEffect(() => {
        if (!profile?.id) return;
        fetchTodayIntention();
    }, [profile?.id]);

    const fetchTodayIntention = async () => {
        try {
            setLoading(true);
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const { data } = await supabase
                .from('intentions')
                .select('intention_text')
                .eq('user_id', profile?.id)
                .gte('created_at', startOfDay.toISOString())
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (data) {
                setActiveIntention(data.intention_text);
            } else {
                setActiveIntention(null);
            }
        } catch (e) {
            console.error("Error fetching intention", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || !profile?.id) return;

        setIsSaving(true);
        try {
            const { error } = await supabase.from('intentions').insert({
                user_id: profile.id,
                intention_text: inputValue.trim(),
                created_at: new Date().toISOString()
            });

            if (error) throw error;

            setActiveIntention(inputValue.trim());
            setIsEditing(false);
            setInputValue('');
        } catch (e) {
            console.error("Error saving intention", e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleClear = async () => {
        if (!profile?.id) return;

        if (window.confirm("¿Liberar esta intención?")) {
            try {
                // Delete from DB to ensure persistence
                const startOfDay = new Date();
                startOfDay.setHours(0, 0, 0, 0);

                const { error } = await supabase
                    .from('intentions')
                    .delete()
                    .eq('user_id', profile.id)
                    .gte('created_at', startOfDay.toISOString());

                if (error) throw error;

                setActiveIntention(null);
            } catch (e) {
                console.error("Error deleting intention", e);
                alert("No se pudo liberar la intención. Intenta de nuevo.");
            }
        }
    };

    if (loading) return null; // Or a small skeleton

    return (
        <div className="w-full max-w-lg mx-auto mb-8 z-20 relative px-4">
            <AnimatePresence mode="wait">
                {!activeIntention && !isEditing ? (
                    // STATE 1: CTA BUTTON
                    <motion.button
                        key="cta"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="group relative flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-amber-500/30 hover:border-amber-500 hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all mx-auto"
                    >
                        <Sparkles size={16} className="text-amber-400 animate-pulse" />
                        <span className="text-amber-100 font-serif italic tracking-wide text-sm uppercase">
                            Declarar Intención de Hoy
                        </span>
                    </motion.button>
                ) : isEditing ? (
                    // STATE 2: INPUT MODE
                    <motion.form
                        key="input"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onSubmit={handleSave}
                        className="relative w-full"
                    >
                        <div className="relative group">
                            <input
                                autoFocus
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Hoy mi energía se enfoca en..."
                                className="w-full px-6 py-4 pr-12 rounded-full bg-black/60 border border-white/20 text-white font-serif text-center placeholder:text-white/20 focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isSaving}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-500/80 text-black hover:bg-amber-400 disabled:opacity-0 transition-all hover:scale-110"
                            >
                                <Send size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="absolute -right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    // STATE 3: ACTIVE DISPLAY
                    <motion.div
                        key="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center gap-2 w-full"
                    >
                        <div className="relative group px-10 py-5 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-3xl flex items-center justify-center gap-4 transition-all hover:bg-white/10 hover:border-amber-500/50">
                            <Sparkles size={16} className="text-amber-400/60" />
                            <span className="text-2xl md:text-3xl font-serif italic text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                                {activeIntention}
                            </span>

                            <div className="absolute -right-3 -top-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button
                                    onClick={handleClear}
                                    className="p-1.5 rounded-full bg-black/80 border border-white/10 text-white/40 hover:text-red-400 hover:border-red-500/50 transition-colors"
                                    title="Liberar intención"
                                >
                                    <X size={10} />
                                </button>
                            </div>
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-amber-500/40 font-medium animate-pulse">
                            Frecuencia Activa • 24H
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
