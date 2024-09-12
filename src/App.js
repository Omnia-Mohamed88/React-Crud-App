import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
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
import ResetPasswordPage from './features/ResetPassword/pages/ResetPasswordPage';
import RequireNotAuth from 'components/auth/RequireNotAuth';
import RequireAuth from 'components/auth/RequireAuth';
import UseAuth from 'hooks/UseAuth';

function App() {
  const auth = UseAuth();
  
  const isAdminOrSuperAdmin = auth?.roles?.some(role => role.name === "admin" || role.name === "superadmin");
  const isAuthenticated = !!auth;

  console.log("Is Admin or Super Admin: ", isAdminOrSuperAdmin);

  const redirectBasedOnRole = () => {
    if (isAdminOrSuperAdmin) {
      return "/categories";  
    }
    return "/unauthorized";  
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
            <Route element={<AdminLayout />}>
              <Route path="/home" element={<Home />} />

              <Route
                path="/categories"
                element={isAdminOrSuperAdmin ? <List /> : <Navigate to="/unauthorized" />}
              />
              <Route
                path="/categories/create"
                element={isAdminOrSuperAdmin ? <Create /> : <Navigate to="/unauthorized" />}
              />
              <Route
                path="/categories/update/:id"
                element={isAdminOrSuperAdmin ? <Update /> : <Navigate to="/unauthorized" />}
              />
              <Route
                path="/products"
                element={isAdminOrSuperAdmin ? <ListProductPage /> : <Navigate to="/unauthorized" />}
              />
              <Route
                path="/products/create"
                element={isAdminOrSuperAdmin ? <CreateProductPage /> : <Navigate to="/unauthorized" />}
              />

              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
