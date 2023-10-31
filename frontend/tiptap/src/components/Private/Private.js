import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function Private() {
  const { currentUser } = useUserContext();
  console.log("PRIVATE", currentUser);

  if (!currentUser) {
    return <Navigate to="/homepage"></Navigate>;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
