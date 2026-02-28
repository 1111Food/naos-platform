-- Migration: Add dominant_intent to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS dominant_intent TEXT DEFAULT 'NONE' 
CHECK (dominant_intent IN ('FITNESS', 'CONSCIOUSNESS', 'PRODUCTIVITY', 'CREATIVITY', 'NONE'));
