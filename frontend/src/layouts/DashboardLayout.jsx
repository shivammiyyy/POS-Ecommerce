// src/layouts/DashboardLayout.jsx
import React from "react";
import MainLayout from "./MainLayout";

const DashboardLayout = ({ children }) => {
  return (
    <MainLayout>
      {/* Possibly add dashboard specific wrappers or context */}
      {children}
    </MainLayout>
  );
};

export default DashboardLayout;
