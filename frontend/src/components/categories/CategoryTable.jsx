import React from "react";
import { DataTable } from "../common/DataTable";

const CategoryTable = ({ categories }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Created At", accessor: "createdAt" },
  ];

  return <DataTable data={categories} columns={columns} />;
};

export default CategoryTable;
