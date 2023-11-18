import { useUserContext } from "../contexts/AuthContext";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export function useFetchUsers() {
  const { accessToken } = useUserContext();
  const axiosPrivate = useAxiosPrivate();

  const getUser = async (id) => {
    const response = await axiosPrivate.get(
      `http://localhost:8081/user/id/${id}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );

    return response.data;
  };

  const verify = async (UID) => {
    const response = await axiosPrivate.post(
      `http://localhost:8081/user/verify`,
      [{ UID: UID }],
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );

    return response.data;
  };

  return {
    getUser,
    verify,
  };
}
