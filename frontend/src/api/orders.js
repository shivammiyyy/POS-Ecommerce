// src/api/orders.js
import axiosInstance from "./axios";

// Create a new order
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/api/orders", orderData);
  return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/api/orders/${id}`);
  return response.data;
};

// Get orders by branch (with filters: customerId, cashierId, paymentType, orderStatus)
export const getOrdersByBranch = async (branchId, filters = {}) => {
  const response = await axiosInstance.get(`/api/orders/branches/${branchId}`, {
    params: filters,
  });
  return response.data;
};

// Get orders by cashier
export const getOrdersByCashier = async (cashierId) => {
  const response = await axiosInstance.get(`/api/orders/cashiers/${cashierId}`);
  return response.data;
};

// Get today’s orders by branch
export const getTodayOrdersByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/api/orders/today/branches/${branchId}`);
  return response.data;
};

// Get orders by customer
export const getOrdersByCustomer = async (customerId) => {
  const response = await axiosInstance.get(`/api/orders/customers/${customerId}`);
  return response.data;
};

// Get top 5 recent orders in a branch
export const getTop5RecentOrders = async (branchId) => {
  const response = await axiosInstance.get(`/api/orders/recent/branches/${branchId}`);
  return response.data;
};

