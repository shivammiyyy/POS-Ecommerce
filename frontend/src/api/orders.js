// src/api/orders.js
import axiosInstance from "./axios";

// Create a new order
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

// Get orders by branch (with filters: customerId, cashierId, paymentType, orderStatus)
export const getOrdersByBranch = async (branchId, filters = {}) => {
  const response = await axiosInstance.get(`/branches/${branchId}/orders`, {
    params: filters,
  });
  return response.data;
};

// Get orders by cashier
export const getOrdersByCashier = async (cashierId) => {
  const response = await axiosInstance.get(`/cashiers/${cashierId}/orders`);
  return response.data;
};

// Get today’s orders by branch
export const getTodayOrdersByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/branches/${branchId}/orders/today`);
  return response.data;
};

// Get orders by customer
export const getOrdersByCustomer = async (customerId) => {
  const response = await axiosInstance.get(`/customers/${customerId}/orders`);
  return response.data;
};

// Get top 5 recent orders in a branch
export const getTop5RecentOrders = async (branchId) => {
  const response = await axiosInstance.get(`/branches/${branchId}/orders/recent`);
  return response.data;
};

// Delete order
export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete(`/orders/${id}`);
  return response.data;
};
