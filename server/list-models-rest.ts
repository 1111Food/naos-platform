import { config } from './src/config/env';

async function listModels() {
    const API_KEY = config.GOOGLE_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        console.log(`Listing models from: https://generativelanguage.googleapis.com/v1beta/models?key=...`);
        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            console.error("Error Listing:", JSON.stringify(data, null, 2));
        } else {
            console.log("Supported Models:");
            data.models.forEach((m: any) => {
                console.log(`- ${m.name} (${m.displayName}) - Supported Generation: ${m.supportedGenerationMethods.includes('generateContent')}`);
            });
        }
    } catch (e) {
        console.error("List failed:", e);
    }
}

listModels();
