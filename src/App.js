import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import ProtectedRoute from 'components/ProtectedRoute';
import Create from 'features/categories/pages/Create';
import Update from 'features/categories/pages/Update';
import List from 'features/categories/pages/List';
import Home from 'pages/Home';
import ListProductPage from 'features/products/pages/ListProductPage';
import CreateProductPage from 'features/products/pages/CreateProductPage';
import LoginPage from 'features/login/pages/LoginPage';
import RegisterPage from 'features/register/pages/RegisterPage';
import RequestResetPage from 'features/reset_password/pages/RequestResetPage';
import UnauthorizedPage from 'pages/UnauthorizedPage';
import MainLayout from 'layouts/MainLayout';  
import AdminLayout from 'layouts/AdminLayout';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes with MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/request-reset" element={<RequestResetPage />} />
          </Route>

          {/* Protected routes with AdminLayout for admin and superadmin roles */}
          <Route element={<ProtectedRoute roles={['admin', 'superadmin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/categories" element={<List />} />
              <Route path="/categories/create" element={<Create />} />
              <Route path="/categories/update/:id" element={<Update />} />
              <Route path="/products" element={<ListProductPage />} />
              <Route path="/products/create" element={<CreateProductPage />} />
            </Route>
          </Route>

          {/* Unauthorized page */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
