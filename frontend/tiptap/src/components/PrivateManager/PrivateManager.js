import React from "react";
import { Navigate, Outlet, useNavigation } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateManager() {
  const { currentUser, signOutMy, logoutMutation, userObject } =
    useUserContext();

  if (!currentUser) {
    //If Firebase Token has expired logout from mysql token
    signOutMy();

    if (!logoutMutation.isLoading) {
      return <Navigate to="/signIn"></Navigate>;
    }
  }

  if (userObject.verified === 0) {
    return <Navigate to="/verifyUser"></Navigate>;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
