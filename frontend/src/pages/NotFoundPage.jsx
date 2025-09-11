import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 mt-4">Oops! Page not found.</p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
