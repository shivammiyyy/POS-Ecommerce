// src/api/categories.js
import axiosInstance from "./axios";

// Create a category
export const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/categories", categoryData);
  return response.data;
};

// Get categories by store
export const getCategoriesByStore = async (storeId) => {
  const response = await axiosInstance.get(`/stores/${storeId}/categories`);
  return response.data;
};

// Update category
export const updateCategory = async (id, categoryData) => {
  const response = await axiosInstance.put(`/categories/${id}`, categoryData);
  return response.data;
};

// Delete category
export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/categories/${id}`);
  return response.data;
};
