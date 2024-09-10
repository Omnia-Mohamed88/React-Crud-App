import UseAuth from "hooks/UseAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ roles, element }) => {
  const { isAuthenticated, isAdmin, isSuperAdmin } = UseAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const hasRequiredRole = roles.some(
    (role) =>
      (role === "admin" && isAdmin()) ||
      (role === "superadmin" && isSuperAdmin())
  );

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
