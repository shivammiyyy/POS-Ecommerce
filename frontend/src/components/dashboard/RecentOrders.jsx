import React from "react";
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "@/components/ui/table";

export const RecentOrders = ({ orders }) => {
  if (!orders || orders.length === 0) return <p>No recent orders found.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer?.fullName || "Walk-in"}</TableCell>
            <TableCell>₹{order.totalAmount}</TableCell>
            <TableCell>{order.orderStatus || "Pending"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
