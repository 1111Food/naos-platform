export class SynastryService {
    static calculateCompatibility(userA: any, userB: any) {
        // Simple logic based on celestial elements
        const elementsA = userA.astrology?.elements || { fire: 25, earth: 25, air: 25, water: 25 };
        const elementsB = userB.astrology?.elements || { fire: 25, earth: 25, air: 25, water: 25 };

        let score = 50; // Base score

        // Element matching (simplified)
        const match = (e: string) => Math.min(elementsA[e], elementsB[e]);
        const fireMatch = match('fire');
        const airMatch = match('air');
        const earthMatch = match('earth');
        const waterMatch = match('water');

        score += (fireMatch + airMatch + earthMatch + waterMatch) / 2;

        // Cap at 100
        score = Math.min(score, 99);

        let guidance = "";
        if (score > 80) guidance = "Vuestras almas vibran en una frecuencia armónica casi perfecta. Una unión de luz.";
        else if (score > 60) guidance = "Hay una danza natural entre vuestras energías. Se complementan con sabiduría.";
        else guidance = "Esta unión requiere alquimia consciente. El desafío traerá crecimiento mutuo.";

        return {
            score: Math.floor(score),
            guidance,
            aspects: [
                { type: "Conexión Elemental", value: score > 70 ? "Fluida" : "Intensa" },
                { type: "Vibración Numérica", value: "Compensada" }
            ]
        };
    }
}
