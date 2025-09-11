import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEmployees } from "@/context/EmployeeContext";
import EmployeeDetails from "../../components/employees/EmployeeDetails";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const { selectedEmployee, fetchEmployeeById } = useEmployees();

  useEffect(() => {
    fetchEmployeeById(id);
  }, [id, fetchEmployeeById]);

  if (!selectedEmployee) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <EmployeeDetails employee={selectedEmployee} />
    </div>
  );
};

export default EmployeeDetailsPage;
