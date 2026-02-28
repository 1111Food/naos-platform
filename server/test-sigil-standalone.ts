
// test-sigil-standalone.ts
import { SigilService } from './src/modules/sigil/service';

const MOCK_ID = '00000000-0000-0000-0000-000000000000';

async function testSigilLogic() {
    console.log("🚀 Initializing SigilService...");
    try {
        const sigil = new SigilService();
        console.log("✅ SigilService instantiated.");

        console.log(`Invoke processMessage for user ${MOCK_ID}...`);
        const response = await sigil.processMessage(
            MOCK_ID,
            "Hola, ¿quién eres?",
            new Date().toISOString(),
            null,
            'guardian'
        );

        console.log("✅ Response Received:", response);

    } catch (error: any) {
        console.error("🔥 SIGIL STANDALONE ERROR:", error);
        console.error("Stack:", error.stack);
    }
}

testSigilLogic();
