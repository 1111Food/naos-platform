
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load env from client folder
dotenv.config({ path: path.resolve(__dirname, '../client/.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable(tableName) {
    console.log(`\n--- Checking table: ${tableName} ---`);

    const testPayload = {
        user_id: '00000000-0000-0000-0000-000000000000', // Dummy UUID
        created_at: new Date().toISOString()
    };

    if (tableName === 'sanctuary_sessions') {
        Object.assign(testPayload, {
            element: 'FIRE',
            duration_seconds: 120,
            initial_state: 'Test Need',
            final_state: 'CALM',
            regulation_delta: 5,
            completed_at: new Date().toISOString()
        });
    } else if (tableName === 'daily_anchor') {
        Object.assign(testPayload, {
            anchor_text: 'Test Anchor',
            type: 'MEDITATION',
            expires_at: new Date().toISOString()
        });
    }

    const { error } = await supabase.from(tableName).insert(testPayload);

    if (error) {
        console.log("Insert Attempt Error:", error);
        if (error.code === '42P01') {
            console.log("❌ Table does not exist!");
        } else if (error.code === '42703') {
            console.log("❌ Column does not exist! (Check columns in payload vs DB)");
        } else if (error.code === '23503') {
            console.log("✅ Table exists, but FK failed (Expected for dummy user).");
        } else if (error.code === '42501') {
            console.log("❌ RLS Policy Violation (Permission denied).");
        }
    } else {
        console.log("✅ Insert successful (Unexpected for dummy user, but table exists).");
    }
}

async function run() {
    await checkTable('sanctuary_sessions');
    await checkTable('daily_anchor');
}

run();
