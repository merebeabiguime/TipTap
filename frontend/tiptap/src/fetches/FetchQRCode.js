import { useUserContext } from "../contexts/AuthContext";
import { myAxios } from "../axios/axios";

export function useFetchQRCode() {
  const { accessToken } = useUserContext();

  const getUser = async (id) => {
    const response = await myAxios.get(`http://localhost:8081/qrcode/${id}`, {
      headers: { Authorization: "Bearer " + accessToken },
    });

    return response.data;
  };

  return {
    getUser,
  };
}
