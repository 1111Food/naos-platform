import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function diagnose() {
    console.log("🛠️ FINAL DIAGNOSIS");
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log("📡 Attempting test message...");
        const result = await model.generateContent("Test");
        console.log("✅ Success!");
    } catch (e: any) {
        console.log("❌ CAPTURED ERROR:");
        console.log("Name:", e.name);
        console.log("Message:", e.message);
        console.log("Status Code:", e.status);
        if (e.response) {
            try {
                const body = await e.response.json();
                console.log("API Body:", JSON.stringify(body, null, 2));
            } catch (bodyErr) {
                console.log("Body is not JSON");
            }
        }
    }
}

diagnose();
