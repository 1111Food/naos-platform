/**
 * Parses a date string from multiple common formats.
 * Returns a Date object or null if invalid.
 */
export const parseFlexibleDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;

    // 1. Try ISO YYYY-MM-DD
    let date = new Date(dateStr);
    if (!isNaN(date.getTime()) && dateStr.includes('-') && dateStr.split('-')[0].length === 4) {
        return date;
    }

    // 2. Try DD/MM/YYYY
    const slashParts = dateStr.split('/');
    if (slashParts.length === 3) {
        const [day, month, year] = slashParts.map(Number);
        const d = new Date(year, month - 1, day);
        if (!isNaN(d.getTime())) return d;
    }

    // 3. Try DD-MM-YYYY
    const dashParts = dateStr.split('-');
    if (dashParts.length === 3) {
        // Check if it's DD-MM-YYYY vs YYYY-MM-DD
        if (dashParts[0].length === 2) {
            const [day, month, year] = dashParts.map(Number);
            const d = new Date(year, month - 1, day);
            if (!isNaN(d.getTime())) return d;
        }
    }

    // Fallback attempt for any other format
    const fallback = new Date(dateStr);
    return isNaN(fallback.getTime()) ? null : fallback;
};
