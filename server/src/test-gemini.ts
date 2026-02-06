import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';

async function testGemini() {
    console.log("🔑 Testing Gemini API Connection...");
    console.log(`Debug Key Length: ${config.GEMINI_API_KEY ? config.GEMINI_API_KEY.length : 0}`);

    if (!config.GEMINI_API_KEY) {
        console.error("❌ No API Key found in env.");
        return;
    }

    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const models = ['gemini-1.5-flash', 'models/gemini-1.5-flash', 'gemini-1.5-pro'];

    for (const modelName of models) {
        console.log(`\n🤖 Testing Model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello, spirit.");
            const response = result.response.text();
            console.log(`✅ Success! Response: ${response.substring(0, 50)}...`);
        } catch (error: any) {
            console.error(`❌ Failed: ${error.message}`);
        }
    }
}

testGemini();
