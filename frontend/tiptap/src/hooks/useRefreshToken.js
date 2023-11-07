import React from "react";
import { myAxios } from "../axios/axios";

import { useUserContext } from "../contexts/AuthContext";

const useRefreshToken = () => {
  const { setAccessToken } = useUserContext();

  const refresh = async () => {
    const response = await myAxios.get("http://localhost:8081/refresh", {
      withCredentials: true,
    });
    setAccessToken(response.data.accessToken);
    console.log("newAccesToken", response.data);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
