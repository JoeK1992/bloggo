import { fetchPolygonCoordinates, formatCoordinates } from './GeoJsonUtils';

const geoJson = require('../colouredMapData/country-codes-data.json');

const countryMapData = geoJson.features;

describe('GeoJson tests', () => {
  test('GeoJson country should contain correct keys and values', () => {
    const Moldova = countryMapData.filter((countryData) => {
      if (countryData.properties.label_en === 'Moldova, Republic of') {
        return countryData;
      }
      return null;
    });
    const { geometry, properties } = Moldova[0];
    expect(Moldova[0]).toHaveProperty('geometry');
    expect(Moldova[0]).toHaveProperty('properties');
    expect(Array.isArray(geometry.coordinates)).toBe(true);
    expect(properties).toHaveProperty('onu_code');
    expect(properties).toHaveProperty('label_en');
    expect(properties).toHaveProperty('iso2_code');
    expect(properties.label_en).toBe('Moldova, Republic of');
    expect(properties.iso2_code).toBe('MD');
  });
});
describe('formatCoordinates', () => {
  describe('Single Landmass', () => {
    const Moldova = countryMapData.filter((countryData) => {
      if (countryData.properties.label_en === 'Moldova, Republic of') {
        return countryData;
      }
    });
    test('function manipulates data into the correct format', () => {
      const { geometry } = Moldova[0];
      const formattedCoordinates = formatCoordinates(geometry.coordinates);
      expect(Array.isArray(formattedCoordinates)).toBe(true);
      expect(Array.isArray(formattedCoordinates[0])).toBe(true);
      expect(typeof formattedCoordinates[0][0]).toBe('object');
      expect(formattedCoordinates[0][0]).toHaveProperty('latitude');
      expect(formattedCoordinates[0][0]).toHaveProperty('longitude');
      expect(typeof formattedCoordinates[0][0].longitude).toBe('number');
      expect(typeof formattedCoordinates[0][0].latitude).toBe('number');
    });
  });
  test('no mutation', () => {
    const preFormattedSanMarino = [
      [
        [12.429450359, 43.892055515],
        [12.399581381, 43.903217625],
        [12.385628745, 43.924534153],
        [12.395653973, 43.948408664],
        [12.421388836, 43.967218885],
        [12.482160321, 43.982566786],
        [12.492392254, 43.956418511],
        [12.478286774, 43.917037885],
        [12.460456219, 43.895259454],
        [12.429450359, 43.892055515]
      ]
    ];
    const formattedCoordinates = formatCoordinates(preFormattedSanMarino);
    expect(formattedCoordinates).not.toEqual([
      [
        [12.429450359, 43.892055515],
        [12.399581381, 43.903217625],
        [12.385628745, 43.924534153],
        [12.395653973, 43.948408664],
        [12.421388836, 43.967218885],
        [12.482160321, 43.982566786],
        [12.492392254, 43.956418511],
        [12.478286774, 43.917037885],
        [12.460456219, 43.895259454],
        [12.429450359, 43.892055515]
      ]
    ]);
  });
  describe('Multiple Landmasses', () => {
    const France = countryMapData.filter((countryData) => {
      if (countryData.properties.label_en === 'France') {
        return countryData;
      }
    });
    test('function manipulates data into the correct format', () => {
      const { geometry } = France[0];
      const formattedCoordinates = formatCoordinates(geometry.coordinates);
      expect(Array.isArray(formattedCoordinates)).toBe(true);
      expect(Array.isArray(formattedCoordinates[0])).toBe(true);
      expect(typeof formattedCoordinates[0][0]).toBe('object');
      expect(formattedCoordinates[0][0]).toHaveProperty('latitude');
      expect(formattedCoordinates[0][0]).toHaveProperty('longitude');
      expect(typeof formattedCoordinates[0][0].longitude).toBe('number');
      expect(typeof formattedCoordinates[0][0].latitude).toBe('number');
    });
    test('no mutation', () => {
      const fakePolygons = [
        [
          [12.429450359, 43.892055515],
          [12.399581381, 43.903217625],
          [12.385628745, 43.924534153]
        ],
        [
          [12.395653973, 43.948408664],
          [12.421388836, 43.967218885],
          [12.482160321, 43.982566786],
          [12.492392254, 43.956418511]
        ],
        [
          [12.478286774, 43.917037885],
          [12.460456219, 43.895259454],
          [12.429450359, 43.892055515]
        ]
      ];
      const formattedCoordinates = formatCoordinates(fakePolygons);
      expect(formattedCoordinates).not.toEqual([
        [
          [12.429450359, 43.892055515],
          [12.399581381, 43.903217625],
          [12.385628745, 43.924534153]
        ],
        [
          [12.395653973, 43.948408664],
          [12.421388836, 43.967218885],
          [12.482160321, 43.982566786],
          [12.492392254, 43.956418511]
        ],
        [
          [12.478286774, 43.917037885],
          [12.460456219, 43.895259454],
          [12.429450359, 43.892055515]
        ]
      ]);
    });
  });
});
describe('fetchPolygonCoordinates', () => {
  test('should return correct polygon coordinates when given a country string', () => {
    const sanMarinoPolygon = [
      { longitude: 12.429450359, latitude: 43.892055515 },
      { longitude: 12.399581381, latitude: 43.903217625 },
      { longitude: 12.385628745, latitude: 43.924534153 },
      { longitude: 12.395653973, latitude: 43.948408664 },
      { longitude: 12.421388836, latitude: 43.967218885 },
      { longitude: 12.482160321, latitude: 43.982566786 },
      { longitude: 12.492392254, latitude: 43.956418511 },
      { longitude: 12.478286774, latitude: 43.917037885 },
      { longitude: 12.460456219, latitude: 43.895259454 },
      { longitude: 12.429450359, latitude: 43.892055515 }
    ];
    const sanMarino = fetchPolygonCoordinates('San Marino');
    expect(Array.isArray(sanMarino)).toBe(true);
    expect(sanMarino).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining(
            sanMarinoPolygon[0],
            sanMarinoPolygon[4],
            sanMarinoPolygon[9]
          )
        ])
      ])
    );
  });
});
