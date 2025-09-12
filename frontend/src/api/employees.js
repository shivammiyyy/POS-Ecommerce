// src/api/employees.js
import axiosInstance from "./axios";

// Create employee for a store
export const createStoreEmployee = async (storeId, employeeData) => {
  const response = await axiosInstance.post(`/api/employees/store/${storeId}`, employeeData);
  return response.data;
};

// Create employee for a branch
export const createBranchEmployee = async (branchId, employeeData) => {
  const response = await axiosInstance.post(`/api/employees/branch/${branchId}`, employeeData);
  return response.data;
};

// Update employee
export const updateEmployee = async (employeeId, employeeData) => {
  const response = await axiosInstance.put(`/api/employees/${employeeId}`, employeeData);
  return response.data;
};

// Delete employee
export const deleteEmployee = async (employeeId) => {
  const response = await axiosInstance.delete(`/api/employees/${employeeId}`);
  return response.data;
};

// Get store employees by role
export const getStoreEmployees = async (id, role) => {
  const response = await axiosInstance.get(`/api/employees/store/${id}`, {
    params: { role },
  });
  return response.data;
};

// Get branch employees by role
export const getBranchEmployees = async (branchId, role) => {
  const response = await axiosInstance.get(`/api/employees/branch/${branchId}`, {
    params: { role },
  });
  return response.data;
};
