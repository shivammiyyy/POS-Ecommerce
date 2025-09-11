// src/api/products.js
import axiosInstance from "./axios";

// Create a new product
export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);
  return response.data;
};

// Get products by store ID
export const getProductsByStore = async (storeId) => {
  const response = await axiosInstance.get(`/stores/${storeId}/products`);
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/products/${id}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

// Search products in store by keyword
export const searchProducts = async (storeId, keyword) => {
  const response = await axiosInstance.get(`/stores/${storeId}/products/search`, {
    params: { keyword },
  });
  return response.data;
};
