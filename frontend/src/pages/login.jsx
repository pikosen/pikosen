import React from "react";
import "../styles/Login.css";

import TopBar from "../components/TopBar.jsx"
import LogoMain from "../assets/Final_logo.jpg";
import LogoNav from "../assets/PS_logo_leaf_or.png";
import ShoppingBag from "../assets/Shopping_bag.png";
import AccountCircle from "../assets/account_circle.png";

function getRandomPositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const top = Math.floor(Math.random() * 80 + 20);
    const left = Math.floor(Math.random() * 100);
    if (top > 20 && top < 60 && left > 30 && left < 70) continue;
    const rotation = Math.floor(Math.random() * 60 - 30);
    positions.push({ top, left, rotation });
  }
  return positions.slice(0, count);
}

const kapePositions = getRandomPositions(40);

function LoginPage() {
  return (
    <div className="login-page bg-coffee">
      <TopBar />
      <div className="main">
        <div className="coffee-logo">
          <img src={LogoMain} alt="Piko Logo Green" className="main-logo-img" />
        </div>
        <h2 className="slogan">Brew a better day!</h2>
        <button className="google-signin">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google G logo"
          />
          Sign-in with Google
        </button>
      </div>

      <div className="kape-bg">
        {kapePositions.map((pos, index) => (
          <span
            key={index}
            style={{
              top: `${pos.top}%`,
              left: `${pos.left}%`,
              transform: `rotate(${pos.rotation}deg)`,
              position: "absolute",
            }}
          >
            kape?
          </span>
        ))}
      </div>

      <div className="beans-footer"></div>
    </div>
  );
}

export default LoginPage;