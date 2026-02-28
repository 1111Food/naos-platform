import { FastifyInstance } from 'fastify';
import { SigilService } from '../modules/sigil/service';
import { EnergyService } from '../modules/energy/service';
import { UserService } from '../modules/user/service';
import { SubscriptionService } from '../modules/subscription/service';
import { TarotService } from '../modules/tarot/service';
import { NumerologyService } from '../modules/numerology/service';
import { UserProfile } from '../types';

import { supabase } from '../lib/supabase';
import { validateUser } from '../middleware/auth';

const sigilService = new SigilService();

export async function apiRoutes(app: FastifyInstance) {

    app.get('/api/test-supabase', async (req, reply) => {
        console.log("🧪 Manual Test: Attempting Real Insert to Supabase...");
        const testPayload = {
            id: '77777777-7777-7777-7777-777777777777', // Special Test ID
            full_name: "Test User AntiGravity",
            birth_date: "1990-01-01",
            birth_time: "12:00",
            birth_location: "Audit City",
            profile_data: { test: true, auditor: "AntiGravity" },
            updated_at: new Date().toISOString()
        };

        try {
            console.log("🚀 TEST PAYLOAD:", JSON.stringify(testPayload, null, 2));
            const { data, error } = await supabase
                .from('profiles')
                .upsert(testPayload)
                .select();

            if (error) {
                console.error("❌ Manual Test Failed:", JSON.stringify(error, null, 2));
                return reply.status(500).send({ status: 'error', error });
            }

            console.log("✅ Manual Test Success. Data:", JSON.stringify(data, null, 2));
            return { status: 'ok', message: 'Insert/Upsert Successful', data };
        } catch (e) {
            console.error("🔥 Manual Test Crash:", e);
            return reply.status(500).send({ status: 'crash', error: e });
        }
    });

    // Chat
    app.post<{ Body: { message: string, localTimestamp?: string, oracleState?: any, role?: 'maestro' | 'guardian' } }>('/api/chat', { preHandler: [validateUser] }, async (req, reply) => {
        try {
            const { message, localTimestamp, oracleState, role } = req.body;
            const userId = (req as any).user_id;
            return await sigilService.processMessage(userId, message, localTimestamp, oracleState, role);
        } catch (error: any) {
            console.error("🔥 SIGIL ERROR:", error);

            if (error.message?.includes('LIMITE_CUOTA')) {
                return reply.status(429).send({
                    error: "El Oráculo ha alcanzado su límite de expansión hoy. Tu energía es tan profunda que hemos agotado los recursos temporales. Revisa tu plan o intenta de nuevo en unos minutos.",
                    details: "QUOTA_EXCEEDED"
                });
            }

            try {
                const fs = require('fs');
                const path = require('path');
                const logPath = path.join(process.cwd(), 'debug_sigil.log');
                fs.appendFileSync(logPath, `\n[${new Date().toISOString()}] ${error.message}\nStack: ${error.stack}\n`);
            } catch (e) {
                console.error("Log failed", e);
            }

            return reply.status(500).send({
                error: "El éter está turbulento. Revisa tu conexión mística.",
                details: error.message
            });
        }
    });

    // Energy
    app.get('/api/energy', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        try {
            const user = await UserService.getProfile(userId);

            const { data: latest } = await supabase
                .from('coherence_history')
                .select('score')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            const currentScore = latest?.score ?? 50;
            return EnergyService.getDailySnapshot(user, currentScore);
        } catch (e) {
            console.error("🔥 Energy Route Error:", e);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // Profile
    app.get('/api/profile', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        return UserService.getProfile(userId);
    });

    app.put<{ Body: Partial<UserProfile> }>('/api/profile', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        return UserService.updateProfile(userId, req.body);
    });

    app.post<{ Body: Partial<UserProfile> }>('/api/profile', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        console.log('✅ DATO RECIBIDO DEL CLIENTE:', req.body.name || 'Sin nombre', '| ID:', userId);
        try {
            const result = await UserService.updateProfile(userId, req.body);
            return result;
        } catch (err) {
            console.error('🔥 Error en POST /api/profile:', err);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // Subscription
    app.get('/api/subscription', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        return SubscriptionService.getStatus(userId);
    });

    app.post('/api/subscription/upgrade', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        return SubscriptionService.upgradePlan(userId);
    });

    // Tarot
    app.get('/api/tarot/yes-no', async (req, reply) => {
        return TarotService.drawYesNo();
    });

    app.get('/api/profiles/multiget', { preHandler: [validateUser] }, async (req, reply) => {
        const ids = (req.query as any).ids?.split(',') || [];
        const profiles = await Promise.all(ids.map((id: string) => UserService.getProfile(id)));
        return profiles.map(p => ({ id: p.id, name: p.name }));
    });

    app.get('/api/tarot/celta', async (req, reply) => {
        return TarotService.drawCelta();
    });

    // Numerology
    app.get('/api/numerology', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        const user = await UserService.getProfile(userId);
        return NumerologyService.calculateProfile(user.birthDate, user.name);
    });

    // Debug
    app.get('/api/debug/state', { preHandler: [validateUser] }, async (req, reply) => {
        return UserService.getRawState();
    });
}
