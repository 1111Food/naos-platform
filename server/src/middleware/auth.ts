import { FastifyRequest, FastifyReply } from 'fastify';
import { supabase } from '../lib/supabase';

export const validateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.status(401).send({ error: 'Falta token de sesión mística' });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            return reply.status(401).send({ error: 'Sesión expirada o inválida' });
        }

        // Inject user_id into the request for downstream use
        (request as any).user_id = user.id;
    } catch (error) {
        return reply.status(401).send({ error: 'Error de autenticación en el éter' });
    }
};
