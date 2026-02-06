import { useState, useEffect } from 'react';
import { endpoints } from '../lib/api';

// Types (Mirrored from server for now, ideally shared)
interface EnergySnapshot {
    date: string;
    transitScore: number;
    dominantElement: string;
    guidance: string;
}

export function useEnergy() {
    const [energy, setEnergy] = useState<EnergySnapshot | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(endpoints.energy)
            .then(res => res.json())
            .then(data => {
                setEnergy(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch energy", err);
                setLoading(false);
            });
    }, []);

    return { energy, loading };
}
