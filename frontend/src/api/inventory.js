// src/api/inventory.js
import axiosInstance from "./axios";

// Create inventory item
export const createInventory = async (inventoryData) => {
  const response = await axiosInstance.post("/api/inventories", inventoryData);
  return response.data;
};

// Update inventory item
export const updateInventory = async (id, inventoryData) => {
  const response = await axiosInstance.put(`/api/inventories/${id}`, inventoryData);
  return response.data;
};

// Delete inventory item
export const deleteInventory = async (id) => {
  const response = await axiosInstance.delete(`/api/inventories/${id}`);
  return response.data;
};


// Get inventory by product & branch
export const getInventoryByProductAndBranch = async (productId, branchId) => {
  const response = await axiosInstance.get(`/api/inventories/branch/${branchId}/product/${productId}`);
  return response.data;
};

// Get all inventory for a branch
export const getInventoryByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/api/inventories/branches/${branchId}`);
  return response.data;
};
