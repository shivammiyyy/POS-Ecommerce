import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductDetails from "../../components/products/ProductDetails";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { selectedProduct, fetchProductById } = useProducts();

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  if (!selectedProduct) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <ProductDetails product={selectedProduct} />
    </div>
  );
};

export default ProductDetailsPage;
