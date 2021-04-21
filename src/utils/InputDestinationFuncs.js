import axios from "axios";

const request = axios.create();
export default function getDestination(search) {
  return request
    .get(
      `https://api.opencagedata.com/geocode/v1/json?q=${search}&key=88ece04f7a1447a88e020ec1e0458ce0`
    )
    .then((res) => {
      return res.data.results;
    });
}
