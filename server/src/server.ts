import { buildApp } from './app';
import { config } from './config/env';

// Global error handlers to prevent hanging processes
process.on('uncaughtException', (err) => {
    console.error('🔥 UNCAUGHT EXCEPTION:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('🔥 UNHANDLED REJECTION at:', promise, 'reason:', reason);
    process.exit(1);
});

const start = async () => {
    try {
        console.log("🔍 DIAGNOSTIC: Checking Env Vars...");
        console.log("   -> SUPABASE_URL:", config.SUPABASE_URL ? config.SUPABASE_URL.substring(0, 15) + "..." : "UNDEFINED");
        console.log("   -> SERVER_KEY:", config.SUPABASE_ANON_KEY ? config.SUPABASE_ANON_KEY.substring(0, 5) + "..." : "UNDEFINED");

        const app = await buildApp();

        // Listen configuration
        await app.listen({
            port: Number(config.PORT),
            host: '0.0.0.0'
        });

        console.log(`✅ Server running at http://localhost:${config.PORT}`);
        console.log(`📂 CWD: ${process.cwd()}`);
        console.log(`🚀 SIGIL V2.0 ACTIVE: Powered by Gemini 2.0 Flash`);
        console.log(`🌐 Network: http://192.168.1.72:${config.PORT}`);

    } catch (err: any) {
        if (err.code === 'EADDRINUSE') {
            console.error(`❌ FATAL: Port ${config.PORT} is already tied to another cosmic process.`);
            console.error("💡 Action: The system should have attempted cleanup. If this persists, manually kill the process.");
        } else {
            console.error("❌ FATAL: Server failed to manifest:", err);
        }
        process.exit(1);
    }
};

start();