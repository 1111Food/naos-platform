
export interface DailyActivity {
    protocol_21: boolean; // Fuego: Acción
    sanctuary: boolean;   // Agua: Intuición
    journal: boolean;     // Aire: Claridad
    body: boolean;        // Tierra: Cuerpo
    ether: boolean;       // Éter: Conexión
}

export class CoherenceService {
    private static readonly HARD_FLOOR = 30;
    private static readonly MAX_SCORE = 100;
    private static readonly GAIN_PER_PILLAR = 4;
    private static readonly COMBO_BONUS = 5;

    /**
     * Calcula el nuevo puntaje basado en la actividad del día.
     * @param currentScore Puntaje actual (0-100)
     * @param activityLog Registro de actividades completadas
     */
    static calculateDailyCoherence(currentScore: number, activityLog: DailyActivity): number {
        let dailyGain = 0;
        let pillarsCompleted = 0;

        // 1. Sumar Pilares (+4% c/u)
        if (activityLog.protocol_21) { dailyGain += this.GAIN_PER_PILLAR; pillarsCompleted++; }
        if (activityLog.sanctuary) { dailyGain += this.GAIN_PER_PILLAR; pillarsCompleted++; }
        if (activityLog.journal) { dailyGain += this.GAIN_PER_PILLAR; pillarsCompleted++; }
        if (activityLog.body) { dailyGain += this.GAIN_PER_PILLAR; pillarsCompleted++; }
        if (activityLog.ether) { dailyGain += this.GAIN_PER_PILLAR; pillarsCompleted++; }

        // 2. Aplicar Combo Breaker (Fuego + Agua)
        if (activityLog.protocol_21 && activityLog.sanctuary) {
            dailyGain += this.COMBO_BONUS;
            console.log("⚡ COMBO BREAKER: Fuego + Agua (+5%)");
        }

        const newScore = this.clamp(currentScore + dailyGain);

        console.log(`📈 Daily Gain: +${dailyGain}% | Pillars: ${pillarsCompleted}/5 | New Score: ${newScore}`);
        return newScore;
    }

    /**
     * Calcula la caída de puntaje por inactividad.
     * @param currentScore Puntaje actual
     * @param daysInactive Días consecutivos sin actividad
     */
    static calculateDecay(currentScore: number, daysInactive: number): number {
        let decay = 0;

        if (daysInactive <= 2) {
            decay = 0; // Gracia
        } else if (daysInactive <= 6) {
            decay = 5; // Drift (-5% por día activo de penalización, simplificado aquí como flat per call, usually caller handles accumulation)
            // Correction: This function calculates the *new* score or the *amount* to subtract?
            // Let's make it calculate the NEW score after applying the decay for THIS day.
            // Assumption: This is called once per inactive day processed.
        } else {
            decay = 10; // Crash
        }

        if (decay > 0) {
            console.log(`📉 Decay Applied: -${decay}% (Days Inactive: ${daysInactive})`);
        }

        return this.clamp(currentScore - decay);
    }

    private static clamp(value: number): number {
        return Math.max(this.HARD_FLOOR, Math.min(this.MAX_SCORE, value));
    }
}
