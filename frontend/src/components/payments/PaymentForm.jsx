import React, { useState } from "react";
import { usePayments } from "../../context/PaymentContext";
import { useOrders } from "../../context/OrderContext";
import { Button } from "@/components/ui/button";

const PaymentForm = ({ onSuccess }) => {
  const { createPayment } = usePayments();
  const { orders } = useOrders();

  const [form, setForm] = useState({
    orderId: "",
    amount: "",
    method: "CASH", // Default method
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPayment(form);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Order Select */}
      <div>
        <label className="block">Order</label>
        <select
          className="w-full border p-2 rounded"
          value={form.orderId}
          onChange={(e) => setForm({ ...form, orderId: e.target.value })}
          required
        >
          <option value="">Select Order</option>
          {orders.map((o) => (
            <option key={o.id} value={o.id}>
              Order #{o.id} — {o.customer?.fullName}
            </option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block">Amount</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className="block">Method</label>
        <select
          className="w-full border p-2 rounded"
          value={form.method}
          onChange={(e) => setForm({ ...form, method: e.target.value })}
          required
        >
          <option value="CASH">Cash</option>
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      <Button type="submit">Submit Payment</Button>
    </form>
  );
};

export default PaymentForm;
