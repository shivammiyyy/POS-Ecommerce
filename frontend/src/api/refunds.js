// src/api/refunds.js
import axiosInstance from "./axios";

export const createRefund = async (refundData) => {
  const response = await axiosInstance.post("/api/refunds", refundData);
  return response.data;
};

export const getAllRefunds = async () => {
  const response = await axiosInstance.get("/api/refunds");
  return response.data;
};

export const getRefundsByCashier = async (cashierId) => {
  const response = await axiosInstance.get(`/api/refunds/cashier/${cashierId}`);
  return response.data;
};

export const getRefundsByShiftReport = async (shiftReportId) => {
  const response = await axiosInstance.get(`/api/refunds/shift/${shiftReportId}`);
  return response.data;
};

export const getRefundsByBranch = async (branchId) => {
  const response = await axiosInstance.get(`/api/refunds/branch/${branchId}`);
  return response.data;
};

export const getRefundById = async (id) => {
  const response = await axiosInstance.get(`/api/refunds/${id}`);
  return response.data;
};

export const deleteRefund = async (id) => {
  const response = await axiosInstance.post(`/api/refunds/delete/${id}`);
  return response.data;
};

export const getRefundByCashierAndDateRange = async (cashierId, startDate, endDate) => {
  const response = await axiosInstance.get(`/api/refunds/cashier/${cashierId}/range`, { params: { startDate, endDate } });
  return response.data;
};
