import React, { useContext, useState, createContext, useRef } from "react";
import { getStaffList } from "../../fetches/FetchStaff";
import { getUser } from "../../fetches/FetchUsers";
import { useQuery } from "react-query";

export const StaffContext = createContext();

export function StaffContextProvider(props) {
  const staffObject = useRef({});
  const [staffListFilter, setStaffListFilter] = useState([{}]);
  const [staffList, setStaffList] = useState([{}]);
  const [loadingData, setLoadingData] = useState(true);

  const staffQuery = useQuery({
    queryKey: ["staff"],
    queryFn: async () => await getStaffList(),
  });

  if (!staffQuery.isLoading && loadingData == true) {
    console.log("aaaa", staffQuery.data.response);
    setStaffList(staffQuery.data.response);
    setStaffListFilter(staffQuery.data.response);
    setLoadingData(false);
  }

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
      {!loadingData && props.children}
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
  } = useContext(StaffContext);

  return {
    staffObject,
    staffListFilter,
    setStaffListFilter,
    staffList,
    setStaffList,
    staffQuery,
  };
}
