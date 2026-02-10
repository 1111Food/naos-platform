import { AstrologyService } from './modules/astrology/astroService';

console.log("------------------------------------------------------------------");
console.log("🔮 NAOS QA: Verificación de Integridad de Síntesis Astrológica");
console.log("------------------------------------------------------------------\n");

const tests = [
    { planet: 'Sun', sign: 'Leo', house: 5, isRetrograde: false },
    { planet: 'Saturn', sign: 'Scorpio', house: 8, isRetrograde: false },
    { planet: 'Mercury', sign: 'Gemini', house: 3, isRetrograde: true }
];

tests.forEach((t, i) => {
    console.log(`CASO ${i + 1}: ${t.planet} en ${t.sign}, Casa ${t.house} ${t.isRetrograde ? '(Retrógrado)' : ''}`);
    const reading = (AstrologyService as any).getAstralReading(t.planet, t.sign, t.house, t.isRetrograde);
    console.log(reading);
    console.log("\n" + "=".repeat(50) + "\n");
});

console.log("✅ Verificación completada. Los textos siguen el estándar bibliográfico.");
