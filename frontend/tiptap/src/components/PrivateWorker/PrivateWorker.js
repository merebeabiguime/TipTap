import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateWorker() {
  const { currentUser, userObject, getUserInfos } = useUserContext();
  const [myReturn, setMyreturn] = useState(<Outlet />);

  useEffect(() => {
    if (!currentUser) {
      setMyreturn(<Navigate to="/signIn"></Navigate>);
    }
  }, [currentUser, getUserInfos]);

  useEffect(() => {
    if (getUserInfos.isSuccess) {
      if (userObject[0].verified === 0) {
        setMyreturn(<Navigate to="/verifyUser"></Navigate>);
      }
    }
  }, [getUserInfos]);

  return getUserInfos.isSuccess && <div>{myReturn}</div>;
}
