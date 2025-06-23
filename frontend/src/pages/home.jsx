import React from 'react';
import '../styles/Home.css'; // Home CSS

const Home = () => {
  const brewBuddies = Array(10).fill({ name: 'blah blah blah', desc: 'blah blah blah' });

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="logo">ps</div>
        <div className="header-right">
          <input type="text" className="search-bar" placeholder="Search..." />
          <div className="icons">
            <span className="icon">📥</span>
            <span className="icon">👤</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">
          Meet our <span className="highlight">Brew Buddies</span>!
        </h1>

        <div className="buddies-grid">
          {brewBuddies.map((buddy, index) => (
            <div key={index} className="buddy-card">
              <div className="buddy-avatar"></div>
              <p className="buddy-text">
                {buddy.name}
                <br />
                {buddy.desc}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
