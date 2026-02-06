
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

async function testConnection() {
    console.log("⚡ Testing Supabase Connection...");
    console.log("URL:", process.env.SUPABASE_URL);

    const testId = 'test-user-' + Date.now();

    // 1. Try Upsert
    console.log(`\n📝 Attempting Upsert for ID: ${testId}`);
    const { data, error } = await supabase
        .from('profiles')
        .upsert({
            id: testId,
            updated_at: new Date().toISOString(),
            profile_data: { test: true },
            life_path_number: 7
        })
        .select();

    if (error) {
        console.error("❌ UPSERT FAILED:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Upsert Successful!");
        console.log(data);
    }

    // 2. Try Select
    console.log("\n🔍 Attempting Select...");
    const { data: readData, error: readError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

    if (readError) {
        console.error("❌ SELECT FAILED:");
        console.error(JSON.stringify(readError, null, 2));
    } else {
        console.log("✅ Select Successful!");
        console.log(`Found ${readData.length} records.`);
    }
}

testConnection();
