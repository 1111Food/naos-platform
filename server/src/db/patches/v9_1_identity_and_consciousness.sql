-- v9.1: Identity Correction & Consciousness Injection

-- 1. CORRECTION: Zodiac Element Logic
CREATE OR REPLACE FUNCTION get_zodiac_element(sign TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN CASE
        WHEN sign IN ('Aries', 'Leo', 'Sagitario', 'Sagittarius') THEN 'Fuego'
        WHEN sign IN ('Tauro', 'Virgo', 'Capricornio', 'Taurus', 'Capricorn') THEN 'Tierra'
        WHEN sign IN ('Géminis', 'Libra', 'Acuario', 'Gemini', 'Aquarius') THEN 'Aire'
        WHEN sign IN ('Cáncer', 'Escorpio', 'Piscis', 'Cancer', 'Scorpio', 'Pisces') THEN 'Agua'
        ELSE 'Éter'
    END;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 2. TABLE: User Evolution (Consciousness Tracking)
CREATE TABLE IF NOT EXISTS user_evolution (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    stage INTEGER DEFAULT 1 CHECK (stage BETWEEN 1 AND 7),
    xp_points INTEGER DEFAULT 0,
    current_archetype TEXT DEFAULT 'Buscador',
    preferred_tone TEXT DEFAULT 'MISTICO', -- 'DIDACTICO', 'MISTICO', 'DIRECTO'
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for user_evolution
ALTER TABLE user_evolution ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own evolution"
    ON user_evolution FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own evolution"
    ON user_evolution FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "System can insert evolution"
    ON user_evolution FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 3. FUNCTION: Calculate Evolution Stage
-- Logic: Based on interaction count and "depth" (mocked via XP for now)
CREATE OR REPLACE FUNCTION calculate_evolution_stage(target_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
    interaction_count INTEGER;
    calculated_stage INTEGER;
BEGIN
    -- Get interaction count from logs
    SELECT COUNT(*) INTO interaction_count
    FROM interaction_logs
    WHERE user_id = target_user_id;

    -- Basic Logic:
    -- 0-10 msgs = Stage 1 (Durmiente)
    -- 10-50 msgs = Stage 2 (Despierto)
    -- 50-100 msgs = Stage 3 (Iniciado)
    -- 100-300 msgs = Stage 4 (Adepto)
    -- 300+ msgs = Stage 5+ (Maestro)
    
    IF interaction_count < 10 THEN
        calculated_stage := 1;
    ELSIF interaction_count < 50 THEN
        calculated_stage := 2;
    ELSIF interaction_count < 100 THEN
        calculated_stage := 3;
    ELSIF interaction_count < 300 THEN
        calculated_stage := 4;
    ELSE
        calculated_stage := 5;
    END IF;

    -- Persist/Update table
    INSERT INTO user_evolution (user_id, stage)
    VALUES (target_user_id, calculated_stage)
    ON CONFLICT (user_id) 
    DO UPDATE SET stage = EXCLUDED.stage, last_updated = NOW();

    RETURN calculated_stage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. FUNCTION: Determine Preferred Tone
CREATE OR REPLACE FUNCTION determine_preferred_tone(target_user_id UUID)
RETURNS TEXT AS $$
DECLARE
    tone TEXT;
    user_stage INTEGER;
BEGIN
    -- Check manual preference first
    SELECT preferred_tone INTO tone
    FROM user_evolution
    WHERE user_id = target_user_id;

    IF tone IS NOT NULL THEN
        RETURN tone;
    END IF;

    -- Fallback based on stage
    SELECT calculate_evolution_stage(target_user_id) INTO user_stage;

    IF user_stage <= 3 THEN
        RETURN 'DIDACTICO'; -- Needs explanation
    ELSE
        RETURN 'MISTICO'; -- Can handle symbolism
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
