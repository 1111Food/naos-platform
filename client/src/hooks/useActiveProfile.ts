import { useState, useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import type { UserProfile } from '../contexts/ProfileContext';

/**
 * Hook centralizado para acceder al perfil activo del usuario.
 * 
 * Este hook es la ÚNICA fuente de verdad para todas las vistas.
 * Sincroniza automáticamente localStorage con ProfileContext.
 * 
 * Flujo de prioridad:
 * 1. Si hay perfil en ProfileContext, usarlo
 * 2. Si no, intentar cargar de localStorage ('user_profile')
 * 3. Si se carga de localStorage, sincronizar con ProfileContext
 * 
 * @returns {object} { profile: UserProfile | null, loading: boolean }
 */
export function useActiveProfile() {
    const { profile, updateProfile, loading } = useProfile();
    const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Prioridad 1: Si hay perfil en contexto, usarlo
        if (profile) {
            setActiveProfile(profile);
            setIsReady(true);
            console.log('🎯 useActiveProfile: Usando perfil del contexto');
            return;
        }

        // Prioridad 2: Si no hay perfil en contexto, intentar cargar de localStorage
        const activeId = localStorage.getItem('naos_active_profile_id');
        const localProfile = localStorage.getItem('user_profile');

        if ((activeId === 'temp' || activeId === 'new-profile') && localProfile) {
            try {
                const parsed = JSON.parse(localProfile);
                console.log('🔄 useActiveProfile: Sincronizando desde localStorage:', parsed.name);
                // Usar updateProfile para sincronizar con el contexto
                updateProfile(parsed).then(() => {
                    setActiveProfile(parsed);
                    setIsReady(true);
                }).catch((e) => {
                    console.error('❌ useActiveProfile: Error syncing profile:', e);
                    // Aún así usar el perfil local
                    setActiveProfile(parsed);
                    setIsReady(true);
                });
            } catch (e) {
                console.error('❌ useActiveProfile: Error parsing user_profile:', e);
                setIsReady(true);
            }
        } else {
            // No hay perfil disponible
            setIsReady(true);
        }
    }, [profile, updateProfile]);

    return {
        profile: activeProfile,
        loading: loading || !isReady
    };
}
