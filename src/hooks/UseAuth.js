import AuthContext from "context/AuthContext";
import { useContext } from "react";
// to use current user
const UseAuth = () => {
  return useContext(AuthContext);
};
// export component
export default UseAuth;
