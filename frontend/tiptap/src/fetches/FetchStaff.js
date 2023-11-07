import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const axiosPrivate = useAxiosPrivate();

export async function isEmailValid(email) {
  const response = await axiosPrivate.get(
    `http://localhost:8081/staff/email/${email}`
  );

  return response.data;
}

export async function getAllStaff() {
  const response = await axiosPrivate.get(`http://localhost:8081/staff/`);

  return response.data;
}

export async function addStaff(jsonData) {
  const response = await axiosPrivate.post(
    "http://localhost:8081/staff/addStaff",
    jsonData
  );

  return response.data;
}

export async function getStaffList() {
  const response = await axiosPrivate.get("http://localhost:8081/staff/list");

  return response.data;
}
