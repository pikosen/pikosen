import React from 'react';

const Dashboard = () => {
  const items = [
    { name: "Roaster's Compass", type: 'Arabica', rating: '4.8 Stars' },
    { name: 'Morning Bloom', type: 'Robusta', rating: '4.5 Stars' },
    { name: 'Sunset Roast', type: 'Liberica', rating: '4.6 Stars' },
    { name: 'Velvet Brew', type: 'Excelsa', rating: '4.7 Stars' },
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div>
          <button className="nav-btn">Edit Account Information</button>
          <button className="nav-btn">Add / Edit Products</button>
          <button className="nav-btn">Edit Business</button>
          <button className="nav-btn nav-btn--active">Cart</button>
        </div>
        <div>
          <button className="nav-btn">Settings</button>
          <button className="nav-btn">Logout</button>
        </div>
      </aside>

      <main className="main">
        <section className="profile-card">
          <div className="profile-icon">👤</div>
          <div>
            <h2 className="profile-name">Lebron Raymone James</h2>
            <p className="profile-info"><strong>ID:</strong> +63 234 123 3453</p>
            <p className="profile-info"><strong>Email:</strong> lebronthegoat@gmail.com</p>
          </div>
        </section>

        <h3 className="section-title">All Items</h3>

        <div className="items-list">
          {items.map((item, idx) => (
            <div key={idx} className="item-card">
              <div>
                <h4 className="item-name">{item.name}</h4>
                <p className="item-detail">Type: {item.type}</p>
                <p className="item-detail">Rating: {item.rating}</p>
              </div>
              <button className="remove-btn">X</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;