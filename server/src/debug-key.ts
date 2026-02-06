import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function debugKey() {
    console.log("🔍 DIAGNOSTIC START");
    console.log(`🔑 Key: ${config.GEMINI_API_KEY ? config.GEMINI_API_KEY.substring(0, 8) + '...' : 'MISSING'}`);

    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

    // Test 1: Simple Generation with 'gemini-1.5-flash'
    console.log("\n--- TEST 1: gemini-1.5-flash ---");
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent("Test");
        console.log("✅ SUCCESS");
    } catch (e: any) {
        console.log("❌ FAIL");
        console.log("Status:", e.status);
        console.log("StatusText:", e.statusText);
        // Clean error message
        const msg = e.message || '';
        if (msg.includes('404')) console.log("👉 DIAGNOSIS: 404 Not Found (Service Disabled or Model Missing)");
        if (msg.includes('403')) console.log("👉 DIAGNOSIS: 403 Forbidden (Region blocked or Billing Check)");
        if (msg.includes('400')) console.log("👉 DIAGNOSIS: 400 Bad Request (Invalid Key or Request)");
        console.log("Full Error:", msg.substring(0, 200));
    }

    // Test 2: 'gemini-pro' (Legacy/Stable)
    console.log("\n--- TEST 2: gemini-pro ---");
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent("Test");
        console.log("✅ SUCCESS");
    } catch (e: any) {
        console.log("❌ FAIL");
        if (e.message?.includes('404')) console.log("👉 DIAGNOSIS: 404 (Likely Service Disabled)");
    }
}

debugKey();
