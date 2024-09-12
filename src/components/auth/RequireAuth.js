import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
