export const getLocalStartOfDayInUTC = (date: Date = new Date()): string => {
    // 1. Get user's timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // 2. Create a date object representing "start of day" in the user's timezone
    // We achieve this by formating parts in the user's timezone, then reconstructing.
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

    // parts format: MM/DD/YYYY
    const parts = formatter.formatToParts(date);
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;

    if (!year || !month || !day) return new Date().toISOString(); // Fallback

    // 3. Construct a specific "Local Start of Day" date string
    // e.g., "2023-10-27 00:00:00" (implicitly local concept)
    // To get the UTC timestamp of THIS specific moment in the user's timezone:
    // We can parse a string like "YYYY-MM-DD" and force it to be interpreted as local, 
    // OR we can use libraries like date-fns-tz. 
    // Since we want dependency-free minimal implementation:

    // Create a date object that *thinks* it's midnight in browser local time, 
    // but check against the specific timezone offset if possible.
    // Actually, simpler approach for Supabase: 
    // We just need an ISO string that corresponds to "Local Midnight" transformed to UTC.

    // Let's rely on standard Date behavior with explicit setHours, but be careful.
    // Creating "Midnight today" in User's Timezone:
    // Use Intl to get values for user's timezone
    const nowInUserTZ = new Date(new Date().toLocaleString('en-US', { timeZone }));
    nowInUserTZ.setHours(0, 0, 0, 0);

    // Now we need the UTC value of "Midnight in User TZ".
    // The `nowInUserTZ` object holds the local time equivalent. 
    // BUT checking `getTime()` on it would be wrong if the system timezone != user preference timezone (rare but possible).
    // Assuming browser system timezone == Intl resolved timezone for 99% of cases.

    // Safest Native Way:
    // Get offset for the timezone
    // Ideally, for `created_at` matching, Supabase stores in UTC.
    // So "Intention created today" means "Created after Midnight user-time, converted to UTC".

    // Let's use a simpler heuristic for MVP:
    // 1. Get current time
    // 2. Set to 00:00:00 local
    // 3. Convert to ISO

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay.toISOString();
};

export const formatToLocalTime = (isoString: string): string => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
