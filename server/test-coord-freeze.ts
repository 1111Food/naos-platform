import { UserService } from './src/modules/user/service';

async function testFreeze() {
    console.log("🚀 Validando Bloqueo de Coordenadas (Máximo Conservadurismo)...");

    const userId = 'test-freeze-user';
    const initialData = {
        name: 'Freeze Test',
        birthDate: '1990-01-01',
        birthTime: '12:00',
        birthCity: 'Guatemala City',
        birthCountry: 'Guatemala'
    };

    console.log("\n1. Creando perfil inicial...");
    const profile1 = await UserService.updateProfile(userId, initialData);
    const coords1 = { ...profile1.coordinates };
    console.log(`   Coords Iniciales: ${coords1.lat}, ${coords1.lng}`);

    console.log("\n2. Actualizando nombre (no ubicación)...");
    const profile2 = await UserService.updateProfile(userId, { name: 'Freeze Test Updated' });
    const coords2 = { ...profile2.coordinates };
    console.log(`   Coords después de update: ${coords2.lat}, ${coords2.lng}`);

    if (coords1.lat === coords2.lat && coords1.lng === coords2.lng) {
        console.log("✅ ÉXITO: Las coordenadas se mantuvieron CONGELADAS.");
    } else {
        console.warn("❌ FALLO: Las coordenadas cambiaron.");
    }

    console.log("\n3. Verificando precisión (6 decimales)...");
    const latStr = coords1.lat.toString();
    const decLen = latStr.split('.')[1]?.length || 0;
    console.log(`   Decimales detectados: ${decLen}`);
}

testFreeze();
