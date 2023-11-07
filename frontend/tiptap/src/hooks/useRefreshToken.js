import React from "react";
import axios from "axios";
import { useUserContext } from "../contexts/AuthContext";

const useRefreshToken = () => {
  const { setAccessToken } = useUserContext();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
