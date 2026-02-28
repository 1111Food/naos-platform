-- v9.2: El Santuario (Meditation & Daily Anchor)

-- 1. TABLE: Meditation Sessions (Historial de Práctica)
CREATE TABLE IF NOT EXISTS meditation_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- '4-7-8', 'BOX', 'FIRE'
    duration_seconds INTEGER NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for meditation_sessions
ALTER TABLE meditation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own sessions"
    ON meditation_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own sessions"
    ON meditation_sessions FOR SELECT
    USING (auth.uid() = user_id);

-- 2. TABLE: Daily Anchor (Decreto Activo - Persistencia 24h)
CREATE TABLE IF NOT EXISTS daily_anchor (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    anchor_text TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'MEDITATION_COMPLETED',
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for daily_anchor
ALTER TABLE daily_anchor ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their anchor"
    ON daily_anchor FOR ALL
    USING (auth.uid() = user_id);

-- Realtime enablement for daily_anchor (for the 'Glow' effect)
ALTER PUBLICATION supabase_realtime ADD TABLE daily_anchor;
