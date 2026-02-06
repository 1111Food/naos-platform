
const USER_ID = "649684";
const API_KEY = "3b4e8b3959a9847bbfeec479a40807108ec68d07";
const ENDPOINT = "https://json.astrologyapi.com/v1/western_chart_data";

async function inspectHouses() {
    console.log("🔍 Inspecting AstrologyAPI Houses Structure...");

    const requestBody = {
        day: 12, month: 7, year: 1986,
        hour: 9, min: 15,
        lat: 14.6349, lon: -90.5069,
        tzone: -6,
        house_type: "placidus"
    };

    const auth = Buffer.from(`${USER_ID}:${API_KEY}`).toString('base64');

    try {
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const data = await response.json();

        console.log("✅ API Response Received");
        console.log("FULL DATA:", JSON.stringify(data, null, 2));

        if (data.houses) {
            console.log("Type of 'houses':", Array.isArray(data.houses) ? "ARRAY" : typeof data.houses);
        } else {
            console.log("❌ 'houses' field is MISSING");
        }

    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

inspectHouses();
