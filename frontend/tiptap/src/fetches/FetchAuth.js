import axios from "axios";

export async function login(UID) {
  const response = await axios.post("http://localhost:8081/auth/login", UID);

  return response.data;
}
