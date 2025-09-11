import React from "react";

const OrderDetails = ({ order }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Order #{order.id}</h2>
      <p><strong>Customer:</strong> {order.customer?.fullName}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.totalAmount}</p>

      <h3 className="mt-4 font-semibold">Items</h3>
      <ul className="list-disc ml-5">
        {order.items.map((item, i) => (
          <li key={i}>
            {item.product?.name} × {item.quantity} = ${item.subtotal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
