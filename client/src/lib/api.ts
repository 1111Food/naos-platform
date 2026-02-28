// Use environment variable for backend URL if provided
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getAuthHeaders = (): Record<string, string> => {
    // Get Supabase token from localStorage (standard location for supabase-js)
    const supabaseKey = Object.keys(localStorage).find(key => key.startsWith('sb-') && key.endsWith('-auth-token'));
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (supabaseKey) {
        try {
            const authData = JSON.parse(localStorage.getItem(supabaseKey) || '{}');
            if (authData?.access_token) {
                headers['Authorization'] = `Bearer ${authData.access_token}`;
            }
        } catch (e) {
            console.error("Error parsing auth token", e);
        }
    }
    return headers;
};

export const endpoints = {
    chat: `${API_BASE_URL}/api/chat`,
    energy: `${API_BASE_URL}/api/energy`,
    profile: `${API_BASE_URL}/api/profile`,
    subscription: `${API_BASE_URL}/api/subscription`,
    upgrade: `${API_BASE_URL}/api/subscription/upgrade`,
    tarot: `${API_BASE_URL}/api/tarot`,
    astrology: `${API_BASE_URL}/api/astrology`,
    coherence: `${API_BASE_URL}/api/coherence`,
    coherenceStatus: `${API_BASE_URL}/api/coherence/status`,
    coherenceAction: `${API_BASE_URL}/api/coherence/action`,
    coherenceRank: `${API_BASE_URL}/api/coherence/rank`,
    synastry: `${API_BASE_URL}/api/synastry/analyze`,
    synastryHistory: `${API_BASE_URL}/api/synastry/history`,
    ranking: `${API_BASE_URL}/api/ranking`
};
