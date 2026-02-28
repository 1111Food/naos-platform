import { GeocodingService } from './src/modules/user/geocoding';

async function testNormalization() {
    console.log("🚀 Validando Normalización Geográfica...");

    // Caso 1: Ciudad en base de datos estática
    console.log("\n--- Prueba: Guatemala City ---");
    const coords1 = await GeocodingService.getCoordinates("Guatemala City", "", "Guatemala");
    console.log("Resultado:", coords1);
    if (coords1.lat === 14.6349 && coords1.lng === -90.5069) {
        console.log("✅ ÉXITO: Se usaron las coordenadas normalizadas.");
    } else {
        console.warn("❌ FALLO: No se usó la base de datos estática.");
    }

    // Caso 2: Ciudad existente NO normalizada (API Hit)
    console.log("\n--- Prueba: Bogota, Colombia (API Real) ---");
    const coordsReal = await GeocodingService.getCoordinates("Bogota", "", "Colombia");
    console.log("Resultado:", coordsReal);

    // Caso 3: Ciudad no existente (Fallback)
    console.log("\n--- Prueba: Ciudad desconocida (Fallback) ---");
    const coords2 = await GeocodingService.getCoordinates("X-Cosmos-City", "Mars", "Ether");
    console.log("Resultado:", coords2);
}

testNormalization();
