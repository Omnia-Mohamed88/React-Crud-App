// src/components/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <aside style={{ width: '250px', background: '#f4f4f4', padding: '20px', borderRight: '1px solid #ddd' }}>
      <Link to="/admin/dashboard" style={{ display: 'block', marginBottom: '10px' }}>Dashboard</Link>
      <Link to="/admin/categories" style={{ display: 'block', marginBottom: '10px' }}>Categories</Link>
      <Link to="/admin/products" style={{ display: 'block', marginBottom: '10px' }}>Products</Link>
    </aside>
  );
};

export default AdminSidebar;
