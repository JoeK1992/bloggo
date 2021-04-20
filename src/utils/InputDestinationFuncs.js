import axios from 'axios';

const request = axios.create();
export default function getDestination(search) {
  return request
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=f3a13fcfc2e54d8a99b6070f129d7a9e`
    )
    .then((res) => {
      return res.data.results;
    });
}
