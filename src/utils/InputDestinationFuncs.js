import axios from 'axios';

const request = axios.create();
export default function getDestination(search) {
  return request
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=ceaa5ee6488446fbb13d0f97c0604ced`,
    )
    .then((res) => {
      return res.data.results;
    });
}
