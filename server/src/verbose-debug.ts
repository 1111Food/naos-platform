import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function verboseDebug() {
    console.log("🔍 VERBOSE DEBUGGER");
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
        await model.generateContent("Test");
        console.log("✅ Unexpected Success");
    } catch (e: any) {
        console.log("❌ ERROR DETAILS:");
        console.log(JSON.stringify(e, Object.getOwnPropertyNames(e), 2));

        if (e.response) {
            console.log("--- API RESPONSE BODY ---");
            try {
                console.log(await e.response.json());
            } catch (jsonError) {
                console.log("(Could not parse JSON body)");
            }
        }
    }
}

verboseDebug();
