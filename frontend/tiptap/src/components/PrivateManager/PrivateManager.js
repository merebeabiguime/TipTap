import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateManager() {
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
