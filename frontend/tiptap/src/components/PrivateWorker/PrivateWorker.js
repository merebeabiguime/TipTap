import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateWorker() {
  const { currentUser, signOutMy, logoutQuery } = useUserContext();

  if (!currentUser) {
    //If Firebase Token has expired logout from mysql token
    signOutMy();

    if (!logoutQuery.isLoading) {
      return <Navigate to="/signIn"></Navigate>;
    }
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
