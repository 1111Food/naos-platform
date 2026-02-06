import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function quick() {
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const models = ['models/gemini-flash-latest', 'models/gemini-pro-latest'];

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
quick();
