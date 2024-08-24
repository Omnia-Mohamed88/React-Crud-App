// src/services/authServices.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL 

export const sendPasswordResetLink = async (email) => {
    try {
      const response = await axios.post(`${API_URL}/password/email`, { email });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Network Error');
      }
      throw new Error('Network Error');
    }
  };

  export const resetPassword = async (email, password, password_confirmation, token) => {
    try {
      const response = await axios.post(`${API_URL}/password/reset`, {
        email,
        password,
        password_confirmation,
        token
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'An error occurred');
    }
  };
export const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password, password_confirmation });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        throw error.response.data.errors; 
      }
      throw new Error('Network Error');
    }
  };

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; 
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

export const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
