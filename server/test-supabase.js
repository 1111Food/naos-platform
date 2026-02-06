require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Inicialización del cliente con tus variables de entorno
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function forzarEscritura() {
    console.log("🚀 Iniciando prueba final de conexión con el Templo de NAOS...");

    // Hemos eliminado 'username' y 'updated_at' para evitar errores
    const testData = {
        id: '00000000-0000-0000-0000-000000000000', // ID de prueba
        full_name: 'LUIS CONEXION EXITOSA',
        pin_b_personal: 3,   // Tu Personalidad (Punto B)
        pin_d_personality: 7, // Tu Esencia (Punto D)
        pin_i_subconscious: 11,
        pin_j_unconscious: 11
    };

    console.log("📦 Enviando datos al altar de Supabase...");

    const { data, error } = await supabase
        .from('profiles')
        .upsert(testData);

    if (error) {
        console.error("❌ ERROR DE SUPABASE:");
        console.error("Mensaje:", error.message);
        console.error("Detalles:", error.details || "Sin detalles adicionales");
    } else {
        console.log("---");
        console.log("✅ ¡VICTORIA TOTAL, LUIS!");
        console.log("El registro se ha grabado correctamente en la tabla 'profiles'.");
        console.log("---");
        console.log("👉 PRÓXIMO PASO: Ve a tu Table Editor en Supabase y dale a 'Refresh'.");
    }
}

forzarEscritura();