// import { createContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';
// const AuthContext = createContext({});
// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     token: Cookies.get('token') || null,
//     roles: Cookies.get('role_id') ? [{ id: Cookies.get('role_id')name: Cookies.get('role_name') }] : [],
//     isAuth: !!Cookies.get('token'),
//   });
//   useEffect(() => {
//   }[auth]);
//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// export default AuthContext;
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: Cookies.get('token') || null,
    roles: Cookies.get('role_id')
      ? [{ id: Cookies.get('role_id'), name: Cookies.get('role_name') }]
      : [],
    isAuth: !!Cookies.get('token'),
  });

  useEffect(() => {
    if (auth.token) {
      Cookies.set('token', auth.token);
      if (auth.roles.length > 0) {
        Cookies.set('role_id', auth.roles[0].id);
        Cookies.set('role_name', auth.roles[0].name);
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

