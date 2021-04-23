import axios from 'axios';

const request = axios.create();
export default function getDestination(search) {
  return request
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=f8eb582e07d44b049829e9a5a9484f7e&limit=3`,
    )
    .then((res) => {
      return res.data.results;
    });
}
