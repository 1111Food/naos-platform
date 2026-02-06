import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env';
import { apiRoutes } from './routes/api.js';
import { tarotRoutes } from './routes/tarot';
import { astrologyRoutes } from './routes/astrology';

export const buildApp = async (): Promise<FastifyInstance> => {
    const app = fastify({
        logger: true,
    });

    await app.register(cors, {
        origin: true, // During dev, reflect origin to avoid blocks
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true,
    });

    app.get('/health', async (request, reply) => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });

    await app.register(apiRoutes);
    await app.register(tarotRoutes, { prefix: '/api/tarot' });
    await app.register(astrologyRoutes, { prefix: '/api/astrology' });

    return app;
};
