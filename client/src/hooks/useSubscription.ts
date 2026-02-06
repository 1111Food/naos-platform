import { useState, useEffect } from 'react';
import { endpoints } from '../lib/api';

export interface SubscriptionStatus {
    plan: 'FREE' | 'PREMIUM';
    validUntil?: string;
    features: string[];
}

export function useSubscription() {
    const [status, setStatus] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(endpoints.subscription)
            .then(res => res.json())
            .then(data => {
                setStatus(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch subscription", err);
                setLoading(false);
            });
    }, []);

    const upgrade = async () => {
        try {
            const res = await fetch(endpoints.upgrade, {
                method: 'POST'
            });
            const updated = await res.json();
            setStatus(updated);
        } catch (err) {
            console.error("Upgrade failed", err);
        }
    };

    return { status, loading, upgrade };
}
