const geoJson = require('../colouredMapData/country-codes-data.json');
const countryMapData = geoJson.features;

const fetchCoordinates = (countryName) => {
  for (let i = 0; i < countryMapData.length; i += 1) {
    if (countryMapData[i].properties.label_en === countryName) {
      console.log(countryMapData[i].geometry.coordinates[5]);
    }
  }
};

//Map through each set of coordinates and turn into apporpriate objects

//https://www.npmjs.com/package/deep-map
//https://stackoverflow.com/questions/25333918/js-deep-map-function
fetchCoordinates('France');
