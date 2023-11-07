import axios from "axios";
import { myAxios } from "../axios/axios";

/*export async function login(UID) {
  const response = await axios.post("http://localhost:8081/auth/login", UID);

  return response.data;
}*/

export function useLogin() {
  const login = async (UID) => {
    const response = await axios.post("http://localhost:8081/auth/login", UID);
    return response.data;
  };

  return login;
}
