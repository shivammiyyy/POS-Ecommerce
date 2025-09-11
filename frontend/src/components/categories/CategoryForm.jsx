import React, { useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import { Button } from "@/components/ui/button";

const CategoryForm = ({ onSuccess }) => {
  const { createCategory } = useCategories();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block">Category Name</label>
        <input
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <Button type="submit">Save Category</Button>
    </form>
  );
};

export default CategoryForm;
