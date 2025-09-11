// src/api/inventory.js
import axiosInstance from "./axios";

// Create inventory item
export const createInventory = async (inventoryData) => {
  const response = await axiosInstance.post("/inventory", inventoryData);
  return response.data;
};

// Update inventory item
export const updateInventory = async (id, inventoryData) => {
  const response = await axiosInstance.put(`/inventory/${id}`, inventoryData);
  return response.data;
};

// Delete inventory item
export const deleteInventory = async (id) => {
  const response = await axiosInstance.delete(`/inventory/${id}`);
  return response.data;
};

// Get inventory by ID
export const getInventoryById = async (id) => {
  const response = await axiosInstance.get(`/inventory/${id}`);
  return response.data;
};

// Get inventory by product & branch
export const getInventoryByProductAndBranch = async (productId, branchId) => {
  const response = await axiosInstance.get(`/branches/${branchId}/products/${productId}/inventory`);
  return response.data;
};

// Get all inventory for a branch
export const getInventoryByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/branches/${branchId}/inventory`);
  return response.data;
};
