// src/layouts/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from 'components/AdminNavbar'; 

const AdminLayout = () => {
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
