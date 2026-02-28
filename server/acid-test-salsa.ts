import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

// Datos simulados de 'Salsa' basados en lo encontrado en profiles.json
// Nota: Usamos un UUID válido para evitar error 22P02 de Postgres
const SALSA_ID = 'e0c1f2e3-d4c5-4b6a-8f9e-0d1c2b3a4f5e';

const salsaProfile = {
    id: SALSA_ID,
    full_name: 'luis herrera mendez (Salsa)',
    birth_date: '1986-07-12',
    birth_time: '09:40',
    birth_location: 'guatemala',
    plan_type: 'premium',
    profile_data: {
        nickname: "Salsa",
        email: "saa@fd.com",
        utcOffset: -6,
        last_test: new Date().toISOString()
    },
    updated_at: new Date().toISOString()
};

async function proofOfFire() {
    console.log('🔥 INICIANDO PRUEBA DE FUEGO (Acid Test)...');
    console.log(`📡 Conectando a: ${process.env.SUPABASE_URL}`);

    // Preliminary select to "warm up" or verify table visibility
    console.log('🔍 Verificando visibilidad de tabla...');
    const { error: checkError } = await supabase.from('profiles').select('id').limit(1);
    if (checkError) {
        console.log(`⚠️ Advertencia de visibilidad: ${checkError.message}`);
    } else {
        console.log('✅ Tabla "profiles" es visible para SELECT.');
    }

    console.log('🧪 Intentando INSERTAR perfil de Salsa...');
    // Delete if exists to ensure clean insert
    await supabase.from('profiles').delete().eq('id', SALSA_ID);

    const { error } = await supabase
        .from('profiles')
        .insert(salsaProfile);

    if (error) {
        console.error('❌ LA PRUEBA FALLÓ EN INSERT!');
        console.error('   Error:', error.message);
        console.error('   Código:', error.code);
    } else {
        console.log('✅ ¡PRUEBA EXITOSA! Perfil de Salsa insertado (sin select).');

        console.log('\n🔍 Verificando lectura manual...');
        const { data: verifyData, error: readError } = await supabase
            .from('profiles')
            .select('full_name, updated_at')
            .eq('id', SALSA_ID)
            .single();

        if (readError) {
            console.log('⚠️ Error al leer de vuelta:', readError.message);
        } else {
            console.log(`✨ Confirmado: "${verifyData.full_name}" vive en Supabase.`);
        }
    }
}

proofOfFire().catch(console.error);
