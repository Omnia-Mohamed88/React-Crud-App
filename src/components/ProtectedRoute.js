import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ roles, element }) => {
  const { isAuthenticated, isAdmin, isSuperAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const hasRequiredRole = roles.some(role =>
    (role === 'admin' && isAdmin()) || (role === 'superadmin' && isSuperAdmin())
  );

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
