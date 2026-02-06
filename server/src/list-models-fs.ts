import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';
import * as fs from 'fs';

async function diagnose() {
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    try {
        // Note: listModels is not directly on genAI in some versions of the SDK
        // But let's try the fetch approach but writing to file
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${config.GEMINI_API_KEY}`;
        const response = await fetch(url);
        const data: any = await response.json();

        let output = "";
        if (data.models) {
            data.models.forEach((m: any) => {
                output += `- ${m.name}\n`;
            });
        } else {
            output = JSON.stringify(data, null, 2);
        }

        fs.writeFileSync('models_result.txt', output);
        console.log("✅ Fichero models_result.txt creado.");

    } catch (e: any) {
        fs.writeFileSync('models_result.txt', "ERROR: " + e.message);
    }
}

diagnose();
