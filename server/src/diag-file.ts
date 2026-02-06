import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './config/env';
import * as fs from 'fs';

async function fullDiagnose() {
    const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    const candidateModels = [
        'models/gemini-1.5-flash',
        'models/gemini-pro',
        'models/gemini-2.0-flash',
        'models/gemini-2.0-flash-lite'
    ];

    let output = "📋 DIAGNOSTIC RESULTS\n";

    for (const modelName of candidateModels) {
        output += `\n--- Testing ${modelName} ---\n`;
        try {
            const model = genAI.getGenerativeModel({ model: modelName }, { apiVersion: 'v1beta' });
            const result = await model.generateContent("Hi");
            output += `✅ SUCCESS: ${result.response.text()}\n`;
        } catch (e: any) {
            output += `❌ FAILED: ${e.message}\n`;
            if (e.status) output += `Status: ${e.status}\n`;
        }
    }

    fs.writeFileSync('diag_results.txt', output);
    console.log("✅ diag_results.txt written.");
}

fullDiagnose();
