
import { AstrologyService } from './modules/astrology/astroService';

// DEBUG SCRIPT: Test specific user case
// Run with: npx tsx src/debug-astro.ts

const TEST_CASE = {
    // Luis (Guatemala 1986)
    date: '1986-07-12',
    time: '09:15',
    lat: 14.6349,
    lng: -90.5069,
    utcOffset: -6
};

async function runDebug() {
    console.log("🐛 STARTING ASTRO LOGY DEBUG");
    console.log("---------------------------------------------------");
    console.log("Env check:");
    console.log("USER_ID:", process.env.ASTROLOGY_API_USER_ID ? "SET" : "MISSING");
    console.log("API_KEY:", process.env.ASTROLOGY_API_KEY ? "SET" : "MISSING");

    try {
        const result = await AstrologyService.calculateProfile(
            TEST_CASE.date,
            TEST_CASE.time,
            TEST_CASE.lat,
            TEST_CASE.lng,
            TEST_CASE.utcOffset
        );

        console.log("\n✅ RESULT RECEIVED:");
        console.log("---------------------------------------------------");
        console.log(`System: ${result.houseSystem}`);
        console.log(`Sun: ${result.sun.sign} in House ${result.sun.house}`);
        console.log(`Moon: ${result.moon.sign} in House ${result.moon.house}`);
        console.log(`Ascendant: ${result.rising.sign} in House ${result.rising.house}`);

        console.log("\nFull Planet List:");
        result.planets.forEach(p => {
            console.log(`- ${p.name}: ${p.sign} (House ${p.house})`);
        });

    } catch (e) {
        console.error("\n❌ ERROR:", e);
    }
}

runDebug();
