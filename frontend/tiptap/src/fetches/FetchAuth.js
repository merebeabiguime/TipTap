import axios from "axios";
import { myAxios } from "../axios/axios";

export function useFetchAuth() {
  const login = async (UID) => {
    const response = await myAxios.post("/auth/login", [{ UID: UID }]);
    return response.data;
  };

  const otherAuth = async (userObject) => {
    const response = await myAxios.post("/auth/other", userObject);
    return response.data;
  };

  const register = async (jsonData) => {
    const response = await myAxios.post("/auth/register", jsonData);

    return response.data;
  };

  const logout = async () => {
    const response = await myAxios.delete("/logout/", {
      withCredentials: true,
    });

    return response.data;
  };

  return {
    login,
    register,
    logout,
    otherAuth,
  };
}
