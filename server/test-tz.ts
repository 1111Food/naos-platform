function getHistoricalOffset(ianaZone, dateStr) {
    try {
        const date = new Date(dateStr);
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: ianaZone,
            timeZoneName: 'longOffset'
        }).formatToParts(date);

        const offsetPart = parts.find(p => p.type === 'timeZoneName');
        if (offsetPart) {
            // Format is GMT-05:00 or GMT+01:00 or GMT
            const val = offsetPart.value;
            if (val === 'GMT') return 0;
            const match = val.match(/GMT([-+])(\d{1,2}):(\d{2})/);
            if (match) {
                const sign = match[1] === '+' ? 1 : -1;
                const hours = parseInt(match[2]);
                const mins = parseInt(match[3]);
                return sign * (hours + mins / 60);
            }
        }
    } catch (e) {
        console.error(e);
    }
    return null;
}

const zone = 'America/Guatemala';
const date = '1990-07-29T10:00:00';
console.log(`Offset para ${zone} en ${date}:`, getHistoricalOffset(zone, date));
