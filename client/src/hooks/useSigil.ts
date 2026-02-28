import { useState, useCallback, useRef, useEffect } from 'react';
import { endpoints, getAuthHeaders } from '../lib/api';
import { useGuardianState } from '../contexts/GuardianContext';
export function useSigil(userName?: string, energyContext?: any) {
    const { oracleState, addMessage: addGlobalMessage } = useGuardianState();

    const getWelcomeMessage = useCallback(() => {
        const cleanName = (userName || 'Viajero').replace(/\.+$/, '');
        const intros = [
            `El silencio ha terminado. NAOS te reconoce, ${cleanName}.`,
            `Las esferas se han alineado. ¿Qué buscas en el tejido del tiempo?`,
            `Bienvenido al Templo, ${cleanName}. Tu rastro estelar nos guía.`
        ];
        return intros[Math.floor(Math.random() * intros.length)];
    }, [userName]);

    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const lastCallRef = useRef<number>(0);

    // Sync messages from global state
    useEffect(() => {
        if (oracleState.messages.length > 0) {
            setMessages(oracleState.messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                text: m.text
            })));
        } else if (messages.length === 0) {
            setMessages([{ role: 'model', text: getWelcomeMessage() }]);
        }
    }, [oracleState.messages, getWelcomeMessage]);

    const sendMessage = async (text: string, role: 'maestro' | 'guardian' = 'maestro', retryCount = 0) => {
        const now = Date.now();
        if (now - lastCallRef.current < 2000 && retryCount === 0) {
            setMessages(prev => [...prev, { role: 'model', text: "⏳ Calibrando frecuencia... espera un momento." }]);
            return;
        }
        lastCallRef.current = now;

        setLoading(true);
        if (retryCount === 0) {
            // Immediate feedback (optimistic UI controlled by GuardianContext would be better, but keeping it simple)
            setMessages(prev => [...prev, { role: 'user', text }]);
        }

        try {
            const response = await fetch(endpoints.chat, {
                method: 'POST',
                headers: getAuthHeaders() as HeadersInit,
                body: JSON.stringify({
                    message: text,
                    localTimestamp: new Date().toISOString(),
                    oracleState,
                    energyContext,
                    role
                })
            });

            if (!response.ok) {
                if (response.status === 429 && retryCount < 1) {
                    setMessages(prev => [...prev, { role: 'model', text: "El éter está saturado... Recalibrando energía." }]);
                    setTimeout(() => sendMessage(text, role, retryCount + 1), 2000);
                    return;
                }
                throw new Error(`Error ${response.status}`);
            }

            const data = await response.text();

            // Permanent storage in global context
            if (retryCount === 0) {
                addGlobalMessage({ id: `u-${now}`, text, sender: 'user' });
            }
            addGlobalMessage({ id: `s-${Date.now()}`, text: data, sender: 'sigil' });

        } catch (err) {
            console.error("Sigil Connection Error:", err);
            setMessages(prev => [
                ...prev.filter(m => m.text !== "El éter está saturado... Recalibrando energía."),
                { role: 'model', text: "El éter está turbulento. Revisa tu conexión mística o intenta más tarde." }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading };
}
