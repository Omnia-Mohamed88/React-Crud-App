// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ roles, element }) => {
  const { isAuthenticated, isAdmin, isSuperAdmin } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (roles.includes('admin') && !isAdmin()) {
    return <Navigate to="/unauthorized" />;
  }

  if (roles.includes('superadmin') && !isSuperAdmin()) {
    return <Navigate to="/unauthorized" />;
  }

  return element;
};

export default ProtectedRoute;
