import { myAxios } from "../axios/axios";

export function useFetchRestaurant() {
  const getRestaurant = async (id) => {
    const response = await myAxios.get(`/restaurant/${id}`);

    return response.data;
  };

  return {
    getRestaurant,
  };
}
