import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import TopBar from '../components/TopBar';

// Coffee data for different buddies
const coffeeData = {
  'Bean Voyage': {
    products: [
      {
        id: 1,
        name: 'Pasaporte Roast',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop',
        description: 'A journey through international appeal in every cup.',
        flavorProfile: ['Rich', 'Bold', 'Smooth', 'International blend'],
        business: 'Bean Voyage'
      },
      {
        id: 2,
        name: 'Departure Drip',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop',
        description: 'Start your morning adventure with this energizing blend.',
        flavorProfile: ['Energizing', 'Citrus notes', 'Medium roast', 'Bright finish'],
        business: 'Bean Voyage'
      },
      {
        id: 3,
        name: "Roaster's Compass",
        image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=200&fit=crop',
        description: 'Navigate your taste buds through complex flavor territories.',
        flavorProfile: ['Complex', 'Dark roast', 'Chocolate undertones', 'Full-bodied'],
        business: 'Bean Voyage'
      }
    ]
  },
  'Beanery': {
    products: [
      {
        id: 4,
        name: 'House Blend',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=300&h=200&fit=crop',
        description: 'Our signature coffee that started it all.',
        flavorProfile: ['Balanced', 'Nutty', 'Medium roast', 'Classic taste'],
        business: 'Beanery'
      },
      {
        id: 5,
        name: 'Morning Glory',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
        description: 'Perfect morning companion with bright acidity.',
        flavorProfile: ['Bright', 'Fruity', 'Light roast', 'Morning perfect'],
        business: 'Beanery'
      }
    ]
  },
  'Brewology': {
    products: [
      {
        id: 6,
        name: 'Science Blend',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&h=200&fit=crop',
        description: 'Precisely crafted using scientific brewing methods.',
        flavorProfile: ['Precise', 'Clean', 'Methodical', 'Perfect extraction'],
        business: 'Brewology'
      }
    ]
  }
};

// Sidebar component
const Sidebar = ({ items, activeIndex, onItemClick }) => (
  <div className="sidebar">
    <div className="buddies-header">
      <h2> Buddies </h2>
    </div>
    <div className="sidebar-items">
      {items.map((item, index) => (
        <div
          key={index}
          className={`sidebar-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onItemClick(index)}
        >
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

// Product Card component
const ProductCard = ({ product, onHover, onClick }) => (
  <div 
    className="card"
    onMouseEnter={() => onHover(product)}
    onClick={() => onClick(product)}
  >
    <div 
      className="card-image"
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    ></div>
    <div className="card-text">
      <h3 className="product-name">{product.name}</h3>
    </div>
  </div>
);


// Right Panel component
const RightPanel = ({ selectedProduct, activeBuddy, onAddToCart }) => (
  
  <div className="right-panel">
    <h2 className="right-title">
      {selectedProduct?.name || `${activeBuddy}'s Coffee`}
    </h2>
    <div 
      className="right-box"
      style={{
        backgroundImage: selectedProduct ? `url(${selectedProduct.image})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    ></div>
    <div className="right-text">
      <div className="paragraph">
        {selectedProduct?.description || `Discover the finest coffee from ${activeBuddy}`}
      </div>
      {selectedProduct?.flavorProfile && (
        <ul className="bullet-list">
          {selectedProduct.flavorProfile.map((flavor, i) => (
            <li key={i} className="bullet-item">
              <span className="bullet"></span>
              <span>{flavor}</span>
            </li>
          ))}
        </ul>
      )}
      {selectedProduct && (
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(selectedProduct)}
        >
          Add to Cart
        </button>
      )}
    </div>
  </div>
);

export default function Products() {
  const sidebarItems = [
    'Bean Voyage',
    'Beanery',
    'Brewology',
    'Cafinity',
    'Kratos Coffee',
    'Pocofino',
    'Roastopia',
    'The Bean Boutique',
    'The Coffee Emporium',
    'Zussy Co.'
  ];

  const [isProductLocked, setIsProductLocked] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const activeBuddy = sidebarItems[activeIndex];
  const currentProducts = coffeeData[activeBuddy]?.products || [];

  const handleSidebarClick = (index) => {
    setActiveIndex(index);
    setSelectedProduct(null);
    setIsProductLocked(false); // Reset lock when changing buddies
  };

  const handleProductHover = (product) => {
    if (!isProductLocked) {
      setSelectedProduct(product);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductLocked(true);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      business: product.business,
      dateAdded: new Date().toLocaleDateString() // Or use a more precise date/time
    };
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedCart = [...savedCart, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  useEffect(() => {
    if (activeBuddy === 'Bean Voyage' && !selectedProduct && currentProducts.length > 0) {
      setSelectedProduct(currentProducts[0]);
    } else if (!selectedProduct && currentProducts.length > 0) {
      // If no product is selected but there are products for the active buddy, select the first one
      setSelectedProduct(currentProducts[0]);
    } else if (currentProducts.length === 0) {
      // If there are no products for the active buddy, clear selected product
      setSelectedProduct(null);
    }
  }, [activeBuddy, selectedProduct, currentProducts]);

  return (
    <div className="container">
      <TopBar />
      
      <Sidebar 
        items={sidebarItems} 
        activeIndex={activeIndex}
        onItemClick={handleSidebarClick}
      />
      <div className="main">
        <div className="content">
          <div className="main-content">
            <h1 className="page-title">{activeBuddy}</h1>
            <div className="card-grid">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    onHover={handleProductHover}
                    onClick={handleProductClick}
                  />
                ))
              ) : (
                <div className="no-products">
                  <p>Products coming soon for {activeBuddy}!</p>
                </div>
              )}
            </div>
          </div>
          <RightPanel 
            selectedProduct={selectedProduct} 
            activeBuddy={activeBuddy}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
}