import { useLocation, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RequireNotAuth = () => {
  const location = useLocation();
  const token = Cookies.get("token");
  const isAuth = 

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};
export default RequireNotAuth;
