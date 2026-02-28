
// reproduce-sigil-500.ts
// Standalone script to test /api/chat and get the error details

async function testSigil() {
    console.log("🚀 Testing Sigil /api/chat...");

    const payload = {
        message: "Hola, ¿estás ahí?",
        localTimestamp: new Date().toISOString(),
        role: "guardian"
    };

    try {
        const url = 'http://127.0.0.1:3001/api/chat';
        console.log(`Fetching ${url}...`);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-profile-id': '00000000-0000-0000-0000-000000000000' // Mock ID
            },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log("Response Body:", text);

    } catch (error) {
        console.error("Network Error:", error);
    }
}

testSigil();
