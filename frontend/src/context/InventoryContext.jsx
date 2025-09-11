// src/context/InventoryContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import {
  getInventoryById,
  addInventory,
  updateInventory,
  deleteInventory,
} from "@/api/inventory";

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);   // all items
  const [loading, setLoading] = useState(false);    // loading state
  const [showForm, setShowForm] = useState(false);  // modal visibility

  // ✅ fetch all inventory
  const fetchInventory = useCallback(
    async (branchId) => {
      setLoading(true);
      try {
        const data = await getInventoryById(branchId);
        setInventory(data);
      } catch (err) {
        console.error("❌ Error fetching inventory:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ✅ add item
  const addInventoryItem = async (item) => {
    try {
      const newItem = await addInventory(item);
      setInventory((prev) => [...prev, newItem]);
      setShowForm(false);
    } catch (err) {
      console.error("❌ Error adding inventory item:", err);
    }
  };

  // ✅ update item
  const updateInventoryItem = async (id, updatedItem) => {
    try {
      const res = await updateInventory(id, updatedItem);
      setInventory((prev) =>
        prev.map((item) => (item.id === id ? res : item))
      );
      setShowForm(false);
    } catch (err) {
      console.error("❌ Error updating inventory item:", err);
    }
  };

  // ✅ delete item
  const deleteInventoryItem = async (id) => {
    try {
      await deleteInventory(id);
      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("❌ Error deleting inventory item:", err);
    }
  };

  // ✅ derived state → low stock items
  const lowStockItems = inventory.filter((item) => item.quantity < item.minStock);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        loading,
        fetchInventory,
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        lowStockItems,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);
