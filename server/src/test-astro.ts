import { AstrologyEngine } from './modules/astrology/engine';

async function test() {
    console.log("Testing AstrologyEngine...");
    try {
        const date = new Date('1990-05-15T14:00:00Z');
        const lat = 14.6349;
        const lng = -90.5069; // Guatemala City

        console.log(`Calculating for ${date.toISOString()} at ${lat}, ${lng}`);

        const chart = AstrologyEngine.calculateNatalChart(date, lat, lng);

        console.log("--- Chart Calculated ---");
        console.log("Ascendant:", chart.ascendant);
        console.log("Midheaven:", chart.midheaven);
        console.log("Planets:", chart.planets.map(p => `${p.name}: ${p.sign} ${p.degree.toFixed(2)}`));
        console.log("Houses:", chart.houses.map(h => `H${h.house}: ${h.sign}`));

        if (chart.planets.length > 0 && chart.houses.length === 12) {
            console.log("SUCCESS: Engine returning valid data.");
        } else {
            console.log("FAILURE: Missing data.");
        }

    } catch (error) {
        console.error("FAILURE: Engine crashed.", error);
    }
}

test();
