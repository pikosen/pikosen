import React from "react";
import "../styles/Address.css";

export default function Address() {
  return (
    <div className="bg-coffee">
      <div className="address-container">
        <h2>Address Settings</h2>
        <form className="address-form">
          <input type="text" placeholder="House Number" />
          <input type="text" placeholder="Street" />
          <input type="text" placeholder="Barangay" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Province" />
          <input type="text" placeholder="Postal Code" />
          
          <button type="submit">Save changes</button>
        </form>
      </div>
    </div>
  );
}
