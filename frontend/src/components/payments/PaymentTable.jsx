import React from "react";
import { DataTable } from "../common/DataTable";

const PaymentTable = ({ payments }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Order ID", accessor: "order.id" },
    { header: "Amount", accessor: "amount" },
    { header: "Method", accessor: "method" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "createdAt" },
  ];

  return <DataTable data={payments} columns={columns} />;
};

export default PaymentTable;
