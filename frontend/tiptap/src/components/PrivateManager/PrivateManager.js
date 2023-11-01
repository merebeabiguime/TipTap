import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateManager() {
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
