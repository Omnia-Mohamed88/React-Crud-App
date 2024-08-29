import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import ProtectedRoute from 'components/ProtectedRoute';
import Create from 'features/Categories/Page/Create';
import Update from 'features/Categories/Page/Update';
import List from 'features/Categories/Page/List';
import Home from 'pages/Home';
import ListProductPage from 'features/Products/pages/ListProductPage';
import CreateProductPage from 'features/Products/pages/CreateProductPage';
import LoginPage from 'features/Login/Page/Login';
import RegisterPage from 'features/Register/pages/RegisterPage';
import RequestResetPage from 'features/ResetPassword/pages/RequestResetPage';
import UnauthorizedPage from 'pages/UnauthorizedPage';
import MainLayout from 'layouts/MainLayout';  
import AdminLayout from 'layouts/AdminLayout';  
import ResetPasswordPage from 'features/ResetPassword/pages/ResetPasswordPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/request-reset" element={<RequestResetPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

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
