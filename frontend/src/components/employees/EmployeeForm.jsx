import React, { useState } from "react";
import { useEmployees } from "@/context/EmployeeContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EmployeeForm = ({ initialData }) => {
  const { addEmployee, updateEmployee, setShowForm } = useEmployees();
  const [formData, setFormData] = useState(
    initialData || { fullName: "", email: "", phone: "", role: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      updateEmployee(formData);
    } else {
      addEmployee(formData);
    }
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
      <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <Input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <Input name="role" placeholder="Role (e.g., MANAGER, CASHIER)" value={formData.role} onChange={handleChange} required />
      <Button type="submit">{initialData ? "Update" : "Create"} Employee</Button>
    </form>
  );
};

export default EmployeeForm;
