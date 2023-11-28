import { myAxios } from "../axios/axios";

export function useFetchQRCode() {
  const getUser = async (id) => {
    const response = await myAxios.get(`/qrcode/${id}`, {});
    console.log("id dans requete", id);
    return response.data;
  };

  return {
    getUser,
  };
}
