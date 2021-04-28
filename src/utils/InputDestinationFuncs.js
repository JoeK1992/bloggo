import axios from 'axios';

const request = axios.create();
export default function getDestination(search) {
  return request
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=d994489e9c1a41299116303b7d48a7a9&limit=4`,
    )
    .then((res) => {
      return res.data.results;
    });
}
