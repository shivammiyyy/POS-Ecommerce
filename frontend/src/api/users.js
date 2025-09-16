// src/api/users.js
import axiosInstance from "./axios";

/**
 * Get the current logged-in user’s profile.
 * @returns {Promise<Object>} User profile data.
 */
export const getUserProfile = async () => {
  const response = await axiosInstance.get("/api/users/profile");
  return response.data;
};

/**
 * Get a user by their ID.
 * @param {number|string} id - The user’s ID.
 * @returns {Promise<Object>} User data.
 */
export const getUserById = async (id) => {
  const response = await axiosInstance.get(`/api/users/${id}`);
  return response.data;
};

/**
 * List all users (admin only).
 * @returns {Promise<Object[]>} Array of user objects.
 */
export const listAllUsers = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data;
};
