import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export interface UserProfile {
    id: string; // Authenticated User UUID
    name: string;
    email?: string;
    nickname?: string;
    birthDate: string;
    birthTime: string;
    birthCity?: string;
    birthCountry?: string;
    birthPlace?: string;
    birthState?: string;
    location?: { name: string };
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
    active_anchor?: string | null;
    anchor_expires_at?: string | null;
    protocols_completed?: number; // New Badge Field
    last_meditation?: { type: string; date: string } | null;
    dominant_intent?: 'fitness' | 'consciousness' | 'productivity' | 'creativity' | 'none';
    subscription: {
        plan: 'FREE' | 'PREMIUM';
        features: string[];
    };
}

interface ProfileContextType {
    profile: UserProfile | null;
    loading: boolean;
    appReady: boolean;
    updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | undefined>;
    refreshProfile: () => Promise<UserProfile | null>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * Utility to map Supabase snake_case profile data to our camelCase UserProfile interface.
 */
const mapProfileData = (data: any): UserProfile => {
    return {
        ...data,
        email: data.email,
        birthDate: data.birth_date,
        birthTime: data.birth_time,
        birthCity: data.birth_city,
        birthCountry: data.birth_country,
        // Ensure complex objects are handled
        astrology: data.astrology || data.natal_chart || undefined,
        numerology: data.numerology || undefined,
        mayan: data.mayan || undefined,
        fengShui: data.fengShui || undefined
    };
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);

    const refreshProfile = useCallback(async (): Promise<UserProfile | null> => {
        if (!user) {
            setProfile(null);
            setProfileLoading(false);
            return null;
        }

        setProfileLoading(true);
        try {
            console.log("🛡️ SSoT: Fetching profile for authenticated user:", user.id);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.warn("🛡️ SSoT: Supabase fetch warning:", error.message);
            }

            const newProfile = data ? mapProfileData(data) : null;
            setProfile(newProfile);
            return newProfile;
        } catch (err) {
            console.error("🛡️ SSoT: Critical fetch error", err);
            setProfile(null);
            return null;
        } finally {
            setProfileLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!authLoading) {
            refreshProfile();
        }
    }, [user, authLoading, refreshProfile]);

    const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
        if (!user) return;

        try {
            console.log("Context: Updating Profile for User:", user.id);

            const payload: any = {
                id: user.id,
                updated_at: new Date().toISOString(),
                ...data
            };

            // Explicitly handle complex objects to ensure they are stored as JSONB
            if (data.astrology) payload.astrology = data.astrology;
            if (data.numerology) payload.numerology = data.numerology;
            if (data.mayan) payload.mayan = data.mayan;
            if (data.fengShui) payload.fengShui = data.fengShui;

            const { data: updated, error } = await supabase
                .from('profiles')
                .upsert(payload)
                .select()
                .single();

            if (error) throw error;

            if (updated) {
                const newProfile = mapProfileData(updated);
                setProfile(newProfile);
                return newProfile;
            }
        } catch (err) {
            console.error("Context: Update failed", err);
            throw err;
        }
    }, [user]);

    // appReady = Auth is settled AND (either no user OR profile is settled)
    const appReady = !authLoading && (!user || !profileLoading);

    const contextValue = useMemo(() => ({
        profile,
        loading: authLoading || profileLoading,
        appReady,
        updateProfile,
        refreshProfile
    }), [profile, authLoading, profileLoading, appReady, updateProfile, refreshProfile]);

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error("useProfile must be used within ProfileProvider");
    return context;
};
