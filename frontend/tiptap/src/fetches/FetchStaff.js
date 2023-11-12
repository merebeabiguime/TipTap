import axios from "axios";

export function useFetchStaff() {
  const isEmailValid = async (email) => {
    const response = await axios.get(
      `http://localhost:8081/staff/email/${email}`
    );
    return response.data;
  };

  const getAllStaff = async () => {
    const response = await axios.get(`http://localhost:8081/staff/`, {});
    return response.data;
  };

  const addStaff = async (jsonData) => {
    const response = await axios.post("http://localhost:8081/staff/addStaff");
    return response.data;
  };

  const getStaffList = async () => {
    const response = await axios.get("http://localhost:8081/staff/list");
    return response.data;
  };

  return {
    isEmailValid,
    getAllStaff,
    addStaff,
    getStaffList,
  };
}
