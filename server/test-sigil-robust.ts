
// test-sigil-robust.ts
import dotenv from 'dotenv';
import path from 'path';

// Force load .env from root (go up from server/)
const envPath = path.resolve(__dirname, '../../.env');
console.log(`Loading .env from: ${envPath}`);
dotenv.config({ path: envPath });

// Verify keys
console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY ? "MATCH" : "MISSING");
console.log("SUPABASE_URL:", process.env.SUPABASE_URL ? "MATCH" : "MISSING");

import { SigilService } from './src/modules/sigil/service';

const MOCK_ID = '00000000-0000-0000-0000-000000000000';

async function testSigilLogic() {
    console.log("🚀 Initializing SigilService...");
    try {
        const sigil = new SigilService();
        console.log("✅ SigilService instantiated.");

        console.log(`Invoke processMessage for user ${MOCK_ID}...`);

        // Note: This might still fail if DB connection fails, but we'll see the error.
        const response = await sigil.processMessage(
            MOCK_ID,
            "Hola, ¿quién eres?",
            new Date().toISOString(),
            null,
            'guardian'
        );

        console.log("✅ Response Received:", response);

    } catch (error: any) {
        console.error("🔥 SIGIL ROBUST ERROR:", error);
        if (error.cause) console.error("Cause:", error.cause);
        console.error("Stack:", error.stack);
    }
}

testSigilLogic();
