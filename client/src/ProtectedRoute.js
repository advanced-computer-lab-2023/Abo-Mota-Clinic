import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticated, userRole } = useSelector((state) => state.user);
  console.log(isAuthenticated, userRole);
  if (!isAuthenticated) {
    console.log("auth");
    // Not logged in so redirect to login page
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(userRole)) {
    // Role not authorised so redirect to a different page
    console.log("inside role");
    return <Navigate to={`/${userRole}`} />;
  }

  // Authorized so render child routes
  return <Outlet />;
};

export default ProtectedRoute;
