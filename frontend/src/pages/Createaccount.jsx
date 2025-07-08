import React from "react";
import "../styles/Createaccount.css";
import LogoNav from "../assets/PS_logo_leaf_or.png";
import Form from "../components/Form"

function CreateAccount () {
  return (
        <div className="bg-coffee">
          <div className="createaccount-container">
            <div className="logo-wrapper">
                <img src={LogoNav} alt="Logo" className="logo-img" />
            </div>
            <h2>Create Account</h2>
            <Form route="api/user/register/" method="register"/>
          </div>
        </div>
  );
}

export default CreateAccount;
