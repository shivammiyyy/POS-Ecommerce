import { createContext, useContext, useCallback, useState } from "react";
import {
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryByBranch,
  getInventoryByProductAndBranch,
} from "../api/inventory";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const addInventoryItem = async (data) => {
    const newItem = await createInventory(data);
    setInventory((prev) => [...prev, newItem]);
    setShowForm(false);
    return newItem;
  };

  const updateInventoryItem = async (id, data) => {
    const updated = await updateInventory(id, data);
    setInventory((prev) => prev.map((i) => (i.id === id ? updated : i)));
    setShowForm(false);
    return updated;
  };

  const deleteInventoryItem = async (id) => {
    await deleteInventory(id);
    setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  const fetchInventoryByBranch = useCallback(async (branchId) => {
    setLoading(true);
    try {
      const data = await getInventoryByBranch(branchId);
      setInventory(data);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInventoryByProductAndBranch = async (productId, branchId) => {
    const data = await getInventoryByProductAndBranch(productId, branchId);
    return data;
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        loading,
        error,
        showForm,
        setShowForm,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        fetchInventoryByBranch,
        fetchInventoryByProductAndBranch,
        setInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory must be used within InventoryProvider");
  return context;
};
