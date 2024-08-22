import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet /> 
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
