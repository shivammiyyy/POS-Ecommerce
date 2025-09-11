import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-xl font-bold mb-4">{product.name}</h2>
      <p>
        <strong>Category:</strong> {product.category?.name}
      </p>
      <p>
        <strong>Price:</strong> ₹{product.sellingPrice}
      </p>
      <p>
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>
        <strong>Description:</strong> {product.description || "N/A"}
      </p>
    </div>
  );
};

export default ProductDetails;
