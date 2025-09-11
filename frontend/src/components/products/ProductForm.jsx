import React, { useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";
import { Button } from "@/components/ui/button";

const ProductForm = ({ onSuccess }) => {
  const { createProduct } = useProducts();
  const { categories } = useCategories();

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    sellingPrice: "",
    stock: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block">Name</label>
        <input
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="block">Category</label>
        <select
          className="w-full border p-2 rounded"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block">Selling Price</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.sellingPrice}
          onChange={(e) =>
            setForm({ ...form, sellingPrice: parseFloat(e.target.value) })
          }
          required
        />
      </div>

      {/* Stock */}
      <div>
        <label className="block">Stock</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: parseInt(e.target.value) })
          }
          required
        />
      </div>

      <Button type="submit">Save Product</Button>
    </form>
  );
};

export default ProductForm;
