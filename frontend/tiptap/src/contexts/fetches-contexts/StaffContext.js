import React, { createContext, useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useFetchStaff } from "../../fetches/FetchStaff";
import { useFetchRestaurant } from "../../fetches/FetchRestaurant";

export const StaffContext = createContext();

export function StaffContextProvider(props) {
  const staffObject = useRef({});
  const [staffListFilter, setStaffListFilter] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [tipComment, setTipComment] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [rating, setRating] = useState(0);
  const restaurantIdParams = useRef(null);
  const fetchStaff = useFetchStaff();
  const [navigateTo, setNavigateTo] = useState(null);
  const [selectedStaffTip, setSelectedStaffTip] = useState(null);
  const orderType = useRef(null);
  const orderDetails = useRef(null);

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
        navigateTo,
        setNavigateTo,
        transactionId,
        setTransactionId,
        orderType,
        orderDetails,
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
    navigateTo,
    setNavigateTo,
    transactionId,
    setTransactionId,
    orderType,
    orderDetails,
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
    navigateTo,
    setNavigateTo,
    transactionId,
    setTransactionId,
    orderType,
    orderDetails,
  };
}
