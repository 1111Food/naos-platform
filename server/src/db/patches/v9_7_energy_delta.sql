-- v9.7 Regulation Delta Patch

-- Add regulation_delta column to meditation_sessions
ALTER TABLE meditation_sessions 
ADD COLUMN IF NOT EXISTS regulation_delta int DEFAULT 0;

-- Comment: Stores the energy modification points calculated from duration and bio-feedback.
