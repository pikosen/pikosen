import React from 'react';
import '../styles/Home.css'; 
import bean_voyage from '../assets/logos_n_beans/logos/bean_voyage.png'; 
import beanery from '../assets/logos_n_beans/logos/beanery.png';
import brewology from '../assets/logos_n_beans/logos/brewology.png';
import cafinity from '../assets/logos_n_beans/logos/cafinity.png';  
import kratos_coffee from '../assets/logos_n_beans/logos/kratos_coffee.png';
import pocofino from '../assets/logos_n_beans/logos/pocofino.png';
import roastopia from '../assets/logos_n_beans/logos/roastopia.png';  
import the_bean_boutique from '../assets/logos_n_beans/logos/the_bean_boutique.png';
import the_coffee_emporium from '../assets/logos_n_beans/logos/the_coffee_emporium.png';
import zussy_co from '../assets/logos_n_beans/logos/zussy_co.png';
import Shopping_bag from '../assets/Shopping_bag.png';
import account_circle from '../assets/account_circle.png';
import Group_7 from '../assets/Group_7.png'; 
import PS_logo_leaf_or from '../assets/PS_logo_leaf_or.png';
import piko_logo_green from '../assets/piko_logo_green.png';
import TopBar from "../components/TopBar.jsx"


const Home = () => {
  const brewBuddies = [
    {
      name: 'Bean Voyage',
      desc: 'Embark on a journey of flavor.',
      logo: bean_voyage
    },
    {
      name: 'Beanery',
      desc: 'Where beans meet elegance.',
      logo: beanery
    },
    {
      name: 'Brewology',
      desc: 'Mastering the art of the brew.',
      logo: brewology
    },
    {
      name: 'Cafinity',
      desc: 'Infinite coffee, infinite joy.',
      logo: cafinity
    },
    {
      name: 'Kratos Coffee',
      desc: 'Strength in every sip.',
      logo: kratos_coffee
    },
    {
      name: 'Pocofino',
      desc: 'A touch of fine coffee.',
      logo: pocofino
    },
    {
      name: 'Roastopia',
      desc: 'Roasting perfection, one bean at a time.',
      logo: roastopia
    },
    {
      name: 'The Bean Boutique',
      desc: 'Curated coffee experiences.',
      logo: the_bean_boutique
    },
    {
      name: 'The Coffee Emporium',
      desc: 'Your coffee haven.',
      logo: the_coffee_emporium
    },
    {
      name: 'Sussy Co.',
      desc: 'Bold flavors, bold choices.',
      logo: zussy_co
    },
  ];

  return (
    <div className="home-container">
       <TopBar />
      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">
          Meet our <span className="highlight">Brew Buddies</span>!
        </h1>

        <div className="buddies-grid">
          {brewBuddies.map((buddy, index) => (
            <div key={index} className="buddy-card">
              <img
                src={buddy.logo}
                alt={`${buddy.name} logo`}
                className="buddy-avatar"
              />
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
