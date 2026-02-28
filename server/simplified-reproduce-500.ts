// simplified-reproduce-500.ts
// No imports from project structure to avoid resolution errors.
// Uses native fetch (Node 18+)

async function checkServer() {
    try {
        console.log("Checking server health at http://127.0.0.1:3001/ ...");
        const res = await fetch('http://127.0.0.1:3001/');
        console.log(`Server Root: ${res.status} ${res.statusText}`);
    } catch (e) {
        console.error("❌ Server Root Unreachable:", e.cause || e);
    }
}

async function testGuestCalculator() {
    await checkServer();
    console.log("🚀 Testing Guest Calculator Endpoint...");

    // Payload identical to screenshot
    const payload = {
        name: "bastian",
        birthDate: "2014-07-30", // ISO
        birthTime: "09:00",
        birthCity: "guatemala",
        birthCountry: "Guatemala"
    };

    try {
        // Use 127.0.0.1 to avoid localhost ambiguity
        const url = 'http://127.0.0.1:3001/api/astrology/natal-chart-temp';
        console.log(`Fetching ${url}...`);

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log("Response Body:", text);

    } catch (error) {
        console.error("Network Error (3001):", error);
    }
}

testGuestCalculator();
