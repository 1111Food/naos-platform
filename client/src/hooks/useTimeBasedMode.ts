import { useState, useEffect } from 'react';

export type TimeMode = 'DAY' | 'NIGHT';

export function useTimeBasedMode() {
    const [mode, setMode] = useState<TimeMode>('DAY');

    const updateMode = () => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
            setMode('DAY');
        } else {
            setMode('NIGHT');
        }
    };

    useEffect(() => {
        updateMode();
        const timer = setInterval(updateMode, 60000); // Check every minute
        return () => clearInterval(timer);
    }, []);

    return mode;
}
