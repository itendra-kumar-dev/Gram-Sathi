import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===========================
  // Auto Login
  // ===========================
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // ===========================
  // Register
  // ===========================
  const register = async (formData) => {
    const data = await registerUser(formData);

    localStorage.setItem("token", data.token);

    setUser(data.user);

    return data;
  };

  // ===========================
  // Login
  // ===========================
  const login = async (formData) => {
    const data = await loginUser(formData);

    localStorage.setItem("token", data.token);

    setUser(data.user);

    return data;
  };

  // ===========================
  // Logout
  // ===========================
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};