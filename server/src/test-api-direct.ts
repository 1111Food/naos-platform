
const USER_ID = "649684";
const API_KEY = "3b4e8b3959a9847bbfeec479a40807108ec68d07";

async function testApi() {
    console.log("Testing AstrologyAPI / Prokerala Connection...");

    // Test 1: AstrologyAPI (json.astrologyapi.com)
    await runRequest("https://json.astrologyapi.com/v1/western_chart_data", "AstrologyAPI");

    // Test 2: Prokerala V2 (api.prokerala.com)
    // Note: Prokerala V2 might use OAuth2 authentication, but we'll try Basic first as provided.
    await runRequest("https://api.prokerala.com/v2/astrology/western-chart", "Prokerala V2");

    // Test 3: Alternative JSON endpoint (some docs mention /western_horoscope)
    await runRequest("https://json.astrologyapi.com/v1/western_horoscope", "AstrologyAPI Alt");
}

async function runRequest(endpoint, name) {
    console.log(`\n--- Testing ${name} (${endpoint}) ---`);

    const auth = Buffer.from(`${USER_ID}:${API_KEY}`).toString('base64');

    const requestBody = {
        day: 12, month: 7, year: 1986,
        hour: 9, min: 15,
        lat: 14.6349, lon: -90.5069,
        tzone: -6,
        house_type: "placidus"
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log(`Response: ${text}`); // FULL OUTPUT

    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

testApi();
