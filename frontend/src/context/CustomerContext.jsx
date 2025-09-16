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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const addCustomer = async (customerData) => {
    const customer = await createCustomer(customerData);
    setCustomers((prev) => [...prev, customer]);
    return customer;
  };

  const editCustomer = async (id, customerData) => {
    const updated = await updateCustomer(id, customerData);
    setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
    if (selectedCustomer?.id === id) setSelectedCustomer(updated);
    return updated;
  };

  const removeCustomer = async (id) => {
    await deleteCustomer(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    if (selectedCustomer?.id === id) setSelectedCustomer(null);
  };

  const fetchCustomerById = async (id) => {
    const customer = await getCustomerById(id);
    setSelectedCustomer(customer);
    return customer;
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getAllCustomers();
      setCustomers(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const searchCustomerList = async (keyword) => {
    const results = await searchCustomers(keyword);
    setCustomers(results);
    return results;
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        selectedCustomer,
        loading,
        error,
        showForm,
        editingCustomer,
        addCustomer,
        editCustomer,
        removeCustomer,
        fetchCustomerById,
        fetchCustomers,
        searchCustomerList,
        setShowForm,
        setEditingCustomer,
        setSelectedCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error("useCustomers must be used within CustomerProvider");
  return context;
};
