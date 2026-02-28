
// test-guest-standalone.ts
import Fastify from 'fastify';
import { astrologyRoutes } from './src/routes/astrology';

// Mock DB or Env if necessary?
// natal-chart-temp shouldn't need DB.

const app = Fastify({ logger: true });

async function run() {
    try {
        await app.register(astrologyRoutes);

        console.log("🚀 Testing natal-chart-temp via inject...");

        const payload = {
            name: "bastian",
            birthDate: "2014-07-30", // ISO for safety
            birthTime: "09:00",
            birthCity: "guatemala",
            birthCountry: "Guatemala"
        };

        const response = await app.inject({
            method: 'POST',
            url: '/natal-chart-temp',
            payload: payload
        });

        const fs = require('fs');
        const path = require('path');
        const outPath = path.join(process.cwd(), 'test_output_full.txt');

        let logBuffer = "";
        const log = (msg) => { console.log(msg); logBuffer += msg + "\n"; };

        log(`Status: ${response.statusCode}`);
        log(`Payload Length: ${response.payload.length}`);

        try {
            // Test Serialization manually
            JSON.stringify(JSON.parse(response.payload));
            log("✅ JSON Serialization Check: PASSED");
            log(`Body Snippet: ${response.payload.substring(0, 500)}...`);
        } catch (e) {
            log(`❌ JSON Serialization Try Failed: ${e.message}`);
            log(`Raw Payload: ${response.payload}`);
        }

        fs.writeFileSync(outPath, logBuffer);

    } catch (err) {
        console.error(err);
    }
}

run();
