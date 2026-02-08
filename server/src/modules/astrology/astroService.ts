import { AstrologyProfile, CelestialBody } from '../../types';
import { config } from '../../config/env';
import { AstrologyEngine } from './engine';

export class AstrologyService {

    static async calculateProfile(birthDate: string, birthTime: string, lat: number, lng: number, utcOffset = 0): Promise<AstrologyProfile> {
        console.log("!!! ZODIAC_MASTER_9000_ACTIVATED !!!");
        console.log(`\n🔮 NAOS PRO: Calculating Chart for ${birthDate} ${birthTime} at ${lat},${lng}`);

        try {
            // 1. Try Professional API
            const apiData = await this.fetchExternalApi(birthDate, birthTime, lat, lng, utcOffset);

            if (apiData) {
                console.log("✅ API Success. Mapping response...");
                return this.mapSafeResponse(apiData);
            }

            console.warn("⚠️ API Unavailable. Using Local Engine Fallback.");
            return this.calculateLocalFallback(birthDate, birthTime, lat, lng, utcOffset);

        } catch (error: any) {
            console.error("❌ Critical Astrology Error:", error);
            if (error.stack) console.error(error.stack);

            // Emergency ultra-safe fallback
            return {
                sun: { name: 'Sun', sign: 'Aries', degree: 0, absDegree: 0, house: 1 },
                moon: { name: 'Moon', sign: 'Aries', degree: 0, absDegree: 0, house: 1 },
                rising: { name: 'Ascendant', sign: 'Aries', degree: 0, absDegree: 0, house: 1 },
                planets: [],
                houses: [],
                houseSystem: 'Whole Sign',
                elements: { fire: 25, earth: 25, air: 25, water: 25 },
                sunSign: 'Aries',
                moonSign: 'Aries',
                risingSign: 'Aries'
            };
        }
    }

