import axios from "axios";

export function useFetchAuth() {
  const login = async (UID) => {
    const response = await axios.post("http://localhost:8081/auth/login", [
      { UID: UID },
    ]);
    return response.data;
  };

  const otherAuth = async (userObject) => {
    const response = await axios.post(
      "http://localhost:8081/auth/other",
      userObject
    );
    return response.data;
  };

  const register = async (jsonData) => {
    const response = await axios.post(
      "http://localhost:8081/auth/register",
      jsonData
    );

    return response.data;
  };

  const logout = async () => {
    const response = await axios.delete("http://localhost:8081/logout/", {
      withCredentials: true,
    });

    return response.data;
  };

  return {
    login,
    register,
    logout,
    otherAuth,
  };
}
