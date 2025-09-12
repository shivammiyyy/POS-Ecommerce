// src/api/branches.js
import axiosInstance from "./axios";

// Create a branch
export const createBranch = async (branchData) => {
  const response = await axiosInstance.post("/api/branches", branchData);
  return response.data;
};

// Get all branches of a store
export const getBranchesByStore = async (storeId) => {
  const response = await axiosInstance.get(`/api/branches/store/${storeId}`);
  return response.data;
};

// Get branch by ID
export const getBranchById = async (id) => {
  const response = await axiosInstance.get(`api/branches/${id}`);
  return response.data;
};

// Update branch
export const updateBranch = async (id, branchData) => {
  const response = await axiosInstance.put(`api/branches/${id}`, branchData);
  return response.data;
};

// Delete branch
export const deleteBranch = async (id) => {
  const response = await axiosInstance.delete(`api/branches/${id}`);
  return response.data;
};
