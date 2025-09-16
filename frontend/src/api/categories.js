// src/api/categories.js
import axiosInstance from "./axios";

export const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/api/categories", categoryData);
  return response.data;
};

export const getCategoriesByStore = async (storeId) => {
  const response = await axiosInstance.get(`/api/categories/store/${storeId}`);
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const response = await axiosInstance.put(`/api/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/api/categories/${id}`);
  return response.data;
};
