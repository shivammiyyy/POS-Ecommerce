import React, { useState, useEffect } from "react";
import { useCategories } from "../../context/CategoryContext";
import CategoryTable from "../../components/categories/CategoryTable";
import CategoryForm from "../../components/categories/CategoryForm";
import FormModal from "../../components/common/FormModal";
import SearchBar from "../../components/common/SearchBar";
import { Button } from "@/components/ui/button";

const CategoriesPage = () => {
  const { categories, fetchCategories } = useCategories();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => setIsOpen(true)}>+ Add Category</Button>
      </div>

      <SearchBar onSearch={(q) => fetchCategories(q)} />

      <CategoryTable categories={categories} />

      <FormModal open={isOpen} onOpenChange={setIsOpen} title="Add Category">
        <CategoryForm onSuccess={() => setIsOpen(false)} />
      </FormModal>
    </div>
  );
};

export default CategoriesPage;
