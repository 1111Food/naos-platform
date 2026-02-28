import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Infinity as InfinityIcon, ArrowRight, Loader2, Trash2 } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { API_BASE_URL, getAuthHeaders } from '../lib/api';
import { SynastryResultView } from './SynastryResultView';
import { cn } from '../lib/utils';
import { WISDOM_COPYS } from '../constants/wisdomContent';
import { WisdomOverlay, WisdomButton } from './WisdomOverlay';

export const RelationshipType = {
    ROMANTIC: 'ROMANTIC',
    BUSINESS: 'BUSINESS',
    PARENTAL: 'PARENTAL',
    FRATERNAL: 'FRATERNAL'
} as const;

export type RelationshipType = typeof RelationshipType[keyof typeof RelationshipType];

interface SynastryModuleProps {
    onSwitchToTarot?: () => void;
}

export const SynastryModule: React.FC<SynastryModuleProps> = ({ onSwitchToTarot }) => {
    const { profile } = useProfile();
    const [showWisdom, setShowWisdom] = useState(false);
    const [partnerData, setPartnerData] = useState({
        name: '',
        birthDate: '',
        birthTime: '12:00',
        birthCity: 'Guatemala',
        birthCountry: 'Guatemala'
    });
    const [relationshipType, setRelationshipType] = useState<RelationshipType>(RelationshipType.ROMANTIC);
    const [step, setStep] = useState<'FORM' | 'TUNING' | 'RESULT' | 'HISTORY'>('FORM');
    const [executionData, setExecutionData] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculate = async () => {
        console.log("🛠️ NAOS Synastry: Invocando resonancia...");

        if (!profile) {
            setError("Error: Perfil no sincrónico. Intenta recargar.");
            return;
        }

        if (!partnerData.name || !partnerData.birthDate || !partnerData.birthCity || !partnerData.birthCountry) {
            setError("La profundidad requiere todos los datos (Nombre, Fecha, Ciudad, País).");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const payload = {
                userProfile: profile,
                partnerData: { ...partnerData },
                relationshipType
            };

            setStep('TUNING');

            const apiUrl = `${API_BASE_URL}/api/synastry/analyze`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || err.error || 'Error en el análisis');
            }

            const result = await response.json();

            setTimeout(() => {
                setExecutionData(result.data);
                setStep('RESULT');
                setIsLoading(false);
            }, 2500);

        } catch (err: any) {
            console.error("❌ Synastry Error:", err);
            setError(err.message || "Interferencia en la red astral. Verifica el servidor.");
            setStep('FORM');
            setIsLoading(false);
        }
    };

    const fetchHistory = useCallback(async () => {
        if (!profile?.id) return;
        setIsLoading(true);
        setError(null);
        try {
            const apiUrl = `${API_BASE_URL}/api/synastry/history`;
            const response = await fetch(apiUrl, {
                headers: getAuthHeaders()
            });
            if (!response.ok) throw new Error("Registros inalcanzables.");
            const result = await response.json();
            setHistory(result || []);
            setStep('HISTORY');
        } catch (err) {
            console.error("❌ History Error:", err);
            setError("Fallo al acceder a los registros.");
        } finally {
            setIsLoading(false);
        }
    }, [profile?.id]);

    const handleSelectHistory = (item: any) => {
        const results = item.calculated_results;
        setExecutionData(results);
        setPartnerData({
            name: item.partner_name,
            birthDate: '',
            birthTime: '',
            birthCity: results?.partnerInfo?.birthCity || '',
            birthCountry: results?.partnerInfo?.birthCountry || ''
        });
        setStep('RESULT');
    };

    const handleDeleteHistory = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();

        // Sanitización agresiva en el cliente: Removemos prefijos anómalos si existen
        let sanitizedId = id;
        if (id && typeof id === 'string' && id.startsWith('r_')) {
            sanitizedId = id.substring(2);
        }

        console.log("🗑️ Deleting Synastry Record. Original ID:", id, "Sanitized ID:", sanitizedId);

        if (!sanitizedId || sanitizedId === 'undefined') {
            console.error("❌ Fatal: ID is undefined or invalid.");
            alert("Error: El registro no tiene un ID válido.");
            return;
        }

        if (!window.confirm("¿Seguro que deseas liberar este registro de tu historial?")) return;

        try {
            const apiUrl = `${API_BASE_URL}/api/synastry/record/${sanitizedId}`;
            console.log("🚀 Executing DELETE fetch to:", apiUrl);

            // Delete Content-Type to prevent Fastify from throwing FST_ERR_CTP_EMPTY_JSON_BODY
            const headers = getAuthHeaders();
            delete headers['Content-Type'];

            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers
            });
            if (!response.ok) throw new Error("No se pudo borrar.");
            setHistory(prev => prev.filter(item => item.id !== id && item.id !== sanitizedId));
        } catch (err) {
            console.error("❌ Delete Error:", err);
            alert("No se pudo borrar el registro.");
        }
    };

    return (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden p-4">
            <WisdomOverlay
                key="wisdom-synastry"
                isOpen={showWisdom}
                onClose={() => setShowWisdom(false)}
                {...WISDOM_COPYS.SYNASTRY}
            />

            <div className="absolute inset-0 bg-[#050505]">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 blur-[100px] rounded-full" />
            </div>

            {step !== 'RESULT' && step !== 'TUNING' && (
                <div className="relative z-10 text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-2">
                        <h3 className="font-serif text-3xl text-white tracking-[0.2em] uppercase flex items-center justify-center gap-4">
                            <span className="text-white/30">−</span> Sinastría Maestra <span className="text-white/30">−</span>
                        </h3>
                        <WisdomButton onClick={() => setShowWisdom(true)} color="purple" className="translate-y-1" />
                    </div>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold italic">Arquitectura del Vínculo</p>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => setStep('FORM')}
                            className={cn("text-[8px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all", step === 'FORM' ? "border-purple-500 text-purple-400 bg-purple-500/10" : "border-white/10 text-white/40 hover:text-white")}
                        >
                            Invocación
                        </button>
                        <button
                            onClick={fetchHistory}
                            className={cn("text-[8px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all", step === 'HISTORY' ? "border-purple-500 text-purple-400 bg-purple-500/10" : "border-white/10 text-white/40 hover:text-white")}
                        >
                            Historial
                        </button>
                        {onSwitchToTarot && (
                            <button
                                onClick={onSwitchToTarot}
                                className="text-[8px] uppercase tracking-widest px-4 py-2 rounded-full border border-red-500/20 text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all"
                            >
                                Tarot Arcano
                            </button>
                        )}
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 'FORM' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative z-10 w-full max-w-lg"
                    >
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                            <div className="flex flex-col items-center mb-10">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                                    <InfinityIcon className="text-white/80 w-6 h-6 opacity-80" />
                                </div>
                                <h4 className="text-xl text-white font-serif italic text-center">Invocar al Espejo</h4>
                                <p className="text-white/40 text-[10px] text-center mt-2 uppercase tracking-[0.2em]">Revela los hilos invisibles</p>
                            </div>

                            <div className="space-y-6">
                                <div className="group">
                                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">Nombre del Alma</label>
                                    <input
                                        type="text"
                                        value={partnerData.name}
                                        onChange={(e) => setPartnerData({ ...partnerData, name: e.target.value })}
                                        className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-lg font-light placeholder:text-white/10"
                                        placeholder="Ej: Alma Gemela"
                                    />
                                </div>

                                <div className="group">
                                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">Tipo de Relación</label>
                                    <select
                                        value={relationshipType}
                                        onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-[10px] uppercase tracking-wider cursor-pointer"
                                    >
                                        <option value={RelationshipType.ROMANTIC}>Romántica</option>
                                        <option value={RelationshipType.BUSINESS}>Negocios</option>
                                        <option value={RelationshipType.PARENTAL}>Parental</option>
                                        <option value={RelationshipType.FRATERNAL}>Amistad</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">Fecha Solar</label>
                                        <input
                                            type="date"
                                            value={partnerData.birthDate}
                                            onChange={(e) => setPartnerData({ ...partnerData, birthDate: e.target.value })}
                                            className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:outline-none focus:border-purple-500 transition-all font-light invert-calendar-icon"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">Hora Terrenal</label>
                                        <input
                                            type="time"
                                            value={partnerData.birthTime}
                                            onChange={(e) => setPartnerData({ ...partnerData, birthTime: e.target.value })}
                                            className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:outline-none focus:border-purple-500 transition-all font-light"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">País de Origen</label>
                                        <input
                                            type="text"
                                            value={partnerData.birthCountry}
                                            onChange={(e) => setPartnerData({ ...partnerData, birthCountry: e.target.value })}
                                            className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:outline-none focus:border-purple-500 transition-all font-light text-sm"
                                            placeholder="Ej: México"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 block">Ciudad de Origen</label>
                                        <input
                                            type="text"
                                            value={partnerData.birthCity}
                                            onChange={(e) => setPartnerData({ ...partnerData, birthCity: e.target.value })}
                                            className="w-full bg-black/20 border-b border-white/10 p-3 text-white focus:outline-none focus:border-purple-500 transition-all font-light text-sm"
                                            placeholder="Ej: CDMX"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-[10px] uppercase tracking-widest text-center py-2 px-4 rounded-lg bg-red-400/5 border border-red-400/10">
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    onClick={handleCalculate}
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full mt-4 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 group relative overflow-hidden",
                                        isLoading && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {isLoading ? <Loader2 className="animate-spin" size={16} /> : <span>Calcular Resonancia</span>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'TUNING' && (
                    <motion.div
                        key="tuning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 flex flex-col items-center justify-center"
                    >
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-purple-500/20" />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-dashed border-blue-500/10" />
                            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1.1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="absolute inset-8 rounded-full bg-purple-500/5 blur-2xl" />
                            <Loader2 className="animate-spin text-white/20" size={40} />
                        </div>
                        <p className="text-white/40 text-[10px] mt-8 uppercase tracking-[0.4em] animate-pulse">Armonizando Frecuencias Astrales...</p>
                    </motion.div>
                )}

                {step === 'HISTORY' && (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 w-full max-w-2xl px-4"
                    >
                        <div className="bg-black/60 border border-white/10 rounded-[2rem] p-8 backdrop-blur-3xl shadow-2xl">
                            <h4 className="text-xl font-serif text-white mb-8 italic text-center">Registros Akáshicos</h4>

                            {isLoading ? (
                                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-white/20" /></div>
                            ) : (!history || history.length === 0) ? (
                                <p className="text-white/20 text-center text-[10px] py-12 uppercase tracking-[0.3em]">Sin huellas energéticas previas.</p>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center px-4 mb-4">
                                        <span className="text-[9px] uppercase tracking-widest text-white/30">Registros: {history.length} / 5</span>
                                        {history.length >= 5 && <span className="text-[9px] uppercase tracking-widest text-amber-500/60 font-black">Historial Saturado</span>}
                                    </div>
                                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                                        {(history as any[]).map((item) => {
                                            console.log("📍 Rendering history item:", { id: item.id, name: item.partner_name });
                                            return (
                                                <div
                                                    key={item.id || item.combination_hash}
                                                    onClick={() => handleSelectHistory(item)}
                                                    className="w-full cursor-pointer text-left bg-white/5 border border-white/5 p-5 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
                                                >
                                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                                        <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-serif text-xl shadow-inner flex-shrink-0">
                                                            {item.partner_name?.[0] || '?'}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-white text-base font-light truncate" title={item.partner_name}>{item.partner_name}</p>
                                                            <p className="text-[9px] text-white/30 uppercase tracking-widest mt-1">
                                                                {new Date(item.created_at).toLocaleDateString()} • {item.relationship_type}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6 flex-shrink-0">
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-white font-serif text-xl">{item.calculated_results?.report?.score || 0}%</p>
                                                            <p className="text-[8px] text-white/20 uppercase tracking-[0.2em]">Resonancia</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={(e) => handleDeleteHistory(e, item.id)}
                                                                className="w-10 h-10 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all text-red-400 group/del shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                                                                title="Eliminar Registro"
                                                            >
                                                                <Trash2 size={16} className="group-hover/del:scale-110 transition-transform" />
                                                            </button>
                                                            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-purple-500/30 transition-colors">
                                                                <ArrowRight className="text-white/20 group-hover:translate-x-0.5 group-hover:text-purple-400 transition-all" size={16} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {step === 'RESULT' && executionData && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative z-10 w-full"
                    >
                        <SynastryResultView
                            data={executionData}
                            userA={profile}
                            userB={partnerData}
                            onNew={() => setStep('FORM')}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
