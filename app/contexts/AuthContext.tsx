'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username?: string;
  name?: string;
  email: string;
  role: string;
  balance?: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  googleLogin: (token: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Direct hardcoded API URL with /api path
  // const apiUrl = 'http://69.62.76.191:5005/api';
  const apiUrl = 'http://95.216.238.235:5005/api';

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token and get user data
          const response = await axios.get(`${apiUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data.success && response.data.data) {
            setUser(response.data.data);
            setIsLoggedIn(true);
          } else {
            // Clear invalid token
            localStorage.removeItem('token');
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [apiUrl]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, { email, password });
      
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
        return response.data;
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error.response?.data || error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if needed
      await axios.post(`${apiUrl}/auth/logout`);
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage and state, even if API fails
      localStorage.removeItem('token');
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const googleLogin = async (token: string) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/google`, { token });
      
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        setIsLoggedIn(true);
        return response.data;
      } else {
        throw new Error(response.data.error || 'Google login failed');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      throw error.response?.data || error;
    }
  };

  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    logout,
    googleLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};