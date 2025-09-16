import { createContext, useContext, useState, useEffect } from "react";
import {
  getAllStores,
  createStore,
  updateStore,
  deleteStore,
  getStoreById,
  getStoreByAdmin,
  getStoreByEmployee,
  moderateStore,
} from "../api/stores";
import { getBranchesByStore } from "../api/branches";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const data = await getAllStores();
      setStores(data);
      if (data.length > 0) setActiveStore(data[0]);
    } catch (err) {
      setError(err.message || "Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const addStore = async (storeData) => {
    const newStore = await createStore(storeData);
    setStores((prev) => [...prev, newStore]);
    return newStore;
  };

  const editStore = async (id, storeData) => {
    const updatedStore = await updateStore(id, storeData);
    setStores((prev) => prev.map((s) => (s.id === id ? updatedStore : s)));
    if (activeStore?.id === id) setActiveStore(updatedStore);
    return updatedStore;
  };

  const removeStore = async (id) => {
    await deleteStore(id);
    setStores((prev) => prev.filter((s) => s.id !== id));
    if (activeStore?.id === id) setActiveStore(stores[0] || null);
  };

  const moderateStoreStatus = async (id, status) => {
    const moderated = await moderateStore(id, status);
    setStores((prev) => prev.map((s) => (s.id === id ? moderated : s)));
    return moderated;
  };

  const fetchBranches = async (storeId) => {
    const data = await getBranchesByStore(storeId);
    setBranches(data);
    if (data.length > 0) setActiveBranch(data[0]);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (activeStore) fetchBranches(activeStore.id);
  }, [activeStore]);

  return (
    <StoreContext.Provider
      value={{
        stores,
        branches,
        activeStore,
        activeBranch,
        loading,
        error,
        fetchStores,
        addStore,
        editStore,
        removeStore,
        moderateStoreStatus,
        fetchBranches,
        setActiveStore,
        setActiveBranch,
        getStoreByAdmin,
        getStoreByEmployee,
        getStoreById,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
