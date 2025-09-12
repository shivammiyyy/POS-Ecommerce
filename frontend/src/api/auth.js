// src/api/auth.js
import axiosInstance from "./axios";

// Login user
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Signup user
export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};
// Get current logged-in user
export const getUser = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};
