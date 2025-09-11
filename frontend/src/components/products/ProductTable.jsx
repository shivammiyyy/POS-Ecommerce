import React from "react";
import { DataTable } from "../common/DataTable";
import { Link } from "react-router-dom";

const ProductTable = ({ products }) => {
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category.name" },
    { header: "Price", accessor: "sellingPrice" },
    { header: "Stock", accessor: "stock" },
    {
      header: "Actions",
      accessor: (row) => (
        <Link
          to={`/products/${row.id}`}
          className="text-blue-600 hover:underline"
        >
          View
        </Link>
      ),
    },
  ];

  return <DataTable data={products} columns={columns} />;
};

export default ProductTable;
