CREATE TABLE IF NOT EXISTS public.user_protocols (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    current_day INTEGER DEFAULT 1,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.protocol_daily_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    protocol_id UUID REFERENCES public.user_protocols(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    is_completed BOOLEAN DEFAULT TRUE,
    notes TEXT,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(protocol_id, day_number)
);

CREATE TABLE IF NOT EXISTS public.protocols (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    purpose TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
