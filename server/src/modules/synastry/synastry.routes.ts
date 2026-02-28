import { FastifyPluginAsync } from 'fastify';
import { SynastryController } from './synastry.controller';
import { analyzeSchema, historySchema, deleteHistorySchema } from './synastry.schema';
import { validateUser } from '../../middleware/auth';

export const synastryRoutesV2: FastifyPluginAsync = async (fastify) => {
    fastify.get('/ping', async () => { return { status: 'Synastry Routes Active' }; });
    fastify.post('/analyze', { preHandler: [validateUser], schema: analyzeSchema }, SynastryController.analyze);
    fastify.get('/history', { preHandler: [validateUser] }, SynastryController.getHistory);
    fastify.delete('/record/:id', { preHandler: [validateUser], schema: deleteHistorySchema }, SynastryController.deleteHistory);
    // Fallback delete route for malformed client requests
    fastify.delete('/:id', { preHandler: [validateUser], schema: deleteHistorySchema }, SynastryController.deleteHistory);
};
