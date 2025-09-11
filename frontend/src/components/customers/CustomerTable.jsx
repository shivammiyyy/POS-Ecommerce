import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/context/CustomerContext";
import DataTable from "@/components/common/DataTable";

const CustomerTable = ({ data }) => {
  const { deleteCustomer, setShowForm, setEditingCustomer } = useCustomers();

  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/customers/${row.id}`}>
            <Button variant="secondary">View</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setEditingCustomer(row);
              setShowForm(true);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => deleteCustomer(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default CustomerTable;
