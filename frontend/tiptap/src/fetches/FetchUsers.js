import { useUserContext } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { myAxios } from "../axios/axios";

export function useFetchUsers() {
  const getUser = async (uid) => {
    const response = await myAxios.get(`/user/uid/${uid}`);

    return response.data;
  };

  return {
    getUser,
  };
}
