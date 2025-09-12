// src/api/refunds.js
import axiosInstance from "./axios";

// Create refund
export const createRefund = async (refundData) => {
  const response = await axiosInstance.post("/api/refunds", refundData);
  return response.data;
};

// Get all refunds
export const getAllRefunds = async () => {
  const response = await axiosInstance.get("/api/refunds");
  return response.data;
};

// Get refund by cashier
export const getRefundsByCashier = async (cashierId) => {
  const response = await axiosInstance.get(`/api/refunds/cashiers/${cashierId}`);
  return response.data;
};

// Get refund by shift report
export const getRefundsByShiftReport = async (shiftReportId) => {
  const response = await axiosInstance.get(`/api/refunds/shift/${shiftReportId}`);
  return response.data;
};

// Get refund by branch
export const getRefundsByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/api/refunds/branches/${branchId}`);
  return response.data;
};

// Get refund by ID
export const getRefundById = async (id) => {
  const response = await axiosInstance.get(`/api/refunds/${id}`);
  return response.data;
};

// Delete refund
export const deleteRefund = async (id) => {
  const response = await axiosInstance.delete(`/api/refunds/delete/${id}`);
  return response.data;
};

export const getRefundByCashierAndDateRange = async (cashierId, startDate, endDate) => {
  const response = await axiosInstance.get(`/api/refunds/cashiers/${cashierId}/range`, {
    params: { startDate, endDate },
  });
  return response.data;
}


