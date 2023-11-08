import axios from "axios";

export function useFetchAuth() {
  const login = async (UID) => {
    const response = await axios.post("http://localhost:8081/auth/login", UID);
    return response.data;
  };

  const register = async (jsonData) => {
    const response = await axios.post(
      "http://localhost:8081/user/register",
      jsonData
    );

    return response.data;
  };

  return {
    login,
    register,
  };
}
