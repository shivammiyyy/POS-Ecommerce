import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEmployees } from "@/context/EmployeeContext";
import DataTable from "@/components/common/DataTable";

const EmployeeTable = ({ data }) => {
  const { deleteEmployee, setShowForm, setEditingEmployee } = useEmployees();

  const columns = [
    { key: "fullName", label: "Full Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/employees/${row.id}`}>
            <Button variant="secondary">View</Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setEditingEmployee(row);
              setShowForm(true);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => deleteEmployee(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
};

export default EmployeeTable;
