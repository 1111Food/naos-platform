import { FastifyInstance } from 'fastify';
import { calculateUserVolatility } from '../services/VolatilityEngine';
import { UserService } from '../modules/user/service';
import { CoherenceEngine, CoherenceAction } from '../modules/coherence/CoherenceEngine';
import { AstrologyService } from '../modules/astrology/astroService';
import { supabase } from '../lib/supabase';
import { validateUser } from '../middleware/auth';

export async function coherenceRoutes(app: FastifyInstance) {

    // GET /api/coherence/status
    app.get('/status', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;

        try {
            // 1. Get Profile (to get hardware weights)
            const profile = await UserService.getProfile(userId);

            // 2. Get latest coherence score
            const { data: latest, error } = await supabase
                .from('coherence_history')
                .select('score, delta')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) throw error;

            const currentScore = latest?.score ?? 50;
            const trend = (latest?.delta ?? 0) >= 0 ? 'up' : 'down';

            // 3. Get Astral Mood
            const mood = AstrologyService.getDailyMood();

            // 4. Calculate Volatility (Stitch Engine)
            // Mocking transitsData for now as a real engine is pending.
            // Values derived from the day to be deterministic but variable.
            const today = new Date();
            const daySeed = today.getDate();
            const transitsData = {
                astro_transits: { tension_value_tau: (daySeed % 10) / 10 },
                num_transits: { tension_value_tau: ((daySeed + 7) % 10) / 10 },
                maya_transits: { tension_value_tau: ((daySeed + 13) % 10) / 10 },
                chinese_transits: { tension_value_tau: ((daySeed + 21) % 10) / 10 }
            };

            const volatility = calculateUserVolatility(profile, transitsData);

            return {
                score: currentScore,
                trend,
                lastDelta: latest?.delta ?? 0,
                astralMood: mood,
                volatility // Included for Stitch Adaptive UI
            };

        } catch (e) {
            console.error("🔥 Coherence Status Error:", e);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    // POST /api/coherence/action
    // Body: { action: 'PROTOCOL_ITEM' | ... }
    app.post<{ Body: { action: CoherenceAction } }>('/action', { preHandler: [validateUser] }, async (req, reply) => {
        const userId = (req as any).user_id;
        const { action } = req.body;

        if (!action) return reply.status(400).send({ error: 'Missing action' });

        try {
            // 1. Get Current Score
            const { data: latest } = await supabase
                .from('coherence_history')
                .select('score')
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            const currentScore = latest?.score ?? 50;

            // 2. Get Astral Mood
            const mood = AstrologyService.getDailyMood();

            // 3. Calculate New Score (The Law)
            const result = CoherenceEngine.calculate(currentScore, action, mood);

            // 4. Persist
            const { error } = await supabase.from('coherence_history').insert({
                user_id: userId,
                score: result.newScore,
                delta: result.adjustedDelta,
                source: action,
                astral_mood: mood
            });

            if (error) throw error;

            if (action === 'PROTOCOL_ITEM') {
                await UserService.incrementXp(userId, 25);
            }

            return {
                success: true,
                newScore: result.newScore,
                delta: result.adjustedDelta,
                mood
            };

        } catch (e) {
            console.error("🔥 Coherence Action Error:", e);
            return reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

}
