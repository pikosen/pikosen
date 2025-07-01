import React from 'react';
import '../styles/Login.css'; 

import LogoNav from "../assets/PS_logo_leaf_or.png";
import ShoppingBag from '../assets/Shopping_bag.png';
import AccountCircle from '../assets/account_circle.png';

const TopBar = () => (
  <header className="navbar">
    <div className="nav-left">
      <img src={LogoNav} alt="PS Logo Leaf" className="logo-img" />
    </div>
    <div className="nav-right">
      <input type="text" placeholder="Search..." className="search-box" />
      <img src={ShoppingBag} alt="Shopping Bag Icon" className="nav-icon" />
      <img src={AccountCircle} alt="Account Circle Icon" className="nav-icon" />
    </div>
  </header>
);

export default TopBar;
