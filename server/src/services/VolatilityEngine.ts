// server/src/services/VolatilityEngine.ts

/**
 * Calculates user volatility based on archetypal transits.
 * @param userData User profile and weights
 * @param transitsData Current energy transits for active systems
 */
export const calculateUserVolatility = (userData: any, transitsData: any) => {
    const pillars = [
        { keyHardware: 'western_astrology', keySoftware: 'astro_transits' },
        { keyHardware: 'numerology', keySoftware: 'num_transits' },
        { keyHardware: 'mayan_tzolkin', keySoftware: 'maya_transits' },
        { keyHardware: 'chinese_zodiac', keySoftware: 'chinese_transits' }
    ];

    let E_user_total = 0;

    pillars.forEach(pillar => {
        // Fallback to 0.25 if weights are not defined (Balanced system)
        const W_i = userData?.archetype_hardware?.[pillar.keyHardware]?.weight_Wi || 0.25;
        const tau_i = transitsData?.[pillar.keySoftware]?.tension_value_tau || 0;
        E_user_total += (W_i * tau_i);
    });

    let system_mode = "";
    let ui_adaptation = "";

    if (E_user_total >= 0.75) {
        system_mode = "TRIGGER_TRIAGE_MODE";
        ui_adaptation = "HIDE_VANITY_METRICS";
    }
    else if (E_user_total >= 0.40) {
        system_mode = "TRIGGER_FOCUS_MODE";
        ui_adaptation = "STANDARD_UI";
    }
    else {
        system_mode = "TRIGGER_EXPANSION_MODE";
        ui_adaptation = "UNLOCK_ALL";
    }

    return {
        timestamp: new Date().toISOString(),
        E_usuario_current: Number(E_user_total.toFixed(4)),
        system_recommendation: system_mode,
        ui_adaptation: ui_adaptation
    };
};
