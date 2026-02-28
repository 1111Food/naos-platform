-- 01_coherence_history.sql

CREATE TABLE IF NOT EXISTS coherence_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  score INT NOT NULL CHECK (score >= 0 AND score <= 100),
  delta INT NOT NULL, -- El cambio (+1, -2, etc.)
  source VARCHAR(50) NOT NULL, -- 'PROTOCOL_ITEM', 'PROTOCOL_DAY', 'SANCTUARY', 'INACTIVITY'
  astral_mood VARCHAR(20) DEFAULT 'NEUTRAL', -- 'HARMONIOUS', 'CHALLENGING'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas rápidas por fecha
CREATE INDEX idx_coherence_user_date ON coherence_history(user_id, created_at);
