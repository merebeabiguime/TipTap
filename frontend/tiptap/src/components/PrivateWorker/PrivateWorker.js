import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateWorker() {
  const {
    currentUser,
    userObject,
    getUserInfos,
    resetPasswordURL,
    navigateTo,
  } = useUserContext();
  const [myReturn, setMyreturn] = useState(<Outlet />);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      if (!currentUser) {
        window.location.href = "/signin";
      }
    }
  }, [currentUser]);

  useEffect(() => {
    navigate(navigateTo);
  }, [navigateTo]);

  return (
    getUserInfos.isSuccess &&
    resetPasswordURL.current === "" && <div>{myReturn}</div>
  );
}
