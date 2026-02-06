import dotenv from 'dotenv';
import path from 'path';

// Default looks for .env in process.cwd()
const result = dotenv.config();

if (result.error) {
    console.warn("⚠️  .env file not found or failed to load.");
} else {
    console.log("✅ .env file loaded.");
}

export const config = {
    PORT: process.env.PORT || 3001,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    ASTROLOGY_API_USER_ID: process.env.ASTROLOGY_API_USER_ID,
    ASTROLOGY_API_KEY: process.env.ASTROLOGY_API_KEY,
    ASTROLOGY_API_ENDPOINT: process.env.ASTROLOGY_API_ENDPOINT || 'https://json.astrologyapi.com/v1',
};

// Debug log (masked)
if (config.GEMINI_API_KEY) {
    console.log(`🔑 GEMINI_API_KEY loaded: ${config.GEMINI_API_KEY.substring(0, 4)}...`);
} else {
    console.error("❌ GEMINI_API_KEY is missing in .env");
}
