
import { CoherenceEngine } from '../src/modules/coherence/CoherenceEngine';

console.log("⚡ Starting Coherence Engine Verification (Corrected)...\n");

const tests = [
    {
        name: "Base Action - Protocol Item (Neutral)",
        initial: 50,
        action: 'PROTOCOL_ITEM',
        mood: 'NEUTRAL',
        expectedDelta: 1, // Base +1
        expectedScore: 51
    },
    {
        name: "Sanctuary Ritual (Harmonious - Harder to gain)",
        initial: 60,
        action: 'SANCTUARY_RITUAL',
        mood: 'HARMONIOUS',
        // Base +2. Harmonious: round(2 * 0.9) = round(1.8) = 2
        expectedDelta: 2,
        expectedScore: 62
    },
    {
        name: "Sanctuary Ritual (Challenging - No penalty on gain)",
        initial: 60,
        action: 'SANCTUARY_RITUAL',
        mood: 'CHALLENGING',
        // Base +2. Challenging affects negatives only.
        expectedDelta: 2,
        expectedScore: 62
    },
    {
        name: "Inactivity (Challenging - Leniency)",
        initial: 50,
        action: 'INACTIVITY_48H',
        mood: 'CHALLENGING',
        // Base -3. Challenging: round(-3 * 0.8) = round(-2.4) = -2.
        expectedDelta: -2,
        expectedScore: 48
    },
    {
        name: "Inactivity (Neutral - Standard)",
        initial: 50,
        action: 'INACTIVITY_48H',
        mood: 'NEUTRAL',
        expectedDelta: -3,
        expectedScore: 47
    },
    {
        name: "Recovery Mode (Score < 45, Double Gain)",
        initial: 40,
        action: 'PROTOCOL_ITEM',
        mood: 'NEUTRAL',
        // Base +1. Recovery: 1 * 2 = +2.
        expectedDelta: 2,
        expectedScore: 42
    },
    {
        name: "Max Score Clamp",
        initial: 99,
        action: 'PROTOCOL_DAY_COMPLETE', // +3
        mood: 'NEUTRAL',
        expectedDelta: 3,
        expectedScore: 100 // Clamped
    },
    {
        name: "Min Score Clamp",
        initial: 2,
        action: 'INACTIVITY_48H', // -3
        mood: 'NEUTRAL',
        expectedDelta: -3,
        expectedScore: 0 // Clamped
    }
];

let passed = 0;
let failed = 0;

tests.forEach(t => {
    const result = CoherenceEngine.calculate(t.initial, t.action as any, t.mood as any);
    const scoreMatch = result.newScore === t.expectedScore;
    const deltaMatch = result.adjustedDelta === t.expectedDelta;

    if (scoreMatch && deltaMatch) {
        console.log(`✅ [PASS] ${t.name}`);
        passed++;
    } else {
        console.error(`❌ [FAIL] ${t.name}`);
        console.error(`   Expected Score: ${t.expectedScore}, Got: ${result.newScore}`);
        console.error(`   Expected Delta: ${t.expectedDelta}, Got: ${result.adjustedDelta}`);
        failed++;
    }
});

console.log(`\nResults: ${passed} Passed, ${failed} Failed.`);

if (failed > 0) process.exit(1);
