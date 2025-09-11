import { createContext, useContext, useState } from "react";
import {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  getAllCustomers,
  searchCustomers,
} from "../api/customers";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  // ➕ Create customer
  const addCustomer = async (customerData) => {
    const customer = await createCustomer(customerData);
    setCustomers((prev) => [...prev, customer]);
    return customer;
  };

  // ✏️ Update customer
  const editCustomer = async (id, customerData) => {
    const updated = await updateCustomer(id, customerData);
    setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  // ❌ Delete customer
  const removeCustomer = async (id) => {
    await deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  // 🔍 Search customers
  const searchCustomerList = async (keyword) => {
    const results = await searchCustomers(keyword);
    setCustomers(results);
  };

  // 📦 Fetch all
  const fetchAllCustomers = async () => {
    const data = await getAllCustomers();
    setCustomers(data);
  };

  // 📄 Fetch single
  const fetchCustomerById = async (id) => {
    return await getCustomerById(id);
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
        editCustomer,
        removeCustomer,
        searchCustomerList,
        fetchAllCustomers,
        fetchCustomerById,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
