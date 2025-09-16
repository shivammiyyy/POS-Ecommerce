// src/api/auth.js
import axiosInstance from "./axios";

// Login user
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

// Signup user
export const signup = async (userData) => {
  const response = await axiosInstance.post("/auth/signup", userData);
  return response.data;
};

// Logout handled on client side (no API call)

// Get current logged-in user profile
export const getUserProfile = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};
