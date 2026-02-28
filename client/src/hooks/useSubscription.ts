import { useState, useEffect } from 'react';
import { endpoints } from '../lib/api';

export interface SubscriptionStatus {
    plan: 'FREE' | 'PREMIUM' | 'EXTENDED';
    validUntil?: string;
    features: string[];
}

export function useSubscription(shouldFetch: boolean = true) {
    const [status, setStatus] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState(shouldFetch);

    useEffect(() => {
        if (!shouldFetch) {
            setLoading(false);
            return;
        }

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

    const togglePlan = async () => {
        try {
            const nextPlan = status?.plan === 'PREMIUM' ? 'FREE' : 'PREMIUM';
            const res = await fetch(endpoints.upgrade, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plan: nextPlan })
            });
            const updated = await res.json();
            setStatus(updated);
        } catch (err) {
            console.error("Toggle Plan failed", err);
        }
    };

    return { status, loading, upgrade, togglePlan };
}
