import React from "react";
import { useParams } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import OrderDetails from "../../components/orders/OrderDetails";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id.toString() === id);

  if (!order) return <p>Order not found.</p>;

  return (
    <div className="p-6">
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderDetailsPage;
