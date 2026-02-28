import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

async function listTables() {
    console.log('🔍 Listing accessible tables in public schema...');

    // We try to query a system view if possible, or just common names
    const commonTables = ['profiles', 'user_profiles', 'users', 'schema_migrations'];
    for (const table of commonTables) {
        const { data, error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        if (error) {
            console.log(`❌ Table "${table}": ${error.message} (${error.code})`);
        } else {
            console.log(`✅ Table "${table}": EXISTS (Count: ${data})`);
        }
    }
}

listTables().catch(console.error);
