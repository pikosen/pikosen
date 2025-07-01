import React from "react";
import "../styles/AddProduct.css"; 

export default function AddProduct() {
  return (
    <div className="bg-coffee">
      <div className="addprod-container">
        <h2>Product Registration</h2>
          <form className="addprod-form">
          <input type="text" placeholder="Product Name" />
          <input type="text" placeholder="Price" />
          <input type="text" placeholder="Stock" />
          <input type="text" placeholder="Description" />
          <input type="text" placeholder="Origin" />
          <input type="text" placeholder="Type" />
          <input type="text" placeholder="Grams" />
          <label>Product Image</label>
          <div className="addprod-upload-box">
            <input type="file" />
            <span>Choose a file or drag it here</span>
          </div>
          <input type="text" placeholder="Business"/>
          <button type="submit">Save changes</button>
        </form>
      </div>
    </div>
  );
}
