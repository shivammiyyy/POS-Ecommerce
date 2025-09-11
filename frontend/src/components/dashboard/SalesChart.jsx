import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const SalesChart = () => {
  // Mock data for now, can be replaced with API
  const data = [
    { name: "Mon", sales: 2000 },
    { name: "Tue", sales: 1500 },
    { name: "Wed", sales: 3200 },
    { name: "Thu", sales: 2800 },
    { name: "Fri", sales: 4000 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};
