import React from "react";
import "../styles/AddProduct.css";

export default function AddressProduct() {
  return (
    <div className="bg-coffee">
      <div className="addprod-container">
        <h2>Product Registration</h2>
        <form className="addprod-form">
          <input type="text" placeholder="Product Name" />
          <input type="text" placeholder="Price" />
          <input type="text" placeholder="Stock" />
          <textarea placeholder="Description" rows="4"></textarea>
          <input type="text" placeholder="Origin" />
          <input type="text" placeholder="Type" />
          <input type="text" placeholder="Grams" />

          <label>Main Image</label>
          <div className="addprod-upload-box">
            <p>Choose a file or drag it here</p>
            <input type="file" />
          </div>

          <label>Business</label>
          <select>
            <option>Business object (1)</option>
          </select>

          <button type="submit">Submit Product</button>
        </form>
      </div>
    </div>
  );
}
