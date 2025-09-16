import { createContext, useContext, useEffect, useState } from "react";
import {
  createProduct,
  getProductsByStore,
  updateProduct,
  deleteProduct,
} from "../api/products";
import { useStore } from "./StoreContext";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { activeStore } = useStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (productData) => {
    const newProduct = await createProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  };

  const fetchProductsByStore = async (storeId) => {
    if (!storeId) return;
    setLoading(true);
    try {
      const data = await getProductsByStore(storeId);
      setProducts(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const editProduct = async (id, productData) => {
    const updated = await updateProduct(id, productData);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    if (activeStore) {
      fetchProductsByStore(activeStore.id);
    }
  }, [activeStore]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        fetchProductsByStore,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};
