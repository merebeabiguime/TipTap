import useAxiosPrivate from "../hooks/useAxiosPrivate";
const axiosPrivate = useAxiosPrivate();

export async function addUser(jsonData) {
  const response = await axiosPrivate.post(
    "http://localhost:8081/user/addUser",
    jsonData
  );

  return response.data;
}
export async function getUserRole(uid) {
  const response = await axiosPrivate.get(
    `http://localhost:8081/user/role/${uid}`
  );

  return response.data;
}

export async function getUserFromUID(uid) {
  const response = await axiosPrivate.get(`http://localhost:8081/user/${uid}`);

  return response.data;
}

export async function getUser(id) {
  const response = await axiosPrivate.get(
    `http://localhost:8081/user/id/${id}`
  );

  return response.data;
}
