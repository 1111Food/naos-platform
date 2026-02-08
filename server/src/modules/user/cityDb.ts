export interface CityCoordinates {
    lat: number;
    lng: number;
}

export const NORMALIZED_CITIES: Record<string, CityCoordinates> = {
    // Guatemala
    "guatemala city, guatemala": { lat: 14.634900, lng: -90.506900 },
    "antigua guatemala, guatemala": { lat: 14.557300, lng: -90.733200 },
    "quetzaltenango, guatemala": { lat: 14.834700, lng: -91.518100 },
    "escuintla, guatemala": { lat: 14.295800, lng: -90.784400 },
    "mazatenango, guatemala": { lat: 14.534200, lng: -91.503300 },
    "coban, guatemala": { lat: 15.470800, lng: -90.370800 },
    // Mexico
    "mexico city, mexico": { lat: 19.432608, lng: -99.133209 },
    "guadalajara, mexico": { lat: 20.659698, lng: -103.349609 },
    "monterrey, mexico": { lat: 25.686613, lng: -100.316112 },
    "cancun, mexico": { lat: 21.161908, lng: -86.851528 },
    // Spain
    "madrid, spain": { lat: 40.416775, lng: -3.703790 },
    "barcelona, spain": { lat: 41.385064, lng: 2.173404 },
    "valencia, spain": { lat: 39.469907, lng: -0.376288 },
    // USA
    "new york city, usa": { lat: 40.712776, lng: -74.005974 },
    "los angeles, usa": { lat: 34.052235, lng: -118.243683 },
    "miami, usa": { lat: 25.761681, lng: -80.191788 },
    "chicago, usa": { lat: 41.878113, lng: -87.629799 },
    // Others
    "london, united kingdom": { lat: 51.507351, lng: -0.127758 },
    "paris, france": { lat: 48.856613, lng: 2.352222 },
    "tokyo, japan": { lat: 35.676192, lng: 139.650311 },
    "berlin, germany": { lat: 52.520008, lng: 13.404954 },
    "rome, italy": { lat: 41.902782, lng: 12.496366 }
};
