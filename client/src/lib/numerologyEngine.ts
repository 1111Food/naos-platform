export interface PinaculoData {
    a: number; // Karma (Mes)
    b: number; // Personalidad (Día)
    c: number; // Vidas Pasadas (Año)
    d: number; // Esencia (Suma total)
    e: number; // Regalo Divino (A + C?) or (A+B)? View says "Regalo Divino". Usually Pinnacle 1.
    f: number; // Destino. Usually Pinnacle 2.
    g: number; // Mision. Usually Pinnacle 3.
    h: number; // Realizacion. Usually Pinnacle 4.
    i: number; // Subconsciente
    j: number; // Inconsciente
    p: number; // Sombra 1
    o: number; // Sombra 2
    q: number; // Sombra 3
    r: number; // Sombra 4??
    s: number; // Sombra 5??
    lifePathNumber: number;
}

// Master Triangulation Logic
export class NumerologyEngine {
    static calculateLifePath(birthDate: string): number {
        const { lifePathNumber } = this.calculateFullChart(birthDate);
        return lifePathNumber;
    }

    static calculatePinacle(birthDate: string): number {
        const { pinaculo } = this.calculateFullChart(birthDate);
        return pinaculo.h; // H is the Cima/Pinnacle 4 in this system
    }

    static calculateFullChart(birthDate: string): { lifePathNumber: number, pinaculo: any } {
        const [yearStr, monthStr, dayStr] = birthDate.split('-');
        if (!yearStr || !monthStr || !dayStr) {
            return { lifePathNumber: 0, pinaculo: {} };
        }

        const yearVal = parseInt(yearStr);
        const monthVal = parseInt(monthStr);
        const dayVal = parseInt(dayStr);

        // --- MASTER TRIANGULATION ALGORITHM ---

        // Helper: Sum digits of a number string
        const sumDigits = (n: number | string): number => {
            return n.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
        };

        // 1. BASE NODES
        // A (Karma): masterReduce(Month)
        const A = this.masterReduce(monthVal);

        // B (Personalidad): masterReduce(Day)
        const B = this.masterReduce(dayVal);

        // C (Legado): masterReduce(sumDigits(Year))
        // Example 1986 -> 1+9+8+6 = 24 -> 6
        const C = this.masterReduce(sumDigits(yearVal));

        // D (Destino/LifePath): masterReduce(Day + Month + Year)
        // Standard Life Path is usually Sum(Reduce(D), Reduce(M), Reduce(Y)) or Sum(D+M+Y).
        // User Logic: "Día + Mes + Año (Suma completa... luego reduce)"
        // Let's stick to a reliable Life Path method but verify user intent.
        // User prompt says: D (Destino): masterReduce(Día + Mes + Año)
        const D = this.masterReduce(dayVal + monthVal + yearVal);


        // 2. CENTRAL TRIANGLE (Pinnacles)
        // E (P1): masterReduce(A + B)
        const E = this.masterReduce(A + B);

        // F (P2): masterReduce(B + C)
        const F = this.masterReduce(B + C);

        // G (P3): masterReduce(E + F)
        const G = this.masterReduce(E + F);


        // 3. MASTER NODES (The Esoteric Fix)
        // I (Subconsciente): masterReduce(A + B + E)
        const I = this.masterReduce(A + B + E);

        // J (Inconsciente): masterReduce(E + F + G)
        const J = this.masterReduce(E + F + G);

        // H (Cima / Pináculo Final): masterReduce(I + J)
        const H = this.masterReduce(I + J);

        // Shadows (Calculated traditionally as differences, usually non-master reduced?)
        // Let's keep them simply reduced for now as user didn't specify Master Shadows, 
        // but typically shadows are single digits 1-9.
        const P = this.simpleReduce(Math.abs(A - B));
        const O = this.simpleReduce(Math.abs(B - C));
        const Q = this.simpleReduce(Math.abs(P - O));

        // R, S placeholders
        const R = this.simpleReduce(P + O);
        const S = this.simpleReduce(Q + R);

        const pinaculo = {
            a: A, b: B, c: C, d: D,
            e: E, f: F, g: G, h: H,
            i: I, j: J,
            p: P, o: O, q: Q, r: R, s: S
        };

        return {
            lifePathNumber: D,
            pinaculo
        };
    }

    // --- RECURSIVE MASTER REDUCER ---
    // Logica:
    // 1. Si input es 11, 22, 33 -> Retornar
    // 2. Si input < 10 -> Retornar
    // 3. Sumar digitos
    // 4. Chequear si la suma es 11, 22, 33 -> Retornar
    // 5. Si no, Recurse.
    private static masterReduce(n: number): number {
        // 1. Check Master (Pre-reduction check)
        if (n === 11 || n === 22 || n === 33) return n;

        // 2. Single Digit
        if (n < 10) return n;

        // 3. Sum Digits
        const sum = n.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);

        // 4. Check Master (Post-reduction check)
        if (sum === 11 || sum === 22 || sum === 33) return sum;

        // 5. Recurse
        return this.masterReduce(sum);
    }

    // Standard reducer for Shadows (0-9 only)
    private static simpleReduce(n: number): number {
        if (n === 0) return 0;
        // Logic: if n % 9 == 0 return 9 else return n % 9
        // But let's stick to iterative to be safe
        if (n < 10) return n;
        const sum = n.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
        return this.simpleReduce(sum);
    }
}
