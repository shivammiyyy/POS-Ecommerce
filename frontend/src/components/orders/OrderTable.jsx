import React from "react";
import { DataTable } from "../common/DataTable";
import { Link } from "react-router-dom";

const OrderTable = ({ orders }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Customer", accessor: "customer.fullName" },
    { header: "Total", accessor: "totalAmount" },
    { header: "Status", accessor: "status" },
    {
      header: "Actions",
      accessor: "id",
      render: (id) => <Link to={`/orders/${id}`} className="text-blue-500">View</Link>,
    },
  ];

  return <DataTable data={orders} columns={columns} />;
};

export default OrderTable;
