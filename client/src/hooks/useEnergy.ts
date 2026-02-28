import { useState, useEffect } from 'react';
import { MayanEngine } from '../lib/mayanEngine';
import { useCoherence } from './useCoherence';

// Types
interface EnergySnapshot {
    date: string;
    transitScore: number;
    dominantElement: string;
    guidance: string;
    moonPhase: string;
    mayan?: {
        nawal: string;
        tone: number;
        meaning: string;
        kicheName?: string; // Add this for stronger typing if needed
    };
    fengShui?: {
        dailyStar: number;
        energy: string;
    };
}

export function useEnergy(userId?: string) {
    const [energy, setEnergy] = useState<EnergySnapshot | null>(null);
    const [loading, setLoading] = useState(true);

    // V4.0: Use Real Coherence Engine
    const { score, trend, astralMood } = useCoherence();

    useEffect(() => {
        const fetchEnergyData = async () => {
            setLoading(true);
            try {
                // 1. Local Calculation (Replaces /api/energy)
                const now = new Date();
                const todayIso = now.toISOString().split('T')[0];
                const day = now.getDate();

                // Transit Score (Replaced by Coherence Score conceptually, but we keep transitScore 
                // as a distinct "Environment" metric if needed, or sync it.
                // For "Energy Ring", the user wants the Coherence Score.
                // We will map transitScore to the Real Coherence Score for UI compatibility.
                const transitScore = score;

                // Dominant Element
                const elements = ['FUEGO', 'TIERRA', 'AIRE', 'AGUA'];
                const dominantElement = elements[day % 4];

                // Feng Shui Logic
                const fengShuiTips = [
                    "Coloca una planta cerca de tu ventana para renovar el Qi.",
                    "Limpia tu escritorio para invitar a la claridad mental.",
                    "Añade un cristal de cuarzo en tu zona de trabajo.",
                    "Permite que la luz natural bañe tu espacio matutino.",
                    "Mantén el flujo de agua limpio para atraer prosperidad.",
                    "Elimina objetos rotos para evitar el estancamiento energético.",
                    "Enciende una vela de sándalo para purificar el ambiente.",
                    "Organiza tus libros para ordenar tus pensamientos."
                ];
                const dailyTip = fengShuiTips[day % fengShuiTips.length];
                const dailyStar = ((day + now.getMonth()) % 9) + 1;

                // Mayan Calculation
                let mayanData;
                try {
                    const m = MayanEngine.calculate(todayIso);
                    mayanData = {
                        nawal: m.nawal_maya,
                        tone: m.nawal_tono,
                        meaning: m.meaning,
                        kicheName: m.kicheName
                    };
                } catch (e) {
                    console.warn("Mayan calc error:", e);
                }

                const baseData: EnergySnapshot = {
                    date: todayIso,
                    transitScore, // Now populated with Real Coherence Score
                    dominantElement,
                    guidance: dailyTip,
                    moonPhase: 'Luna Creciente 🌙', // Static for now or use algorithm if needed
                    mayan: mayanData,
                    fengShui: {
                        dailyStar,
                        energy: dailyStar % 2 === 0 ? 'YIN (Pasivo/Femenino)' : 'YANG (Activo/Masculino)'
                    }
                };

                setEnergy(baseData);
            } catch (err) {
                console.error("Local energy calculation failed", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnergyData();
    }, [userId, score, astralMood]); // Re-run when score or mood updates



    // Derived dynamic score (Safe clamp 0-100)
    // Now purely based on the Real Engine
    const baseScore = score;
    const dynamicScore = score;

    return {
        energy,
        dailyGuidance_short: energy?.guidance,
        baseScore,
        regulationBoost: 0, // Deprecated/Integrated into score
        dynamicScore,
        loading,
        trend, // Expose trend
        astralMood // Expose mood
    };
}
