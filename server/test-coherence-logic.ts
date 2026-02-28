
import { CoherenceService, DailyActivity } from './src/modules/coherence/service';

function testCoherence() {
    console.log("🧩 INICIANDO SIMULACIÓN DE COHERENCIA 🧩\n");

    // ESCENARIO 1: EL ARQUITECTO DISCIPLINADO (Subida)
    console.log("--- ESCENARIO 1: RECUPERACIÓN (COMBO) ---");
    let score = 40; // Empezamos bajo
    console.log(`Día 0: ${score}%`);

    const perfectDay: DailyActivity = {
        protocol_21: true,
        sanctuary: true,
        journal: true,
        body: true,
        ether: true
    };

    score = CoherenceService.calculateDailyCoherence(score, perfectDay);
    console.log(`Día 1 (Perfecto + Combo): ${score}% (Esperado: 40 + 20 + 5 = 65)`);

    if (score === 65) console.log("✅ CÁLCULO PERFECTO");
    else console.error("❌ ERROR EN CÁLCULO");

    // ESCENARIO 2: ABANDONO (Decay)
    console.log("\n--- ESCENARIO 2: CAÍDA (DECAY) ---");
    score = 80;
    console.log(`Inicio: ${score}%`);

    // Día 1-2 (Gracia)
    score = CoherenceService.calculateDecay(score, 1);
    console.log(`Inactividad Día 1: ${score}% (Esperado: 80)`);
    score = CoherenceService.calculateDecay(score, 2);
    console.log(`Inactividad Día 2: ${score}% (Esperado: 80)`);

    // Día 3 (Drift)
    score = CoherenceService.calculateDecay(score, 3);
    console.log(`Inactividad Día 3: ${score}% (Esperado: 75)`);

    // Día 7 (Crash)
    // Simulamos que pasaron días intermedios y llegamos al 7
    // Digamos que bajó a 60 en los días 4,5,6
    score = 60;
    console.log(`... (Simulando paso de días) ... Score pre-crash: ${score}%`);
    score = CoherenceService.calculateDecay(score, 7);
    console.log(`Inactividad Día 7: ${score}% (Esperado: 50)`);

    // ESCENARIO 3: PISO (Hard Floor)
    console.log("\n--- ESCENARIO 3: SUELO (HARD FLOOR) ---");
    score = 32;
    score = CoherenceService.calculateDecay(score, 8); // -10
    console.log(`Crash desde 32%: ${score}% (Esperado: 30, NO 22)`);
    if (score === 30) console.log("✅ SUELO RESPETADO");
    else console.error("❌ ERROR EN SUELO");
}

testCoherence();
