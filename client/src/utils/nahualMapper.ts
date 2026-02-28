export const getNahualImage = (id: string): string => {
    // Los archivos fueron subidos en MAYÚSCULAS (ej. BATZ.webp)
    const normalizedId = id.toUpperCase().trim();
    // Vite constructor for static assets
    return new URL(`../assets/nahuales/${normalizedId}.webp`, import.meta.url).href;
};
