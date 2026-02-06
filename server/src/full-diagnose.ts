import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function fullDiagnose() {
    console.log("🛠️ COMPREHENSIVE DIAGNOSIS");
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const candidateModels = [
        'models/gemini-1.5-flash',
        'gemini-1.5-flash',
        'models/gemini-pro',
        'models/gemini-2.0-flash',
        'models/gemini-2.0-flash-exp'
    ];

    for (const modelName of candidateModels) {
        console.log(`\n--- Testing ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: 'v1beta' });
            const result = await model.generateContent("Hi");
            console.log(`✅ ${modelName}: SUCCESS`);
            console.log("Response:", result.response.text().substring(0, 20));
        } catch (e: any) {
            console.log(`❌ ${modelName}: FAILED`);
            console.log("Status:", e.status);
            console.log("Message:", e.message);
        }
    }
}

fullDiagnose();
