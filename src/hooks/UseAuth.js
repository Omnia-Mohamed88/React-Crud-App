import { useContext } from "react";
import AuthContext from "context/AuthContext";

const UseAuth = () => {
  return useContext(AuthContext);
};

export default UseAuth;
