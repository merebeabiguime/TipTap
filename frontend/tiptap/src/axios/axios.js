import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://35.180.203.65:8081"
    : "http://localhost:8081";

//const baseURL = `http://${process.env.AWS_BACKEND_PUBLIC_IP_ADRESS}:8081`;

export const myAxios = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});
