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

        // Obliquity of the Ecliptic (Dynamic for higher precision)
        // High-precision formula for Mean Obliquity:
        const t = (time.date.getTime() / 1000 - 946728000) / 3155760000; // Centuries from J2000
        const eps = 23.4392911 - (46.8150 * t) / 3600 - (0.00059 * t * t) / 3600 + (0.001813 * t * t * t) / 3600;
        const epsRad = eps * Math.PI / 180.0;

        // RAMC in degrees = LST * 15
        const ramc = lst * 15.0;
        const ramcRad = ramc * Math.PI / 180.0;
        const latRad = lat * Math.PI / 180.0;

        // Calculate MC (Medium Coeli)
        let mcRad = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad));
        let mc = (mcRad * 180.0 / Math.PI + 360) % 360;

        // Ascendant Calculation
        const ascY = Math.cos(ramcRad);
        const ascX = - (Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
        let ascRad = Math.atan2(ascY, ascX);
        let asc = (ascRad * 180.0 / Math.PI + 360) % 360;

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

        // Calc House System (Equal House System)
        // House 1 starts at the exact degree of the Ascendant.

        bodies.forEach(b => {
            // Geocentric Ecliptic coordinates
            const eq = Astronomy.Equator(b.body, time, observer, true, true);
            const ecl = Astronomy.Ecliptic(eq.vec);

            const absDeg = ecl.elon;
            const signIdx = Math.floor(absDeg / 30);
            const sign = ZODIAC_SIGNS[signIdx];
            const deg = absDeg % 30;
            const house = Math.floor(((absDeg - asc + 360) % 360) / 30) + 1;

            // Calculate speed for retrograde detection (difference over 6 hours)
            const time6h = time.AddDays(0.25);
            const eq6h = Astronomy.Equator(b.body, time6h, observer, true, true);
            const ecl6h = Astronomy.Ecliptic(eq6h.vec);
            const speed = (ecl6h.elon - ecl.elon + 360) % 360;
            const correctedSpeed = speed > 180 ? speed - 360 : speed;

            planets.push({
                name: b.name,
                sign,
                degree: Math.round(deg * 100) / 100,
                absDegree: absDeg,
                house,
                retrograde: correctedSpeed < 0
            });
        });

        // Houses (Equal House System)
        const houses: HouseCusp[] = [];
        for (let i = 1; i <= 12; i++) {
            const houseStart = (asc + (i - 1) * 30) % 360;
            const signIdx = Math.floor(houseStart / 30);
            houses.push({
                house: i,
                sign: ZODIAC_SIGNS[signIdx],
                degree: houseStart % 30,
                absDegree: houseStart
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
