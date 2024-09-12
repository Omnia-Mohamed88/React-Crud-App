import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';  
import ResetPasswordPage from './features/ResetPassword/pages/ResetPasswordPage';
import RequireNotAuth from 'components/auth/RequireNotAuth';
import RequireAuth from 'components/auth/RequireAuth';
import UseAuth from 'hooks/UseAuth';

function App() {
  const auth = UseAuth();
  
  const isAdminOrSuperAdmin = auth?.roles?.some(role => role.name === "admin" || role.name === "superadmin");
  const isAuthenticated = !!auth;

  const redirectBasedOnRole = () => {
    if (isAdminOrSuperAdmin) {
      return "/categories";  
    }
    return "/home";  
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireNotAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/request-reset" element={<RequestResetPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route path="/" element={<Navigate to={isAuthenticated ? redirectBasedOnRole() : "/login"} />} />

          <Route element={<RequireAuth />}>
            <Route element={isAdminOrSuperAdmin ? <AdminLayout /> : <MainLayout />}>
              <Route path="/home" element={<Home />} />
              
              {isAdminOrSuperAdmin && (
                <>
                  <Route path="/categories" element={<List />} />
                  <Route path="/categories/create" element={<Create />} />
                  <Route path="/categories/update/:id" element={<Update />} />
                  <Route path="/products" element={<ListProductPage />} />
                  <Route path="/products/create" element={<CreateProductPage />} />
                </>
              )}
              
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
