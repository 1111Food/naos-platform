const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

async function checkCapabilities() {
    console.log("🔍 Diagnosing Supabase Capabilities...");
    console.log("URL:", process.env.SUPABASE_URL);

    // Try to run a simple DDL (this should fail with anon key)
    console.log("\n1. Testing raw SQL execution via rpc ('exec_sql')...");
    try {
        const { data, error } = await supabase.rpc('exec_sql', {
            sql_query: 'SELECT 1'
        });
        if (error) {
            console.log("❌ exec_sql failed or not found:", error.message);
        } else {
            console.log("✅ exec_sql IS AVAILABLE!");
        }
    } catch (e) {
        console.log("❌ exec_sql exception:", e.message);
    }

    // Check if we can describe the table
    console.log("\n2. Testing POSTGRES info via API...");
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .limit(0);
        if (error) {
            console.log("❌ Table access error:", error.message);
        } else {
            console.log("✅ Table 'profiles' is accessible.");
        }
    } catch (e) {
        console.log("❌ Table access exception:", e.message);
    }
}

checkCapabilities();
