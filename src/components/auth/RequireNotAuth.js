import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireNotAuth = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  return token ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireNotAuth;
