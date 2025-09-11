import { createContext, useContext, useState } from "react";
import {
  createOrder,
  getOrderById,
  getOrdersByBranch,
  getOrdersByCashier,
  getOrdersByCustomer,
  getTodayOrdersByBranch,
  getTop5RecentOrders,
  deleteOrder,
} from "../api/orders";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // 🆕 Create new order
  const placeOrder = async (orderData) => {
    const order = await createOrder(orderData);
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  // 📦 Get order by ID
  const fetchOrderById = async (id) => {
    return await getOrderById(id);
  };

  // 🏬 Orders by branch
  const fetchOrdersByBranch = async (branchId) => {
    const data = await getOrdersByBranch(branchId);
    setOrders(data);
  };

  // 👨‍💼 Orders by cashier
  const fetchOrdersByCashier = async (cashierId) => {
    const data = await getOrdersByCashier(cashierId);
    setOrders(data);
  };

  // 👤 Orders by customer
  const fetchOrdersByCustomer = async (customerId) => {
    const data = await getOrdersByCustomer(customerId);
    setOrders(data);
  };

  // 📅 Today’s orders
  const fetchTodayOrders = async (branchId) => {
    const data = await getTodayOrdersByBranch(branchId);
    setOrders(data);
  };

  // 🕔 Top 5 recent
  const fetchTop5Recent = async (branchId) => {
    const data = await getTop5RecentOrders(branchId);
    setOrders(data);
  };

  // ❌ Delete order
  const removeOrder = async (id) => {
    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        fetchOrderById,
        fetchOrdersByBranch,
        fetchOrdersByCashier,
        fetchOrdersByCustomer,
        fetchTodayOrders,
        fetchTop5Recent,
        removeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
