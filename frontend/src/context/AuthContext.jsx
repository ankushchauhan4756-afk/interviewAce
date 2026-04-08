import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      // Fetch user profile after login
      await checkAuth();
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      throw error;
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      const response = await authAPI.register({ name, email, password });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      // Fetch user profile after registration
      await checkAuth();
      return response.data;
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};
