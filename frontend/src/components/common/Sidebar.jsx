import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Package, Users, ShoppingCart, BarChart } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
  { to: "/products", label: "Products", icon: <Package size={18} /> },
  { to: "/customers", label: "Customers", icon: <Users size={18} /> },
  { to: "/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
  { to: "/reports", label: "Reports", icon: <BarChart size={18} /> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-lg font-bold border-b border-gray-700">
        POS System
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === item.to
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
