import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ChartCard = ({ title, children }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <h2 className="text-lg font-semibold">{title}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ChartCard;
