import { supabase } from '../lib/supabase';

export const createProtocol = async (userId: string, title: string, purpose: string) => {
    const { data, error } = await supabase
        .from('protocols')
        .insert([{ user_id: userId, title: title, purpose: purpose, status: 'active' }])
        .select();

    if (error) throw new Error(error.message);
    return data[0];
};

export const getCompletedProtocols = async (userId: string) => {
    const { data, error } = await supabase
        .from('protocols')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('end_date', { ascending: false });

    if (error) {
        console.error("Error obteniendo el historial:", error);
        throw new Error(error.message);
    }

    return data || [];
};
