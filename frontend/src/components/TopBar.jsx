import React, { useState, useEffect } from 'react';
import '../styles/TopBar.css'; 
import { Link } from 'react-router-dom';
import LogoNav from "../assets/PS_logo_leaf_or.png";
import ShoppingBag from '../assets/Shopping_bag.png';
import AccountCircle from '../assets/account_circle.png';
import coffeecom from '../assets/coffee_com.png';

const TopBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5vw',
      backgroundColor: '#fff9e3',
      borderBottom: '1px solid #ff6200',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      zIndex: 1000,
      boxSizing: 'border-box',
    },
    navLeft: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    logoImg: {
      maxHeight: '105px',
      width: 'auto',
      objectFit: 'contain',
      marginTop: '-22px',
      marginLeft: '-95px'
    },
    navCenter: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      height: '100%',
    },
    navRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      height: '100%',
      marginRight: '-57px'
    },
    navIcon: {
      height: isMobile ? '24px' : '30px',
      width: isMobile ? '24px' : '30px',
      cursor: 'pointer',
    },
    searchBox: {
      display: isMobile ? 'none' : 'block',
      padding: '6px 12px',
      border: '2px solid #ff6200',
      borderRadius: '10px',
      fontSize: '14px',
      fontFamily: 'Arimo, sans-serif',
      height: '36px',
      width: '160px',
      maxWidth: '40vw',
      boxSizing: 'border-box',
    },
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navLeft}>
        <Link to="/">
          <img src={LogoNav} alt="Logo" style={styles.logoImg} />
        </Link>
      </div>
      <div style={styles.navCenter}>
        <Link to="/about-us" >
          <img src= {coffeecom} alt="Coffee Com Logo" style={styles.logoImg} />
        </Link>
      </div>

      <div style={styles.navRight}>
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchBox}
        />
        <Link to="/dashboard/pk:">
          <img
            src={ShoppingBag}
            alt="Shopping Bag Icon"
            style={styles.navIcon}
          />
        </Link>
        <Link to="/dashboard/pk:">
          <img
            src={AccountCircle}
            alt="Account Circle Icon"
            style={styles.navIcon}
          />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;