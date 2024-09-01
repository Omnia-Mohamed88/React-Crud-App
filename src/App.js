import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute'; 

import Create from './features/Category/Page/Create';
import Update from './features/Category/Page/Update';
import List from './features/Category/Page/List';
import Home from './pages/Home';
import ListProductPage from './features/Product/pages/ListProductPage';
import CreateProductPage from './features/Product/pages/CreateProductPage';
import LoginPage from './features/Login/Page/Login';
import RegisterPage from './features/Registeration/pages/RegisterPage';
import RequestResetPage from './features/ResetPassword/pages/RequestResetPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ResetPasswordPage from './features/ResetPassword/pages/ResetPasswordPage';

function AppRoutes() {
  const { isAuthenticated, isAdmin, isSuperAdmin } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/request-reset" element={<RequestResetPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Redirect to home if authenticated */}
      <Route path="/" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />} />

      {/* Authenticated Routes */}
      <Route element={isAdmin() || isSuperAdmin() ? <AdminLayout /> : <MainLayout />}>
        <Route path="/home" element={<Home />} />

        {/* Protected Routes */}
        <Route path="/categories" element={
          <ProtectedRoute roles={['admin', 'superadmin']} element={<List />} />
        } />
        <Route path="/categories/create" element={
          <ProtectedRoute roles={['admin', 'superadmin']} element={<Create />} />
        } />
        <Route path="/categories/update/:id" element={
          <ProtectedRoute roles={['admin', 'superadmin']} element={<Update />} />
        } />
        <Route path="/products" element={
          <ProtectedRoute roles={['admin', 'superadmin']} element={<ListProductPage />} />
        } />
        <Route path="/products/create" element={
          <ProtectedRoute roles={['admin', 'superadmin']} element={<CreateProductPage />} />
        } />

        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
