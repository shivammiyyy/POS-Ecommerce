// src/api/employees.js
import axiosInstance from "./axios";

export const createStoreEmployee = async (storeId, employeeData) => {
  const response = await axiosInstance.post(`/api/employees/store/${storeId}`, employeeData);
  return response.data;
};

export const createBranchEmployee = async (branchId, employeeData) => {
  const response = await axiosInstance.post(`/api/employees/branch/${branchId}`, employeeData);
  return response.data;
};

export const updateEmployee = async (employeeId, employeeData) => {
  const response = await axiosInstance.put(`/api/employees/${employeeId}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (employeeId) => {
  const response = await axiosInstance.delete(`/api/employees/${employeeId}`);
  return response.data;
};

export const getStoreEmployees = async (storeId, role) => {
  const response = await axiosInstance.get(`/api/employees/store/${storeId}`, { params: { role } });
  return response.data;
};

export const getBranchEmployees = async (branchId, role) => {
  const response = await axiosInstance.get(`/api/employees/branch/${branchId}`, { params: { role } });
  return response.data;
};
