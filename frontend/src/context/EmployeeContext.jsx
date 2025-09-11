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

  // ➕ Add employee to store
  const addStoreEmployee = async (employeeData, storeId) => {
    const emp = await createStoreEmployee(employeeData, storeId);
    setEmployees((prev) => [...prev, emp]);
    return emp;
  };

  // ➕ Add employee to branch
  const addBranchEmployee = async (employeeData, branchId) => {
    const emp = await createBranchEmployee(employeeData, branchId);
    setEmployees((prev) => [...prev, emp]);
    return emp;
  };

  // ✏️ Update employee
  const editEmployee = async (id, employeeData) => {
    const updated = await updateEmployee(id, employeeData);
    setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  };

  // ❌ Delete employee
  const removeEmployee = async (id) => {
    await deleteEmployee(id);
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  // 🏬 Get store employees
  const fetchStoreEmployees = async (storeId, role) => {
    const data = await getStoreEmployees(storeId, role);
    setEmployees(data);
  };

  // 🏢 Get branch employees
  const fetchBranchEmployees = async (branchId, role) => {
    const data = await getBranchEmployees(branchId, role);
    setEmployees(data);
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addStoreEmployee,
        addBranchEmployee,
        editEmployee,
        removeEmployee,
        fetchStoreEmployees,
        fetchBranchEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
