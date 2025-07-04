import React, { useState } from "react";
import "../styles/Createaccount.css";
import LogoNav from "../assets/PS_logo_leaf_or.png";

function AccountInfo({ route = "api/user/account/", method = "post" }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "female",
    age: "",
    contact: "",
    profile_photo: null,
    sellBeans: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      body.append(key, value);
    });

    try {
      await fetch(route, {
        method: method.toUpperCase(),
        body,
      });
      alert("Account information saved!");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="bg-coffee">
      <div className="createaccount-container">
        <div className="logo-wrapper">
          <img src={LogoNav} alt="Logo" className="logo-img" />
        </div>
        <h2>Account Information</h2>
        <form className="createaccount-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="gender-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>
          </div>

          <input
            type="number"
            name="age"
            placeholder="Age"
            min="0"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <div className="profile-photo-section">

            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
            <small className="placeholder-note">Please upload your profile photo here</small>
          </div>

          <label className="sell-checkbox">
            <input
              type="checkbox"
              name="sellBeans"
              checked={formData.sellBeans}
              onChange={handleChange}
            />
            I want to sell coffee beans
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AccountInfo;
