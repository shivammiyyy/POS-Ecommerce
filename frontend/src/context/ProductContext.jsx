import { createContext, useContext, useState, useEffect } from "react";
import {

  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";
import { getInventoryByBranch, updateInventory } from "../api/inventory";
import { useStore } from "./StoreContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { activeBranch } = useStore();
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  // 📦 Fetch products for branch

  // 🏷️ CRUD operations
  const addProduct = async (productData) => {
    const newProduct = await createProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
  };

  const editProduct = async (id, updatedData) => {
    const updated = await updateProduct(id, updatedData);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 📊 Inventory
  const fetchInventory = async (branchId) => {
    if (!branchId) return;
    const data = await getInventoryByBranch(branchId);
    setInventory(data);
  };

  const editInventory = async (id, qty) => {
    const updated = await updateInventory(id, { quantity: qty });
    setInventory((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updated } : i))
    );
  };

  // 🔄 Auto refresh when branch changes
  useEffect(() => {
    if (activeBranch) {
      fetchInventory(activeBranch.id);
    }
  }, [activeBranch]);

  return (
    <ProductContext.Provider
      value={{
        products,
        inventory,
        addProduct,
        editProduct,
        removeProduct,
        fetchInventory,
        editInventory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
