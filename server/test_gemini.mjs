
const apiKey = 'AIzaSyA6fAid9blmYvF35njQTion_3EljF45skE';
const TARGET_MODEL = "gemini-2.0-flash";
const API_VERSION = "v1beta";
const GENERATE_URL = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${TARGET_MODEL}:generateContent?key=${apiKey}`;

const payload = {
    system_instruction: { parts: [{ text: "Eres un asistente de prueba." }] },
    contents: [{ role: "user", parts: [{ text: "Hola, responde brevemente." }] }],
    generationConfig: { temperature: 0.7, topP: 0.8, topK: 40 }
};

async function test() {
    console.log("Testing Gemini API...");
    try {
        const response = await fetch(GENERATE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
            console.error(`❌ API ERROR (${response.status}):`, JSON.stringify(errorData));
        } else {
            const data = await response.json();
            console.log("✅ Success:", data.candidates?.[0]?.content?.parts?.[0]?.text);
        }
    } catch (e) {
        console.error("❌ Fetch Error:", e);
    }
}

test();
