import React from 'react';
import '../styles/Products.css'; // optional for styles

const TopBar = () => (
  <div className="top-bar">
    <div className="logo">
      <span className="logo-text">ps</span>
    </div>
    <input type="text" placeholder="Search..." className="search" />
    <div className="icon-square"><div></div></div>
    <div className="icon-circle"><div></div></div>
  </div>
);

export default TopBar;
