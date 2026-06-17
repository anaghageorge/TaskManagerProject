import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null); // Holds the retrieved user profile object
  const [loading, setLoading] = useState(true);

  // Function to pull user information using the active token
  const loadUser = async () => {
    try {
      const res = await axiosInstance.get("/api/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user profile:", err);
      logout(); // Instantly logs out if token is corrupted or expired
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setLoading(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user, // Exposing user.name and user.email globally
        login,
        logout,
        loading,
        isAuthenticated: !!token
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);