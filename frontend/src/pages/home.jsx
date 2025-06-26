import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import api from "../api"
import logo from '../assets/piko_logo_green.png';
import account_circle from '../assets/account_circle.png';
import shopbag from '../assets/Shopping_bag.png';


const Home = () => {
    const [Business, setBusiness] = useState([])
    useEffect(function(){
        api.get("bean-shops/")
        .then(res => {
            console.log(res.data)
            setBusiness(res.data)
    })
    .catch(err => {
        console.log(err.message)
    })
 }, [])

    return (

    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Pikosen Logo" className="logo-img-inside" />
        </div>
        <div className="header-right">
          <input type="text" className="search-bar" placeholder="Search..." />
          <div className="icons">
          <img src={shopbag} alt="Shopping Bag" className="icon-img" />
          <img src={account_circle} alt="Account" className="icon-img" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">
          Meet our <span className="highlight">Brew Buddies</span>!
        </h1>

        <div className="buddies-grid">
          {Business.map((buddy, index) => (
            <div key={index} className="buddy-card">
              <img
                src={buddy.businessLogo}
                alt={`${buddy.businessName} logo`}
                className="buddy-avatar"
              />
              <p className="buddy-text">
                {buddy.businessName}
                <br />
                {buddy.businessDescription}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;