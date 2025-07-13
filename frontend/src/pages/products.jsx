"use client"

import { useState, useEffect } from "react"
import "../styles/Products.css"
import TopBar from "../components/TopBar"
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
          className={`sidebar-item ${index === activeIndex ? "active" : ""}`}
          onClick={() => onItemClick(index)}
        >
          <span>{buddy.businessName}</span>
        </div>
      ))}
    </div>
  </div>
)

// Product Card component
const ProductCard = ({ product, onHover, onClick }) => {
  if (!product) return null

  return (
    <div className="card" onMouseEnter={() => onHover(product)} onClick={() => onClick(product)}>
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${product.mainImg || "/placeholder.svg"})`, // Added placeholder for safety
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="card-text">
        <h3 className="product-name">{product.productName || "Unknown Product"}</h3>
      </div>
    </div>
  )
}

// Right Panel component
const RightPanel = ({ selectedProduct, activeBuddy, onAddToCart }) => (
  <div className="right-panel">
    <h2 className="right-title">
      {selectedProduct?.productName || `${activeBuddy.businessName || "Selected"}'s Coffee`}
    </h2>
    <div
      className="right-box"
      style={{
        backgroundImage: selectedProduct ? `url(${selectedProduct.mainImg || "/placeholder.svg"})` : "none", // Added placeholder for safety
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
    <div className="right-text">
      <div className="paragraph">
        {selectedProduct?.description ||
          `Discover the finest coffee from ${activeBuddy.businessName || "this business"}`}
      </div>
        {
          selectedProduct?.type 
          ? <ul className="bullet-list">
              <li className="bullet-item">
                <span className="bullet"></span>
                <span>{selectedProduct?.type}</span>
              </li>
              <li className="bullet-item">
                <span className="bullet"></span>
                <span>{selectedProduct?.origin}</span>
              </li>
              <li className="bullet-item">
                <span className="bullet"></span>
                <span>{selectedProduct?.grams}g</span>
              </li>
              <li className="bullet-item">
                <h3>Price:</h3>
                <h3>P{selectedProduct?.price}</h3>
              </li>
            </ul>
          : "No product information"
        }
      {selectedProduct && (
        <button className="add-to-cart-btn" onClick={() => onAddToCart(selectedProduct)}>
          Add to Cart
        </button>
      )}
    </div>
  </div>
)

export default function Products() {
  const [Business, setBusiness] = useState([])
  const [Product, setProduct] = useState([])
  const [isProductLocked, setIsProductLocked] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const activeBuddy = Business[activeIndex] || {}
  const currentProducts = activeBuddy?.id ? Product.filter((product) => product.business === activeBuddy.id) : []

  const getProduct = () => {
    api
      .get(`api/bean-shops/products/`)
      .then((res) => {
        setProduct(res.data)
        console.log("Fetched Products:", res.data)
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
        console.log("Fetched Businesses:", res.data)
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error)
      })
  }

  useEffect(() => {
    getProduct()
    getBusiness()
  }, [])

  const handleSidebarClick = (index) => {
    setActiveIndex(index)
    setSelectedProduct(null)
    setIsProductLocked(false) // Reset lock when changing buddies
  }

  const handleProductHover = (product) => {
    if (!isProductLocked) {
      setSelectedProduct(product)
    }
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsProductLocked(true)
  }

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.productName, // Use productName from backend
      business: product.business,
      dateAdded: new Date().toLocaleDateString(), // Or use a more precise date/time
    }
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || []
    const updatedCart = [...savedCart, cartItem]
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
    alert(`${product.productName} added to cart!`)
  }

  useEffect(() => {
    // When activeBuddy or currentProducts change, try to set a default selected product
    if (currentProducts.length > 0) {
      // If no product is currently selected, or the selected product is no longer in the current list,
      // select the first product of the current buddy.
      if (!selectedProduct || !currentProducts.some((p) => p.id === selectedProduct.id)) {
        setSelectedProduct(currentProducts[0])
      }
    } else {
      // If there are no products for the active buddy, clear selected product
      setSelectedProduct(null)
    }
  }, [activeBuddy, currentProducts]) // Depend on activeBuddy and currentProducts

  return (
    <div className="container">
      <TopBar />

      <div className="main-layout">
        <Sidebar buddy={Business} activeIndex={activeIndex} onItemClick={handleSidebarClick} />
        <div className="center-and-right-panel">
          <div className="main-product-display">
            <h1 className="page-title">{activeBuddy?.businessName || "Products"}</h1>
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
                  <p>Products coming soon for {activeBuddy?.businessName || "this business"}!</p>
                </div>
              )}
            </div>
          </div>
          <RightPanel selectedProduct={selectedProduct} activeBuddy={activeBuddy} onAddToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  )
}
