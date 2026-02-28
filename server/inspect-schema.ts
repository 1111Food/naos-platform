import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

console.log('Using URL:', process.env.SUPABASE_URL);

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

async function inspectSchema() {
    console.log('🔍 Fetching one full row from "profiles"...');
    const { data, error } = await supabase.from('profiles').select('*').limit(1);

    if (error) {
        console.error('❌ Error reading profiles:', error.message);
    } else {
        console.log('✅ Columns verified via SELECT.');

        console.log('\n🔥 FINAL ACID TEST: Saving "Salsa" profile (Delete + Insert)...');
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
                reactivation_test: true,
                test_date: new Date().toISOString()
            },
            updated_at: new Date().toISOString()
        };

        // 1. Clean up
        await supabase.from('profiles').delete().eq('id', SALSA_ID);

        // 2. Insert fresh
        const { error: insertError } = await supabase
            .from('profiles')
            .insert(salsaProfile);

        if (insertError) {
            console.error('❌ FINAL TEST FAILED AT INSERT:', insertError.message);
        } else {
            console.log('✅ FINAL TEST SUCCESSFUL! Salsa profile created.');

            // 3. Verify
            const { data: verifyData } = await supabase.from('profiles').select('full_name, profile_data').eq('id', SALSA_ID).single();
            if (verifyData) {
                console.log(`✨ PERFIL "${verifyData.full_name}" CONFIRMADO EN SUPABASE.`);
                console.log(`📦 Profile Data persistent: ${!!verifyData.profile_data}`);
            }
        }
    }
}

inspectSchema().catch(console.error);
