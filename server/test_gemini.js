require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    console.log("🔑 Testing Gemini API Connection...");
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        console.error("❌ GEMINI_API_KEY missing in .env");
        return;
    }
    console.log(`🔑 Key found: ${key.substring(0, 10)}...`);

    const genAI = new GoogleGenerativeAI(key);

    // Test Models
    const modelsToTest = ['gemini-1.5-flash', 'gemini-pro'];

    for (const modelName of modelsToTest) {
        console.log(`\n⏳ Testing model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = "Hello, Guardian of the Temple. Are you there?";
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(`✅ Success! Response: "${text.trim()}"`);
            return; // Exit on first success
        } catch (error) {
            console.error(`❌ Failed with ${modelName}:`);
            console.error(`   Message: ${error.message}`);
            if (error.status) console.error(`   Status: ${error.status}`);
        }
    }

    console.log("\n❌ All model attempts failed.");
}

testGemini();
