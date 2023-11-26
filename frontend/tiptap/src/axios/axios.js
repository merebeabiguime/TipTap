import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://35.180.203.65/api";

//const baseURL = `http://${process.env.AWS_BACKEND_PUBLIC_IP_ADRESS}:8081`;

export const myAxios = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});
