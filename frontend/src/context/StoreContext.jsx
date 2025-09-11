import { createContext, useContext, useState, useEffect } from "react";
import { getAllStores } from "../api/stores";
import { getBranchesByStore } from "../api/branches";
import { getCategoriesByStore } from "../api/categories";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [activeBranch, setActiveBranch] = useState(null);

  // Load all stores
  const fetchStores = async () => {
    const data = await getAllStores();
    setStores(data);
    if (data.length > 0) {
      setActiveStore(data[0]);
    }
  };

  // Load branches when store changes
  const fetchBranches = async (storeId) => {
    const data = await getBranchesByStore(storeId);
    setBranches(data);
    if (data.length > 0) {
      setActiveBranch(data[0]);
    }
  };

  // Load categories for branch
  const fetchCategories = async (storeId) => {
    const data = await getCategoriesByStore(storeId);
    setCategories(data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    if (activeStore) {
      fetchBranches(activeStore.id);
    }
  }, [activeStore]);

  useEffect(() => {
    if (activeBranch) {
      fetchCategories(activeBranch.id);
    }
  }, [activeBranch]);

  return (
    <StoreContext.Provider
      value={{
        stores,
        branches,
        categories,
        activeStore,
        setActiveStore,
        activeBranch,
        setActiveBranch,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
