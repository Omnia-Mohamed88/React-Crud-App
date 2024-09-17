import { Outlet, useNavigate } from "react-router-dom";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import UseAuth from "hooks/UseAuth";
import { useCallback, useEffect, useState } from "react";

const RequireAuth = (props) => {
  const allowedRoles = props.allowedRoles;
  const { auth } = UseAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [stillChecking, setStillChecking] = useState(true);
  const isAllowed = useCallback(async () => {
    await axiosPrivate
      .get(`profile`)
      .then((response) => {
        if (
          allowedRoles != "*" &&
          !allowedRoles.includes(response?.data?.data?.role_name)
        ) {
          navigate("/unauthorized");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setStillChecking(false));
  }, [axiosPrivate, navigate, allowedRoles]);

  useEffect(() => {
    if (!auth?.token || auth?.token === "") {
      console.log("aa");
      navigate("/login");
    } else {
      isAllowed();
    }
  }, [isAllowed, allowedRoles, auth, navigate]);

  return !stillChecking && <Outlet />;
};

export default RequireAuth;
