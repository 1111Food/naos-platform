import { UserService } from './src/modules/user/service';
import { AstrologyService } from './src/modules/astrology/astroService';
import fs from 'fs/promises';
import path from 'path';

async function migrate() {
    console.log("SOURCE DEBUG:", AstrologyService.calculateProfile.toString());
    console.log("🚀 Starting Full Data Migration: Syncing elements to Supabase...");
    const profilesPath = path.join(process.cwd(), 'data', 'profiles.json');

    try {
        const content = await fs.readFile(profilesPath, 'utf-8');
        const profiles = JSON.parse(content);
        let updatedCount = 0;

        for (const id in profiles) {
            const p = profiles[id];
            // Use the service to update, which handles geocoding, astrology recalibration, and Supabase sync
            console.log(`✨ Syncing & Recalculating: ${p.name || id}`);
            await UserService.updateProfile(id, {}); // Passing empty object triggers re-calculation of everything
            updatedCount++;
        }

        console.log(`✅ Sync Complete. Updated ${updatedCount} profiles in local cache and Supabase.`);

    } catch (err) {
        console.error("❌ Sync Failed:", err);
    }
}

migrate();
