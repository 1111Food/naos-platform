
import { useCallback } from 'react';

export const useSound = () => {
    const playSound = useCallback((type: 'click' | 'success' | 'transition' = 'click') => {
        const soundUrls = {
            click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
            success: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
            transition: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
        };

        const audio = new Audio(soundUrls[type]);
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio play blocked:', e));
    }, []);

    return { playSound };
};
