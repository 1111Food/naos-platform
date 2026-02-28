import { NAWALES, TONES } from './constants';

export class MayanCalculator {
    // Reference Date: July 12, 1986 was 1 Imox
    // 1 Imox corresponds to:
    // Tone: 1
    // Nawal Index for Imox: 10 (from constants.ts)
    private static readonly CORRELATION_DATE = new Date('1986-07-12T12:00:00Z');

    private static readonly REF_TONE = 1;
    private static readonly REF_NAWAL_IDX = 10; // Imox

    static calculate(dateString: string) {
        // Ensure input date is treated as UTC noon to match correlation
        const inputDate = new Date(dateString.split('T')[0] + 'T12:00:00Z');

        // Calculate difference in days
        const diffTime = inputDate.getTime() - this.CORRELATION_DATE.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // Round to avoid DST/leap second drifts

        // Calculate Tone (1-13)
        // Formula: ((Ref - 1 + Diff) % 13) + 1
        // Using strict modulo for negative numbers: ((n % m) + m) % m
        let toneIndex = (this.REF_TONE - 1 + diffDays) % 13;
        toneIndex = (toneIndex + 13) % 13; // Normalize negative
        const tone = toneIndex + 1;

        // Calculate Nawal (0-19)
        let nawalIdx = (this.REF_NAWAL_IDX + diffDays) % 20;
        nawalIdx = (nawalIdx + 20) % 20; // Normalize negative

        const nawalData = NAWALES[nawalIdx];
        const toneData = TONES[tone - 1];

        return {
            kicheName: nawalData.name,
            meaning: nawalData.meaning,
            tone: tone,
            toneName: toneData,
            description: nawalData.description,
            // SVG path construction
            glyphUrl: `/nawales/${nawalData.name.toLowerCase().replace(/'/g, "")}.svg`
        };
    }
}
