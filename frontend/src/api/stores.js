// src/api/stores.js
import axiosInstance from "./axios";

export const createStore = async (storeData) => {
  const response = await axiosInstance.post("/api/stores", storeData);
  return response.data;
};

export const getAllStores = async () => {
  const response = await axiosInstance.get("/api/stores");
  return response.data;
};

export const getStoreById = async (id) => {
  const response = await axiosInstance.get(`/api/stores/${id}`);
  return response.data;
};

export const updateStore = async (id, storeData) => {
  const response = await axiosInstance.put(`/api/stores/${id}`, storeData);
  return response.data;
};

export const deleteStore = async (id) => {
  const response = await axiosInstance.delete(`/api/stores/${id}`);
  return response.data;
};

export const moderateStore = async (id, status) => {
  const response = await axiosInstance.put(`/api/stores/${id}/status?status=${status}`);
  return response.data;
};

export const getStoreByAdmin = async () => {
  // Backend endpoint expects no ID param here
  const response = await axiosInstance.get(`/api/stores/admin`);
  return response.data;
};

export const getStoreByEmployee = async () => {
  // Backend endpoint expects no ID param here
  const response = await axiosInstance.get(`/api/stores/employee`);
  return response.data;
};
