import { createContext, useContext, useState } from "react";
import {
  createOrder,
  getOrderById,
  getOrdersByBranch,
  getOrdersByCashier,
  getOrdersByCustomer,
  getTodayOrdersByBranch,
  getTop5RecentOrders,
} from "../api/orders";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const placeOrder = async (orderData) => {
    try {
      const order = await createOrder(orderData);
      setOrders((prev) => [order, ...prev]);
      return order;
    } catch (err) {
      setError(err.message || "Order creation failed");
      throw err;
    }
  };

  const fetchOrderById = async (id) => {
    return await getOrderById(id);
  };

  const fetchOrdersByBranch = async (branchId) => {
    setLoading(true);
    try {
      const data = await getOrdersByBranch(branchId);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersByCashier = async (cashierId) => {
    setLoading(true);
    try {
      const data = await getOrdersByCashier(cashierId);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrdersByCustomer = async (customerId) => {
    setLoading(true);
    try {
      const data = await getOrdersByCustomer(customerId);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayOrdersByBranch = async (branchId) => {
    setLoading(true);
    try {
      const data = await getTodayOrdersByBranch(branchId);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchTop5RecentOrders = async (branchId) => {
    return await getTop5RecentOrders(branchId);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        placeOrder,
        fetchOrderById,
        fetchOrdersByBranch,
        fetchOrdersByCashier,
        fetchOrdersByCustomer,
        fetchTodayOrdersByBranch,
        fetchTop5RecentOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
