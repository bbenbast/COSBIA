import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

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
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data);
    } catch (error) {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  };

  const register = async (userData, maybePassword) => {
    // Accept either register({ username, password, ageBracket }) or register(username, password, ageBracket)
    let payload = {};
    if (typeof userData === 'string') {
      payload.username = userData;
      payload.password = maybePassword;
    } else {
      payload = userData || {};
    }

    const res = await axios.post('http://localhost:5000/api/auth/register', payload);

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data);
    }

    return res.data;
  };

  const login = async (userDataOrUsername, maybePassword) => {
    // Accept either login({ username, password }) or login(username, password)
    const payload = typeof userDataOrUsername === 'string'
      ? { username: userDataOrUsername, password: maybePassword }
      : (userDataOrUsername || {});

    const res = await axios.post('http://localhost:5000/api/auth/login', payload);

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

  const value = {
    user,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};