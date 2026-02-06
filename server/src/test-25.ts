import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function test25() {
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const models = ['models/gemini-2.5-flash', 'models/gemini-flash-latest'];

    for (const m of models) {
        console.log(`--- Testing ${m} ---`);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Hi");
            console.log(`✅ ${m}: SUCCESS`);
        } catch (e: any) {
            console.log(`❌ ${m}: FAILED - ${e.message} (Status: ${e.status})`);
        }
    }
}
test25();
