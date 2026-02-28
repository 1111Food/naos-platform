import React, { useEffect, useRef, useState } from 'react';
import { useTimeBasedMode } from '../hooks/useTimeBasedMode';

interface AudioControls {
    volume: number;
    isMuted: boolean;
}

const VERSION = "7.3";

export const NaosVibrationEngine: React.FC = () => {
    const mode = useTimeBasedMode(); // 'DAY' or 'NIGHT'
    const dayAudioRef = useRef<HTMLAudioElement | null>(null);
    const nightAudioRef = useRef<HTMLAudioElement | null>(null);

    const [controls, setControls] = useState<AudioControls>(() => {
        const saved = localStorage.getItem('naos_audio_prefs');
        return saved ? JSON.parse(saved) : { volume: 0.3, isMuted: true };
    });

    // Rutas Locales (Independencia Total)
    const AUDIO_SOURCES = {
        DAY: '/sounds/dia.mp3',
        NIGHT: '/sounds/noche.mp3'
    };

    const initAudio = () => {
        try {
            if (!dayAudioRef.current) {
                dayAudioRef.current = new Audio(AUDIO_SOURCES.DAY);
                dayAudioRef.current.loop = true;
                dayAudioRef.current.volume = 0;
                dayAudioRef.current.onerror = () => { /* Silencio - Archivo no listo */ };
            }
            if (!nightAudioRef.current) {
                nightAudioRef.current = new Audio(AUDIO_SOURCES.NIGHT);
                nightAudioRef.current.loop = true;
                nightAudioRef.current.volume = 0;
                nightAudioRef.current.onerror = () => { /* Silencio - Archivo no listo */ };
            }
        } catch (e) {
            // Error de inicialización ignorado silenciosamente
        }
    };

    const tryPlay = async (audio: HTMLAudioElement | null) => {
        if (!audio || controls.isMuted) return;

        try {
            if (audio.paused) {
                await audio.play();
                console.log(`✨ [NaosVibration v${VERSION}] Sintonía local activa (${mode})`);
            }
        } catch (err) {
            // Error de reproducción ignorado (esperando interacción o archivo inexistente)
        }
    };

    // Lógica de Cross-fade Suave
    useEffect(() => {
        if (!dayAudioRef.current || !nightAudioRef.current) return;

        const fadeTime = 4000;
        const steps = 40;
        const interval = fadeTime / steps;

        const dayTarget = (mode === 'DAY' && !controls.isMuted) ? controls.volume : 0;
        const nightTarget = (mode === 'NIGHT' && !controls.isMuted) ? controls.volume : 0;

        const dayStep = (dayTarget - dayAudioRef.current.volume) / steps;
        const nightStep = (nightTarget - nightAudioRef.current.volume) / steps;

        let count = 0;
        const timer = setInterval(() => {
            if (dayAudioRef.current) {
                dayAudioRef.current.volume = Math.max(0, Math.min(1, dayAudioRef.current.volume + dayStep));
            }
            if (nightAudioRef.current) {
                nightAudioRef.current.volume = Math.max(0, Math.min(1, nightAudioRef.current.volume + nightStep));
            }
            count++;
            if (count >= steps) {
                clearInterval(timer);
                if (dayTarget > 0) tryPlay(dayAudioRef.current);
                if (nightTarget > 0) tryPlay(nightAudioRef.current);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [mode, controls.isMuted, controls.volume]);

    // Activación por Interacción (SacredDock o Clic General)
    useEffect(() => {
        const interaction = () => {
            initAudio();
            if (!controls.isMuted) {
                if (mode === 'DAY') tryPlay(dayAudioRef.current);
                if (mode === 'NIGHT') tryPlay(nightAudioRef.current);
            }
        };

        const events = ['click', 'touchstart', 'mousedown'];
        events.forEach(evt => window.addEventListener(evt, interaction, { once: true }));

        return () => {
            events.forEach(evt => window.removeEventListener(evt, interaction));
        };
    }, [mode, controls.isMuted]);

    // Registro Global para SacredDock
    useEffect(() => {
        (window as any).setNaosVibration = (newControls: Partial<AudioControls>) => {
            initAudio();
            setControls(prev => {
                const updated = { ...prev, ...newControls };
                localStorage.setItem('naos_audio_prefs', JSON.stringify(updated));
                return updated;
            });
        };
        return () => { delete (window as any).setNaosVibration; };
    }, []);

    return null;
};
