import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');

const API_URL = process.env.REACT_APP_API_URL;

export const sendPasswordResetLink = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/password/email`, { email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const resetPassword = async (email, password, password_confirmation, token) => {
  try {
    console.log('Sending data:', { email, password, password_confirmation, token });
    const response = await axios.post('http://localhost:8000/api/password/reset', {
      email,
      password,
      password_confirmation,
      token,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error.response?.data || error.message);
    throw error;
  }
};
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
      throw new Error(error.response.data.error.message);
    }
    throw new Error('An unexpected error occurred. Please try again later.');
  }
};

export const logout = () => {
  Cookies.remove('token');
  // localStorage.removeItem('user'); 
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getAuthToken(); 
};

export const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};