
const userId = '649684';
const apiKey = '3b4e8b3959a9847bbfeec479a40807108ec68d07';
const endpoint = 'https://json.astrologyapi.com/v1/sun_sign_prediction/daily/cancer';

async function test() {
    console.log("Testing Astrology API...");
    try {
        const auth = Buffer.from(`${userId}:${apiKey}`).toString('base64');
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'naos-platform'
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: response.statusText }));
            console.error(`❌ Astrology API ERROR (${response.status}):`, JSON.stringify(errorData));
        } else {
            const data = await response.json();
            console.log("✅ Astrology API Success.");
        }
    } catch (e) {
        console.error("❌ Fetch Error:", e);
    }
}

test();
