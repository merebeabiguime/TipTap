import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateManager() {
  const { currentUser, userObject, getUserInfos, resetPasswordURL } =
    useUserContext();
  const [myReturn, setMyreturn] = useState(<Outlet />);

  useEffect(() => {
    if (!currentUser) {
      setMyreturn(<Navigate to="/signIn"></Navigate>);
    }
  }, [currentUser, getUserInfos]);

  useEffect(() => {
    if (getUserInfos.isSuccess) {
      if (
        currentUser &&
        !currentUser.emailVerified &&
        userObject[0].verified === 0 &&
        resetPasswordURL.current === ""
      ) {
        setMyreturn(<Navigate to="/choose-verif-method"></Navigate>);
      }
    }
  }, [getUserInfos]);

  useEffect(() => {
    console.log("reset", resetPasswordURL.current);
    if (resetPasswordURL.current !== "") {
      window.location.href = resetPasswordURL.current;
    }
  }, [resetPasswordURL]);

  return (
    getUserInfos.isSuccess &&
    resetPasswordURL.current === "" && <div>{myReturn}</div>
  );
}
