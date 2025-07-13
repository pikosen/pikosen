import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import TopBar from '../components/TopBar';
import api from "../api"

// Sidebar component
const Sidebar = ({ buddy, activeIndex, onItemClick }) => (
  <div className="sidebar">
    <div className="buddies-header">
      <h2> Buddies </h2>
    </div>
    <div className="sidebar-items">
      {buddy.map((buddy, index) => (
        <div
          key={index}
          className={`sidebar-item ${index === activeIndex ? 'active' : ''}`}
          onClick={() => onItemClick(index)}
        >
          <span>{buddy.businessName}</span>
        </div>
      ))}
    </div>
  </div>
);

// Product Card component
const ProductCard = ({ product, onHover, onClick }) => {
  if (!product) return null;
  
  return (
    <div 
      className="card"
      onMouseEnter={() => onHover(product)}
      onClick={() => onClick(product)}
    >
      <div 
        className="card-image"
        style={{
          backgroundImage: `url(${product.mainImg || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="card-text">
        <h3 className="product-name">{product.productName || 'Unknown Product'}</h3>
      </div>
    </div>
  );
};


// Right Panel component
const RightPanel = ({ selectedProduct, activeBuddy, onAddToCart }) => (
  
  <div className="right-panel">
    <h2 className="right-title">
      {selectedProduct?.name || `${activeBuddy.businessName}'s Coffee`}
    </h2>
    <div 
      className="right-box"
      style={{
        backgroundImage: selectedProduct ? `url(${selectedProduct.mainImg})` : 'none',
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

  const [Business, setBusiness] = useState([])
  const [Product, setProduct] = useState([])
  const [isProductLocked, setIsProductLocked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
 const activeBuddy = Business[activeIndex] || {};
const currentProducts = activeBuddy?.id ? Product.filter(product => product.business === activeBuddy.id) : [];

  const getProduct = () => {
    api
      .get(`api/bean-shops/products/`)
      .then((res) => {
        setProduct(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
  }

  const getBusiness = () => {
    api
      .get(`api/bean-shops/`)
      .then((res) => {
        setBusiness(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
  }

  useEffect(() => {
    getProduct()
    getBusiness()
  }, [])

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
        buddy={Business} 
        activeIndex={activeIndex}
        onItemClick={handleSidebarClick}
      />

      <div className="main">
        <div className="content">
          <div className="main-content">
            <h1 className="page-title">{activeBuddy?.businessName}</h1>
            <div className="card-grid">
              {currentProducts && currentProducts.length > 0 ? (
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
                  <p>Products coming soon for {activeBuddy?.businessName || 'this business'}!</p>
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