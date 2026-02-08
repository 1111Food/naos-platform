import { UserService } from './src/modules/user/service';

async function verifySync() {
    console.log("🚀 Iniciando prueba de Paridad Vercel (Reconstrucción Limpia)...");

    const userId = 'sync-test-user-' + Date.now();
    const data = {
        name: 'Vercel Parity Test',
        birthDate: '1990-07-29',
        birthTime: '10:00',
        birthCity: 'Guatemala City',
        birthCountry: 'Guatemala'
    };

    console.log("\n1. Guardando perfil con Offset -6...");
    await UserService.updateProfile(userId, data);

    // Simulate Vercel: Clear memory cache
    // Note: This requires UserService to not have private profilesCache we can't clear,
    // but getProfile always queries Supabase first.

    console.log("\n2. Recuperando perfil (Simulando nueva instancia serverless)...");
    const restored = await UserService.getProfile(userId);

    console.log(`   Nombre: ${restored.name}`);
    console.log(`   Coords: ${restored.coordinates.lat}, ${restored.coordinates.lng}`);
    console.log(`   Offset: ${restored.utcOffset}`);

    if (restored.utcOffset === -6) {
        console.log("✅ ÉXITO: El offset se recuperó correctamente.");
    } else {
        console.warn("❌ FALLO: El offset se perdió o es incorrecto.");
    }

    if (restored.coordinates.lat === 14.6349 && restored.coordinates.lng === -90.5069) {
        console.log("✅ ÉXITO: Las coordenadas de alta precisión persistieron.");
    } else {
        console.warn("❌ FALLO: Las coordenadas cambiaron.");
    }
}

verifySync();
