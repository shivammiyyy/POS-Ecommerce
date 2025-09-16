import { createContext, useContext, useState } from "react";
import {
  createCategory,
  getCategoriesByStore,
  updateCategory,
  deleteCategory,
} from "../api/categories";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addCategory = async (categoryData) => {
    const newCategory = await createCategory(categoryData);
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const fetchCategoriesByStore = async (storeId) => {
    setLoading(true);
    try {
      const data = await getCategoriesByStore(storeId);
      setCategories(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id, categoryData) => {
    const updated = await updateCategory(id, categoryData);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  };

  const removeCategory = async (id) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        addCategory,
        fetchCategoriesByStore,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) throw new Error("useCategories must be used within CategoryProvider");
  return context;
};
