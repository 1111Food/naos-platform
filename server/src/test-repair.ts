
import { UserService } from './modules/user/service';

async function testRepair() {
    console.log("🧪 Testing User Repair Flow...");
    try {
        // Force load logic
        console.log("1. Calling getProfile('user-1')...");
        const profile = await UserService.getProfile('user-1');

        console.log("✅ Profile Retrieved:", profile.name);
        console.log("Sun Sign:", profile.astrology?.sunSign || 'MISSING');
        console.log("Sun Object:", profile.astrology?.sun ? "PRESENT" : "MISSING");

    } catch (e) {
        console.error("❌ Test Failed:", e);
    }
}

testRepair();
