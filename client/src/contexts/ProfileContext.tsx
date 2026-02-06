import React, { createContext, useContext, useState, useEffect } from 'react';
import { endpoints } from '../lib/api';

export interface UserProfile {
    id: string;
    name: string;
    birthDate: string;
    birthTime: string;
    birthCity?: string;
    birthCountry?: string;
    astrology?: any;
    numerology?: any;
    fengShui?: any;
    sigil_url?: string;
    subscription: {
        plan: 'FREE' | 'PREMIUM';
        features: string[];
    };
}

interface ProfileContextType {
    profile: UserProfile | null;
    loading: boolean;
    updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | undefined>;
    refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async () => {
        try {
            const res = await fetch(endpoints.profile);
            const data = await res.json();
            setProfile(data);
        } catch (err) {
            console.error("Context: Failed to fetch profile", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshProfile();
    }, []);

    const updateProfile = async (data: Partial<UserProfile>) => {
        try {
            console.log("Context: Updating Profile...", data.name);
            const res = await fetch(endpoints.profile, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const updated = await res.json();
            setProfile(updated);
            console.log("Context: Profile Updated Successful.");
            return updated;
        } catch (err) {
            console.error("Context: Update failed", err);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, loading, updateProfile, refreshProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error("useProfile must be used within ProfileProvider");
    return context;
};
