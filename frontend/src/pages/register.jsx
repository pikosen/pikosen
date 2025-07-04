import React from "react";
import "../styles/register.css";

export default function Register() {
  return (
    <div className="bg-coffee">
      <div className="register-container">
        <h2>Register your business</h2>
        <form className="register-form">
          <input type="text" placeholder="Business Name" />
          <input type="text" placeholder="Business Description" />
          <input type="text" placeholder="Business Contact No./Landline" />

          <label>Business Logo</label>
          <div className="upload-box">
            <p>Choose a file or drag it here</p>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
