import { NORMALIZED_CITIES } from './cityDb';

interface GeoCache {
    coordinates: Record<string, { lat: number, lng: number }>;
    timezones: Record<string, number>;
}

const cache: GeoCache = {
    coordinates: {},
    timezones: {}
};

export class GeocodingService {
    static async getCoordinates(city: string, state: string, country: string): Promise<{ lat: number, lng: number }> {
        const query = `${city}, ${country}`.toLowerCase().trim();
        const fullQuery = `${city}, ${state}, ${country}`.toLowerCase().trim();

        // 1. Check Static Normalized DB first
        if (NORMALIZED_CITIES[query]) {
            console.log(`🎯 Geocoding NORMALIZED Hit: ${query}`);
            return NORMALIZED_CITIES[query];
        }
        if (NORMALIZED_CITIES[fullQuery]) {
            console.log(`🎯 Geocoding NORMALIZED Hit: ${fullQuery}`);
            return NORMALIZED_CITIES[fullQuery];
        }

        // 2. Check Cache
        if (cache.coordinates[fullQuery]) {
            console.log(`🎯 Geocoding Cache Hit: ${fullQuery}`);
            return cache.coordinates[fullQuery];
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullQuery)}&format=json&limit=1`;

        try {
            console.log(`🌐 Geocoding API Request: ${query}...`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'NAOS-App (spiritual-ai-companion)'
                }
            });
            const data: any = await response.json();

            if (data && data.length > 0) {
                // LOCK: Force 6 decimal precision for maximum stability
                const result = {
                    lat: Math.round(parseFloat(data[0].lat) * 1000000) / 1000000,
                    lng: Math.round(parseFloat(data[0].lon) * 1000000) / 1000000
                };
                console.log(`🔒 Geocoding LOCK Applied: ${fullQuery} -> ${result.lat}, ${result.lng}`);
                // Store in Cache
                cache.coordinates[fullQuery] = result;
                return result;
            }

            console.warn(`⚠️ Geocoding failed for ${fullQuery}, using frozen fallback.`);
            return { lat: 14.634900, lng: -90.506900 }; // Guatemala City frozen fallback
        } catch (error) {
            console.error("❌ Geocoding Error:", error);
            return { lat: 14.6349, lng: -90.5069 };
        }
    }

    static async getTimezoneOffset(lat: number, lng: number): Promise<number> {
        const cacheKey = `${lat.toFixed(2)},${lng.toFixed(2)}`;

        // 1. Check Cache
        if (cache.timezones[cacheKey] !== undefined) {
            console.log(`🎯 Timezone Cache Hit: ${cacheKey}`);
            return cache.timezones[cacheKey];
        }

        const url = `https://www.timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lng}`;
        try {
            console.log(`🌍 Timezone API Request: ${cacheKey}...`);
            const res = await fetch(url);
            const data: any = await res.json();
            if (data && data.currentUtcOffset) {
                const offset = data.currentUtcOffset.seconds / 3600;
                cache.timezones[cacheKey] = offset;
                return offset;
            }
            return -6;
        } catch (e) {
            console.error("❌ Timezone Error:", e);
            return -6;
        }
    }
}
