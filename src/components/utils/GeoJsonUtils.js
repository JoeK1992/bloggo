const geoJson = require('../colouredMapData/country-codes-data.json');

const countryMapData = geoJson.features;

const fetchCoordinates = (countryName) => {
  for (let i = 0; i < countryMapData.length; i += 1) {
    if (countryMapData[i].properties.label_en === countryName) {
      const coordinateArray = countryMapData[i].geometry.coordinates;
      return formatCountryData(coordinateArray);
    }
  }
};

const formatCountryData = (coordinateArray) => {
  const finalData = [];

  if (Array.isArray(coordinateArray[0][0][0])) {
    const flattenedArray = coordinateArray.flat(1);
    for (let i = 0; i < flattenedArray.length; i += 1) {
      const tempData = [];
      for (let j = 0; j < flattenedArray[i].length; j += 1) {
        tempData.push({
          longitude: flattenedArray[i][j][0],
          latitude: flattenedArray[i][j][1]
        });
      }
      finalData.push(tempData);
    }
  } else {
    const flattenedArray = coordinateArray.flat(1);
    for (let i = 0; i < flattenedArray.length; i += 1) {
      finalData.push({
        longitude: flattenedArray[i][0],
        latitude: flattenedArray[i][1]
      });
    }
    return [finalData];
  }

  return finalData;
};

module.exports = { fetchCoordinates, formatCountryData };
