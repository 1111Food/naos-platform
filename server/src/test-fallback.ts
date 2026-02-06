
import { AstrologyService } from './modules/astrology/service';

async function testFallback() {
    console.log("🧪 Testing Astrology Fallback Logic...");
    try {
        // Use known bad credentials or force error path logic if possible
        // But here we just call the main method. Since credentials in file are likely invalid (401),
        // it SHOULD trigger the catch block and return fallback data.

        const result = await AstrologyService.calculateProfile(
            "1986-07-12",
            "09:15",
            14.6349,
            -90.5069,
            -6
        );

        console.log("✅ Result returned:");
        console.log("Type:", typeof result);
        console.log("Has Sun?", !!result?.sun);
        console.log("Has Houses?", result?.houses?.length);
        console.log("House System:", result?.houseSystem);
        console.log("\nFull Object:", JSON.stringify(result, null, 2));

    } catch (e) {
        console.error("❌ Test Failed (Exception):", e);
    }
}

testFallback();
