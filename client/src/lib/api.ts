// Use relative paths to allow Vite Proxy to handle cross-origin/IP issues
export const API_BASE_URL = 'http://localhost:3001';

export const endpoints = {
    chat: '/api/chat',
    energy: '/api/energy',
    profile: '/api/profile',
    subscription: '/api/subscription',
    upgrade: '/api/subscription/upgrade',
    tarot: '/api/tarot',
    numerology: '/api/numerology',
    astrology: '/api/astrology/natal-chart'
};
