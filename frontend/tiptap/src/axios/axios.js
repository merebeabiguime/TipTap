import axios from "axios";
axios.defaults.withCredentials = true;

export const myAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
});
