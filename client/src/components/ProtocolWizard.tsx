import React, { useState } from 'react';
import { createProtocol } from '../services/supabaseService';

interface ProtocolWizardProps {
    userId: string;
    onProtocolCreated: () => void;
    onCancel: () => void;
}

export const ProtocolWizard: React.FC<ProtocolWizardProps> = ({ userId, onProtocolCreated, onCancel }) => {
    const [title, setTitle] = useState('');
    const [purpose, setPurpose] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !purpose.trim()) return;
        setIsSubmitting(true);
        try {
            await createProtocol(userId, title, purpose);
            console.log("Protocolo creado exitosamente");
            onProtocolCreated();
        } catch (error) {
            console.error("Hubo un error al guardar", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-gray-800 text-white w-full max-w-md mx-auto shadow-[0_0_15px_rgba(45,212,191,0.1)]">
            <h2 className="text-2xl font-light mb-2 text-center tracking-widest text-teal-400">NUEVO PROTOCOLO</h2>
            <p className="text-sm text-gray-400 mb-8 text-center">Firma tu compromiso alquímico para los próximos 21 días.</p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500">¿Qué hábito deseas integrar?</label>
                    <input type="text" placeholder="Ej. Meditar 10 minutos al despertar" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-b border-gray-700 focus:border-teal-400 outline-none py-2 text-sm transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500">¿Cuál es tu propósito detrás de esto?</label>
                    <textarea placeholder="Ej. Para conectar con mi intuición..." value={purpose} onChange={(e) => setPurpose(e.target.value)} className="bg-transparent border-b border-gray-700 focus:border-teal-400 outline-none py-2 text-sm transition-colors resize-none h-20" required />
                </div>
                <div className="flex gap-4 mt-4">
                    <button type="button" onClick={onCancel} className="flex-1 py-3 text-xs uppercase tracking-wider text-gray-400 hover:text-white transition-colors" disabled={isSubmitting}>Cancelar</button>
                    <button type="submit" className="flex-1 py-3 px-4 bg-teal-500/10 border border-teal-500 text-teal-400 text-xs uppercase tracking-wider rounded hover:bg-teal-500 hover:text-black transition-all disabled:opacity-50" disabled={isSubmitting}>{isSubmitting ? 'Sellando...' : 'Sellar Compromiso'}</button>
                </div>
            </form>
        </div>
    );
};
