import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-semibold">POS Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Hi, {user?.fullName}</span>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
