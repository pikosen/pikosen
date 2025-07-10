import React from 'react';
import TopBar from '../components/TopBar';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Von Derek Arcibal",
      role: "Front End Developer",
      avatar: "", 
      socialLinks: {
        github: "akinitos",
      },
      portfolioLink: "https://akinitos.github.io/portfolio/",
    },
    {
      id: 2,
      name: "Lorelie Canete",
      role: "Quality Assurance, Developer",
      avatar: "", 
      socialLinks: {
        github: "LorelieC",
      },
      portfolioLink: "https://loreliec.github.io/my-port/"
    },
    {
      id: 3,
      name: "Jin Laurence Navarro",
      role: "UI/UX Developer",
      avatar: "", 
      socialLinks: {
        github: "mjlnavarro",
      },
      portfolioLink: "https://mjlnavarro.github.io/Portfolio/"
    },
    {
      id: 4,
      name: "Joshua Rom Pasia",
      role: "Project Leader, Developer",
      avatar: "", 
      socialLinks: {
        github: "rompasia",
      },
      portfolioLink: "https://rompasia.github.io/Portfolio/"
    },
    {
      id: 5,
      name: "Eugene Villegas",
      role: "Back End Developer",
      avatar: "", 
      socialLinks: {
        github: "eugeniuss7",
      },
      portfolioLink: "https://eugeniuss7.github.io/Portfolio/"
    }
  ];

  return (
    <div className="home-container">
    {/* Header */}
    <header className="header">
      <TopBar />
    </header>

        <div className="about-us-container">
        {/* Main Content */}
        <main className="about-main-content">
            {/* Title Section */}
            <section className="about-hero-section">
            <h1 className="about-hero-title">
                Meet our <span className="about-highlight">Team</span>!
            </h1>
            <p className="about-hero-subtitle">
                We're a passionate team of coffee enthusiasts dedicated to bringing you the best brewing experiences 
                with the best coffee beans you can find. Get to know the people behind Pikosen!
            </p>
            </section>

            {/* Team Section */}
            <section className="about-team-section">
            <h2 className="about-section-title">Our Team</h2>
            <div className="about-team-grid">
                {teamMembers.map((member) => (
                <div key={member.id} className="about-team-member">
                    <div className="about-member-avatar">
                    <img 
                        src={member.avatar} 
                        alt={`${member.name} avatar`}
                        className="about-avatar-image"
                    />
                    </div>
                    <h3 className="about-member-name">{member.name}</h3>
                    <p className="about-member-role">{member.role}</p>
                    <div className="about-social-links">
                    <div className="about-social-link">
                        <strong>github:</strong> <a href={`https://github.com/${member.socialLinks.github}`} target="_blank" rel="noopener noreferrer">{member.socialLinks.github}</a>
                    </div>
                    </div>
                    <div className="about-member-links">
                    <a href={member.portfolioLink} className="about-portfolio-link" target="_blank" rel="noopener noreferrer">
                        View Portfolio
                    </a>
                    </div>
                </div>
                ))}
            </div>
            </section>

            {/* Mission Section */}
            <section className="about-mission-section">
            <h2 className="about-section-title">Our Mission</h2>
            <p className="about-mission-text">
                At Pikosen, we believe that great coffee can make your day better. Our mission is to help 
                the coffee lovers to find the best coffee bean for their coffee experiences. 
                Whether you're a casual coffee drinker or a caffeine addict,
                we're here to help you brew the perfect cup.
            </p>
            </section>
        </main>
        </div>
    </div>
  );
};

export default AboutUs;