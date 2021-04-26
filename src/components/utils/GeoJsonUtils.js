const geoJson = require('../colouredMapData/country-codes-data.json');

const countryMapData = geoJson.features;

const fetchCoordinates = (countryName) => {
  for (let i = 0; i < countryMapData.length; i += 1) {
    if (countryMapData[i].properties.label_en === countryName) {
      const flattenedCountryData = countryMapData[i].geometry.coordinates.flat(
        1,
      );
      return formatCountryData(flattenedCountryData).flat(1);
    }
  }
};

const formatCountryData = (coordinateArray) => {
  const finalData = [];
  if (!Array.isArray(coordinateArray[0][0])) {
    for (let i = 0; i < coordinateArray.length; i += 1) {
      finalData.push({
        latitude: coordinateArray[i][0],
        longitude: coordinateArray[i][1],
      });
    }
  } else {
    const tempData = [];
    for (let j = 0; j < coordinateArray.length; j += 1) {
      tempData.push(formatCountryData(coordinateArray[j]));
    }

    finalData.push(tempData);
  }

  return finalData;
};

module.exports = { fetchCoordinates };
