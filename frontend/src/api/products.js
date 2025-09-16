// src/api/products.js
import axiosInstance from "./axios";

export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/api/products", productData);
  return response.data;
};

export const getProductsByStore = async (storeId) => {
  const response = await axiosInstance.get(`/api/products/store/${storeId}`);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/api/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/api/products/${id}`);
  return response.data;
};

export const searchProducts = async (storeId, keyword) => {
  const response = await axiosInstance.get(`/api/products/store/${storeId}/search`, { params: { keyword } });
  return response.data;
};
