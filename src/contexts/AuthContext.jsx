import { createContext, useState, useEffect } from "react";
import { login as loginService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Store token in localStorage when it changes
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { token } = await loginService(credentials);
      setToken(token);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isAuthenticated = () => !!token;

  const contextValue = {
    token,
    login,
    logout,
    isAuthenticated,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
