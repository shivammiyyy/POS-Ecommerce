import { createContext, useContext, useState } from "react";
import {
  createBranch,
  getBranchById,
  getBranchesByStore,
  updateBranch,
  deleteBranch,
} from "../api/branches";

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  const addBranch = async (branchData) => {
    const newBranch = await createBranch(branchData);
    setBranches((prev) => [...prev, newBranch]);
    return newBranch;
  };

  const fetchBranchById = async (id) => {
    return await getBranchById(id);
  };

  const fetchBranchesByStore = async (storeId) => {
    setLoading(true);
    try {
      const data = await getBranchesByStore(storeId);
      setBranches(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const editBranch = async (id, branchData) => {
    const updated = await updateBranch(id, branchData);
    setBranches((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  };

  const removeBranch = async (id) => {
    await deleteBranch(id);
    setBranches((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BranchContext.Provider
      value={{
        branches,
        loading,
        error,
        addBranch,
        fetchBranchById,
        fetchBranchesByStore,
        editBranch,
        removeBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export const useBranches = () => {
  const context = useContext(BranchContext);
  if (!context) throw new Error("useBranches must be used within BranchProvider");
  return context;
};
