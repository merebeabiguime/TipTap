import { myAxios } from "../axios/axios";

export function useFetchTip() {
  const addTip = async (jsonData) => {
    const response = await myAxios.post("/tip/addTip", jsonData);
    return response.data;
  };

  return { addTip };
}
