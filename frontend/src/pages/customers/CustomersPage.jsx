import React, { useEffect } from "react";
import { useCustomers } from "@/context/CustomerContext";
import CustomerTable from "../../components/customers/CustomerTable";
import CustomerForm from "../../components/customers/CustomerForm";
import { Button } from "@/components/ui/button";
import FormModal from "@/components/common/FormModal";

const CustomersPage = () => {
  const { customers, fetchCustomers, showForm, setShowForm } = useCustomers();

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Customer</Button>
      </div>

      <CustomerTable data={customers} />

      <FormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Customer"
      >
        <CustomerForm />
      </FormModal>
    </div>
  );
};

export default CustomersPage;
