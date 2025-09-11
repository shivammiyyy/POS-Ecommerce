import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const StatsCard = ({ title, value }) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
};
