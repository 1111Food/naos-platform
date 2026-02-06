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
        const query = `${city}, ${state}, ${country}`.toLowerCase().trim();

        // 1. Check Cache
        if (cache.coordinates[query]) {
            console.log(`🎯 Geocoding Cache Hit: ${query}`);
            return cache.coordinates[query];
        }

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

        try {
            console.log(`🌐 Geocoding API Request: ${query}...`);
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'NAOS-App (spiritual-ai-companion)'
                }
            });
            const data: any = await response.json();

            if (data && data.length > 0) {
                const result = {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon)
                };
                // Store in Cache
                cache.coordinates[query] = result;
                return result;
            }

            console.warn(`⚠️ Geocoding failed for ${query}, using fallback.`);
            return { lat: 14.6349, lng: -90.5069 }; // Guatemala City fallback
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
