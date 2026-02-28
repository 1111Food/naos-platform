
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avaikhukgugvcocwedsz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2YWlraHVrZ3VndmNvY3dlZHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNTEyNTIsImV4cCI6MjA4MzcyNzI1Mn0.hslPEVgg-gkk3ByYvZGEwFf7B3kdwhwXQipr1D_8ruo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log("Testing Supabase connection...");
    try {
        const { data, error } = await supabase.from('profiles').select('id').limit(1);
        if (error) {
            console.error("❌ Supabase Error:", error);
        } else {
            console.log("✅ Supabase Success. Found", data.length, "profiles.");
        }
    } catch (e) {
        console.error("❌ Connection Error:", e);
    }
}

test();
