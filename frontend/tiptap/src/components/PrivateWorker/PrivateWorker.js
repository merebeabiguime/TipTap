import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateWorker() {
  const {
    currentUser,
    userObject,
    getUserInfos,
    navigateTo,
    resetPasswordURL,
  } = useUserContext();
  const [myReturn, setMyreturn] = useState(<Outlet />);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/signin";
    }
    console.log("currentuser");
  }, [currentUser]);

  useEffect(() => {
    console.log("userboejct");
    if (userObject && userObject[0].verified === 0) {
      navigate(navigateTo);
    }
  }, [navigateTo]);

  useEffect(() => {
    if (resetPasswordURL.current !== "") {
      window.location.href = resetPasswordURL.current;
    }
  }, [resetPasswordURL]);

  return (
    getUserInfos.isSuccess &&
    resetPasswordURL.current === "" && <div>{myReturn}</div>
  );
}
