import React, { useEffect, useState } from 'react';
import { getCompletedProtocols } from '../../services/supabaseService';


interface ProtocolVaultProps {
    userId: string;
    onClose: () => void;
}

export const ProtocolVault: React.FC<ProtocolVaultProps> = ({ userId, onClose }) => {
    const [completedProtocols, setCompletedProtocols] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getCompletedProtocols(userId);
                setCompletedProtocols(data);
            } catch (error) {
                console.error("Error al cargar la bóveda", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, [userId]);

    return (
        <div className="flex flex-col min-h-[500px] p-6 bg-black/60 backdrop-blur-xl rounded-2xl border border-gray-800 text-white w-full max-w-2xl mx-auto shadow-[0_0_20px_rgba(45,212,191,0.05)]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-light tracking-widest text-teal-400">BÓVEDA ALQUÍMICA</h2>
                    <p className="text-sm text-gray-400 mt-1">Tu historial de transformación y hábitos integrados.</p>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                    Cerrar
                </button>
            </div>

            {isLoading ? (
                <div className="flex-1 flex justify-center items-center text-teal-400">Sincronizando...</div>
            ) : completedProtocols.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center text-center opacity-50">
                    <p className="text-lg mb-2 text-gray-400">Tu bóveda está vacía.</p>
                    <p className="text-sm text-gray-500">Completa tu primer Protocolo 21 para forjar tu primer sello.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2">
                    {completedProtocols.map((protocol) => (
                        <div key={protocol.id} className="p-4 border border-teal-500/30 bg-teal-900/10 rounded-xl relative overflow-hidden group hover:border-teal-400 transition-all duration-300">
                            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
                                ⬡
                            </div>
                            <h3 className="text-lg text-teal-300 font-medium mb-1">{protocol.title}</h3>
                            <p className="text-xs text-gray-400 mb-3 italic">"{protocol.purpose}"</p>
                            <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider">
                                <span>Completado</span>
                                <span>{protocol.end_date ? new Date(protocol.end_date).toLocaleDateString() : 'N/A'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
