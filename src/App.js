import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Create from "./features/Category/Page/Create";
import Update from "./features/Category/Page/Update";
import List from "./features/Category/Page/List";
import Home from "./pages/Home";
import ListProductPage from "./features/Product/pages/ListProductPage";
import CreateProductPage from "./features/Product/pages/CreateProductPage";
import LoginPage from "./features/Login/Page/Login";
import RegisterPage from "./features/Registeration/pages/RegisterPage";
import RequestResetPage from "./features/ResetPassword/pages/RequestResetPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ResetPasswordPage from "./features/ResetPassword/pages/ResetPasswordPage";
import RequireNotAuth from "components/auth/RequireNotAuth";
import UseAuth from "hooks/UseAuth";

function App() {
  // const { isAuthenticated, isAdmin, isSuperAdmin } = UseAuth();
  const { auth } = UseAuth();

  console.log(auth);

  // const Layout = isAdmin() || isSuperAdmin() ? AdminLayout : MainLayout;

  const Layout = AdminLayout;
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireNotAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/request-reset" element={<RequestResetPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/* <Route path="*" element={<PageNotFound />} /> */}
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/request-reset" element={<RequestResetPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route
            path="/"
            // element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />}
            element={<Navigate to={auth ? "/home" : "/login"} />}
          />

          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />

            <Route
              path="/categories"
              element={
                <ProtectedRoute
                  roles={["admin", "superadmin"]}
                  element={<List />}
                />
              }
            />
            <Route
              path="/categories/create"
              element={
                <ProtectedRoute
                  roles={["admin", "superadmin"]}
                  element={<Create />}
                />
              }
            />
            <Route
              path="/categories/update/:id"
              element={
                <ProtectedRoute
                  roles={["admin", "superadmin"]}
                  element={<Update />}
                />
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute
                  roles={["admin", "superadmin"]}
                  element={<ListProductPage />}
                />
              }
            />
            <Route
              path="/products/create"
              element={
                <ProtectedRoute
                  roles={["admin", "superadmin"]}
                  element={<CreateProductPage />}
                />
              }
            />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
