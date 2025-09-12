// src/api/categories.js
import axiosInstance from "./axios";

// Create a category
export const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/api/categories", categoryData);
  return response.data;
};

// Get categories by store
export const getCategoriesByStore = async (storeId) => {
  const response = await axiosInstance.get(`/api/categories/stores/${storeId}`);
  return response.data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
  const response = await axiosInstance.put(`/api/categories/${id}`, categoryData);
  return response.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/api/categories/${id}`);
  return response.data;
};
