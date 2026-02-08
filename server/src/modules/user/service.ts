import fs from 'fs/promises';
import path from 'path';
import { UserProfile } from '../../types';
import { AstrologyService } from '../astrology/astroService';
import { GeocodingService } from './geocoding';
import { NumerologyService } from '../numerology/service';
import { FengShuiService } from '../astrology/fengshui';
import { createClient } from '@supabase/supabase-js';
import { config } from '../../config/env';
import { MayanCalculator } from '../../utils/mayaCalculator';
import { ChineseAstrology } from '../../utils/chineseAstrology';

const DATA_DIR = path.join(process.cwd(), 'data');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

// Memory cache for active session
let profilesCache: Record<string, UserProfile> = {};

// Supabase Init
const supabase = createClient(config.SUPABASE_URL || '', config.SUPABASE_ANON_KEY || '');

console.log("!!! USER_SERVICE_LOADED !!!");
export class UserService {

    private static async ensureDataDir() {
        if (process.env.NODE_ENV === 'production') return;
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
        } catch (e) { }
    }

    private static async loadProfiles() {
        if (process.env.NODE_ENV === 'production') return;
        await this.ensureDataDir();
        try {
            const content = await fs.readFile(PROFILES_FILE, 'utf-8');
            profilesCache = JSON.parse(content);
        } catch (e) {
            profilesCache = {};
        }
    }

    private static async saveProfiles() {
        if (process.env.NODE_ENV === 'production') return;
        await this.ensureDataDir();
        await fs.writeFile(PROFILES_FILE, JSON.stringify(profilesCache, null, 2));
    }

    static async getProfile(userId: string): Promise<UserProfile> {
        // Try Supabase first
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data && !error) {
            // Reconstruct profile prioritizing discrete columns (Lovable Sync)
            const baseProfile = (data.profile_data || {}) as Partial<UserProfile>;

            const dbProfile: UserProfile = {
                ...baseProfile,
                id: data.id,
                name: data.full_name || baseProfile.name || 'Viajero cosmico',
                birthDate: data.birth_date || baseProfile.birthDate || '',
                birthTime: data.birth_time || baseProfile.birthTime || '',
                birthCity: data.birth_location || baseProfile.birthCity || '',
                astrology: data.natal_chart || baseProfile.astrology || undefined,
                sigil_url: data.sigil_url || baseProfile.sigil_url || undefined,
                // Protocol: Guarantee high precision coordinates and offset reconstruction
                coordinates: baseProfile.coordinates || { lat: 14.634900, lng: -90.506900 },
                utcOffset: baseProfile.utcOffset !== undefined ? baseProfile.utcOffset : -6,
                // Ensure required base fields
                birthPlace: baseProfile.birthPlace || '',
                birthState: baseProfile.birthState || '',
                birthCountry: baseProfile.birthCountry || 'Guatemala',
                subscription: baseProfile.subscription || { plan: 'FREE', features: [] }
            };

            // SYNC LOCK: In production (Vercel), we MUST trust the DB offset
            console.log(`📡 Vercel Parity: Restoring profile for ${dbProfile.name} (Offset: ${dbProfile.utcOffset})`);

            // HOT FIX: Merge with local cache to preserve non-synced ritual fields
            if (Object.keys(profilesCache).length === 0) await this.loadProfiles();
            const cached = profilesCache[userId] || {};

            profilesCache[userId] = { ...cached, ...dbProfile };
            return profilesCache[userId];
        }

        // Fallback to local memory/file if DB fails or empty (for MVP continuity)
        if (Object.keys(profilesCache).length === 0) await this.loadProfiles();

        if (!profilesCache[userId]) {
            profilesCache[userId] = {
                id: userId,
                name: 'Viajero del Tiempo',
                birthDate: '1990-01-01',
                birthTime: '12:00',
                birthPlace: 'Tierra',
                birthCity: '',
                birthState: '',
                birthCountry: '',
                coordinates: { lat: 40.7128, lng: -74.0060 },
                subscription: { plan: 'FREE', features: ['basic_chat'] }
            };
            await this.saveProfiles();
        }
        return profilesCache[userId];
    }

    static async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
        // 1. Get current (from DB or Cache)
        let current = await this.getProfile(userId);

        console.log(`🛠️ Hardening Profile Update for ${userId}...`);

        let updated = { ...current, ...data };

        // 2. Geocoding & Timezone (Protocol: Geography Hardening)
        const locationStringsChanged = (data.birthCity && data.birthCity !== current.birthCity) ||
            (data.birthCountry && data.birthCountry !== current.birthCountry) ||
            (data.birthState && data.birthState !== current.birthState);

        const hasValidCoords = updated.coordinates &&
            (updated.coordinates.lat !== 0 || updated.coordinates.lng !== 0) &&
            (updated.coordinates.lat !== 40.7128); // Default NYC check

        if (locationStringsChanged || !hasValidCoords) {
            if (updated.birthCity && updated.birthCountry) {
                console.log(`🌍 Geography Protocol: Resolving final coordinates for ${updated.birthCity}...`);
                const coords = await GeocodingService.getCoordinates(updated.birthCity, updated.birthState || '', updated.birthCountry);

                // FINAL FIX: Ensure precision and immutability
                updated.coordinates = {
                    lat: Math.round(coords.lat * 1000000) / 1000000,
                    lng: Math.round(coords.lng * 1000000) / 1000000
                };
                updated.utcOffset = await GeocodingService.getTimezoneOffset(updated.coordinates.lat, updated.coordinates.lng);
                console.log(`🔒 Geography LOCK Persisted: ${updated.coordinates.lat}, ${updated.coordinates.lng}`);
            }
        }

        // 3. Spiritual Calculations
        console.log("   -> ✨ Calculating Spiritual Core...");

        // Numerology
        updated.numerology = NumerologyService.calculateProfile(updated.birthDate, updated.name);

        // Mayan Nawal
        if (updated.birthDate) {
            console.log("   -> 🐆 Calculating Mayan Nawal (Cholq'ij)...");
            const mayanData = MayanCalculator.calculate(updated.birthDate);

            // Map to internal MayanNawal interface/structure but keep requested persist keys
            updated.mayan = {
                kicheName: mayanData.nawal_maya,
                tone: mayanData.nawal_tono,
                meaning: mayanData.meaning,
                toneName: mayanData.toneName,
                description: mayanData.description,
                glyphUrl: mayanData.glyphUrl
            };

            // Save requested specific fields to top-level profile (persisted in JSONB)
            updated.nawal_maya = mayanData.nawal_maya;
            updated.nawal_tono = mayanData.nawal_tono;

            console.log(`      Found: ${updated.mayan.tone} ${updated.mayan.kicheName}`);
        }

        // Astrology (Offline) - Strictly using persisted/locked coordinates
        try {
            console.log(`🌌 Astrology Core: Calculating with pinned coords [${updated.coordinates.lat}, ${updated.coordinates.lng}]`);
            const astro = await AstrologyService.calculateProfile(
                updated.birthDate,
                updated.birthTime,
                updated.coordinates.lat,
                updated.coordinates.lng,
                updated.utcOffset !== undefined ? updated.utcOffset : -6
            );
            // @ts-ignore
            astro.elemental_balance = astro.elements;
            updated.astrology = astro;
        } catch (e) {
            console.error("❌ Astrology Engine Failed (Safe Fallback)");
        }

        // Feng Shui
        updated.fengShui = FengShuiProfileService.calculateProfile(updated.birthDate);

        // SILENT EXPANSION: Chinese Astrology
        if (updated.birthDate) {
            console.log("   -> 🐉 Calculating Chinese Wisdom...");
            const chinese = ChineseAstrology.calculate(updated.birthDate);
            updated.chinese_animal = chinese.animal;
            updated.chinese_element = chinese.element;
            updated.chinese_birth_year = chinese.birthYear;

            // Persist description in profile_data for UI flexibility
            // @ts-ignore
            updated.chinese_description = chinese.description;
        }

        // 4. Sigil Asset (Connected logic)
        if (!updated.sigil_url) {
            console.log("   -> ✍️ Generating Sigil Essence...");
            updated.sigil_url = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(updated.name)}&backgroundColor=0a0a0a&color=f59e0b`;
        }

        // 5. Persist to Supabase
        console.log("   -> 📦 PASO FINAL: Enviando a Supabase via Node.js Proxy...");
        console.log("   -> Columnas:", {
            full_name: updated.name,
            birth_date: updated.birthDate,
            birth_time: updated.birthTime,
            birth_location: updated.birthCity
        });

        try {
            // Helper to safely extract planet data
            const getPlanet = (profile: any, name: string) => {
                if (!profile || !profile.planets) return null;
                const p = profile.planets.find((b: any) => b.name === name);
                return p ? p : null;
            };

            const lilith = getPlanet(updated.astrology, 'Lilith');
            const chiron = getPlanet(updated.astrology, 'Chiron');
            const northNode = getPlanet(updated.astrology, 'North Node') || getPlanet(updated.astrology, 'Node');

            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    full_name: updated.name || 'Viajero cosmico',
                    birth_date: updated.birthDate || null,
                    birth_time: updated.birthTime || null,
                    birth_location: updated.birthCity || null,
                    natal_chart: updated.astrology || null,
                    sigil_url: updated.sigil_url || null,
                    chinese_animal: updated.chinese_animal || null,
                    chinese_element: updated.chinese_element || null,
                    chinese_birth_year: updated.chinese_birth_year || null,
                    profile_data: updated // FIXED: Persist all fields (coords, offset, etc) for Vercel parity
                });

            if (error) {
                console.error("❌ PROXY SUPABASE FAILURE:");
                console.error("   -> Error Code:", error.code);
                console.error("   -> Message:", error.message);
                if (error.code === 'PGRST204') {
                    console.error("   ⚠️  MODEL MISMATCH: Some columns (birth_date, birth_time, birth_location) might be missing in your Supabase table.");
                }
            } else {
                console.log("✅ PROXY SUCCESS: Supabase Upsert Success!");
            }
        } catch (dbErr) {
            console.error("🔥 CRITICAL SUPABASE CRASH:", dbErr);
        }

        // Fallback Cache
        console.log("   -> 📝 PRE-SAVE CHECK: Elements:", updated.astrology?.elements);
        profilesCache[userId] = updated;
        await this.saveProfiles();

        return updated;
    }

    static getRawState() {
        return {
            cacheKeys: Object.keys(profilesCache),
            data: profilesCache,
            paths: {
                cwd: process.cwd(),
                DATA_DIR,
                PROFILES_FILE
            }
        };
    }
}

// Small fix for class name consistency in imports if needed
const FengShuiProfileService = FengShuiService;
