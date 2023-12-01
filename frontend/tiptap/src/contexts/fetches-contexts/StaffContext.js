import React, { createContext, useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useFetchStaff } from "../../fetches/FetchStaff";

export const StaffContext = createContext();

export function StaffContextProvider(props) {
  const staffObject = useRef({});
  const [staffListFilter, setStaffListFilter] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [tipComment, setTipComment] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [rating, setRating] = useState(0);
  const restaurantIdParams = useRef(null);
  const fetchStaff = useFetchStaff();
  const staffQuery = useRef(true);
  const [selectedStaffTip, setSelectedStaffTip] = useState(null);

  const allStaffMutation = useMutation({
    mutationFn: async () => await fetchStaff.getStaffList(),
    staleTime: 60 * 1000 * 15,
    onSuccess: (data) => {
      console.log(data.response);
      setStaffList(data.response);
      setStaffListFilter(data.response);
    },
  });

  function getAllStaff() {
    allStaffMutation.mutate();
  }

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
        setSelectedStaff,
        selectedStaff,
        tipAmount,
        setTipAmount,
        tipComment,
        setTipComment,
        rating,
        setRating,
        restaurantIdParams,
        getAllStaff,
        selectedStaffTip,
        setSelectedStaffTip,
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
    staffQuery,
    isPopupVisible,
    setIsPopupVisible,
    setSelectedStaff,
    selectedStaff,
    tipAmount,
    setTipAmount,
    tipComment,
    setTipComment,
    rating,
    setRating,
    restaurantIdParams,
    getAllStaff,
    selectedStaffTip,
    setSelectedStaffTip,
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
    setSelectedStaff,
    selectedStaff,
    tipAmount,
    setTipAmount,
    tipComment,
    setTipComment,
    rating,
    setRating,
    restaurantIdParams,
    getAllStaff,
    selectedStaffTip,
    setSelectedStaffTip,
  };
}
