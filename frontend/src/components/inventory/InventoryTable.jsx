import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useInventory } from "@/context/InventoryContext";
import DataTable from "@/components/common/DataTable";

const InventoryTable = ({ data }) => {
  const { deleteItem, setShowForm, setEditingItem } = useInventory();

  const columns = [
    { key: "name", label: "Name" },
    { key: "sku", label: "SKU" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "categoryId", label: "Category ID" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/inventory/${row.id}`}>
            <Button variant="secondary">View</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setEditingItem(row);
              setShowForm(true);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => deleteItem(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default InventoryTable;
