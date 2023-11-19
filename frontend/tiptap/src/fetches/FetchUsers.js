import { useUserContext } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { myAxios } from "../axios/axios";

export function useFetchUsers() {
  const { accessToken } = useUserContext();

  const getUser = async (id) => {
    const response = await myAxios.get(`/user/id/${id}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });

    return response.data;
  };

  const verify = async (UID) => {
    const response = await myAxios.post(`/user/verify`, [{ UID: UID }], {
      headers: { Authorization: "Bearer " + accessToken },
    });

    return response.data;
  };

  return {
    getUser,
    verify,
  };
}
