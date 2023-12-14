import { myAxios } from "../axios/axios";

export function useFetchUsers() {
  const getUser = async (uid) => {
    const response = await myAxios.get(`/user/uid/${uid}`);

    return response.data;
  };

  const verify = async (uid) => {
    const response = await myAxios.post(`/user/verify`, [{ UID: uid }]);

    return response.data;
  };

  return {
    getUser,
    verify,
  };
}
