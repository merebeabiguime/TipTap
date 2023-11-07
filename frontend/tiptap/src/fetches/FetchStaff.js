import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useUserContext } from "../contexts/AuthContext";

export function useFetchStaff() {
  const { accessToken } = useUserContext();
  const axiosPrivate = useAxiosPrivate();

  const isEmailValid = async (email) => {
    const response = await axiosPrivate.get(
      `http://localhost:8081/staff/email/${email}`,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    return response.data;
  };

  const getAllStaff = async () => {
    const response = await axiosPrivate.get(`http://localhost:8081/staff/`, {
      headers: { Authorization: "Bearer " + accessToken },
    });
    return response.data;
  };

  const addStaff = async (jsonData) => {
    const response = await axiosPrivate.post(
      "http://localhost:8081/staff/addStaff",
      jsonData,
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    return response.data;
  };

  const getStaffList = async () => {
    const response = await axiosPrivate.get(
      "http://localhost:8081/staff/list",
      {
        headers: { Authorization: "Bearer " + accessToken },
      }
    );
    return response.data;
  };

  return {
    isEmailValid,
    getAllStaff,
    addStaff,
    getStaffList,
  };
}
