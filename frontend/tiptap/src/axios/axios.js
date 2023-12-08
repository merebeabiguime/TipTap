import axios from "axios";
axios.defaults.withCredentials = true;

//const baseURL = "https://tiptap.biz/api";

const baseURL = "http://localhost:8081";

export const myAxios = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});
