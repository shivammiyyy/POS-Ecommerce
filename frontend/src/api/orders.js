// src/api/orders.js
import axiosInstance from "./axios";

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/api/orders", orderData);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/api/orders/${id}`);
  return response.data;
};

export const getOrdersByBranch = async (branchId, filters = {}) => {
  const response = await axiosInstance.get(`/api/orders/branch/${branchId}`, { params: filters });
  return response.data;
};

export const getOrdersByCashier = async (cashierId) => {
  const response = await axiosInstance.get(`/api/orders/cashier/${cashierId}`);
  return response.data;
};

export const getTodayOrdersByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/api/orders/today/branch/${branchId}`);
  return response.data;
};

export const getOrdersByCustomer = async (customerId) => {
  const response = await axiosInstance.get(`/api/orders/customer/${customerId}`);
  return response.data;
};

export const getTop5RecentOrders = async (branchId) => {
  const response = await axiosInstance.get(`/api/orders/recent/${branchId}`);
  return response.data;
};
