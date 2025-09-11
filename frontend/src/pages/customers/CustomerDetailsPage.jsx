import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCustomers } from "@/context/CustomerContext";
import CustomerDetails from "../../components/customers/CustomerDetails";

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const { selectedCustomer, fetchCustomerById } = useCustomers();

  useEffect(() => {
    fetchCustomerById(id);
  }, [id, fetchCustomerById]);

  if (!selectedCustomer) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <CustomerDetails customer={selectedCustomer} />
    </div>
  );
};

export default CustomerDetailsPage;
