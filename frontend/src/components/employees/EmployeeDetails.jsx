import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EmployeeDetails = ({ employee }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{employee.fullName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Created At:</strong> {new Date(employee.createdAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
