-- v9.6 Bio-Emotional Regulation Patch

-- 1. Add new columns to meditation_sessions for state tracking
ALTER TABLE meditation_sessions 
ADD COLUMN IF NOT EXISTS element text CHECK (element IN ('WATER', 'FIRE', 'EARTH', 'AIR')),
ADD COLUMN IF NOT EXISTS initial_state text, -- e.g., 'ANXIOUS', 'LETHARGIC', 'SCATTERED', 'RIGID'
ADD COLUMN IF NOT EXISTS target_state text, -- e.g., 'CALM', 'ENERGIZED', 'GROUNDED', 'FLOWING'
ADD COLUMN IF NOT EXISTS effectiveness_rating int DEFAULT 0; -- 1-5 rating

-- 2. Update RLS policies if necessary (usually not needed for adding columns, but good practice to verify)
-- Assuming existing policies cover INSERT/SELECT for authenticated users based on user_id.

-- 3. Create index for performance on querying latest session for Sigil context
CREATE INDEX IF NOT EXISTS idx_meditation_sessions_user_created 
ON meditation_sessions(user_id, completed_at DESC);
