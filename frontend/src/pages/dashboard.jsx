"use client"

import { useState, useEffect } from "react"
import TopBar from "../components/TopBar"
import { useNavigate, Link, useParams } from "react-router-dom"
import "../styles/Dashboard.css"

const baseURL = "http://127.0.0.1:8000/"

function Dashboard() {
  const { pk } = useParams()
  const [activeNav, setActiveNav] = useState("Dashboard")
  const [Account, setAccount] = useState([])
  const [Product, setProduct] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Product editing states
  const [editingId, setEditingId] = useState(null)
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [description, setDescription] = useState("")
  const [origin, setOrigin] = useState("")
  const [type, setType] = useState("")
  const [grams, setGrams] = useState("")
  const [orderFilter, setOrderFilter] = useState("ongoing") // "ongoing" or "history"
  const [orders, setOrders] = useState([])

  // Backend API calls (commented out for frontend testing)
  const getProduct = () => {
    // Uncomment when backend is ready
    
    api.get(`api/dashboard/product/`).then((res) => {
      setProduct(res.data)
      console.log(res.data)
    }).catch((error) => {
      console.error("Error fetching products:", error)
    })
    
    /*
    // Mock data for frontend testing
    setProduct([
      {
        id: 1,
        productName: "Roaster's Compass",
        type: "Arabica",
        business_name: "Bean Voyage",
        price: 299,
        stock: 50,
        description: "Premium coffee beans",
        origin: "Philippines",
        grams: 250,
        mainImg: "/placeholder.svg?height=150&width=200",
      },
      {
        id: 2,
        productName: "Morning Bloom",
        type: "Robusta",
        business_name: "Coffee Co.",
        price: 199,
        stock: 30,
        description: "Strong morning coffee",
        origin: "Vietnam",
        grams: 200,
        mainImg: "/placeholder.svg?height=150&width=200",
      },
    ])
  }

  const getOrders = () => {
    // Mock data for frontend testing
    setOrders([
      {
        id: 1,
        customerName: "Maria Santos",
        productName: "Roaster's Compass",
        quantity: 2,
        totalPrice: 598,
        status: "ongoing",
        orderDate: "2024-01-15",
        deliveryDate: "2024-01-18"
      },
      {
        id: 2,
        customerName: "Juan Dela Cruz",
        productName: "Morning Bloom",
        quantity: 1,
        totalPrice: 199,
        status: "delivered",
        orderDate: "2024-01-10",
        deliveryDate: "2024-01-12"
      },
      {
        id: 3,
        customerName: "Ana Reyes",
        productName: "Roaster's Compass",
        quantity: 3,
        totalPrice: 897,
        status: "ongoing",
        orderDate: "2024-01-16",
        deliveryDate: "2024-01-19"
      },
      {
        id: 4,
        customerName: "Carlos Lopez",
        productName: "Morning Bloom",
        quantity: 2,
        totalPrice: 398,
        status: "delivered",
        orderDate: "2024-01-08",
        deliveryDate: "2024-01-10"
      }
    ])*/
  }
  

  const getAccount = () => {
    // Uncomment when backend is ready
    
    api.get(`api/dashboard/account/`).then((res) => {
      setAccount(res.data)
      console.log(res.data)
    }).catch((error) => {
      console.error("Error fetching account:", error)
    })

    /*
    // Mock data for frontend testing
    setAccount([
      {
        id: 1,
        name: "John Doe",
        contact: "123456789",
        user_email: "john@example.com",
        profilePhoto: "/placeholder.svg?height=80&width=80",
      },
    ]) */
  }
  

  const handleEditClick = (product) => {
    setEditingId(product.id)
    setProductName(product.productName)
    setPrice(product.price)
    setStock(product.stock)
    setDescription(product.description)
    setOrigin(product.origin)
    setType(product.type)
    setGrams(product.grams)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("productName", productName)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("origin", origin)
    formData.append("description", description)
    formData.append("type", type)
    formData.append("grams", grams)

    try {
      // Uncomment when backend is ready
      
      const res = await api.put(`api/product/update/${editingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log("Product updated successfully:", res.data)
      
      /*
      // Mock update for frontend testing
      console.log("Product updated (mock):", { editingId, productName, price, type })
      alert("Product updated successfully!") */
    } catch (error) {
      console.error("Error updating product:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
      setEditingId(null)
      getProduct() // Refresh products
    }
  }

  const deleteProduct = (id) => {
    // Uncomment when backend is ready
    
    api.delete(`api/product/delete/${id}`).then((res) => {
      if (res.status === 204) {
        alert("Product deleted.")
      } else {
        alert("Failed to delete product.")
      }
    }).catch((error) => alert(error))
    
    /*
    // Mock delete for frontend testing
    setProduct(Product.filter((p) => p.id !== id))
    alert("Product deleted (mock)") */
  }

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem("cartItems", JSON.stringify(updatedCart))
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    getProduct()
    getAccount()
    getOrders()

    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || []
    setCartItems(savedCart)
  }, [])

  const renderContent = () => {
    switch (activeNav) {
      case "Dashboard":
        const filteredOrders = orders.filter(order => 
          orderFilter === "ongoing" ? order.status === "ongoing" : order.status === "delivered"
        )
        
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Orders</h2>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${orderFilter === "ongoing" ? "active" : ""}`}
                  onClick={() => setOrderFilter("ongoing")}
                >
                  Ongoing Orders
                </button>
                <button 
                  className={`filter-btn ${orderFilter === "history" ? "active" : ""}`}
                  onClick={() => setOrderFilter("history")}
                >
                  Order History
                </button>
              </div>
            </div>
            
            <div className="orders-list">
              {filteredOrders.length === 0 ? (
                <div className="empty-state">
                  <p>No {orderFilter === "ongoing" ? "ongoing" : "completed"} orders found.</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h4 className="order-customer">{order.customerName}</h4>
                        <span className={`order-status ${order.status}`}>
                          {order.status === "ongoing" ? "Ongoing" : "Delivered"}
                        </span>
                      </div>
                      <div className="order-date">
                        <span>Order Date: {order.orderDate}</span>
                      </div>
                    </div>
                    
                    <div className="order-details">
                      <div className="order-product">
                        <span className="product-name">{order.productName}</span>
                        <span className="product-quantity">Qty: {order.quantity}</span>
                      </div>
                      <div className="order-price">
                        <span className="total-price">₱{order.totalPrice}</span>
                      </div>
                    </div>
                    
                    <div className="order-footer">
                      <span className="delivery-date">
                        {order.status === "ongoing" ? "Expected: " : "Delivered: "}{order.deliveryDate}
                      </span>
                      {order.status === "ongoing" && (
                        <button className="mark-delivered-btn">
                          Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )

      case "Cart":
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Shopping Cart</h2>
            </div>
            <div className="cart-items">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-business">From: {item.business}</p>
                      <p className="cart-item-date">Added: {item.dateAdded}</p>
                    </div>
                    <button className="remove-button" onClick={() => removeFromCart(item.id)}>
                      ❌
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <span className="icon-placeholder">🛒</span>
                  <p>Your cart is empty</p>
                  <Link to="/products" className="add-button">
                    Browse Products
                  </Link>
                </div>
              )}
            </div>
          </div>
        )

      case "Edit Account Information":
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Account Settings</h2>
            </div>
            <div className="settings-options">
              <Link to={`/updateinfo/${pk || "1"}`} className="setting-item">
                <span className="icon-placeholder">✏️</span>
                <span>Edit Account Information</span>
              </Link>
              <Link to={`/address/${pk || "1"}`} className="setting-item">
                <span className="icon-placeholder">📍</span>
                <span>Update Address</span>
              </Link>
            </div>
          </div>
        )

      case "Edit Business":
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Business Settings</h2>
            </div>
            <div className="settings-options">
              <Link to={`/createbusiness/${pk || "1"}`} className="setting-item">
                <span className="icon-placeholder">🏢</span>
                <span>Create/Edit Business</span>
              </Link>
            </div>
          </div>
        )

      case "Add / Edit Products":
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Product Management</h2>
            </div>
            <div className="settings-options">
              <Link to={`/addproduct/${pk || "1"}`} className="setting-item">
                <span className="icon-placeholder">➕</span>
                <span>Add New Product</span>
              </Link>
            </div>
          </div>
        )

      case "Settings":
        return (
          <div className="dashboard-content">
            <div className="content-header">
              <h2 className="content-title">Settings</h2>
            </div>
            <div className="settings-sections">
              <div className="settings-category">
                <h3 className="settings-category-title">Account Settings</h3>
                <div className="settings-options">
                  <Link to={`/updateinfo/${pk || "1"}`} className="setting-item">
                    <span>Edit Account Information</span>
                  </Link>
                  <Link to={`/address/${pk || "1"}`} className="setting-item">
                    <span>Update Address</span>
                  </Link>
                </div>
              </div>
              
              <div className="settings-category">
                <h3 className="settings-category-title">Business Settings</h3>
                <div className="settings-options">
                  <Link to={`/createbusiness/${pk || "1"}`} className="setting-item">
                    <span>Create/Edit Business</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="dashboard-container">
      <TopBar />

      <div className="dashboard-layout">
        {/* User Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="profile-avatar">
              {Account.length > 0 && Account[0].profilePhoto ? (
                <img src={`${baseURL}${Account[0].profilePhoto}`} alt={Account[0].name} />
              ) : (
                <div className="avatar-placeholder">{Account.length > 0 ? Account[0].name?.charAt(0) || "U" : "U"}</div>
              )}
            </div>
            <div className="profile-details">
              <div className="profile-name-section">
                <h1 className="profile-name">{Account.length > 0 ? Account[0].name : "User Name"}</h1>
              </div>
              <p className="profile-contact">{Account.length > 0 ? Account[0].contact : "123456789"}</p>
              <p className="profile-email">{Account.length > 0 ? Account[0].user_email : "user@example.com"}</p>
            </div>
          </div>
        </div>
              
        <div className="dashboard-main">
          {/* Sidebar Navigation */}
          <aside className="dashboard-sidebar">
            <div className="dashboard-header">
              <h2>Dashboard</h2>
            </div>
            <nav className="sidebar-nav">
              <div className="nav-items">
                {[
                  { key: "Dashboard", label: "Dashboard" },
                  { key: "Cart", label: "Cart" },
                  { key: "Add / Edit Products", label: "Products" },
                  { key: "Settings", label: "Settings" },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className={`nav-item ${activeNav === key ? "active" : ""}`}
                    onClick={() => setActiveNav(key)}
                  >
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="nav-item logout-button" onClick={handleLogout}>
                <span>Logout</span>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="dashboard-content-area">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
