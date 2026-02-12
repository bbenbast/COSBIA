import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

// Set axios defaults once
axios.defaults.baseURL = API_BASE_URL;

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me'); // Now uses baseURL
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  };

  const register = async (userData, maybePassword) => {
    let payload = {};
    if (typeof userData === 'string') {
      payload.username = userData;
      payload.password = maybePassword;
    } else {
      payload = userData || {};
    }
    const res = await axios.post('/api/auth/register', payload);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data);
    }
    return res.data;
  };

  const login = async (userDataOrUsername, maybePassword) => {
    const payload = typeof userDataOrUsername === 'string'
      ? { username: userDataOrUsername, password: maybePassword }
      : (userDataOrUsername || {});
    const res = await axios.post('/api/auth/login', payload);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = { user, register, login, logout, loading };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};