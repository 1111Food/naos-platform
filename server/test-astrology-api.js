require('dotenv').config();

async function testAstro() {
    const userId = process.env.ASTROLOGY_API_USER_ID;
    const apiKey = process.env.ASTROLOGY_API_KEY;
    const endpoint = process.env.ASTROLOGY_API_ENDPOINT;

    console.log("🔍 TESTING ASTROLOGY API...");
    console.log("Endpoint:", endpoint);
    console.log("UserID:", userId);

    const credentials = Buffer.from(`${userId}:${apiKey}`).toString('base64');

    const payload = {
        day: 12,
        month: 7,
        year: 1986,
        hour: 12,
        min: 0,
        lat: 14.6349,
        lon: -90.5069,
        tzone: -6,
        house_type: "placidus",
        node_type: "true",
        aspects: "true"
    };

    try {
        const response = await fetch(`${endpoint}/western_horoscope`, {
            method: 'POST',
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        console.log("HTTP Status:", response.status);
        const data = await response.json();
        console.log("-----------------------------------------");
        console.log("📦 RAW API RESPONSE (First 1000 chars):");
        console.log(JSON.stringify(data, null, 2).substring(0, 1000));
        console.log("-----------------------------------------");

        if (data.planets) {
            console.log("✅ Planets found. Type:", Array.isArray(data.planets) ? "ARRAY" : typeof data.planets);
            if (Array.isArray(data.planets)) {
                console.log("First Planet Sample:", data.planets[0]);
            } else {
                console.log("Keys available in planets object:", Object.keys(data.planets));
            }
        } else {
            console.log("❌ NO PLANETS FOUND IN RESPONSE");
        }
    } catch (e) {
        console.error("🔥 FETCH CRASH:", e);
    }
}

testAstro();
