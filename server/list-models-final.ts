import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './src/config/env';

async function listModels() {
    const genAI = new GoogleGenerativeAI(config.GOOGLE_API_KEY);
    try {
        console.log("Checking API Key:", !!config.GOOGLE_API_KEY);
        // @ts-ignore
        const models = await genAI.listModels();
        console.log("Available Models:");
        for (const model of models) {
            console.log(`- ${model.name} (${model.displayName})`);
        }
    } catch (e) {
        console.error("Error listing models:", e);
    }
}

listModels();
