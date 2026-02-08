import { FastifyInstance } from 'fastify';
import { SigilService } from '../modules/sigil/service';
import { EnergyService } from '../modules/energy/service';
import { UserService } from '../modules/user/service';
import { SubscriptionService } from '../modules/subscription/service';
import { TarotService } from '../modules/tarot/service';
import { NumerologyService } from '../modules/numerology/service';
import { UserProfile } from '../types';

import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env';

const sigilService = new SigilService();

// Mock User ID for MVP (Simulate a logged in user)
const currentUserId = '00000000-0000-0000-0000-000000000000';

const supabase = createClient(config.SUPABASE_URL || '', config.SUPABASE_ANON_KEY || '');

export async function apiRoutes(app: FastifyInstance) {

    app.get('/api/test-supabase', async (req, reply) => {
        console.log("🧪 Manual Test: Reading Supabase...");
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('count', { count: 'exact', head: true });

            if (error) {
                console.error("❌ Manual Test Failed:", error);
                return reply.status(500).send({ status: 'error', error });
            }

            console.log("✅ Manual Test Success. Rows:", data);
            return { status: 'ok', message: 'Connection Successful', count: 0 }; // count might be null if head
        } catch (e) {
            console.error("🔥 Manual Test Crash:", e);
            return reply.status(500).send({ status: 'crash', error: e });
        }
    });

    // Chat
    app.post<{ Body: { message: string, localTimestamp?: string } }>('/api/chat', async (req, reply) => {
        const { message, localTimestamp } = req.body;
        return sigilService.processMessage(currentUserId, message, localTimestamp);
    });

    // Energy
    app.get('/api/energy', async (req, reply) => {
        const user = await UserService.getProfile(currentUserId);
        return EnergyService.getDailySnapshot(user);
    });

    // Profile
    app.get('/api/profile', async (req, reply) => {
        return UserService.getProfile(currentUserId);
    });

    app.put<{ Body: Partial<UserProfile> }>('/api/profile', async (req, reply) => {
        return UserService.updateProfile(currentUserId, req.body);
    });

    app.post<{ Body: Partial<UserProfile> }>('/api/profile', async (req, reply) => {
        console.log('✅ DATO RECIBIDO DEL CLIENTE:', req.body.name || 'Sin nombre');
        try {
            const result = await UserService.updateProfile(currentUserId, req.body);
            return result;
        } catch (err) {
            console.error('🔥 Error en POST /api/profile:', err);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // Subscription
    app.get('/api/subscription', async (req, reply) => {
        return SubscriptionService.getStatus(currentUserId);
    });

    app.post('/api/subscription/upgrade', async (req, reply) => {
        return SubscriptionService.upgradePlan(currentUserId);
    });

    // Tarot
    app.get('/api/tarot/yes-no', async (req, reply) => {
        return TarotService.drawYesNo();
    });

    app.get('/api/tarot/celta', async (req, reply) => {
        return TarotService.drawCelta();
    });

    // Numerology
    app.get('/api/numerology', async (req, reply) => {
        const user = await UserService.getProfile(currentUserId);
        return NumerologyService.calculateProfile(user.birthDate, user.name);
    });

    // Debug
    app.get('/api/debug/state', async (req, reply) => {
        return UserService.getRawState();
    });
}
