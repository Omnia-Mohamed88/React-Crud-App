// // import AuthContext from "context/AuthContext";
// // import { useContext } from "react";
// // // to use current user
// // const UseAuth = () => {
// //   return useContext(AuthContext);
// // };
// // // export component

// // export default UseAuth;
// // import { useContext } from "react";
// // import AuthContext from "context/AuthContext";

// // const UseAuth = () => {
// //   const auth = useContext(AuthContext);
// //   console.log("Auth Context:", auth); // Debugging line to check auth object
// //   return auth;
// // };

// // export default UseAuth;

// // hooks/UseAuth.js

import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import Cookies from 'js-cookie';

const UseAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth?.roles) {
    const roleId = Cookies.get('role_id');
    const roleName = Cookies.get('role_name');

    if (roleId && roleName) {
      return {
        ...auth,
        roles: [{ id: roleId, name: roleName }],
      };
    }
  }

  return auth;
};

export default UseAuth;


