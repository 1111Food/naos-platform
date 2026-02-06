import {
    Body,
    Observer,
    Equator,
    Ecliptic,
    GeoVector,
    SearchRiseSet,
    MakeTime,
    DefineStar,
    Rotation_EQJ_ECL,
    GeoMoon,
    HelioVector,
    AstroTime,
    SiderealTime,
    SunPosition
} from 'astronomy-engine';
// Note: astronomy-engine exports might differ, I will use the namespace style if imports fail, 
// but based on typical usage 'Astronomy' is the main export. 
// However, the module system might require: import * as Astronomy from 'astronomy-engine';

import * as Astronomy from 'astronomy-engine';

export interface PlanetPosition {
    name: string;
    sign: string;
    degree: number; // 0-29.99 within sign
    absDegree: number; // 0-360
    house: number;
    retrograde: boolean;
}

export interface HouseCusp {
    house: number;
    sign: string;
    degree: number;
    absDegree: number;
}

export interface NatalChart {
    ascendant: number; // absDegree
    midheaven: number; // absDegree
    planets: PlanetPosition[];
    houses: HouseCusp[];
    elements: { fire: number; earth: number; air: number; water: number };
    modalities: { cardinal: number; fixed: number; mutable: number };
}

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export class AstrologyEngine {

    static calculateNatalChart(date: Date, lat: number, lng: number): NatalChart {
        const observer = new Astronomy.Observer(lat, lng, 0);
        const time = Astronomy.MakeTime(date);

        // Calculate Ascendant & MC
        // MC (Medium Coeli) is the intersection of the meridian and the ecliptic.
        // Ascendant is the intersection of the eastern horizon and the ecliptic.

        // Sidereal Time (Greenwich)
        const gst = Astronomy.SiderealTime(time);
        // Local Sidereal Time
        const lst = (gst + lng / 15.0) % 24;

        // Obliquity of the Ecliptic (approx 23.43...)
        // Better to get it from library if possible, but constant is fine for astrology
        const eps = 23.4392911;
        const epsRad = eps * Math.PI / 180.0;

        // RAMC in degrees = LST * 15
        const ramc = lst * 15.0;
        const ramcRad = ramc * Math.PI / 180.0;
        const latRad = lat * Math.PI / 180.0;

        // Calculate MC (Medium Coeli)
        // tan(MC) = tan(RAMC) / cos(eps)  ... roughly, but needs quadrant handling
        // Using atan2 for correct quadrant:
        // x = cos(RAMC) * cos(eps) should be denominator?
        // Formula: tan(MC) = tan(RAMC)/cos(obl) -> atan2(y, x)
        // y = sin(RAMC)
        // x = cos(RAMC) * cos(eps) since tan=sin/cos
        // BUT MC is usually 90deg from Ascendant's underlying framework?
        // Let's use standard formula:
        // tan(MC) = sin(RAMC) / (cos(RAMC) * cos(eps)) ? No
        // MC = atan2(sin(RAMC), cos(RAMC)*cos(eps)) 

        let mcRad = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad));
        let mc = (mcRad * 180.0 / Math.PI + 360) % 360; // Normalize 0-360

        // Ascendant
        // tan(Asc) = cos(RAMC) / - (sin(RAMC)*cos(eps) + tan(lat)*sin(eps))
        // Asc = atan2(y, x)
        // y = cos(RAMC)
        // x = - (sin(RAMC) * cos(eps) + Math.tan(latRad) * Math.sin(epsRad))

        const ascY = Math.cos(ramcRad);
        const ascX = - (Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
        let ascRad = Math.atan2(ascY, ascX);
        let asc = (ascRad * 180.0 / Math.PI + 360) % 360;

        // Verify signs
        // Ascendant is tricky, but this standard formula works for non-polar.

        // PLANETS
        const bodies = [
            { name: 'Sun', body: Astronomy.Body.Sun },
            { name: 'Moon', body: Astronomy.Body.Moon },
            { name: 'Mercury', body: Astronomy.Body.Mercury },
            { name: 'Venus', body: Astronomy.Body.Venus },
            { name: 'Mars', body: Astronomy.Body.Mars },
            { name: 'Jupiter', body: Astronomy.Body.Jupiter },
            { name: 'Saturn', body: Astronomy.Body.Saturn },
            { name: 'Uranus', body: Astronomy.Body.Uranus },
            { name: 'Neptune', body: Astronomy.Body.Neptune },
            { name: 'Pluto', body: Astronomy.Body.Pluto }
        ];

        const planets: PlanetPosition[] = [];

        // Calc House System (Whole Sign for simplicity & robust "Real" astrology)
        // House 1 starts at 0 degrees of the Rising Sign.
        // House 2 starts at 0 degrees of the next sign...
        // This is easiest to implement accurately without complex Placidus tables.

        const risingSignIndex = Math.floor(asc / 30);

        bodies.forEach(b => {
            // Geocentric Ecliptic coordinates
            const eq = Astronomy.Equator(b.body, time, observer, true, true);
            // Astronomy.Ecliptic takes a Vector. eq is EquatorialCoordinates.
            // We need to convert eq to vector relative to J2000 or use specific conversion?
            // Actually, Astronomy.Ecliptic(vector) returns EclipticCoordinates.
            // Using Astronomy.Horizon? No. 
            // Astronomy.EclipticGeo(eq)? No.
            // Let's use HelioVector -> GeoVector -> Ecliptic.
            // Or use Astronomy.SunPosition logic? 
            // Actually, `Astronomy.Ecliptic` documentation says it converts J2000 equatorial vector to ecliptic.
            // `Astronomy.Equator` returns {ra, dec, dist, vec}. The 'vec' property is the vector.
            const ecl = Astronomy.Ecliptic(eq.vec);

            // Longitude is what we want (0-360 along zodiac)
            const absDeg = ecl.elon;

            // Determine Sign
            const signIdx = Math.floor(absDeg / 30);
            const sign = ZODIAC_SIGNS[signIdx];
            const deg = absDeg % 30;

            // Determine House (Whole Sign)
            // Offset from Rising Sign
            // If Rising is Aries (0), and Planet is Taurus (1). House = (1 - 0) + 1 = 2.
            // If Rising is Pisces (11), Planet is Aries (0). House = (0 - 11) -> -11 + 12 = 1. + 1 = 2nd House relative? No.
            // House = (PlanetSignIdx - RisingSignIdx + 12) % 12 + 1
            const house = (signIdx - risingSignIndex + 12) % 12 + 1;

            planets.push({
                name: b.name,
                sign,
                degree: Math.round(deg * 100) / 100, // 2 decimals
                absDegree: absDeg,
                house,
                retrograde: false // TODO: Calculate speed to determine retrograde
            });
        });

        // Houses (Whole Sign Cusp is 0 deg of each sign)
        const houses: HouseCusp[] = [];
        for (let i = 1; i <= 12; i++) {
            const signIdx = (risingSignIndex + i - 1) % 12;
            houses.push({
                house: i,
                sign: ZODIAC_SIGNS[signIdx],
                degree: 0,
                absDegree: signIdx * 30
            });
        }

        // Element/Modality calc
        const elementsCount = { fire: 0, earth: 0, air: 0, water: 0 };
        const modalitiesCount = { cardinal: 0, fixed: 0, mutable: 0 };

        // Mappings (Standard)
        const elemMap = ['fire', 'earth', 'air', 'water']; // Aries=Fire, Taurus=Earth...
        const modMap = ['cardinal', 'fixed', 'mutable']; // Aries=Cardinal, Taurus=Fixed...

        planets.forEach(p => {
            const sIdx = ZODIAC_SIGNS.indexOf(p.sign);
            const elem = elemMap[sIdx % 4];
            const mod = modMap[sIdx % 3];
            // @ts-ignore
            elementsCount[elem]++;
            // @ts-ignore
            modalitiesCount[mod]++;
        });

        return {
            ascendant: asc,
            midheaven: mc,
            planets,
            houses,
            elements: elementsCount,
            modalities: modalitiesCount
        };
    }
}
