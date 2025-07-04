import React from "react";
import "../styles/register.css";
import BusinessForm from "../components/BusinessForm"

export default function Register() {
  return (
    <div className="bg-coffee">
      <div className="register-container">
        <h2>Register your business</h2>
        <BusinessForm route="api/<int:Account>/createbusiness/" method="create_business"/>
      </div>
    </div>
  );
}
