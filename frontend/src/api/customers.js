// src/api/customers.js
import axiosInstance from "./axios";

// Create a customer
export const createCustomer = async (customerData) => {
  const response = await axiosInstance.post("/customers", customerData);
  return response.data;
};

// Update customer
export const updateCustomer = async (id, customerData) => {
  const response = await axiosInstance.put(`/customers/${id}`, customerData);
  return response.data;
};

// Delete customer
export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`/customers/${id}`);
  return response.data;
};

// Get customer by ID
export const getCustomerById = async (id) => {
  const response = await axiosInstance.get(`/customers/${id}`);
  return response.data;
};

// Get all customers
export const getAllCustomers = async () => {
  const response = await axiosInstance.get("/customers");
  return response.data;
};

// Search customers by keyword
export const searchCustomers = async (keyword) => {
  const response = await axiosInstance.get("/customers/search", {
    params: { keyword },
  });
  return response.data;
};
