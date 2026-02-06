import { NAWALES, TONES } from './constants';

export class MayanCalculator {
    // Reference Date: Jan 1, 2000 was 8 B'atz'
    // 8 B'atz' corresponds to:
    // Tone: 8 (Index 7 in 0-based calculation? No, tones are 1-13)
    // Nawal Index for B'atz': 0
    private static readonly CORRELATION_DATE = new Date('2000-01-01T12:00:00Z');

    // On Jan 1, 2000:
    // Tone was 8
    // Nawal was B'atz' (Index 0)
    private static readonly REF_TONE = 8;
    private static readonly REF_NAWAL_IDX = 0;

    static calculate(dateString: string) {
        const inputDate = new Date(dateString + 'T12:00:00Z');

        // Calculate difference in days
        const diffTime = inputDate.getTime() - this.CORRELATION_DATE.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Calculate Tone (1-13)
        // Formula: ((Ref + Diff) % 13). If result <= 0, adjust.
        // Javascript % operator can return negative.
        let tone = (this.REF_TONE + diffDays) % 13;
        if (tone <= 0) tone += 13;

        // Calculate Nawal (0-19)
        let nawalIdx = (this.REF_NAWAL_IDX + diffDays) % 20;
        if (nawalIdx < 0) nawalIdx += 20;

        const nawalData = NAWALES[nawalIdx];
        const toneData = TONES[tone - 1];

        return {
            kicheName: nawalData.name,
            meaning: nawalData.meaning,
            tone: tone,
            toneName: toneData,
            description: nawalData.description,
            // Simple placeholder for now, frontend will render SVG
            glyphUrl: `/nawales/${nawalData.name.toLowerCase().replace("'", "")}.svg`
        };
    }
}
