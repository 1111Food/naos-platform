// server/verify-env.ts
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const rootEnv = path.join(__dirname, '../.env');
console.log('Checking root .env at:', rootEnv);
if (fs.existsSync(rootEnv)) {
    console.log('✅ Root .env exists');
    const content = fs.readFileSync(rootEnv, 'utf-8');
    dotenv.config({ path: rootEnv });
} else {
    console.log('❌ Root .env NOT found');
}

console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'FOUND (starts with ' + process.env.SUPABASE_URL.substring(0, 20) + ')' : 'NOT FOUND');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'FOUND' : 'NOT FOUND');

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

async function run() {
    console.log('\n🔍 Reading sample from "profiles"...');
    // Removing .order() to avoid potential schema cache issues with specific columns
    const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .limit(3);

    if (profilesError) {
        console.error('❌ Error reading "profiles":', profilesError.message);
    } else {
        console.log('✅ "profiles" read successful.');
        if (profilesData && profilesData.length > 0) {
            console.log('📄 Found', profilesData.length, 'records:');
            profilesData.forEach((p, i) => {
                console.log(`\n--- Record ${i + 1} ---`);
                console.log(`ID: ${p.id}`);
                console.log(`Name: ${p.full_name}`);
                console.log(`Created At: ${p.created_at}`);
                console.log(`Updated At: ${p.updated_at}`);
                // console.log(`Data:`, JSON.stringify(p, null, 2));
            });
        } else {
            console.log('⚠️ "profiles" exists but is EMPTY.');
        }
    }
}

run().catch(console.error);
