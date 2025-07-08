import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import { Link } from 'react-router-dom'
import api from "../api"


function Dashboard() {
  const [activeNav, setActiveNav] = useState('Cart');
  const TOPBAR_HEIGHT = '60px';

  const [Product, setProduct] = useState([])
    useEffect(function(){
        api.get("api/product")
        .then(res => {
            console.log(res.data)
            setProduct(res.data)
    })
    .catch(err => {
        console.log(err.message)
    })
 }, [])
  const [Account, setAccount] = useState([])
      useEffect(function(){
          api.get("api/account")
          .then(res => {
              console.log(res.data)
              setAccount(res.data)
      })
      .catch(err => {
          console.log(err.message)
      })
  }, [])

  const layout = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arimo, sans-serif',
    backgroundColor: '#f8f8f8',
  };
  const contentWrapper = {
    display: 'flex',
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    marginTop: TOPBAR_HEIGHT, 
  };

  const sidebar = {
    width: '220px',
    backgroundColor: '#FFF8DC',
    color: '#5c3d2e',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px',
    borderRight: '2px solid #f4a261',
    flexShrink: 0,
  };

  const baseBtn = {
    backgroundColor: '#ffffff',
    color: '#5c3d2e',
    border: '2px solid #f4a261',
    padding: '10px',
    textAlign: 'left',
    fontSize: '15px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '8px',
    transition: 'all 0.2s ease',
  };
  const activeBtnStyle = {
    ...baseBtn,
    backgroundColor: '#FF7518',
    color: '#ffffff',
  };

  const main = {
    flex: 1,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowX: 'hidden',
    minWidth: 0,
  };

  const profileCard = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    padding: '16px',
    border: '2px solid #f4a261',
    maxWidth: '600px',
  };
  const profileIcon = {
    width: '70px',
    height: '70px',
    backgroundColor: '#cbd5e1',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    marginRight: '12px',
  };

  const sectionTitle = {
    fontSize: '20px',
    fontWeight: 600,
    color: '#5c3d2e',
    borderBottom: '1px solid #f4a261',
    paddingBottom: '4px',
    maxWidth: '600px',
  };
  const itemCard = {
    position: 'relative',
    backgroundColor: '#ffe5d0',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #f4a261',
    color: '#000',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
    maxWidth: '600px',
  };
  const removeBtn = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#FF7518',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle = {
    color: '#000',
    fontSize: '16px',
    margin: '4px 0',
  };

  const navItemsTop = [
    'Edit Account Information',
    'Add / Edit Products',
    'Edit Business',
    'Cart',
  ];
  const navItemsBottom = ['Settings', 'Logout'];
  const items = [
    { name: "Roaster's Compass", type: 'Arabica', rating: '4.8 Stars' },
    { name: 'Morning Bloom',     type: 'Robusta', rating: '4.5 Stars' },
    { name: 'Sunset Roast',      type: 'Liberica', rating: '4.6 Stars' },
    { name: 'Velvet Brew',       type: 'Excelsa', rating: '4.7 Stars' },
  ];

  return (
    <div style={layout}>
      <TopBar />

      <div style={contentWrapper}>
        <aside style={sidebar}>
          <div>
            {navItemsTop.map(label => (
              <button
                key={label}
                style={activeNav === label ? activeBtnStyle : baseBtn}
                onClick={() => setActiveNav(label)}
              >
                {label}
              </button>
            ))}
          </div>
          <div>
            {navItemsBottom.map(label => (
              <button
                key={label}
                style={activeNav === label ? activeBtnStyle : baseBtn}
                onClick={() => setActiveNav(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <main style={main}>
          <section style={profileCard}>
            {Account.map((account) => (
            <div>
              <div style={profileIcon}>
                <img
                src={account.profilePhoto}
                alt={`${account.name} photo`}
                style={profileIcon}
              />
              </div>
              <div>
                <h2 style={{ ...textStyle, fontSize: '20px', color: '#5c3d2e' }}>
                  {account.name}
                </h2>
                <p style={{ ...textStyle, fontSize: '14px', color: '#444' }}>
                <strong>Contact:</strong> {account.contact}
              </p>
              <p style={{ ...textStyle, fontSize: '14px', color: '#444' }}>
                <strong>Email:</strong> {account.user.email}
              </p>
              </div>
            </div>
          ))}
          </section>

          <h3 style={sectionTitle}>All Items</h3>

          <div>
            {Product.map((item, idx) => (
              <div key={idx} style={itemCard}>
                <div>
                  <h4 style={textStyle}>{item.name}</h4>
                  <p style={textStyle}>Type: {item.type}</p>
                  <p style={textStyle}>Business Brand: {item.Business}</p>
                </div>
                <button style={removeBtn}>X</button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;