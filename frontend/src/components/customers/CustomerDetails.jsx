import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomerDetails = ({ customer }) => {
  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>{customer.fullName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Email:</strong> {customer.email || "N/A"}</p>
        <p><strong>Phone:</strong> {customer.phone || "N/A"}</p>
        <p><strong>Created At:</strong> {new Date(customer.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(customer.updatedAt).toLocaleString()}</p>
      </CardContent>
    </Card>
  );
};

export default CustomerDetails;
