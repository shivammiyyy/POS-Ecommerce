import React, { useState } from "react";
import { useInventory } from "@/context/InventoryContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const InventoryForm = ({ initialData }) => {
  const { addItem, updateItem, setShowForm } = useInventory();
  const [formData, setFormData] = useState(
    initialData || { name: "", sku: "", quantity: 0, price: 0, categoryId: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateItem(formData);
    } else {
      addItem(formData);
    }
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Item Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
      />
      <Input
        name="quantity"
        placeholder="Quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
      />
      <Input
        name="price"
        placeholder="Price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
      />
      <Input
        name="categoryId"
        placeholder="Category ID"
        value={formData.categoryId}
        onChange={handleChange}
      />
      <Button type="submit">{initialData ? "Update" : "Add"} Item</Button>
    </form>
  );
};

export default InventoryForm;
