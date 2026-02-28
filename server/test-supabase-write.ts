// server/test-supabase-write.ts
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Find .env by traversing up
function findEnv() {
    let curr = __dirname;
    for (let i = 0; i < 4; i++) {
        const p = path.join(curr, '.env');
        if (fs.existsSync(p)) return p;
        curr = path.join(curr, '..');
    }
    return null;
}

const envPath = findEnv();
if (envPath) {
    console.log('📝 Loading .env from:', envPath);
    dotenv.config({ path: envPath });
} else {
    console.warn('⚠️ No .env file found in parent directories');
}

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

console.log('\n🔍 SUPABASE WRITE DIAGNOSTIC TEST\n');
console.log('📡 Configuration:');
console.log('   URL:', SUPABASE_URL ? `${SUPABASE_URL.substring(0, 30)}...` : '❌ UNDEFINED');
console.log('   KEY:', SUPABASE_ANON_KEY ? `${SUPABASE_ANON_KEY.substring(0, 20)}...` : '❌ UNDEFINED');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('\n❌ CRITICAL: Missing Supabase credentials in .env file');
    console.error('   Required: SUPABASE_URL and SUPABASE_ANON_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testWrite() {
    console.log('\n🧪 Test 1: Reading existing profiles...');

    const { data: existingProfiles, error: readError } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);

    if (readError) {
        console.error('❌ READ ERROR:', readError);
        console.error('   Code:', readError.code);
        console.error('   Message:', readError.message);
        console.error('   Details:', readError.details);
        console.error('   Hint:', readError.hint);
    } else {
        console.log('✅ Read successful. Found', existingProfiles?.length || 0, 'profiles');
        if (existingProfiles && existingProfiles.length > 0) {
            console.log('   Sample profile ID:', existingProfiles[0].id);
        }
    }

    console.log('\n🧪 Test 2: Attempting to INSERT a test profile...');

    const testProfile = {
        id: 'test-' + Date.now(),
        full_name: 'Test User - Diagnostic',
        birth_date: '1990-01-01',
        birth_time: '12:00',
        birth_location: 'Guatemala City',
        plan_type: 'free',
        profile_data: { test: true },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    const { data: insertData, error: insertError } = await supabase
        .from('profiles')
        .insert(testProfile)
        .select();

    if (insertError) {
        console.error('❌ INSERT ERROR:', insertError);
        console.error('   Code:', insertError.code);
        console.error('   Message:', insertError.message);
        console.error('   Details:', insertError.details);
        console.error('   Hint:', insertError.hint);

        if (insertError.code === '42501') {
            console.error('\n🔒 RLS POLICY ISSUE DETECTED!');
            console.error('   The error code 42501 indicates insufficient privileges.');
            console.error('   This means Row Level Security (RLS) is blocking the write.');
            console.error('\n   SOLUTION: Check Supabase Dashboard → Database → Policies');
            console.error('   You need to add an INSERT policy for the profiles table.');
        }
    } else {
        console.log('✅ Insert successful!');
        console.log('   Inserted profile:', insertData);

        // Clean up test data
        console.log('\n🧹 Cleaning up test data...');
        const { error: deleteError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', testProfile.id);

        if (deleteError) {
            console.error('⚠️ Could not delete test profile:', deleteError.message);
        } else {
            console.log('✅ Test profile deleted');
        }
    }

    console.log('\n🧪 Test 3: Attempting to UPSERT (update or insert)...');

    const upsertProfile = {
        id: 'test-upsert-' + Date.now(),
        full_name: 'Test Upsert User',
        birth_date: '1995-05-05',
        birth_time: '15:30',
        birth_location: 'Antigua',
        plan_type: 'free',
        profile_data: { upsert_test: true },
        updated_at: new Date().toISOString()
    };

    const { data: upsertData, error: upsertError } = await supabase
        .from('profiles')
        .upsert(upsertProfile)
        .select();

    if (upsertError) {
        console.error('❌ UPSERT ERROR:', upsertError);
        console.error('   Code:', upsertError.code);
        console.error('   Message:', upsertError.message);
        console.error('   Details:', upsertError.details);
        console.error('   Hint:', upsertError.hint);
    } else {
        console.log('✅ Upsert successful!');
        console.log('   Upserted profile:', upsertData);

        // Clean up
        console.log('\n🧹 Cleaning up upsert test data...');
        await supabase.from('profiles').delete().eq('id', upsertProfile.id);
        console.log('✅ Cleanup complete');
    }

    console.log('\n📊 DIAGNOSTIC SUMMARY:');
    console.log('   Read access:', readError ? '❌ FAILED' : '✅ OK');
    console.log('   Insert access:', insertError ? '❌ FAILED' : '✅ OK');
    console.log('   Upsert access:', upsertError ? '❌ FAILED' : '✅ OK');

    if (insertError || upsertError) {
        console.log('\n🔍 DIAGNOSIS:');
        if (insertError?.code === '42501' || upsertError?.code === '42501') {
            console.log('   ❌ RLS (Row Level Security) is blocking writes');
            console.log('   ✅ Credentials are valid (read works)');
            console.log('   📝 ACTION REQUIRED: Update RLS policies in Supabase Dashboard');
        } else {
            console.log('   ❌ Unknown error - check error details above');
        }
    } else {
        console.log('\n✅ All tests passed! Database is working correctly.');
    }
}

testWrite().catch(console.error);
