import axios from "axios";
import useRefreshToken from "./useRefreshToken";
import { useUserContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { accessToken } = useUserContext();

  axiosPrivate.interceptors.request.use(async (req) => {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    console.log("expiration", isExpired);

    if (!isExpired) return req;

    refresh();

    console.log("ici");

    return req;
  });

  return axiosPrivate;
};

export default useAxiosPrivate;
