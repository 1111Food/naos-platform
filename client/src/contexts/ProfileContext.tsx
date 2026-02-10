import React, { createContext, useContext, useState, useEffect } from 'react';
import { endpoints } from '../lib/api';

export interface UserProfile {
    id: string;
    name: string;
    nickname?: string;
    birthDate: string;
    birthTime: string;
    birthCity?: string;
    birthCountry?: string;
    birthPlace?: string; // Alias for birthCity/location
    birthState?: string;
    location?: { name: string }; // Geo object structure if used
    astrology?: any;
    numerology?: any;
    fengShui?: any;
    mayan?: any;
    nawal_maya?: string;
    nawal_tono?: number;
    chinese_animal?: string;
    chinese_element?: string;
    chinese_birth_year?: number;
    sigil_url?: string;
    subscription: {
        plan: 'FREE' | 'PREMIUM';
        features: string[];
    };
}

interface ProfileContextType {
    profile: UserProfile | null;
    availableProfiles: { id: string, name: string, nickname?: string }[];
    loading: boolean;
    isTemporary: boolean;
    setTemporary: (val: boolean) => void;
    selectProfile: (id: string) => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | undefined>;
    refreshProfile: (id?: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_PROFILES_KEY = 'naos_available_profiles';
const ACTIVE_PROFILE_KEY = 'naos_active_profile_id';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [availableProfiles, setAvailableProfiles] = useState<{ id: string, name: string, nickname?: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTemporary, setIsTemporary] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_PROFILES_KEY);
        if (stored) {
            setAvailableProfiles(JSON.parse(stored));
        }

        const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
        if (activeId && activeId !== 'temp' && activeId !== 'new-profile') {
            refreshProfile(activeId);
        } else {
            // --- FALLBACK LOCAL (v9.14) ---
            // Si es temporal o nuevo, cargar de 'user_profile' en localStorage
            const localProfile = localStorage.getItem('user_profile');
            if (localProfile) {
                try {
                    const parsed = JSON.parse(localProfile);
                    console.log("📦 ProfileContext: Cargando perfil desde localStorage:", parsed);
                    setProfile(parsed as UserProfile);
                    setIsTemporary(activeId === 'temp');
                } catch (e) {
                    console.error("Error parsing user_profile from localStorage:", e);
                }
            }
            setLoading(false);
        }
    }, []);

    const refreshProfile = async (id?: string) => {
        const profileId = id || localStorage.getItem(ACTIVE_PROFILE_KEY);
        if (!profileId || profileId === 'temp') return;

        try {
            const res = await fetch(endpoints.profile, {
                headers: { 'x-profile-id': profileId }
            });
            const data = await res.json();
            if (data && data.id) {
                setProfile(data);
                setIsTemporary(false);
            }
        } catch (err) {
            console.error("Context: Failed to fetch profile", err);
        } finally {
            setLoading(false);
        }
    };

    const selectProfile = async (id: string) => {
        setLoading(true);
        localStorage.setItem(ACTIVE_PROFILE_KEY, id);
        await refreshProfile(id);
    };

    const setTemporary = (val: boolean) => {
        setIsTemporary(val);
        if (val) {
            setProfile(null);
            localStorage.setItem(ACTIVE_PROFILE_KEY, 'temp');
        }
    };

    const updateProfile = async (data: Partial<UserProfile>) => {
        // --- UNIVERSAL CALCULATION FIX (v9.12) ---
        // Always hit the backend to get calculations (Astrology, Numerology, Mayan)
        // even for temporary profiles. We use a special header or ID.
        if (isTemporary) {
            console.log("Context: Temporary Profile Update -> Forcing Backend Calculation...");
            try {
                // Use a 'temp' ID or just POST to create/calc without saving?
                // The backend Service.updateProfile handles '0000...' as a default.
                // We will send the data to the backend to get the calculated object back.

                // If we don't have an ID, we use the default '0000...' for calculation purposes
                const tempId = profile?.id || '00000000-0000-0000-0000-000000000000';

                const res = await fetch(endpoints.profile, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-profile-id': tempId
                    },
                    body: JSON.stringify(data)
                });

                const calculatedProfile = await res.json();

                // Merge with local state but keep isTemporary true
                const merged = { ...profile, ...calculatedProfile, ...data, id: tempId } as UserProfile;
                setProfile(merged);
                return merged;
            } catch (e) {
                console.error("Context: Backend Calc Failed for Temp, falling back to local merge", e);
                const tempProfile = { ...profile, ...data } as UserProfile;
                setProfile(tempProfile);
                return tempProfile;
            }
        }

        const profileId = profile?.id || localStorage.getItem(ACTIVE_PROFILE_KEY);
        try {
            console.log("Context: Updating Profile...", data.name);
            const res = await fetch(endpoints.profile, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-profile-id': profileId || ''
                },
                body: JSON.stringify(data)
            });
            const updated = await res.json();
            setProfile(updated);

            // --- SYNC LOCALSTORAGE (v9.16) ---
            localStorage.setItem('user_profile', JSON.stringify(updated));
            console.log("✅ ProfileContext: Synced user_profile to localStorage");

            // Update available profiles list
            if (updated.id) {
                const existingIndex = availableProfiles.findIndex(p => p.id === updated.id);
                let newList = [...availableProfiles];

                if (existingIndex >= 0) {
                    // Update existing
                    newList[existingIndex] = {
                        id: updated.id,
                        name: updated.name,
                        nickname: updated.nickname // PERSIST NICKNAME
                    };
                } else {
                    // Add new
                    newList.push({
                        id: updated.id,
                        name: updated.name,
                        nickname: updated.nickname // PERSIST NICKNAME
                    });
                }

                setAvailableProfiles(newList);
                localStorage.setItem(LOCAL_PROFILES_KEY, JSON.stringify(newList));
                localStorage.setItem(ACTIVE_PROFILE_KEY, updated.id);
            }

            console.log("Context: Profile Updated Successful.");
            return updated;
        } catch (err) {
            console.error("Context: Update failed", err);
        }
    };

    return (
        <ProfileContext.Provider value={{
            profile, availableProfiles, loading, isTemporary,
            setTemporary, selectProfile, updateProfile, refreshProfile
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error("useProfile must be used within ProfileProvider");
    return context;
};
