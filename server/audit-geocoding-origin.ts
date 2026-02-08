async function auditGeocoding(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': 'NAOS-Audit' }
        });
        const data: any = await response.json();
        if (data && data.length > 0) {
            console.log(`📍 Query: ${query}`);
            console.log(`   Nombre: ${data[0].display_name}`);
            console.log(`   Lat/Lon: ${data[0].lat}, ${data[0].lon}`);
            console.log(`   Tipo: ${data[0].type}, Clase: ${data[0].class}`);
        }
    } catch (e) {
        console.error(e);
    }
}

async function run() {
    await auditGeocoding("Guatemala City, Guatemala");
    await auditGeocoding("Madrid, Spain");
    await auditGeocoding("Tokyo, Japan");
}

run();
