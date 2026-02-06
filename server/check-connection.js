require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function testInsert() {
    console.log("🔍 DIAGNÓSTICO: Intentando insertar 'LUIS PRUEBA FINAL'...");

    // Usamos el ID de prueba que funcionó antes para asegurar compatibilidad
    const { data, error } = await supabase
        .from('profiles')
        .upsert({
            id: '00000000-0000-0000-0000-000000000000',
            full_name: 'LUIS PRUEBA FINAL'
        });

    if (error) {
        console.log("-----------------------------------------");
        console.log("❌ ERROR DETECTADO:");
        console.log("Código:", error.code);
        console.log("Mensaje:", error.message);
        console.log("Status:", error.status);
        console.log("Detalles:", error.details);
        console.log("-----------------------------------------");
    } else {
        console.log("✅ ÉXITO: Fila insertada correctamente.");
    }
}

testInsert();
