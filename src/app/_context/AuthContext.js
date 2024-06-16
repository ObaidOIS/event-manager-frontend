"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { addAuthToken } from '../_utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localAuthToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  const [authToken, setAuthToken] = useState(localAuthToken);
  const router = useRouter();

  useEffect(() => {
    // Check for token in local storage on initial load
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const setLogin = (accessToken, refreshToken) => {
    setAuthToken(accessToken);
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('authRefreshToken', refreshToken);
    addAuthToken();
    router.push('/');
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRefreshToken');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, setLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
