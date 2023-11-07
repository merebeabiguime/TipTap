import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/AuthContext";
export default function PrivateManager() {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <Navigate to="/homepage"></Navigate>;
  } else {
    <p>{currentUser}</p>;
  }
  return (
    <div>
      <p>{currentUser.email}</p>
      <Outlet />
    </div>
  );
}
