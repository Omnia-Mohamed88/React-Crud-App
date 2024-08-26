// src/context/AuthContext.js

import React, { createContext, useContext, useState } from 'react';
import { getAuthToken } from '../services/authServices'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const isAuthenticated = () => !!getAuthToken();
  const isAdmin = () => user && user.role === 'admin'; 
  const isSuperAdmin = () => user && user.role === 'superadmin'; 

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
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
