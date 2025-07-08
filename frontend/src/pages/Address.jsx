import React from "react";
import "../styles/Address.css";
import AddressForm from "../components/AddressForm"

export default function Address() {
  return (
    <div className="bg-coffee">
      <div className="address-container">
        <h2>Address Settings</h2>
        <AddressForm route="api/address/" method="input_address"/>
      </div>
    </div>
  );
}
