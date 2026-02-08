import { AstrologyService } from './src/modules/astrology/astroService';

async function audit() {
    console.log("🚀 Iniciando Auditoría de Precisión Astral...");

    // Caso de Prueba: 29 Julio 1990, 10:00 AM, Guatemala
    const birthDate = '1990-07-29';
    const birthTime = '10:00:00';
    const lat = 14.6349;
    const lng = -90.5069;
    const utcOffset = -5; // Guatemala had DST in 1990 (-5 instead of -6)

    console.log(`\n--- Prueba Fallback Local ---`);
    // @ts-ignore - Accessing private for testing
    const profile = await AstrologyService.calculateLocalFallback(birthDate, birthTime, lat, lng, utcOffset);

    console.log(`Ascendente Absoluto: ${profile.rising.absDegree.toFixed(4)}°`);
    console.log(`Ascendente: ${profile.rising.sign} ${profile.rising.degree.toFixed(2)}°`);
    console.log(`Luna: ${profile.moon.sign} ${profile.moon.degree.toFixed(2)}° (Casa ${profile.moon.house})`);

    // Validar Ascendente en Virgo (aprox)
    if (profile.rising.sign === 'Virgo') {
        console.log("✅ ÉXITO: El Ascendente está en Virgo como se esperaba.");
    } else {
        console.warn(`❌ DISCREPANCIA: El Ascendente está en ${profile.rising.sign}. Se esperaba Virgo.`);
    }

    console.log("\nPlanetas:");
    profile.planets.forEach(p => {
        console.log(`- ${p.name}: ${p.sign} ${p.degree.toFixed(2)}° (Casa ${p.house})`);
    });
}

audit();
