import dotenv from 'dotenv';
import path from 'path';

// Load .env from root
const result = dotenv.config({ path: path.join(__dirname, '../../../.env') });

if (result.error) {
    console.warn("⚠️  .env file not found or failed to load.");
} else {
    console.log("✅ .env file loaded.");
}

export const config = {
    PORT: process.env.PORT || 3001,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    ASTROLOGY_API_USER_ID: process.env.ASTROLOGY_API_USER_ID,
    ASTROLOGY_API_KEY: process.env.ASTROLOGY_API_KEY,
    ASTROLOGY_API_ENDPOINT: process.env.ASTROLOGY_API_ENDPOINT || 'https://json.astrologyapi.com/v1',
};

// Debug log (masked)
const usedKey = config.GOOGLE_API_KEY || "(EMPTY)";
console.log(`📡 Cosmic Config: GOOGLE_API_KEY detected? ${config.GOOGLE_API_KEY ? 'YES' : 'NO'} (${usedKey.substring(0, 4)}...)`);

if (!config.GOOGLE_API_KEY) {
    console.error("❌ CRITICAL: GOOGLE_API_KEY is missing. Production AI will fail.");
}
