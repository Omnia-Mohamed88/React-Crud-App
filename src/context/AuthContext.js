import axios, { axiosPrivate } from "api/axios";
import e from "cors";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [auth, setAuth] = useState("");

  let token = Cookies.get("token");

  useEffect(() => {
    async function checkToken() {
      if (token) {
        try {
          const response = await axiosPrivate.get("/profile", {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setIsAuth(response.data.status === 200);

          setAuth({
            token: token,
            isAuth: true,
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        setAuth({
          token: token,
          isAuth: false,
        });
      }
    }

    checkToken();
  }, [token]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
