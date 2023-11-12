import axios from "axios";

export function useFetchRestaurant() {
  const getRestaurant = async (id) => {
    console.log("le resttt", id);
    const response = await axios.get(`http://localhost:8081/restaurant/${id}`);
    return response.data;
  };

  return {
    getRestaurant,
  };
}
