import axios from "axios";

export async function isEmailValid(email) {
  const response = await axios.get(
    `http://localhost:8081/staff/email/${email}`
  );

  return response.data;
}

export async function getAllStaff() {
  const response = await axios.get(`http://localhost:8081/staff/`);

  return response.data;
}

export async function addStaff(jsonData) {
  const response = await axios.post(
    "http://localhost:8081/staff/addStaff",
    jsonData
  );

  return response.data;
}
