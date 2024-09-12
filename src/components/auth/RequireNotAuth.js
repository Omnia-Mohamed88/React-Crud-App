import UseAuth from "hooks/UseAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireNotAuth = () => {
  const { auth } = UseAuth();
  const location = useLocation();
  return !auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};

export default RequireNotAuth;

