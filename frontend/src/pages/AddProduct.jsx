import React from "react";
import "../styles/AddProduct.css";
import ProductForm from "../components/ProductForm";

export default function AddProduct() {
  return (
    <div className="bg-coffee">
      <div className="addprod-container">
        <h2>Product Registration</h2>
        <ProductForm route="api/productlisting/" method="product_listing"/>
      </div>
    </div>
  );
}

