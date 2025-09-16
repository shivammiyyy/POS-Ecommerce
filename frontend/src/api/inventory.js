// src/api/inventory.js
import axiosInstance from "./axios";

export const createInventory = async (inventoryData) => {
  const response = await axiosInstance.post("/api/inventories", inventoryData);
  return response.data;
};

export const updateInventory = async (id, inventoryData) => {
  const response = await axiosInstance.put(`/api/inventories/${id}`, inventoryData);
  return response.data;
};

export const deleteInventory = async (id) => {
  const response = await axiosInstance.delete(`/api/inventories/${id}`);
  return response.data;
};

export const getInventoryByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/api/inventories/branch/${branchId}`);
  return response.data;
};

export const getInventoryByProductAndBranch = async (productId, branchId) => {
  const response = await axiosInstance.get(`/api/inventories/branch/${branchId}/product/${productId}`);
  return response.data;
};
