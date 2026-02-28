import { supabase } from './lib/supabase';

async function checkHistory() {
    const { data, error } = await supabase.from('synastry_history').select('*');
    if (error) {
        console.error("Error fetching history:", error);
        return;
    }
    console.log("SYN_HISTORY:", JSON.stringify(data, null, 2));
}

checkHistory();
