// src/api/customers.js
import axiosInstance from "./axios";

export const createCustomer = async (customerData) => {
  const response = await axiosInstance.post("/api/customers", customerData);
  return response.data;
};

export const updateCustomer = async (id, customerData) => {
  // Backend uses POST for update; keep method consistent
  const response = await axiosInstance.post(`/api/customers/${id}`, customerData);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`/api/customers/${id}`);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/api/customers/${id}`);
  return response.data;
};

export const getAllCustomers = async () => {
  const response = await axiosInstance.get("/api/customers");
  return response.data;
};

export const searchCustomers = async (keyword) => {
  const response = await axiosInstance.get("/api/customers/search", {
    params: { q: keyword },
  });
  return response.data;
};
