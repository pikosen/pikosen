import React from 'react';
import '../styles/Login.css'; 
import { Link } from 'react-router-dom';


import LogoNav from "../assets/PS_logo_leaf_or.png";
import ShoppingBag from '../assets/Shopping_bag.png';
import AccountCircle from '../assets/account_circle.png';

const TopBar = () => (
  <div className="navbar">
    <div className="nav-left">
        <Link
          src={LogoNav}
          alt="Logo"
          className="logo-img"
          style={{ maxHeight: '130px', marginTop: '-57px',marginLeft: '-55px' }}
        />
    </div>
    <div className="nav-right">
      <input type="text" placeholder="Search..." className="search-box" />
      <img src={ShoppingBag} alt="Shopping Bag Icon" className="nav-icon" />
      <img src={AccountCircle} alt="Account Circle Icon" className="nav-icon" />
    </div>
  </div>
);

export default TopBar;
