import React, { useContext, useRef, useState } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";
import { useFetchRestaurant } from "../../fetches/FetchRestaurant";
import { useQuery } from "react-query";
import { useStaffContext } from "../../contexts/fetches-contexts/StaffContext";
export default function PrivateClient() {
  let { restaurantId } = useParams();
  const restaurantIdValue = restaurantId.split("=")[1];
  const [validation, setValidation] = useState("");
  const fetchRestaurant = useFetchRestaurant();
  const enableQuery = useRef(true);
  const { restaurantIdParams, setRestaurantIdParams } = useStaffContext();
  const navigate = useNavigate();

  if (restaurantIdParams !== null) {
    enableQuery.current = false;
  }

  console.log("rid", restaurantIdValue);

  //Check in db if restaurant exists
  const restaurantQuery = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => await fetchRestaurant.getRestaurant(restaurantIdValue),
    enabled: enableQuery.current,
    onSuccess: (data) => {
      if (data.status != "Success") {
        console.log("essomana", data);
        setValidation(data.response);
        setTimeout(() => {
          navigate("/homepage/");
        }, 3000);
      } else {
        console.log("merebe", data);
        restaurantIdParams.current = restaurantIdValue;
        navigate(
          `/privateClient/restaurantId=${restaurantIdValue}/private-home-client/`
        );
      }
    },
  });
  return !restaurantQuery.isLoading || enableQuery.current === false ? (
    <div>
      <div className=" d-flex justify-content-center align-items-center">
        <h1>{validation}</h1>
      </div>
      <Outlet />
    </div>
  ) : (
    <div>
      <Spinner animation="border" />
    </div>
  );
}
