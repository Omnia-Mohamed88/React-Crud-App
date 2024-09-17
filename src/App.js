import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
import AdminLayout from "./layouts/AdminLayout";
import ResetPasswordPage from "./features/ResetPassword/pages/ResetPasswordPage";
import RequireNotAuth from "components/auth/RequireNotAuth";
import RequireAuth from "components/auth/RequireAuth";
import ConditionalLayout from "layouts/ConditionalLayout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RequireNotAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/request-reset" element={<RequestResetPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={"*"} />}>
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/home" element={<ConditionalLayout />}>
              <Route index element={<Home />} /> 
            </Route>

            <Route
              element={<RequireAuth allowedRoles={["superadmin", "admin"]} />}
            >
              <Route element={<AdminLayout />}>

                <Route path="/categories" element={<List />} />
                <Route path="/categories/create" element={<Create />} />
                <Route path="/categories/update/:id" element={<Update />} />
                <Route path="/products" element={<ListProductPage />} />
                <Route
                  path="/products/create"
                  element={<CreateProductPage />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;