import React, { useContext, useState, createContext, useRef } from "react";
import { useFetchStaff } from "../../fetches/FetchStaff";
import { getUser } from "../../fetches/FetchUsers";
import { useQuery } from "react-query";

export const StaffContext = createContext();

export function StaffContextProvider(props) {
  const staffObject = useRef({});
  const [staffListFilter, setStaffListFilter] = useState([{}]);
  const [staffList, setStaffList] = useState([{}]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const fetchStaff = useFetchStaff();
  const staffQuery = useRef(true);

  const { isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: async () => await fetchStaff.getStaffList(),
    enabled: staffQuery.current,
    staleTime: 60 * 1000 * 15,
    onSuccess: (data) => {
      console.log("Staff COntext : ", data);
      setStaffList(data.response);
      setStaffListFilter(data.response);
      staffQuery.current = false;
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
