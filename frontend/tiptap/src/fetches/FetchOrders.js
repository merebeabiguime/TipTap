import { myAxios } from "../axios/axios";

export function useFetchOrders() {
  const addOrder = async (jsonData) => {
    const response = await myAxios.post("/order/add", jsonData);
    return response.data;
  };

  return { addOrder };
}
