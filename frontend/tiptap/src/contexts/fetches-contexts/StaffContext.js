import React, { useContext, useState, createContext, useRef } from "react";
import { getStaffList } from "../../fetches/FetchStaff";
import { getUser } from "../../fetches/FetchUsers";
import { useQuery } from "react-query";

export const StaffContext = createContext();

export function StaffContextProvider(props) {
  const staffObject = useRef({});
  const [staffListFilter, setStaffListFilter] = useState([{}]);
  const [staffList, setStaffList] = useState([{}]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => await getStaffList(),
    onSuccess: (data) => {
      setStaffList(data.response);
      setStaffListFilter(data.response);
    },
  });

  return (
    <StaffContext.Provider
      value={{
        staffObject,
        staffListFilter,
        setStaffListFilter,
        staffList,
        setStaffList,
        setIsPopupVisible,
        isPopupVisible,
      }}
    >
      {!isLoading && props.children}
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
    staffQuery,
    isPopupVisible,
    setIsPopupVisible,
  } = useContext(StaffContext);

  return {
    staffObject,
    staffListFilter,
    setStaffListFilter,
    staffList,
    setStaffList,
    staffQuery,
    isPopupVisible,
    setIsPopupVisible,
  };
}
