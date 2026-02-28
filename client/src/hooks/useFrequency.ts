import { useState, useCallback, useRef, useEffect } from 'react';

// frequencies based on Solfeggio / Zen principles
export const ELEMENT_FREQUENCIES = {
    FIRE: { baseHz: 528, label: "528 Hz - Transmutación", color: "#f97316" }, // Orange
    WATER: { baseHz: 432, label: "432 Hz - Armonía", color: "#06b6d4" }, // Cyan
    EARTH: { baseHz: 174, label: "174 Hz - Enraizamiento", color: "#10b981" }, // Emerald 
    AIR: { baseHz: 639, label: "639 Hz - Claridad", color: "#d946ef" } // Fuchsia
};

export type ElementType = keyof typeof ELEMENT_FREQUENCIES;

export const useFrequency = () => {
    const [activeElement, setActiveElement] = useState<ElementType | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorsRef = useRef<OscillatorNode[]>([]);
    const gainNodeRef = useRef<GainNode | null>(null);
    const lfoRef = useRef<OscillatorNode | null>(null);

    // Initialize Audio Context lazily to comply with browser autoplay policies
    const initAudioContext = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    const stopFrequency = useCallback(() => {
        if (!audioContextRef.current) return;

        const now = audioContextRef.current.currentTime;

        // Fade out
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.setTargetAtTime(0, now, 0.5); // 0.5s fade out
        }

        // Stop oscillators slightly after fade out
        setTimeout(() => {
            oscillatorsRef.current.forEach(osc => {
                try { osc.stop(); osc.disconnect(); } catch (e) { }
            });
            if (lfoRef.current) {
                try { lfoRef.current.stop(); lfoRef.current.disconnect(); } catch (e) { }
            }
            if (gainNodeRef.current) {
                gainNodeRef.current.disconnect();
            }

            oscillatorsRef.current = [];
            gainNodeRef.current = null;
            lfoRef.current = null;
            setActiveElement(null);
        }, 1500);
    }, []);

    const playFrequency = useCallback((element: ElementType) => {
        initAudioContext();

        // If the same element is already playing, do nothing
        if (activeElement === element) return;

        // If something else is playing, stop it first
        if (activeElement) {
            // Immediate stop of previous without fade to prevent overlapping muddiness
            oscillatorsRef.current.forEach(osc => {
                try { osc.stop(); osc.disconnect(); } catch (e) { }
            });
            if (gainNodeRef.current) gainNodeRef.current.disconnect();
            if (lfoRef.current) { try { lfoRef.current.stop(); lfoRef.current.disconnect(); } catch (e) { } }
            oscillatorsRef.current = [];
        }

        const ctx = audioContextRef.current!;
        const { baseHz } = ELEMENT_FREQUENCIES[element];

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0; // Start at 0 for fade-in
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Create a rich droning sound using 3 oscillators (Fundamental, Sub, fifth)
        const osc1 = ctx.createOscillator(); // Fundamental
        osc1.type = 'sine';
        osc1.frequency.value = baseHz;

        const osc2 = ctx.createOscillator(); // Sub-octave for body
        osc2.type = 'triangle';
        osc2.frequency.value = baseHz / 2;

        const osc3 = ctx.createOscillator(); // Perfect fifth, lower volume, for mystique
        osc3.type = 'sine';
        osc3.frequency.value = baseHz * 1.5;

        // Create an LFO to modulate the gain slightly (creates a "breathing" / vibrating effect)
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.1; // Very slow wave (10 seconds per cycle)

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.2; // Depth of the modulation

        lfo.connect(lfoGain);

        // Mix oscillators
        const mixGain1 = ctx.createGain(); mixGain1.gain.value = 0.5;
        const mixGain2 = ctx.createGain(); mixGain2.gain.value = 0.3; // triangle is louder
        const mixGain3 = ctx.createGain(); mixGain3.gain.value = 0.1; // fifth is quiet

        osc1.connect(mixGain1);
        osc2.connect(mixGain2);
        osc3.connect(mixGain3);

        mixGain1.connect(masterGain);
        mixGain2.connect(masterGain);
        mixGain3.connect(masterGain);

        // Apply LFO to master gain's audioparam directly to create a pumping effect
        // We add it to the base volume
        lfoGain.connect(masterGain.gain);

        // Start all
        osc1.start();
        osc2.start();
        osc3.start();
        lfo.start();

        oscillatorsRef.current = [osc1, osc2, osc3];
        lfoRef.current = lfo;

        // Smooth fade in
        const now = ctx.currentTime;
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.4, now + 2); // Reach full volume over 2 seconds

        setActiveElement(element);

    }, [activeElement]);

    const toggleFrequency = useCallback((element: ElementType) => {
        if (activeElement === element) {
            stopFrequency();
        } else {
            playFrequency(element);
        }
    }, [activeElement, playFrequency, stopFrequency]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (oscillatorsRef.current.length > 0) {
                stopFrequency();
            }
        };
    }, [stopFrequency]);

    return {
        activeElement,
        playFrequency,
        stopFrequency,
        toggleFrequency,
        ELEMENT_FREQUENCIES
    };
};
