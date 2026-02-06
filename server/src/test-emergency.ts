
import { UserService } from './modules/user/service';

async function testEmergency() {
    console.log("🚨 Testing Emergency Mock Flow...");
    try {
        console.log("1. Forcing Update on 'user-1'...");
        // This triggers the calculateProfile logic which SHOULD be mocked now
        const updated = await UserService.updateProfile('user-1', {});

        console.log("\n✅ Result:");
        console.log("Sun Sign:", updated.astrology?.sunSign);
        console.log("Sun House:", updated.astrology?.sun?.house);
        console.log("Moon Sign:", updated.astrology?.moonSign);

        if (updated.astrology?.sunSign === 'Cáncer' && updated.astrology?.sun?.house === 11) {
            console.log("🌟 SUCCESS: Mock Data Returned!");
        } else {
            console.error("❌ FAILURE: Real/Fallback data returned instead of Mock.");
        }

    } catch (e) {
        console.error("❌ Test Failed:", e);
    }
}

testEmergency();
