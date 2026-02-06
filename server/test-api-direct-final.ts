import { config } from './src/config/env';

async function testDirect() {
    const API_KEY = config.GOOGLE_API_KEY;
    // We try gemini-1.5-flash which is standard
    const model = "gemini-1.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

    const body = {
        contents: [{
            parts: [{ text: "Hola, responde brevemente." }]
        }]
    };

    try {
        console.log(`Testing URL: https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=...`);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log("Status:", response.status);
        if (response.status !== 200) {
            console.error("Error Data:", JSON.stringify(data, null, 2));
        } else {
            console.log("Success! Response:", data.candidates[0].content.parts[0].text);
        }
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}

testDirect();
