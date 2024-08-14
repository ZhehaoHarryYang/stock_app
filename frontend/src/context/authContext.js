import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you import the correct jwtDecode package

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000; // Current time in seconds

          // Check if token is expired
          if (decodedToken.exp < currentTime) {
            // Token expired
            logout();
          } else {
            setIsAuthenticated(true);
            setUserName(decodedToken.userName);
          }
        } catch {
          logout();
        }
      } else {
        logout();
      }
      setIsLoading(false); // Done checking, set loading to false
    };

    checkToken();

    // Optionally, set up a periodic check (e.g., every minute)
    const interval = setInterval(checkToken, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    setIsAuthenticated(true);
    setUserName(decodedToken.userName);
    setIsLoading(false); // Ensure loading is set to false upon login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName(null);
    setIsLoading(false); // Ensure loading is set to false upon logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
