import { createHash } from 'crypto';

export const generateSynastryHash = (dateA: string, dateB: string): string => {
    const dates = [dateA, dateB].sort();
    const baseString = `naos_synastry_${dates[0]}_${dates[1]}`;
    return createHash('sha256').update(baseString).digest('hex');
};
