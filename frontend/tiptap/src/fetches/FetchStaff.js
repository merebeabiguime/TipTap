import axios from "axios";
import { myAxios } from "../axios/axios";

export function useFetchStaff() {
  const isEmailValid = async (email) => {
    const response = await myAxios.get(`/staff/email/${email}`);
    return response.data;
  };

  const getAllStaff = async () => {
    const response = await myAxios.get(`/staff/`, {});
    return response.data;
  };

  const addStaff = async (jsonData) => {
    const response = await myAxios.post("/staff/addStaff", jsonData);
    return response.data;
  };

  const getStaffList = async () => {
    const response = await myAxios.get("/staff/list");
    return response.data;
  };

  return {
    isEmailValid,
    getAllStaff,
    addStaff,
    getStaffList,
  };
}
