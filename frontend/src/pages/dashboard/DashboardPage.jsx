import React, { useEffect, useState} from "react";
import { useAuth } from "../../context/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatsCard } from "../../components/dashboard/StatsCard";
import { RecentOrders } from "../../components/dashboard/RecentOrders";
import { SalesChart } from "../../components/dashboard/SalesChart";

import {getOrdersByBranch} from "../../api/orders";
import {getProductsByStore} from "../../api/products";
import {getAllCustomers} from "../../api/customers";
import {getTodayOrdersByBranch} from "../../api/orders";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch totals from backend
        const [ordersRes, productsRes, customersRes, paymentsRes] = await Promise.all([
          getOrdersByBranch(user?.branch?.id),
          getProductsByStore(user?.store?.id),
          getAllCustomers(),
          getTodayOrdersByBranch(user?.branch?.id),
        ]);

        setStats({
          totalSales: paymentsRes.data.reduce((sum, p) => sum + p.amount, 0),
          totalOrders: ordersRes.data.length,
          totalProducts: productsRes.data.length,
          totalCustomers: customersRes.data.length,
        });

        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    if (user) fetchDashboardData();
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, {user?.fullName}</h1>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Sales" value={`₹${stats.totalSales.toFixed(2)}`} />
        <StatsCard title="Total Orders" value={stats.totalOrders} />
        <StatsCard title="Products" value={stats.totalProducts} />
        <StatsCard title="Customers" value={stats.totalCustomers} />
      </div>

      {/* Recent Orders */}
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Recent Orders</h2>
        </CardHeader>
        <CardContent>
          <RecentOrders orders={recentOrders} />
        </CardContent>
      </Card>

      {/* Sales Chart */}
      <Card className="shadow-sm">
        <CardHeader>
          <h2 className="text-lg font-semibold">Sales Overview</h2>
        </CardHeader>
        <CardContent>
          <SalesChart payments={stats.totalSales} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
