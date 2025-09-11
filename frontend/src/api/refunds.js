// src/api/refunds.js
import axiosInstance from "./axios";

// Create refund
export const createRefund = async (refundData) => {
  const response = await axiosInstance.post("/refunds", refundData);
  return response.data;
};

// Get all refunds
export const getAllRefunds = async () => {
  const response = await axiosInstance.get("/refunds");
  return response.data;
};

// Get refund by cashier
export const getRefundsByCashier = async (cashierId) => {
  const response = await axiosInstance.get(`/cashiers/${cashierId}/refunds`);
  return response.data;
};

// Get refund by shift report
export const getRefundsByShiftReport = async (shiftReportId) => {
  const response = await axiosInstance.get(`/shift-reports/${shiftReportId}/refunds`);
  return response.data;
};

// Get refund by branch
export const getRefundsByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/branches/${branchId}/refunds`);
  return response.data;
};

// Get refund by ID
export const getRefundById = async (id) => {
  const response = await axiosInstance.get(`/refunds/${id}`);
  return response.data;
};

// Delete refund
export const deleteRefund = async (id) => {
  const response = await axiosInstance.delete(`/refunds/${id}`);
  return response.data;
};
