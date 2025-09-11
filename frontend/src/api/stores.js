// src/api/stores.js
import axiosInstance from "./axios";

// Create a new store
export const createStore = async (storeData) => {
  const response = await axiosInstance.post("/stores", storeData);
  return response.data;
};

// Get all stores
export const getAllStores = async () => {
  const response = await axiosInstance.get("/stores");
  return response.data;
};

// Get store by ID
export const getStoreById = async (id) => {
  const response = await axiosInstance.get(`/stores/${id}`);
  return response.data;
};

// Update store
export const updateStore = async (id, storeData) => {
  const response = await axiosInstance.put(`/stores/${id}`, storeData);
  return response.data;
};

// Delete store
export const deleteStore = async (id) => {
  const response = await axiosInstance.delete(`/stores/${id}`);
  return response.data;
};

// Moderate store status (Admin only)
export const moderateStore = async (id, status) => {
  const response = await axiosInstance.patch(`/stores/${id}/moderate`, { status });
  return response.data;
};
