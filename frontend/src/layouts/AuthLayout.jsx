// src/layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
