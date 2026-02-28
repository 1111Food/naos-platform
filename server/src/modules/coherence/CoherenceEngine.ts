import { AstrologyService } from '../astrology/astroService';

export type CoherenceAction =
    | 'PROTOCOL_ITEM'
    | 'PROTOCOL_DAY_COMPLETE'
    | 'PROTOCOL_MISSED'
    | 'SANCTUARY_RITUAL'
    | 'SANCTUARY_RITUAL_SHORT'
    | 'INACTIVITY_48H';

export class CoherenceEngine {

    // THE LAW (Constants)
    private static readonly MIN_SCORE = 30;
    private static readonly MAX_SCORE = 100;
    private static readonly BASE_START = 50;

    private static readonly BASE_VALUES: Record<CoherenceAction, number> = {
        'PROTOCOL_ITEM': 1,
        'PROTOCOL_DAY_COMPLETE': 3,
        'PROTOCOL_MISSED': -2,
        'SANCTUARY_RITUAL': 2,
        'SANCTUARY_RITUAL_SHORT': 1,
        'INACTIVITY_48H': -3
    };

    /**
     * Calculates the new score and delta based on the current state and action.
     * Deterministic Law V4.0
     */
    static calculate(currentScore: number, action: CoherenceAction, astralMood: 'HARMONIOUS' | 'CHALLENGING' | 'NEUTRAL'): { newScore: number, delta: number, adjustedDelta: number } {
        let baseDelta = this.BASE_VALUES[action];
        let adjustedDelta = baseDelta;

        // 1. RECOVERY MODE (Compasión del Sistema)
        // Si estamos en crisis (< 45%), los premios valen DOBLE para motivar.
        if (currentScore < 45 && baseDelta > 0) {
            adjustedDelta = baseDelta * 2;
        }

        // 2. MODIFICADOR ASTRAL (El Clima)
        if (astralMood === 'CHALLENGING' && baseDelta < 0) {
            // Si el clima es duro, el sistema es piadoso con los fallos.
            // Penalizaciones se reducen al 80%
            adjustedDelta = Math.round(baseDelta * 0.8);
        } else if (astralMood === 'HARMONIOUS' && baseDelta > 0) {
            // Si el clima es fácil, el sistema exige más.
            // Premios se reducen al 90% (evita inflación)
            adjustedDelta = Math.round(baseDelta * 0.9);
            // Asegurar que al menos sume 1 si era positivo
            if (adjustedDelta === 0) adjustedDelta = 1;
        }

        // 3. CLAMPING (Límites Físicos)
        let newScore = currentScore + adjustedDelta;
        if (newScore < this.MIN_SCORE) newScore = this.MIN_SCORE;
        if (newScore > this.MAX_SCORE) newScore = this.MAX_SCORE;

        return {
            newScore,
            delta: baseDelta, // Raw intended logic
            adjustedDelta // Actual applied logic
        };
    }
}
