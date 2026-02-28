export const getChineseZodiacImage = (animal: string): string => {
    // Normalizamos a minúsculas y eliminamos tildes para coincidir con los archivos subidos
    const normalizedAnimal = animal.toLowerCase().trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); // Elimina tildes (ej: Dragón -> dragon)

    return new URL(`../assets/chinese/${normalizedAnimal}.webp`, import.meta.url).href;
};
