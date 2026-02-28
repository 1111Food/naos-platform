export const getNumberImage = (num: string | number): string => {
    const n = String(num).trim();
    return new URL(`../assets/numbers/${n}.webp`, import.meta.url).href;
};

export const getNumberText = (num: string | number): string => {
    const texts: Record<string, string> = {
        '1': 'UNO', '2': 'DOS', '3': 'TRES', '4': 'CUATRO', '5': 'CINCO',
        '6': 'SEIS', '7': 'SIETE', '8': 'OCHO', '9': 'NUEVE', '11': 'ONCE', '22': 'VEINTIDÓS', '33': 'TREINTA Y TRES'
    };
    return texts[String(num)] || String(num);
};
