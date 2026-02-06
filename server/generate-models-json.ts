import { config } from './src/config/env';
import fs from 'fs';

async function listModels() {
    const API_KEY = config.GOOGLE_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            fs.writeFileSync('models_error.json', JSON.stringify(data, null, 2));
        } else {
            fs.writeFileSync('models_supported.json', JSON.stringify(data, null, 2));
            console.log("JSON generated in models_supported.json");
        }
    } catch (e) {
        console.error("List failed:", e);
    }
}

listModels();
