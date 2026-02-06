
const CLIENT_ID = "649684";
const CLIENT_SECRET = "3b4e8b3959a9847bbfeec479a40807108ec68d07";
const TOKEN_ENDPOINT = "https://api.prokerala.com/token";

async function getAccessToken() {
    console.log("🔄 Attempting to get OAuth Token from Prokerala...");

    // Prepare form data
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', CLIENT_ID);
    params.append('client_secret', CLIENT_SECRET);

    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: 'POST',
            body: params
        });

        console.log(`Token Status: ${response.status} ${response.statusText}`);
        const data = await response.json();
        console.log("Token Response:", JSON.stringify(data, null, 2));

        if (data.access_token) {
            console.log("\n✅ SUCCESS! Received Bearer Token.");
            // Testing Chart endpoint with token
            await testChartEndpoint(data.access_token);
        } else {
            console.log("❌ Failed to get token.");
        }

    } catch (e) {
        console.error("Token Fetch Error:", e);
    }
}

async function testChartEndpoint(token) {
    const CHART_ENDPOINT = "https://api.prokerala.com/v2/astrology/western-astrology/natal-chart";
    // Also try /western-chart if the above is wrong

    console.log(`\n🔄 Testing Chart Endpoint: ${CHART_ENDPOINT}`);

    // Prokerala uses GET + query params usually? Or POST?
    // Let's try POST.
    const date = new Date("1986-07-12T09:15:00");

    // Prokerala V2 input format:
    // datetime: ISO 8601
    // coordinates: lat, lon
    // ayanamsa: 1 (Lahiri) - wait, this is Western.

    const requestBody = {
        ayanamsa: 1,
        coordinates: "14.6349,-90.5069",
        datetime: "1986-07-12T09:15:00-06:00",
        house_system: "placidus" // or house_type
    };

    try {
        const response = await fetch(CHART_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        console.log(`Chart Status: ${response.status}`);
        const text = await response.text();
        console.log("Chart Response:", text.substring(0, 1000));

    } catch (e) {
        console.error("Chart Fetch Error:", e);
    }
}

getAccessToken();
