import React, { useEffect } from "react";
import { useEmployees } from "@/context/EmployeeContext";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeForm from "../../components/employees/EmployeeForm";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/common/FormModal";

const EmployeesPage = () => {
  const { employees, fetchEmployees, showForm, setShowForm } = useEmployees();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Employee</Button>
      </div>

      <EmployeeTable data={employees} />

      <FormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Employee"
      >
        <EmployeeForm />
      </FormModal>
    </div>
  );
};

export default EmployeesPage;
