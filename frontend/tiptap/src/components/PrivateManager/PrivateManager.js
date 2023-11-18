import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateManager() {
  const { currentUser, signOutMy, userObject, accessToken } = useUserContext();
  const [myReturn, setMyreturn] = useState(<Outlet />);

  useEffect(() => {
    if (!accessToken && !currentUser) {
      setMyreturn(<Navigate to="/signIn"></Navigate>);
    } else if (!currentUser && accessToken) {
      //If Firebase Token has expired logout from mysql token
      signOutMy();
      setMyreturn(<Navigate to="/signIn"></Navigate>);
    }
  }, [accessToken, currentUser]);

  if (userObject.verified === 0) {
    return <Navigate to="/verifyUser"></Navigate>;
  }
  return <div>{myReturn}</div>;
}
