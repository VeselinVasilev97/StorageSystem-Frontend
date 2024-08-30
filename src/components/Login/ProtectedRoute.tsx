import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const authToken = localStorage.getItem("authToken");

  // Redirect to login if no token is found
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
