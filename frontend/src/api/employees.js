// src/api/employees.js
import axiosInstance from "./axios";

// Create employee for a store
export const createStoreEmployee = async (storeId, employeeData) => {
  const response = await axiosInstance.post(`/stores/${storeId}/employees`, employeeData);
  return response.data;
};

// Create employee for a branch
export const createBranchEmployee = async (branchId, employeeData) => {
  const response = await axiosInstance.post(`/branches/${branchId}/employees`, employeeData);
  return response.data;
};

// Update employee
export const updateEmployee = async (employeeId, employeeData) => {
  const response = await axiosInstance.put(`/employees/${employeeId}`, employeeData);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (employeeId) => {
  const response = await axiosInstance.delete(`/employees/${employeeId}`);
  return response.data;
};

// Get store employees by role
export const getStoreEmployees = async (storeId, role) => {
  const response = await axiosInstance.get(`/stores/${storeId}/employees`, {
    params: { role },
  });
  return response.data;
};

// Get branch employees by role
export const getBranchEmployees = async (branchId, role) => {
  const response = await axiosInstance.get(`/branches/${branchId}/employees`, {
    params: { role },
  });
  return response.data;
};
