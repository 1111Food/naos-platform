import { FastifyInstance } from 'fastify';
import { supabase } from '../lib/supabase';
import { validateUser } from '../middleware/auth';

export async function rankingRoutes(app: FastifyInstance) {

    app.get('/', { preHandler: [validateUser] }, async (request, reply) => {
        const userId = (request as any).user_id;

        try {
            // 1. Get Personal Stats (View is now smart)
            const { data: personalStats, error: personalError } = await supabase
                .from('user_performance_stats')
                .select('*')
                .eq('user_id', userId)
                .single();

            if (personalError && personalError.code !== 'PGRST116') throw personalError;

            // If no personal stats, provide empty structure
            const personal = personalStats ? {
                sma_30: Number(personalStats.sma_30),
                current_streak: personalStats.current_streak,
                best_streak: personalStats.best_streak,
                stability_index: Number(personalStats.stability_index),
                percentile: 1 - Number(personalStats.percentile_rank),
                tier: personalStats.tier_label
            } : {
                sma_30: 0,
                current_streak: 0,
                best_streak: 0,
                stability_index: 0,
                percentile: 1.0,
                tier: "Fragmentado"
            };

            // 2. Get Community Distribution (Aggregation)
            // Ideally this would be a materialized view for scale, but for now we aggregate the view.
            const { data: distributionData, error: distError } = await supabase
                .from('user_performance_stats')
                .select('tier_label');

            if (distError) throw distError;

            // Process distribution in memory (fast enough for <10k users)
            const distribution: Record<string, number> = {
                'Fragmentado': 0,
                'Inestable': 0,
                'En Construcción': 0,
                'En Dominio': 0,
                'Arquitecto': 0
            };

            distributionData.forEach((row: any) => {
                if (distribution[row.tier_label] !== undefined) {
                    distribution[row.tier_label]++;
                }
            });

            return {
                personal: personal,
                community: {
                    total_users: distributionData.length,
                    distribution: distribution
                }
            };

        } catch (error) {
            console.error("🏆 Ranking API Error:", error);
            return reply.status(500).send({ error: 'Failed to fetch ranking data' });
        }
    });
}
