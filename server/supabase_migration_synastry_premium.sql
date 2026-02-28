-- Tabla para guardar el historial Premium de Sinastrías
CREATE TABLE IF NOT EXISTS synastry_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    partner_name TEXT NOT NULL,
    partner_birth_date DATE NOT NULL,
    relationship_type TEXT NOT NULL, -- 'ROMANTIC', 'BUSINESS', etc.
    combination_hash TEXT NOT NULL, -- Para caching (ej. sha256 de ambas fechas)
    calculated_results JSONB NOT NULL, -- El output estructurado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsquedas rápidas por usuario y caché
CREATE INDEX IF NOT EXISTS idx_synastry_history_user ON synastry_history(user_id);
CREATE INDEX IF NOT EXISTS idx_synastry_hash ON synastry_history(combination_hash);
