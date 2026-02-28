
// server/src/modules/user/service.ts
import path from 'path';
import { promises as fs } from 'node:fs';
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
        if (!userId || userId === '00000000-0000-0000-0000-000000000000') {
            // Default mock for first-time session (will be replaced by onboarding)
            userId = '00000000-0000-0000-0000-000000000000';
        }

        // Try Supabase first
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data && !error) {
            const baseProfile = (data.profile_data || {}) as Partial<UserProfile>;
            const dbProfile: UserProfile = {
                ...baseProfile,
                id: data.id,
                name: data.name || data.full_name || baseProfile.name || 'Viajero cosmico',
                guardian_notes: data.guardian_notes || baseProfile.guardian_notes || undefined,
                birthDate: data.birth_date || baseProfile.birthDate || '',
                birthTime: data.birth_time || baseProfile.birthTime || '',
                birthCity: data.birth_location || baseProfile.birthCity || '',
                // MAPPING FIX v9.11: Explicitly map new columns
                astrology: data.astrology || data.natal_chart || baseProfile.astrology || undefined,
                numerology: data.numerology || baseProfile.numerology || undefined,
                mayan: data.mayan || baseProfile.mayan || undefined,
                nawal_maya: data.nawal_maya || baseProfile.nawal_maya || undefined,

                sigil_url: data.sigil_url || baseProfile.sigil_url || undefined,
                coordinates: baseProfile.coordinates || { lat: 14.634900, lng: -90.506900 },
                utcOffset: baseProfile.utcOffset !== undefined ? baseProfile.utcOffset : -6,
                birthPlace: baseProfile.birthPlace || '',
                birthState: baseProfile.birthState || '',
                birthCountry: baseProfile.birthCountry || 'Guatemala',
                subscription: baseProfile.subscription || { plan: 'FREE', features: [] },
                plan_type: data.plan_type || baseProfile.plan_type || 'free',
                usage_level: data.usage_level || baseProfile.usage_level || 'normal',
                daily_interactions: data.daily_interactions || baseProfile.daily_interactions || 0
            };

            if (Object.keys(profilesCache).length === 0) await this.loadProfiles();
            const cached = profilesCache[userId] || {};
            profilesCache[userId] = { ...cached, ...dbProfile };

            // Continue to calc logic below
        } else {
            // Fallback to local memory/file if DB fails or empty (for MVP continuity)
            if (Object.keys(profilesCache).length === 0) await this.loadProfiles();
        }

        if (!profilesCache[userId]) {
            profilesCache[userId] = {
                id: userId,
                name: 'Viajero en el Umbral',
                birthDate: '',
                birthTime: '',
                birthPlace: 'Tierra',
                birthCity: '',
                birthState: '',
                birthCountry: '',
                coordinates: { lat: 40.7128, lng: -74.0060 },
                subscription: { plan: 'FREE', features: ['basic_chat'] },
                plan_type: 'free',
                usage_level: 'normal',
                daily_interactions: 0
            };
            await this.saveProfiles();
        }

        // --- DATA BRIDGE v9.12: JUST-IN-TIME CALCULATION ---
        const p = profilesCache[userId];

        // 1. Astrology Check
        if (!p.astrology && p.birthDate && p.birthTime && p.coordinates) {
            console.log(`🌉 DataBridge: Calculating Astrology for ${p.name}...`);
            try {
                const astro = await AstrologyService.calculateProfile(
                    p.birthDate,
                    p.birthTime,
                    p.coordinates.lat || 0,
                    p.coordinates.lng || 0,
                    p.utcOffset !== undefined ? p.utcOffset : -6
                );
                // @ts-ignore
                astro.elemental_balance = astro.elements; // Adapter
                p.astrology = astro;
                console.log("   -> Astrology Injected.");
            } catch (e) { console.error("   -> Astro Calc Failed:", e); }
        }

        // 2. Numerology Check
        if (!p.numerology && p.birthDate && p.name) {
            console.log(`🌉 DataBridge: Calculating Numerology for ${p.name}...`);
            p.numerology = NumerologyService.calculateProfile(p.birthDate, p.name);
        }

        // 3. Mayan Check
        if (!p.mayan && p.birthDate) {
            console.log(`🌉 DataBridge: Calculating Mayan for ${p.name}...`);
            const mayanData = MayanCalculator.calculate(p.birthDate);
            p.mayan = {
                kicheName: mayanData.nawal_maya,
                tone: mayanData.nawal_tono,
                meaning: mayanData.meaning,
                toneName: mayanData.toneName,
                description: mayanData.description,
                glyphUrl: mayanData.glyphUrl
            };
            p.nawal_tono = mayanData.nawal_tono;
        }

        // 4. Chinese Astrology Check
        if (!p.chinese_animal && p.birthDate) {
            console.log(`🏮 Bridge: Calculating Chinese for ${p.name}...`);
            const chineseData = ChineseAstrology.calculate(p.birthDate);
            p.chinese_animal = chineseData.animal;
            p.chinese_element = chineseData.element;
            p.chinese_birth_year = chineseData.birthYear;

            // Persist to database immediately
            try {
                const { error } = await supabase
                    .from('profiles')
                    .update({
                        chinese_animal: chineseData.animal,
                        chinese_element: chineseData.element,
                        chinese_birth_year: chineseData.birthYear
                    })
                    .eq('id', userId);

                if (error) {
                    console.error('   ⚠️ Failed to persist Chinese data:', error);
                } else {
                    console.log('   ✅ Chinese data persisted to DB');
                }
            } catch (err) {
                console.error('   ❌ Error persisting Chinese data:', err);
            }
        }

        return profilesCache[userId];
    }

    static async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
        // 1. Get current (from DB or Cache)
        let current = await this.getProfile(userId);

        console.log(`🛠️ Hardening Profile Update for ${userId}...`);

        let updated = { ...current, ...data };

        console.log(`📋 Data received:`, JSON.stringify(data, null, 2));

        // 2. Geocoding & Timezone (Protocol: Geography Hardening) - BULLETPROOF v9.15
        const locationStringsChanged = (data.birthCity && data.birthCity !== current.birthCity) ||
            (data.birthCountry && data.birthCountry !== current.birthCountry) ||
            (data.birthState && data.birthState !== current.birthState);

        const hasValidCoords = updated.coordinates &&
            (updated.coordinates.lat !== 0 || updated.coordinates.lng !== 0) &&
            (updated.coordinates.lat !== 40.7128); // Default NYC check

        if (locationStringsChanged || !hasValidCoords) {
            if (updated.birthCity && updated.birthCountry) {
                console.log(`🌍 Geography Protocol: Resolving final coordinates for ${updated.birthCity}, ${updated.birthCountry}...`);
                try {
                    const coords = await GeocodingService.getCoordinates(updated.birthCity, updated.birthState || '', updated.birthCountry);

                    // FINAL FIX: Ensure precision and immutability
                    updated.coordinates = {
                        lat: Math.round(coords.lat * 1000000) / 1000000,
                        lng: Math.round(coords.lng * 1000000) / 1000000
                    };
                    updated.utcOffset = await GeocodingService.getTimezoneOffset(updated.coordinates.lat, updated.coordinates.lng);
                    console.log(`   ✅ Geography LOCK Persisted: ${updated.coordinates.lat}, ${updated.coordinates.lng}`);
                } catch (geoError) {
                    console.error(`   ⚠️ Geocoding failed for "${updated.birthCity}, ${updated.birthCountry}":`, geoError);
                    console.log(`   🔄 Using fallback coordinates (Guatemala City)`);
                    // Fallback: Guatemala City coordinates
                    updated.coordinates = { lat: 14.6349, lng: -90.5069 };
                    updated.utcOffset = -6;
                }
            }
        }

        // 3. Spiritual Calculations - BULLETPROOF v9.15
        console.log("   -> ✨ Calculating Spiritual Core...");

        // Numerology - BULLETPROOF
        try {
            console.log("   -> 🔢 Calculating Numerology...");
            updated.numerology = NumerologyService.calculateProfile(updated.birthDate, updated.name);
            console.log(`      ✅ Numerology calculated successfully`);
        } catch (numError) {
            console.error("      ⚠️ Numerology calculation failed:", numError);
            updated.numerology = undefined;
        }

        // Mayan Nawal - BULLETPROOF
        if (updated.birthDate) {
            try {
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

                console.log(`      ✅ Found: ${updated.mayan.tone} ${updated.mayan.kicheName}`);
            } catch (mayanError) {
                console.error("      ⚠️ Mayan calculation failed:", mayanError);
                updated.mayan = undefined;
            }
        }

        // Astrology (Offline) - Strictly using persisted/locked coordinates - BULLETPROOF
        try {
            console.log(`   -> 🌌 Astrology Core: Calculating with pinned coords [${updated.coordinates.lat}, ${updated.coordinates.lng}]`);
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
            console.log(`      ✅ Astrology calculated successfully`);
        } catch (astroError) {
            console.error("      ⚠️ Astrology Engine Failed (Safe Fallback):", astroError);
            updated.astrology = undefined;
        }

        // Feng Shui - BULLETPROOF
        try {
            console.log("   -> 🏠 Calculating Feng Shui...");
            updated.fengShui = FengShuiService.calculateProfile(updated.birthDate);
            console.log(`      ✅ Feng Shui calculated successfully`);
        } catch (fengError) {
            console.error("      ⚠️ Feng Shui calculation failed:", fengError);
            updated.fengShui = undefined;
        }

        // Chinese Astrology - BULLETPROOF
        if (updated.birthDate) {
            try {
                console.log("   -> 🏮 Calculating Chinese Astrology...");
                const chineseData = ChineseAstrology.calculate(updated.birthDate);
                updated.chinese_animal = chineseData.animal;
                updated.chinese_element = chineseData.element;
                updated.chinese_birth_year = chineseData.birthYear;
                console.log(`      ✅ Found: ${updated.chinese_animal} de ${updated.chinese_element}`);
            } catch (chineseError) {
                console.error("      ⚠️ Chinese calculation failed:", chineseError);
            }
        }

        // Update Cache
        if (Object.keys(profilesCache).length === 0) await this.loadProfiles();
        profilesCache[userId] = updated;
        await this.saveProfiles();

        // 4. Supabase Sync (Si hay credenciales)
        if (config.SUPABASE_URL) {
            const supabasePayload = {
                id: userId,
                full_name: updated.name,
                birth_date: updated.birthDate,
                birth_time: updated.birthTime,
                birth_location: updated.birthCity,
                // Persist calculated data (v9.11 FIX)
                natal_chart: updated.astrology, // Keep backward compat
                astrology: updated.astrology,
                numerology: updated.numerology,
                mayan: updated.mayan,
                nawal_maya: updated.nawal_maya, // Text column

                plan_type: updated.plan_type,
                profile_data: updated, // JSONB dump for flexibility
                updated_at: new Date().toISOString()
            };

            console.log("🚀 INTENTO DE GUARDADO (Supabase):", JSON.stringify(supabasePayload, null, 2));

            const { data: upsertData, error: upsertError } = await supabase
                .from('profiles')
                .upsert(supabasePayload)
                .select();

            if (upsertError) {
                console.error("❌ ERROR DE SUPABASE:", JSON.stringify(upsertError, null, 2));
            } else {
                console.log("✅ ÉXITO EN SUPABASE:", JSON.stringify(upsertData, null, 2));
            }
        }

        return updated;
    }

    static async incrementXp(userId: string, amount: number) {
        if (!config.SUPABASE_URL) return;

        try {
            console.log(`✨ UserService: Incrementando ${amount} XP para ${userId}`);

            // 1. Get current XP from user_evolution
            const { data, error: fetchError } = await supabase
                .from('user_evolution')
                .select('xp_points')
                .eq('user_id', userId)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
                console.error("❌ Error fetching XP:", fetchError);
                return;
            }

            const currentXp = data?.xp_points || 0;
            const newXp = currentXp + amount;

            // 2. Upsert (to handle cases where record doesn't exist yet)
            const { error: upsertError } = await supabase
                .from('user_evolution')
                .upsert({
                    user_id: userId,
                    xp_points: newXp,
                    updated_at: new Date().toISOString()
                });

            if (upsertError) {
                console.error("❌ Error updating XP:", upsertError);
            } else {
                console.log(`✅ XP Actualizado: ${currentXp} -> ${newXp}`);
            }
        } catch (e) {
            console.error("❌ Exception incrementing XP:", e);
        }
    }

    static getRawState() {
        return profilesCache;
    }
}
