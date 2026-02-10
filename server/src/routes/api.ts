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
    app.post<{ Body: { message: string, localTimestamp?: string, oracleState?: any } }>('/api/chat', async (req, reply) => {
        const { message, localTimestamp, oracleState } = req.body;
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        return sigilService.processMessage(profileId, message, localTimestamp, oracleState);
    });

    // Energy
    app.get('/api/energy', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        const user = await UserService.getProfile(profileId);
        return EnergyService.getDailySnapshot(user);
    });

    // Profile
    app.get('/api/profile', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        return UserService.getProfile(profileId);
    });

    app.put<{ Body: Partial<UserProfile> }>('/api/profile', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        return UserService.updateProfile(profileId, req.body);
    });

    app.post<{ Body: Partial<UserProfile> }>('/api/profile', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        console.log('✅ DATO RECIBIDO DEL CLIENTE:', req.body.name || 'Sin nombre', '| ID:', profileId);
        try {
            const result = await UserService.updateProfile(profileId, req.body);
            return result;
        } catch (err) {
            console.error('🔥 Error en POST /api/profile:', err);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // Subscription
    app.get('/api/subscription', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        return SubscriptionService.getStatus(profileId);
    });

    app.post('/api/subscription/upgrade', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        return SubscriptionService.upgradePlan(profileId);
    });

    // Tarot
    app.get('/api/tarot/yes-no', async (req, reply) => {
        return TarotService.drawYesNo();
    });

    app.get('/api/profiles/multiget', async (req, reply) => {
        const ids = (req.query as any).ids?.split(',') || [];
        const profiles = await Promise.all(ids.map((id: string) => UserService.getProfile(id)));
        return profiles.map(p => ({ id: p.id, name: p.name }));
    });

    app.get('/api/tarot/celta', async (req, reply) => {
        return TarotService.drawCelta();
    });

    // Numerology
    app.get('/api/numerology', async (req, reply) => {
        const profileId = (req.headers['x-profile-id'] as string) || currentUserId;
        const user = await UserService.getProfile(profileId);
        return NumerologyService.calculateProfile(user.birthDate, user.name);
    });

    // Debug
    app.get('/api/debug/state', async (req, reply) => {
        return UserService.getRawState();
    });
}
