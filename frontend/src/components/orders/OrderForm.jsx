import React, { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import { useCustomers } from "../../context/CustomerContext";
import { useInventory } from "../../context/InventoryContext";
import { Button } from "@/components/ui/button";

const OrderForm = ({ onSuccess }) => {
  const { createOrder } = useOrders();
  const { customers } = useCustomers();
  const { inventory } = useInventory();

  const [form, setForm] = useState({
    customerId: "",
    items: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder(form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Customer Select */}
      <div>
        <label className="block">Customer</label>
        <select
          className="w-full border p-2 rounded"
          value={form.customerId}
          onChange={(e) => setForm({ ...form, customerId: e.target.value })}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Items Select */}
      <div>
        <label className="block">Items</label>
        {inventory.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} (${item.price})</span>
            <input
              type="number"
              min="0"
              className="w-16 border"
              onChange={(e) => {
                const qty = parseInt(e.target.value) || 0;
                const newItems = [...form.items];
                const idx = newItems.findIndex((i) => i.productId === item.id);
                if (idx >= 0) newItems[idx].quantity = qty;
                else newItems.push({ productId: item.id, quantity: qty });
                setForm({ ...form, items: newItems });
              }}
            />
          </div>
        ))}
      </div>

      <Button type="submit">Submit Order</Button>
    </form>
  );
};

export default OrderForm;
