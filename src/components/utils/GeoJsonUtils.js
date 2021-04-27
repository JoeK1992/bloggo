const clonedeep = require('lodash.clonedeep');
const geoJson = require('../colouredMapData/country-codes-data.json');

const countryMapData = geoJson.features;

const fetchPolygonCoordinates = (countryName) => {
  const countryData = clonedeep(countryMapData);
  for (let i = 0; i < countryData.length; i += 1) {
    if (countryData[i].properties.label_en === countryName) {
      const coordinateArray = countryData[i].geometry.coordinates;
      return formatCoordinates(coordinateArray);
    }
  }
};

const formatCoordinates = (coordinateArray) => {
  const coodinatesClone = clonedeep(coordinateArray);
  const polygons = [];

  if (Array.isArray(coodinatesClone[0][0][0])) {
    const flattenedArray = coodinatesClone.flat(1);
    for (let i = 0; i < flattenedArray.length; i += 1) {
      const tempData = [];
      for (let j = 0; j < flattenedArray[i].length; j += 1) {
        tempData.push({
          longitude: flattenedArray[i][j][0],
          latitude: flattenedArray[i][j][1],
        });
      }
      polygons.push(tempData);
    }
  } else {
    const flattenedArray = coodinatesClone.flat(1);
    for (let i = 0; i < flattenedArray.length; i += 1) {
      polygons.push({
        longitude: flattenedArray[i][0],
        latitude: flattenedArray[i][1],
      });
    }
    return [polygons];
  }

  return polygons;
};

module.exports = { fetchPolygonCoordinates, formatCoordinates };
