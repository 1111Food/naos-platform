
async function checkApi() {
    console.log("🔍 Checking Live API at http://localhost:3001/api/profile...");
    try {
        const res = await fetch('http://localhost:3001/api/profile');
        const data = await res.json();

        console.log("✅ API Response Received:");
        console.log("   -> Name:", data.name);
        console.log("   -> Astrology Elements:", JSON.stringify(data.astrology?.elements));

        const elements = data.astrology?.elements;
        if (elements) {
            const sum = Object.values(elements).reduce((a: any, b: any) => a + b, 0);
            console.log("   -> Sum of Elements:", sum);
            if (sum === 100) {
                console.log("🎉 SUCCESS: Server is sending correctly normalized percentages (100%)");
            } else {
                console.log("❌ FAILURE: Server is sending raw weights or unnormalized data (Sum:", sum, ")");
            }
        } else {
            console.log("❌ ERROR: Missing astrology elements in response.");
        }
    } catch (err) {
        console.error("❌ Failed to connect to local API:", err.message);
    }
}

checkApi();
