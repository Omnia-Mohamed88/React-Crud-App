import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from 'context/AuthContext';
import AdminNavbar from 'components/AdminNavbar';

const AdminLayout = () => {
  const { isAdmin, isSuperAdmin } = useAuth();

  if (!isAdmin() && !isSuperAdmin()) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flex: 1 }}>
        <AdminNavbar /> 
        <main style={{ padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
