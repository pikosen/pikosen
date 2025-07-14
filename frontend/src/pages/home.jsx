import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import api from "../api"
import TopBar from '../components/TopBar';

const baseURL = "https://pikosen.vercel.app/"

const Home = () => {
    const [Business, setBusiness] = useState([])
    useEffect(function(){
        api.get("api/bean-shops/")
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
        <TopBar />
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
                src={`${baseURL}${buddy.businessLogo}`}
                alt={`${buddy.businessName} logo`}
                className="buddy-avatar"
                style={{ width: '100px', height: '100px' }} // Add dimensions for testing
                onError={(e) => {
                  console.log("Image failed to load:", e.target.src);
                }}
                onLoad={() => {
                  console.log("Image loaded successfully");
                }}
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
