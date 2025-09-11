import { createContext, useContext, useState, useEffect } from "react";
import { login, signup, getUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Login
  const Login = async (credentials) => {
    const data = await login(credentials);
    setUser(data);
    return data;
  };

  // 🆕 Signup
  const Signup = async (userData) => {
    const data = await signup(userData);
    setUser(data);
    return data;
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 👤 Fetch logged-in user
  const fetchUser = async () => {
    try {
      const data = await getUser();
      setUser(data);
    } catch (err) {
        console.error("Failed to fetch user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
