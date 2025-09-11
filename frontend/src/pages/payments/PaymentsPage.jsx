import React, { useState } from "react";
import { usePayments } from "../../context/PaymentContext";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentForm from "../../components/payments/PaymentForm";
import { Button } from "@/components/ui/button";
import FormModal from "../../components/common/FormModal";
import SearchBar from "../../components/common/SearchBar";

const PaymentsPage = () => {
  const { payments, fetchPayments } = usePayments();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Button onClick={() => setIsOpen(true)}>+ New Payment</Button>
      </div>

      <SearchBar onSearch={(q) => fetchPayments(q)} />

      <PaymentTable payments={payments} />

      <FormModal open={isOpen} onOpenChange={setIsOpen} title="Record Payment">
        <PaymentForm onSuccess={() => setIsOpen(false)} />
      </FormModal>
    </div>
  );
};

export default PaymentsPage;