    private static async fetchExternalApi(birthDate: string, birthTime: string, lat: number, lng: number, utcOffset: number): Promise<any | null> {
        try {
            if (!config.ASTROLOGY_API_USER_ID || !config.ASTROLOGY_API_KEY) return null;

            const [year, month, day] = birthDate.split('-').map(Number);
            const [hour, min] = birthTime.split(':').map(Number);

            const credentials = Buffer.from(`${config.ASTROLOGY_API_USER_ID}:${config.ASTROLOGY_API_KEY}`).toString('base64');

            const payload = {
                day, month, year, hour, min, lat, lon: lng, tzone: utcOffset,
                house_type: "placidus",
                node_type: "true",
                aspects: "true"
            };

            const response = await fetch(`${config.ASTROLOGY_API_ENDPOINT}/western_horoscope`, {
                method: 'POST',
                headers: {
                    "Authorization": `Basic ${credentials}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) return null;
            const data = await response.json();
            if (data.status === false || (data.planets === undefined && data.ascendant === undefined)) return null;

            return data;
        } catch (e: any) {
            return null;
        }
    }

    private static mapSafeResponse(data: any): AstrologyProfile {
        const getBody = (key: string, label: string): CelestialBody => {
            const b = data.planets ? data.planets[key] : null;
            if (!b) return { name: label, sign: 'Unknown', degree: 0, absDegree: 0, house: 0 };
            return {
                name: label,
                sign: b.sign,
                degree: b.norm_degree,
                absDegree: b.full_degree,
                house: b.house,
                isRetrograde: b.is_retro === "true"
            };
        };

        const planets = [
            getBody('Sun', 'Sun'), getBody('Moon', 'Moon'), getBody('Mercury', 'Mercury'),
            getBody('Venus', 'Venus'), getBody('Mars', 'Mars'), getBody('Jupiter', 'Jupiter'),
            getBody('Saturn', 'Saturn'), getBody('Uranus', 'Uranus'), getBody('Neptune', 'Neptune'),
            getBody('Pluto', 'Pluto'), getBody('Chiron', 'Chiron'), getBody('Lilith', 'Lilith'),
            getBody('Node', 'North Node')
        ].filter(p => p.sign !== 'Unknown');

        const rising = {
            name: 'Ascendant',
            sign: data.ascendant?.sign || 'Aries',
            degree: data.ascendant?.norm_degree || 0,
            absDegree: data.ascendant?.full_degree || 0,
            house: 1
        };

        const houses = Array.isArray(data.houses) ? data.houses.map((h: any) => h.degree) : [];

        return this.recalculateElementsWithWeights(planets, rising, houses, 'Placidus');
    }

    private static calculateLocalFallback(birthDate: string, birthTime: string, lat: number, lng: number, utcOffset = 0): AstrologyProfile {
        const [year, month, day] = birthDate.split('-').map(Number);
        const timeParts = birthTime.split(':').map(Number);
        const hour = timeParts[0] || 0;
        const min = timeParts[1] || 0;
        const sec = timeParts[2] || 0;

        // Construct UTC Date: UTC = Local - Offset
        // Example: 10:00 AM in UTC-6 -> 10 - (-6) = 16:00 UTC
        const date = new Date(Date.UTC(year, month - 1, day, hour, min, sec));
        const utcTimestamp = date.getTime() - (utcOffset * 3600 * 1000);
        const correctedDate = new Date(utcTimestamp);

        console.log(`📡 Fallback Engine: Calculating for UTC ${correctedDate.toISOString()} (Offset: ${utcOffset})`);
        const chart = AstrologyEngine.calculateNatalChart(correctedDate, lat, lng);

        const rising = {
            name: 'Ascendant',
            sign: this.getZodiacSign(chart.ascendant),
            degree: chart.ascendant % 30,
            absDegree: chart.ascendant,
            house: 1
        };

        const planets = chart.planets.map(p => ({
            name: p.name,
            sign: p.sign,
            degree: p.degree,
            absDegree: p.absDegree,
            house: p.house,
            isRetrograde: p.retrograde
        }));

        const houses = chart.houses.map(h => h.absDegree);

        return this.recalculateElementsWithWeights(planets as CelestialBody[], rising, houses, 'Whole Sign');
    }

    private static recalculateElementsWithWeights(planets: CelestialBody[], rising: CelestialBody, houses: number[], system: any): AstrologyProfile {
        console.log("   -> [Recalc] Starting weighted calculation...");
        const elements = { fire: 0, earth: 0, air: 0, water: 0 };
        let totalWeight = 0;

        planets.forEach(p => {
            const el = this.getElementFromSign(p.sign);
            if (el) {
                let weight = 1;
                if (p.name === 'Sun' || p.name === 'Moon') weight = 4;
                else if (['Mercury', 'Venus', 'Mars'].includes(p.name)) weight = 2;

                elements[el] += weight;
                totalWeight += weight;
            }
        });

        const ascEl = this.getElementFromSign(rising.sign);
        if (ascEl) {
            elements[ascEl] += 3;
            totalWeight += 3;
        }

        console.log(`   -> [Recalc] Total Weight: ${totalWeight}, Elements:`, elements);

        let percentages = { fire: 0, earth: 0, air: 0, water: 0 };
        if (totalWeight > 0) {
            const keys: (keyof typeof elements)[] = ['fire', 'earth', 'air', 'water'];
            let currentSum = 0;
            keys.forEach(key => {
                percentages[key] = Math.round((elements[key] / totalWeight) * 100);
                currentSum += percentages[key];
            });

            if (currentSum !== 100 && currentSum > 0) {
                const diff = 100 - currentSum;
                let maxVal = -1;
                let maxKey: keyof typeof elements = 'fire';
                keys.forEach(key => {
                    if (percentages[key] > maxVal) {
                        maxVal = percentages[key];
                        maxKey = key;
                    }
                });
                percentages[maxKey] += diff;
            }
        } else {
            // Fallback if no elements found (unlikely)
            percentages = { fire: 25, earth: 25, air: 25, water: 25 };
        }

        const sun = planets.find(p => p.name === 'Sun') || planets[0] || { name: 'Sun', sign: 'Aries', degree: 0, absDegree: 0, house: 1 };
        const moon = planets.find(p => p.name === 'Moon') || planets[1] || { name: 'Moon', sign: 'Aries', degree: 0, absDegree: 0, house: 1 };

        return {
            sun,
            moon,
            rising,
            planets,
            houses,
            houseSystem: system,
            elements: percentages,
            sunSign: sun.sign,
            moonSign: moon.sign,
            risingSign: rising.sign
        };
    }

    private static getElementFromSign(sign: string): 'fire' | 'earth' | 'air' | 'water' | null {
        if (!sign) return null;
        const s = sign.toLowerCase().trim();
        const Fire = ['aries', 'leo', 'sagittarius', 'sagitario'];
        const Earth = ['taurus', 'tauro', 'virgo', 'capricorn', 'capricornio'];
        const Air = ['gemini', 'géminis', 'geminis', 'libra', 'aquarius', 'acuario'];
        const Water = ['cancer', 'cáncer', 'scorpio', 'escorpio', 'escorpión', 'pisces', 'piscis'];

        if (Fire.includes(s)) return 'fire';
        if (Earth.includes(s)) return 'earth';
        if (Air.includes(s)) return 'air';
        if (Water.includes(s)) return 'water';
        return null;
    }

    private static getZodiacSign(absDegree: number): string {
        const ZODIAC = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        const deg = ((absDegree % 360) + 360) % 360;
        return ZODIAC[Math.floor(deg / 30)] || 'Aries';
    }
}
