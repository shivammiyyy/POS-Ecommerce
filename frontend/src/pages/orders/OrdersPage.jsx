import React, { useState } from "react";
import { useOrders } from "../../context/OrderContext";
import OrderTable from "../../components/orders/OrderTable";
import OrderForm from "../../components/orders/OrderForm.jsx";
import { Button } from "@/components/ui/button";
import FormModal from "../../components/common/FormModal";
import SearchBar from "../../components/common/SearchBar";

const OrdersPage = () => {
  const { orders, fetchOrders } = useOrders();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button onClick={() => setIsOpen(true)}>+ New Order</Button>
      </div>

      <SearchBar onSearch={(q) => fetchOrders(q)} />

      <OrderTable orders={orders} />

      <FormModal open={isOpen} onOpenChange={setIsOpen} title="Create Order">
        <OrderForm onSuccess={() => setIsOpen(false)} />
      </FormModal>
    </div>
);
};

export default OrdersPage;
