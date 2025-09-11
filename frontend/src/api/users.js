// src/api/users.js
import axiosInstance from "./axios";

// Get current logged-in user


// Get user by ID
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// Update user profile
export const updateUser = async (id, userData) => {
  const response = await axiosInstance.put(`/users/${id}`, userData);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};

// List all users (admin only)
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
