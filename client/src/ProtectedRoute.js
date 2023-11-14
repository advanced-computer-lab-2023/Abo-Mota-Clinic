import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roles }) => {
  const { isAuthenticatedClinic, userRoleClinic } = useSelector((state) => state.user);
  console.log(isAuthenticatedClinic, userRoleClinic);
  if (!isAuthenticatedClinic) {
    console.log("auth");
    // Not logged in so redirect to login page
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(userRoleClinic)) {
    // Role not authorised so redirect to a different page
    console.log("inside role");
    return <Navigate to={`/${userRoleClinic}`} />;
  }

  // Authorized so render child routes
  return <Outlet />;
};

export default ProtectedRoute;
