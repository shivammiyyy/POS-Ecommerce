// src/layouts/PublicLayout.jsx
import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Add header or footer here if needed */}
      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
};

export default PublicLayout;
