import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: Cookies.get("token") || null,
    role_id: Cookies.get("role_id") || null,
    role_name: Cookies.get("role_name") || null,
    isAuth: !!Cookies.get("token"),
  });

  useEffect(() => {
    if (auth.token) {
      Cookies.set("token", auth.token);
      Cookies.set("role_id", auth.role_id);
      Cookies.set("role_name", auth.role_name);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
