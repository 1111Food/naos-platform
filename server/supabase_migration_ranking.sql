-- RECREATE VIEW TO ENSURE FRESHNESS
DROP VIEW IF EXISTS user_performance_stats;

CREATE OR REPLACE VIEW user_performance_stats 
WITH (security_invoker = true)
AS
WITH daily_activity AS (
    -- Get distinct days where user was active
    SELECT 
        user_id, 
        date_trunc('day', created_at) as activity_date,
        AVG(score) as daily_avg_score
    FROM coherence_history
    GROUP BY user_id, date_trunc('day', created_at)
),
streaks AS (
    -- Calculate streaks using a difference method (date - row_number)
    SELECT 
        user_id,
        activity_date,
        activity_date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY activity_date) * INTERVAL '1 day') as streak_group
    FROM daily_activity
),
streak_groups AS (
    -- Group by the difference to find start/end of each streak
    SELECT
        user_id,
        COUNT(*) as streak_length,
        MAX(activity_date) as last_active_date
    FROM streaks
    GROUP BY user_id, streak_group
),
calculated_stats AS (
    SELECT 
        p.id as user_id,
        
        -- SMA 30 (Simple Moving Average of raw scores)
        COALESCE(
            (SELECT AVG(score) 
             FROM coherence_history ch 
             WHERE ch.user_id = p.id 
             AND ch.created_at > (NOW() - INTERVAL '30 days')
            ), 
        50) as sma_30,

        -- Stability Index (Inverse of Standard Deviation, normalized? Or just StdDev)
        -- Lower StdDev = Higher Stability. 
        COALESCE(
            (SELECT stddev(score) 
             FROM coherence_history ch 
             WHERE ch.user_id = p.id 
             AND ch.created_at > (NOW() - INTERVAL '30 days')
            ), 
        0) as stability_index,

        -- Current Streak
        COALESCE(
            (SELECT streak_length 
             FROM streak_groups sg 
             WHERE sg.user_id = p.id 
             AND sg.last_active_date >= (CURRENT_DATE - INTERVAL '1 day')
             ORDER BY sg.last_active_date DESC
             LIMIT 1
            ), 
        0) as current_streak,

        -- Best Streak
        COALESCE(
            (SELECT MAX(streak_length) 
             FROM streak_groups sg 
             WHERE sg.user_id = p.id
            ), 
        0) as best_streak,

        -- Protocol Cycles
        p.protocols_completed

    FROM profiles p
)
SELECT 
    *,
    -- PERCENTILE RANKING (The Mirror)
    -- Calculates where this user stands compared to everyone else based on SMA 30.
    PERCENT_RANK() OVER (ORDER BY sma_30 ASC) as percentile_rank,
    
    -- TIER CALCULATION (Automatic Classification)
    CASE 
        WHEN sma_30 >= 80 THEN 'Arquitecto'
        WHEN sma_30 >= 65 THEN 'En Dominio'
        WHEN sma_30 >= 50 THEN 'En Construcción'
        WHEN sma_30 >= 40 THEN 'Inestable'
        ELSE 'Fragmentado'
    END as tier_label
FROM calculated_stats;
