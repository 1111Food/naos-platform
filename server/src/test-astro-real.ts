import { AstrologyService } from './modules/astrology/service';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function test() {
    console.log("🧪 Testing AstrologyService...");
    try {
        // Test data
        const profile = await AstrologyService.calculateProfile(
            "1990-01-01",
            "12:00",
            40.4168,
            -3.7038 // Madrid
        );

        console.log("✅ Service Success!");
        console.log(JSON.stringify(profile, null, 2));

        // Check for potential crash points in frontend
        if (!profile.sun) console.error("❌ Sun is missing!");
        if (!profile.planets) console.error("❌ Planets array missing!");
        if (profile.planets.some(p => !p.name)) console.error("❌ A planet has no name!");

    } catch (e: any) {
        console.error("❌ Service Failed:", e);
        if (e.response) {
            console.error("API Status:", e.response.status);
            console.error("API Data:", e.response.data);
        }
    }
}

test();
