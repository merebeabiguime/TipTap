import { myAxios } from "../axios/axios";

export function useFetchAyden() {
  const getSession = async (jsonData) => {
    const response = await myAxios.post("/ayden/session", jsonData);
    return response.data;
  };

  return { getSession };
}
