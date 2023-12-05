import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateWorker() {
  const { currentUser, userObject, getUserInfos, resetPasswordURL } =
    useUserContext();
  const [myReturn, setMyreturn] = useState(<Outlet />);

  useEffect(() => {
    if (!currentUser) {
      if (!currentUser) {
        window.location.href = "/signin";
      }
    }
  }, [currentUser]);

  return (
    getUserInfos.isSuccess &&
    resetPasswordURL.current === "" && <div>{myReturn}</div>
  );
}
