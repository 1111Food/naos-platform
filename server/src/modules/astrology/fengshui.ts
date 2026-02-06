import { FengShuiProfile } from '../../types';

export class FengShuiService {
    static calculateProfile(birthDateISO: string): FengShuiProfile {
        const date = new Date(birthDateISO);
        const year = date.getUTCFullYear();

        // Simple Kua calculation (Standard method)
        // Note: For real Feng Shui, gender matters. For now, we'll use a balanced approach or assume a default.
        // Let's assume a "Soul Harmony" approach which is gender-neutral for this mystical app.

        const sumDigits = (n: number): number => {
            return n.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
        };

        const reduceToSingleDigit = (n: number): number => {
            while (n > 9) n = sumDigits(n);
            return n;
        };

        const lastTwo = year % 100;
        const kua = reduceToSingleDigit(lastTwo);

        const favorableDirections = [
            "Noreste (Crecimiento)",
            "Suroeste (Prosperidad)",
            "Oeste (Salud)",
            "Noroeste (Relaciones)"
        ];

        return {
            kuaNumber: kua,
            element: this.getElement(kua),
            favorableDirections,
            guidance: "Organiza tu espacio para permitir que el Chi fluya sin obstáculos desde el Este."
        };
    }

    private static getElement(kua: number): string {
        const elements: Record<number, string> = {
            1: "Agua",
            2: "Tierra",
            3: "Madera",
            4: "Madera",
            5: "Tierra",
            6: "Metal",
            7: "Metal",
            8: "Tierra",
            9: "Fuego"
        };
        return elements[kua] || "Éter";
    }
}
