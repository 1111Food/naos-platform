
import { FastifyInstance } from 'fastify';
import { astrologyRoutes } from './src/routes/astrology';

// Mock Fastify for partial testing or use actual server?
// Better to write a script that fetches against the running server to see the actual error response.

const fetch = require('node-fetch');

async function testGuestCalculator() {
    console.log("🚀 Testing Guest Calculator Endpoint...");

    const payload = {
        name: "bastian",
        birthDate: "2014-07-30", // Trying ISO first as per my code
        birthTime: "09:00",
        birthCity: "guatemala",
        birthCountry: "Guatemala"
    };

    try {
        const response = await fetch('http://localhost:3000/api/astrology/natal-chart-temp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log("Response Body:", text);

        try {
            const json = JSON.parse(text);
            console.log("JSON Parsed:", json);
        } catch (e) {
            console.error("❌ Failed to parse JSON body");
        }

    } catch (error) {
        console.error("Network Error:", error);
    }
}

// Also try the exact date format from screenshot if frontend sends it raw
async function testGuestCalculatorRaw() {
    console.log("\n🚀 Testing Guest Calculator (Raw Date from Screenshot)...");

    const payload = {
        name: "bastian",
        birthDate: "30/07/2014", // DD/MM/YYYY
        birthTime: "09:00",
        birthCity: "guatemala",
        birthCountry: "Guatemala"
    };

    try {
        const response = await fetch('http://localhost:3000/api/astrology/natal-chart-temp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.log("Response Body:", text);
    } catch (error) {
        console.error("Network Error:", error);
    }
}

testGuestCalculator();
testGuestCalculatorRaw();
