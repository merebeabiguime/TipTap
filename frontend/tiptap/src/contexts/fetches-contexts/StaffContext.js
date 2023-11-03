import React, { useContext, useState, createContext, useRef } from "react";
import { getAllStaff } from "../../fetches/FetchStaff";
import { getUser } from "../../fetches/FetchUsers";

export const StaffContext = createContext();

export function StaffContextProvider(props) {
  const staffObject = useRef({});
  const [staffListFilter, setStaffListFilter] = useState([{}]);
  const [staffList, setStaffList] = useState([{}]);

  const roleMap = ["Chef", "Waiter", "Cleaner"];

  const updateStaffList = async () => {
    const newStaffList = [];
    try {
      const getStaffResponse = await getAllStaff();

      if (getStaffResponse.status === "Success") {
        for (var i = 0; i < getStaffResponse.response.length; i++) {
          const getUserResponse = await getUser(
            getStaffResponse.response[i].ID_user
          );
          if (getUserResponse.status === "Success") {
            newStaffList.push({
              role: roleMap[getStaffResponse.response[i].role] || "Unknown",
              stars: getStaffResponse.response[i].stars,
              firstName: getUserResponse.response[0].firstName,
              lastName: getUserResponse.response[0].lastName,
              pictureUrl: getUserResponse.response[0].pictureUrl,
            });
          }
        }
        setStaffList(newStaffList);
        setStaffListFilter(newStaffList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StaffContext.Provider
      value={{
        staffObject,
        staffListFilter,
        setStaffListFilter,
        staffList,
        setStaffList,
      }}
    >
      {props.children}
    </StaffContext.Provider>
  );
}

export function useStaffContext() {
  const {
    staffObject,
    staffListFilter,
    setStaffListFilter,
    staffList,
    setStaffList,
  } = useContext(StaffContext);

  return {
    staffObject,
    staffListFilter,
    setStaffListFilter,
    staffList,
    setStaffList,
  };
}
