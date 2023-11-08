import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "../contexts/AuthContext";
const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { accessToken, refresh } = useUserContext();

  axiosPrivate.interceptors.request.use(async (req) => {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    console.log("expiration", isExpired);

    if (!isExpired) return req;

    refresh();

    return req;
  });

  return axiosPrivate;
};

export default useAxiosPrivate;
