
// Mayan Calibration Script
// Goal: Find day shift to make 1986-07-12 = Imox (Sign 10) Tone 4
// 
// Reference used in Calculator: 2000-01-01 was 8 B'atz'

const TARGET_DATE = '1986-07-12';
// We want Imox (10) Tone 4.

function testCalibration() {
    console.log("Searching for calibration offset...");

    // Reference: Jan 1 2000 was 8 B'atz
    const REF_DATE = new Date('2000-01-01T12:00:00Z');
    const TARGET = new Date(TARGET_DATE + 'T12:00:00Z');

    const diffTime = TARGET.getTime() - REF_DATE.getTime();
    const originalDiffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // We want to find a 'shift' such that:
    // Tone = ((8 + diff + shift) % 13 ... ) == 4
    // Nawal = ((0 + diff + shift) % 20 ... ) == 10 (Imox)

    for (let shift = -50; shift <= 50; shift++) {
        const d = originalDiffDays + shift;

        // Math logic from Calculator (Corrected Modulo)
        let t = ((8 + d) % 13 + 13) % 13;
        if (t === 0) t = 13;

        let n = ((0 + d) % 20 + 20) % 20;

        // Imox is index 10 in standard list 
        // [Batz, E, Aj, Ix, Tzikin, Ajmaq, Noj, Tijax, Kawoq, Ajpu, Imox...]

        if (n === 10 && t === 4) {
            console.log(`\n✅ MATCH FOUND!`);
            console.log(`Shift required: ${shift} days`);
            console.log(`Original DiffDays: ${originalDiffDays}`);
            console.log(`New DiffDays: ${d}`);
            console.log(`Result: Nawal Index ${n} (Imox), Tone ${t}`);
            return;
        }
    }
    console.log("❌ No match found in +/- 50 range.");
}

testCalibration();
