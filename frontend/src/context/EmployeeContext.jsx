import { createContext, useContext, useState } from "react";
import {
  createStoreEmployee,
  createBranchEmployee,
  updateEmployee,
  deleteEmployee,
  getStoreEmployees,
  getBranchEmployees,
} from "../api/employees";

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const addStoreEmployee = async (storeId, employeeData) => {
    const emp = await createStoreEmployee(storeId, employeeData);
    setEmployees((prev) => [...prev, emp]);
    return emp;
  };

  const addBranchEmployee = async (branchId, employeeData) => {
    const emp = await createBranchEmployee(branchId, employeeData);
    setEmployees((prev) => [...prev, emp]);
    return emp;
  };

  const editEmployee = async (id, employeeData) => {
    const updated = await updateEmployee(id, employeeData);
    setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
    if (selectedEmployee?.id === id) setSelectedEmployee(updated);
    return updated;
  };

  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    if (selectedEmployee?.id === id) setSelectedEmployee(null);
  };

  const fetchStoreEmployees = async (storeId, role) => {
    setLoading(true);
    try {
      const data = await getStoreEmployees(storeId, role);
      setEmployees(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const fetchBranchEmployees = async (branchId, role) => {
    setLoading(true);
    try {
      const data = await getBranchEmployees(branchId, role);
      setEmployees(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        selectedEmployee,
        loading,
        error,
        showForm,
        editingEmployee,
        addStoreEmployee,
        addBranchEmployee,
        editEmployee,
        removeEmployee,
        fetchStoreEmployees,
        fetchBranchEmployees,
        setShowForm,
        setEditingEmployee,
        setSelectedEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("useEmployees must be used within EmployeeProvider");
  return context;
};
