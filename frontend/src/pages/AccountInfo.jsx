import React, { useState } from "react";
import "../styles/Createaccount.css";
import LogoNav from "../assets/PS_logo_leaf_or.png";
import AccountForm from "../components/AccountForm";

function AccountInfo() {
  return (
    <div className="bg-coffee">
      <div className="createaccount-container">
        <h2>Product Registration</h2>
        <div className="logo-wrapper">
          <img src={LogoNav} alt="Logo" className="logo-img" />
        </div>
        <h2>Account Information</h2>
        <AccountForm route="api/user/account/" method="update_account"/>
      </div>
    </div>
  );
}

export default AccountInfo;
