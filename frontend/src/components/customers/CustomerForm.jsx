import React, { useState } from "react";
import { useCustomers } from "@/context/CustomerContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CustomerForm = ({ initialData }) => {
  const { addCustomer, updateCustomer, setShowForm } = useCustomers();
  const [formData, setFormData] = useState(
    initialData || { fullName: "", email: "", phone: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateCustomer(formData);
    } else {
      addCustomer(formData);
    }
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <Button type="submit">{initialData ? "Update" : "Create"} Customer</Button>
    </form>
  );
};

export default CustomerForm;
