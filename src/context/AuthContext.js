import React, { createContext, useContext, useState } from 'react';
import { getAuthToken } from '../services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const isAuthenticated = () => !!getAuthToken();
  
  const hasRole = (role) => user && user.roles && user.roles.includes(role);
  
  const isAdmin = () => hasRole('admin'); 
  const isSuperAdmin = () => hasRole('superadmin'); 

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, isSuperAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
