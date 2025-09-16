import { createContext, useContext, useState, useEffect } from "react";
import { login, signup, getUserProfile } from "../api/auth";

const AuthContext = createContext();

// Role constants
export const ROLES = {
  STORE_ADMIN: "ROLE_STORE_ADMIN",
  STORE_MANAGER: "ROLE_STORE_MANAGER", 
  BRANCH_CASHIER: "ROLE_BRANCH_CASHIER"
};

// Available roles for registration
export const REGISTRATION_ROLES = [
  { value: ROLES.STORE_MANAGER, label: "Store Manager" },
  { value: ROLES.BRANCH_CASHIER, label: "Branch Cashier" }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    try {
      setError(null);
      const data = await login(credentials);
      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
      }
      if (data.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Login failed");
      throw err;
    }
  };

  const signupUser = async (userData) => {
    try {
      setError(null);
      // Ensure only allowed roles can be registered
      if (!REGISTRATION_ROLES.some(role => role.value === userData.role)) {
        throw new Error("Invalid role for registration");
      }
      
      const data = await signup(userData);
      if (data.jwt) {
        localStorage.setItem("token", data.jwt);
      }
      if (data.user) {
        setUser(data.user);
      }
      return data;
    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
    window.location.href = "/auth/login";
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      const data = await getUserProfile();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      localStorage.removeItem("token");
      setUser(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // Role checking utilities
  const hasRole = (role) => user?.role === role;
  const isStoreAdmin = () => hasRole(ROLES.STORE_ADMIN);
  const isStoreManager = () => hasRole(ROLES.STORE_MANAGER);
  const isBranchCashier = () => hasRole(ROLES.BRANCH_CASHIER);
  const hasAdminAccess = () => isStoreAdmin() || isStoreManager();
  const canManageStore = () => isStoreAdmin();
  const canManageBranch = () => isStoreAdmin() || isStoreManager();
  const canProcessOrders = () => true; // All roles can process orders

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login: loginUser,
        signup: signupUser,
        logout: logoutUser,
        fetchUser,
        // Role utilities
        hasRole,
        isStoreAdmin,
        isStoreManager,
        isBranchCashier,
        hasAdminAccess,
        canManageStore,
        canManageBranch,
        canProcessOrders,
        ROLES,
        REGISTRATION_ROLES,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
