import { config } from './config/env';

async function listModels() {
    console.log("Fetching models...");
    if (!config.GEMINI_API_KEY) {
        console.error("No key.");
        return;
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${config.GEMINI_API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const names = data.models ? data.models.map((m: any) => m.name) : data;
        const fs = require('fs');
        fs.writeFileSync('models_output.txt', JSON.stringify(names, null, 2));
        console.log("Written to models_output.txt");
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}
listModels();
