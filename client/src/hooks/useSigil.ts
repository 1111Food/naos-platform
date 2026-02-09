import { useState, useCallback } from 'react';
import { endpoints } from '../lib/api';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export function useSigil(userName?: string) {
    const getWelcomeMessage = useCallback(() => {
        // Clean name to avoid "L.." if the name already has a dot
        const cleanName = (userName || 'Viajero').replace(/\.+$/, '');
        const intros = [
            `El silencio ha terminado. NAOS te reconoce, ${cleanName}.`,
            `Las esferas se han alineado. ¿Qué buscas en el tejido del tiempo?`,
            `Bienvenido al Templo, ${cleanName}. Tu rastro estelar nos guía.`
        ];
        return intros[Math.floor(Math.random() * intros.length)];
    }, [userName]);

    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: getWelcomeMessage() }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text: string, retryCount = 0) => {
        setLoading(true);
        if (retryCount === 0) {
            setMessages(prev => [...prev, { role: 'user', text }]);
        }

        try {
            const response = await fetch(endpoints.chat, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    localTimestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                if (response.status === 429 && retryCount < 1) {
                    console.warn("⚠️ Rate limit hit. Retrying in éter...");
                    setMessages(prev => [...prev, { role: 'model', text: "El éter está saturado... Recalibrando energía." }]);
                    setTimeout(() => sendMessage(text, retryCount + 1), 2000);
                    return;
                }
                throw new Error(`Error ${response.status}`);
            }

            const data = await response.text();

            // Remove the "Recalibrando" message if it exists
            setMessages(prev => {
                const filtered = prev.filter(m => m.text !== "El éter está saturado... Recalibrando energía.");
                return [...filtered, { role: 'model', text: data }];
            });
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
