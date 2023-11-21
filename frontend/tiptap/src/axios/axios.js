import axios from "axios";
axios.defaults.withCredentials = true;

const baseURL = "http://172.31.14.97:8081";

//const baseURL = `http://${process.env.AWS_BACKEND_PUBLIC_IP_ADRESS}:8081`;

export const myAxios = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});
