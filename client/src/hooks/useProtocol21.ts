import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useProfile } from './useProfile';

export interface Protocol21 {
    id: string;
    user_id: string;
    start_date: string;
    current_day: number;
    status: 'active' | 'completed' | 'paused' | 'cancelled';
    created_at: string;
    title?: string;
    purpose?: string;
}

export interface ProtocolLog {
    id: string;
    protocol_id: string;
    day_number: number;
    is_completed: boolean;
    completed_at: string;
    notes?: string;
}

export const useProtocol21 = () => {
    const { profile } = useProfile();
    const [activeProtocol, setActiveProtocol] = useState<Protocol21 | null>(null);
    const [dailyLogs, setDailyLogs] = useState<ProtocolLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [completedCount, setCompletedCount] = useState(0);

    // Fetch Active Protocol
    const fetchProtocol = async () => {
        if (!profile?.id) return;
        setLoading(true);
        setError(null);

        try {
            const { data: protocol, error: protocolError } = await supabase
                .from('user_protocols')
                .select('*')
                .eq('user_id', profile.id)
                .eq('status', 'active')
                .single();

            if (protocolError && protocolError.code !== 'PGRST116') { // PGRST116 is "No rows found"
                throw protocolError;
            }

            if (protocol) {
                // Fetch intent from protocols table to get title and purpose
                const { data: intent } = await supabase
                    .from('protocols')
                    .select('title, purpose')
                    .eq('user_id', profile.id)
                    .eq('status', 'active')
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                setActiveProtocol({
                    ...protocol,
                    title: intent?.title || 'Protocolo 21',
                    purpose: intent?.purpose || 'Evolución'
                });

                // Fetch Logs for this protocol
                const { data: logs, error: logsError } = await supabase
                    .from('protocol_daily_logs')
                    .select('*')
                    .eq('protocol_id', protocol.id)
                    .order('day_number', { ascending: true });

                if (logsError) throw logsError;
                setDailyLogs(logs || []);
            } else {
                setActiveProtocol(null);
                setDailyLogs([]);
            }

            // Fetch completed protocols count
            const { count } = await supabase
                .from('user_protocols')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.id)
                .eq('status', 'completed');

            setCompletedCount(count || 0);

        } catch (err: any) {
            console.error("Error fetching protocol:", err);
            // setError(err.message); // Silent fail preferred for UI widgets unless critical
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProtocol();
    }, [profile?.id]);

    // Start New Protocol
    const startProtocol = async () => {
        if (!profile?.id) return;
        setLoading(true);

        try {
            // Check if active exists (double check)
            if (activeProtocol) {
                throw new Error("Ya tienes un protocolo activo.");
            }

            const { data, error } = await supabase
                .from('user_protocols')
                .insert({
                    user_id: profile.id,
                    start_date: new Date().toISOString(),
                    current_day: 1,
                    status: 'active'
                })
                .select()
                .single();

            if (error) throw error;

            setActiveProtocol(data);
            setDailyLogs([]); // New protocol has no logs yet
            return data;

        } catch (err: any) {
            console.error("Error creating protocol:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Complete Daily Check
    const completeDay = async (dayNumber: number, notes?: string) => {
        if (!activeProtocol || !profile?.id) return;

        try {
            // 1. Create Log
            const { error: logError } = await supabase
                .from('protocol_daily_logs')
                .insert({
                    protocol_id: activeProtocol.id,
                    day_number: dayNumber,
                    is_completed: true,
                    completed_at: new Date().toISOString(),
                    notes: notes
                });

            if (logError) throw logError;

            // 2. Update Protocol Progress
            let updates: any = {};

            if (dayNumber >= 21) {
                // VICTORY: Do NOT increment day past 21. 
                // Mark as completed and set end_date.
                updates = {
                    status: 'completed',
                    end_date: new Date().toISOString()
                    // current_day remains 21
                };

                // Mark the corresponding protocols table as completed
                await supabase
                    .from('protocols')
                    .update({ status: 'completed' })
                    .eq('user_id', profile.id)
                    .eq('status', 'active');
            } else {
                // Normal progression
                updates = { current_day: activeProtocol.current_day + 1 };
            }

            const { data: updatedProtocol, error: updateError } = await supabase
                .from('user_protocols')
                .update(updates)
                .eq('id', activeProtocol.id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Update Local State
            setActiveProtocol(updatedProtocol);
            await fetchProtocol(); // Refresh logs to be safe

            return updatedProtocol;

        } catch (err: any) {
            console.error("Error completing day:", err);
            throw err;
        }
    };

    // Pause Protocol
    const pauseProtocol = async () => {
        if (!activeProtocol) return;
        try {
            const { error } = await supabase
                .from('user_protocols')
                .update({ status: 'paused' })
                .eq('id', activeProtocol.id);

            if (error) throw error;

            // Optimistic update or refresh
            setActiveProtocol(prev => prev ? { ...prev, status: 'paused' } : null);
        } catch (err) {
            console.error(err);
        }
    };

    // Cancel Protocol
    const cancelProtocol = async () => {
        if (!activeProtocol || !profile?.id) return;
        try {
            const { error } = await supabase
                .from('user_protocols')
                .update({ status: 'cancelled' })
                .eq('id', activeProtocol.id);

            if (error) throw error;

            await supabase.from('protocols').update({ status: 'cancelled' }).eq('user_id', profile.id).eq('status', 'active');

            setActiveProtocol(null);
            setDailyLogs([]);
        } catch (err) {
            console.error(err);
        }
    };

    // Reset Protocol (Start Over)
    const resetProtocol = async () => {
        if (!activeProtocol) return;
        setLoading(true);
        try {
            // 1. Reset Protocol State
            const { error: updateError } = await supabase
                .from('user_protocols')
                .update({
                    current_day: 1,
                    status: 'active',
                    start_date: new Date().toISOString()
                })
                .eq('id', activeProtocol.id);

            if (updateError) throw updateError;

            // Note: Does not delete 'protocols' row, just recycles it as 'active'

            // 2. Delete all logs for this protocol
            const { error: deleteError } = await supabase
                .from('protocol_daily_logs')
                .delete()
                .eq('protocol_id', activeProtocol.id);

            if (deleteError) throw deleteError;

            // 3. Updates local state
            setActiveProtocol(prev => prev ? { ...prev, current_day: 1, status: 'active' } : null);
            setDailyLogs([]);
            await fetchProtocol();

        } catch (err: any) {
            console.error("Error resetting protocol:", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        activeProtocol,
        dailyLogs,
        loading,
        error,
        completedCount,
        startProtocol,
        completeDay,
        pauseProtocol,
        cancelProtocol,
        resetProtocol,
        refresh: fetchProtocol
    };
};
