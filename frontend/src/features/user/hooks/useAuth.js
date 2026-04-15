import { useContext } from "react";
import { AuthContext } from "../user.context";
import {
  login,
  getCurrentUser,
  logout,
  register,
} from "../service/user.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const userData = await login(email, password);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token); // If you use tokens for authentication
      console.log("Login successful:", userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userName, email, password, confirmPassword) => {
    console.log("Registering user with:", { userName, email, password });
    setLoading(true);
    try {
      const userData = await register(
        email,
        userName,
        password,
        confirmPassword,
      );
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token); // If you use tokens for authentication
      console.log("Login successful:", userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Fetching current user failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    fetchCurrentUser,
  };
};
