import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env';

if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) {
    throw new Error('Supabase configuration missing in environment variables');
}

export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
