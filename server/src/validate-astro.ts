import { AstrologyService } from './modules/astrology/service';

// VALIDATION TEST CASE - REFERENCE DATA
// This is the GROUND TRUTH that our calculations MUST match
const referenceCase = {
    birthDate: '1986-07-12',
    birthTime: '09:15',
    city: 'Guatemala City',
    country: 'Guatemala',
    // Expected coordinates for Guatemala City
    lat: 14.6349,
    lng: -90.5069,
    utcOffset: -6,

    // EXPECTED RESULTS (from professional ephemeris)
    expected: {
        sun: { sign: 'Cancer', house: 11 },
        moon: { sign: 'Virgo', house: 1 },
        ascendant: { sign: 'Virgo', house: 1 }
    }
};

console.log('═'.repeat(80));
console.log('🔬 NAOS ASTRONOMICAL VALIDATION TEST');
console.log('═'.repeat(80));
console.log('\n📋 REFERENCE DATA (Professional Ephemeris):');
console.log(`   Birth: ${referenceCase.birthDate} at ${referenceCase.birthTime}`);
console.log(`   Location: ${referenceCase.city}, ${referenceCase.country}`);
console.log(`   Coordinates: ${referenceCase.lat}°, ${referenceCase.lng}°`);
console.log(`   UTC Offset: ${referenceCase.utcOffset}h`);
console.log('\n✅ EXPECTED RESULTS:');
console.log(`   Sun: ${referenceCase.expected.sun.sign} in House ${referenceCase.expected.sun.house}`);
console.log(`   Moon: ${referenceCase.expected.moon.sign} in House ${referenceCase.expected.moon.house}`);
console.log(`   Ascendant: ${referenceCase.expected.ascendant.sign} in House ${referenceCase.expected.ascendant.house}`);

console.log('\n' + '─'.repeat(80));
console.log('🧮 RUNNING NAOS CALCULATIONS...');
console.log('─'.repeat(80));

const profile = AstrologyService.calculateProfile(
    referenceCase.birthDate,
    referenceCase.birthTime,
    referenceCase.lat,
    referenceCase.lng,
    referenceCase.utcOffset
);

console.log('\n' + '═'.repeat(80));
console.log('📊 VALIDATION RESULTS');
console.log('═'.repeat(80));

const sunMatch = profile.sun.sign === referenceCase.expected.sun.sign &&
    profile.sun.house === referenceCase.expected.sun.house;
const moonMatch = profile.moon.sign === referenceCase.expected.moon.sign &&
    profile.moon.house === referenceCase.expected.moon.house;
const ascMatch = profile.rising.sign === referenceCase.expected.ascendant.sign &&
    profile.rising.house === referenceCase.expected.ascendant.house;

console.log(`\n☉ SUN:`);
console.log(`   Expected: ${referenceCase.expected.sun.sign} House ${referenceCase.expected.sun.house}`);
console.log(`   Got:      ${profile.sun.sign} House ${profile.sun.house}`);
console.log(`   Status:   ${sunMatch ? '✅ PASS' : '❌ FAIL'}`);

console.log(`\n☽ MOON:`);
console.log(`   Expected: ${referenceCase.expected.moon.sign} House ${referenceCase.expected.moon.house}`);
console.log(`   Got:      ${profile.moon.sign} House ${profile.moon.house}`);
console.log(`   Status:   ${moonMatch ? '✅ PASS' : '❌ FAIL'}`);

console.log(`\n🔺 ASCENDANT:`);
console.log(`   Expected: ${referenceCase.expected.ascendant.sign} House ${referenceCase.expected.ascendant.house}`);
console.log(`   Got:      ${profile.rising.sign} House ${profile.rising.house}`);
console.log(`   Status:   ${ascMatch ? '✅ PASS' : '❌ FAIL'}`);

console.log('\n' + '═'.repeat(80));
if (sunMatch && moonMatch && ascMatch) {
    console.log('🎉 ALL VALIDATIONS PASSED - CALCULATIONS ARE ACCURATE!');
} else {
    console.log('⚠️  VALIDATION FAILED - CALCULATIONS NEED CORRECTION');
    console.log('\n🔧 DEBUGGING INFO:');
    console.log(`   Sun absolute degree: ${profile.sun.absDegree.toFixed(2)}°`);
    console.log(`   Moon absolute degree: ${profile.moon.absDegree.toFixed(2)}°`);
    console.log(`   Ascendant degree: ${profile.rising.absDegree.toFixed(2)}°`);
    console.log(`\n   House System: ${profile.houseSystem}`);
    console.log(`   House Cusps:`);
    profile.houses.forEach((cusp, i) => {
        console.log(`      House ${i + 1}: ${cusp.toFixed(2)}°`);
    });
}
console.log('═'.repeat(80) + '\n');
