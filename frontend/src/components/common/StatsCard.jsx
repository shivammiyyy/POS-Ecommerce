import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ title, value, icon }) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-xl font-bold">{value}</h2>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
