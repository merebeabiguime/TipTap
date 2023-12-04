import React, { useContext, useEffect, useRef, useState } from "react";
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
import { QueryClient, useQuery } from "react-query";
import { useStaffContext } from "../../contexts/fetches-contexts/StaffContext";
export default function PrivateClient() {
  let { restaurantId } = useParams();
  const restaurantIdValue = restaurantId.split("=")[1];
  const { restaurantIdParams, navigateTo } = useStaffContext();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchRestaurant = useFetchRestaurant();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const fetchRes = async (resId) => {
    try {
      setIsLoading(true);
      const data = await queryClient.fetchQuery(["restaurant"], {
        queryFn: async () => await fetchRestaurant.getRestaurant(resId),
      });

      if (data.status === "Success") {
        restaurantIdParams.current = resId;
        navigate(`/privateClient/restaurantId=${resId}/private-home-client/`);
      } else {
        setMessage(data.response);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (e) {
      setMessage("Une erreur s'est produite...");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (restaurantIdParams.current === null) {
      fetchRes(restaurantIdValue);
    } else {
      setIsLoading(false);
    }
  }, []);

  return !isLoading && message === "" ? (
    <div>
      <Outlet />
    </div>
  ) : !isLoading && message !== "" ? (
    <div className=" centered-div mx-auto text-center">
      <h1>{message}</h1>
    </div>
  ) : (
    <div className="centered-div">
      <Spinner animation="border" />
    </div>
  );
}
