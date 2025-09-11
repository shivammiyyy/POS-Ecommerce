import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import ProductTable from "../../components/products/ProductTable";
import ProductForm from "../../components/products/ProductForm";
import FormModal from "../../components/common/FormModal";
import SearchBar from "../../components/common/SearchBar";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const { products, fetchProducts } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button onClick={() => setIsOpen(true)}>+ Add Product</Button>
      </div>

      <SearchBar onSearch={(q) => fetchProducts(q)} />

      <ProductTable products={products} />

      <FormModal open={isOpen} onOpenChange={setIsOpen} title="Add Product">
        <ProductForm onSuccess={() => setIsOpen(false)} />
      </FormModal>
    </div>
  );
};

export default ProductsPage;
