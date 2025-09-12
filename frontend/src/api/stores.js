// src/api/stores.js
import axiosInstance from "./axios";

// Create a new store
export const createStore = async (storeData) => {
  const response = await axiosInstance.post("/api/stores", storeData);
  return response.data;
};

// Get all stores
export const getAllStores = async () => {
  const response = await axiosInstance.get("/api/stores");
  return response.data;
};

// Get store by ID
export const getStoreById = async (id) => {
  const response = await axiosInstance.get(`/api/stores/${id}`);
  return response.data;
};

// Update store
export const updateStore = async (id, storeData) => {
  const response = await axiosInstance.put(`/api/stores/${id}`, storeData);
  return response.data;
};

// Delete store
export const deleteStore = async (id) => {
  const response = await axiosInstance.delete(`/api/stores/${id}`);
  return response.data;
};

// Moderate store status (Admin only)
export const moderateStore = async (id, status) => {
  const response = await axiosInstance.patch(`/api/stores/${id}/status`, { status });
  return response.data;
};

export const getStoreByAdmin = async (adminId) => {
  const response = await axiosInstance.get(`/api/stores/admin/${adminId}`);
  return response.data;
}

export const getStoreByEmployee = async (employeeId) => {
  const response = await axiosInstance.get(`/api/stores/employee/${employeeId}`);
  return response.data;
}
