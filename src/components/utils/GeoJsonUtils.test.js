// import {
//   fetchCoordinates,
//   formatCountryData,
//   mapCountries
// } from './GeoJsonUtils';

// //console.log(fetchCoordinates('San Marino'));

// const sanMarino = [
//   [
//     { longitude: 12.429450359, latitude: 43.892055515 },
//     { longitude: 12.399581381, latitude: 43.903217625 },
//     { longitude: 12.385628745, latitude: 43.924534153 },
//     { longitude: 12.395653973, latitude: 43.948408664 },
//     { longitude: 12.421388836, latitude: 43.967218885 },
//     { longitude: 12.482160321, latitude: 43.982566786 },
//     { longitude: 12.492392254, latitude: 43.956418511 },
//     { longitude: 12.478286774, latitude: 43.917037885 },
//     { longitude: 12.460456219, latitude: 43.895259454 },
//     { longitude: 12.429450359, latitude: 43.892055515 }
//   ]
// ];
// const preFormatSanMarino = [
//   [
//     [12.429450359, 43.892055515],
//     [12.399581381, 43.903217625],
//     [12.385628745, 43.924534153],
//     [12.395653973, 43.948408664],
//     [12.421388836, 43.967218885],
//     [12.482160321, 43.982566786],
//     [12.492392254, 43.956418511],
//     [12.478286774, 43.917037885],
//     [12.460456219, 43.895259454],
//     [12.429450359, 43.892055515]
//   ]
// ];
// const preFormatFakeCountry = [
//   [
//     [
//       [12.429450359, 43.892055515],
//       [12.399581381, 43.903217625],
//       [12.385628745, 43.924534153]
//     ],
//     [
//       [12.492392254, 43.956418511],
//       [12.478286774, 43.917037885],
//       [12.460456219, 43.895259454],
//       [12.429450359, 43.892055515]
//     ]
//   ]
// ];

// const fakeCountry = [
//   [
//     { longitude: 12.429450359, latitude: 43.892055515 },
//     { longitude: 12.399581381, latitude: 43.903217625 },
//     { longitude: 12.385628745, latitude: 43.924534153 }
//   ],
//   [
//     { longitude: 12.492392254, latitude: 43.956418511 },
//     { longitude: 12.478286774, latitude: 43.917037885 },
//     { longitude: 12.460456219, latitude: 43.895259454 },
//     { longitude: 12.429450359, latitude: 43.892055515 }
//   ]
// ];

// describe('Single Landmass', () => {
//   describe('formatCountryData', () => {
//     test('should take an array of coordinates and return same array with keys of lat and long', () => {
//       expect(formatCountryData(preFormatSanMarino)).toEqual(sanMarino);
//     });
//   });
//   describe('fetchCoordinates', () => {
//     test('should return array of coodinates with lat and long keys', () => {
//       expect(fetchCoordinates('San Marino')).toEqual(sanMarino);
//     });
//   });
// });

// describe('>1 landmass', () => {
//   describe('formatCountryData', () => {
//     test('should take a nested array of coordinates and return same array with keys of lat and long', () => {
//       console.log(formatCountryData(preFormatFakeCountry));
//       expect(formatCountryData(preFormatFakeCountry)).toEqual(fakeCountry);
//     });
//   });
// });
