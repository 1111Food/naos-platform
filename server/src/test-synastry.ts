// server/src/test-synastry.ts
import { SynastryCalculator } from './services/SynastryCalculator';
import { RelationshipType, SynastryProfile } from './types/synastry';
import { UserProfile } from './types';
import fs from 'fs';
import path from 'path';

async function runTest() {
    console.log("🚀 Iniciando Test de Sinastría 4 Pilares...");

    const profilesPath = path.join(process.cwd(), 'data', 'profiles.json');
    const profiles = JSON.parse(fs.readFileSync(profilesPath, 'utf-8'));

    // User A: L (from profiles.json)
    const profileA = profiles["00000000-0000-0000-0000-000000000000"] as UserProfile;

    // Person B: Mock Data
    const profileBData: SynastryProfile = {
        name: "Persona B Test",
        birthDate: "1992-05-15",
        birthTime: "14:30",
        birthCity: "Guatemala",
        birthCountry: "Guatemala",
        coordinates: { lat: 14.6349, lng: -90.5069 },
        utcOffset: -6
    };

    const calculator = new SynastryCalculator();

    try {
        console.log("\n--- TEST: RELACIÓN ROMÁNTICA ---");
        const reportRomantic = await calculator.calculateSynastry(profileA, profileBData, RelationshipType.ROMANTIC);
        console.log("Global Score:", reportRomantic.score);
        console.log("Indices:", JSON.stringify(reportRomantic.indices, null, 2));
        console.log("Pillars:", JSON.stringify(reportRomantic.pillarBreakdown, null, 2));
        console.log("Strong Points:", reportRomantic.A_StrongCompatibilities);

        console.log("\n--- TEST: RELACIÓN DE NEGOCIOS ---");
        const reportBusiness = await calculator.calculateSynastry(profileA, profileBData, RelationshipType.BUSINESS);
        console.log("Global Score:", reportBusiness.score);
        console.log("Indices:", JSON.stringify(reportBusiness.indices, null, 2));

        console.log("\n--- TEST: PAYLOAD PARA LLM ---");
        const payload = calculator.buildPromptPayload(reportRomantic, RelationshipType.ROMANTIC);
        console.log(JSON.stringify(payload, null, 2));

        console.log("\n✅ Test completado con éxito.");
    } catch (e) {
        console.error("❌ Test fallido:", e);
    }
}

runTest();
