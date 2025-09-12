// src/api/users.js
import axiosInstance from "./axios";

// Get current logged-in user


// Get user by ID
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data;
};


// List all users (admin only)
export const getUserProfile = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};
