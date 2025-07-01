import React from "react";
import "../styles/Createaccount.css";
import LogoNav from "../assets/PS_logo_leaf_or.png";

export default function Register() {
  return (
    <div className="bg-coffee">
      <div className="createaccount-container">
        <div className="logo-wrapper">
          <img src={LogoNav} alt="Logo" className="logo-img" />
        </div>
        <h2>Create Account</h2>
        <form className="createaccount-form">
          <input type="text" placeholder="Username" required />
          <input
            type="email"
            placeholder="Email"
            required
            pattern=".*@.*"
            title="Email must contain '@'"
          />

          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
