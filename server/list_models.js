require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return console.error("No Key");

    const genAI = new GoogleGenerativeAI(key);
    // There isn't a direct listModels method on the client instance in some versions, 
    // but we can try to infer or just try a known older model like 'gemini-pro' manually.
    // Actually, newer SDKs don't expose listModels easily without a model manager context which is sometimes internal.
    // Let's just try 'gemini-pro' explicitly and 'gemini-1.0-pro'.

    const models = ['gemini-pro', 'gemini-1.0-pro', 'gemini-1.5-flash', 'gemini-1.5-pro'];

    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("Test");
            console.log(`✅ Model AVAILABLE: ${m}`);
        } catch (e) {
            console.log(`❌ Model UNAVAILABLE: ${m} (${e.message.split(' ')[0]}...)`);
            if (e.message.includes('404')) console.log('   -> 404 Not Found (Check project permissions)');
        }
    }
}

listModels();
