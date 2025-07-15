import { useState, useEffect } from "react"
import TopBar from "../components/TopBar"
import { useNavigate, Link } from "react-router-dom"
import api from "../api"
import "../styles/Dashboard.css"

function Dashboard() {
  // Changed default activeNav to "Overview"
  const [activeNav, setActiveNav] = useState("Overview")
  const [activeSettingsTab, setActiveSettingsTab] = useState("General") // New state for settings tabs
  const [Account, setAccount] = useState([])
  const [Product, setProduct] = useState([])
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [description, setDescription] = useState("")
  const [origin, setOrigin] = useState("")
  const [type, setType] = useState("")
  const [grams, setGrams] = useState("")
  const [Cart, setCart] = useState([])
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [quantities, setQuantities] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [editingId, setEditingId] = useState(null)

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
      const res = await api.put(`api/product/update/${editingId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("Product updated successfully:", res.data)
    } catch (error) {
      console.error("Error updating product:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setLoading(false)
      setEditingId(null)
      getProduct()
    }
  }

  const getProduct = () => {
    api
      .get(`api/dashboard/product/`)
      .then((res) => {
        setProduct(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching products:", error)
      })
  }

  const getAccount = () => {
    api
      .get(`api/dashboard/account/`)
      .then((res) => {
        setAccount(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.error("Error fetching account:", error)
      })
    Account === null ? navigate("/updateinfo") : setLoading(true)
  }

  const getCart = () => {
    api
      .get(`api/bean-shops/products/cart/`)
      .then((res) => {
        setCart(res.data)
        // Initialize quantities for each cart item
        const initialQuantities = {}
        res.data.forEach(item => {
          initialQuantities[item.id] = item.quantity || 1
        })
        setQuantities(initialQuantities)
        console.log("Cart data:", res.data)
      })
      .catch((error) => {
        console.error("Error fetching cart:", error)
      })
  }

  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) return
    
    const formData = new FormData()
    formData.append('quantity', newQuantity)
    
    api
      .put(`api/bean-shops/products/cart/${cartId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setQuantities(prev => ({
          ...prev,
          [cartId]: newQuantity
        }))
        console.log("Cart quantity updated:", res.data)
      })
      .catch((error) => {
        console.error("Error updating cart quantity:", error)
      })
  }

  const deleteCartItem = (cartId) => {
    api
      .delete(`api/bean-shops/products/cart/${cartId}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Item removed from cart.")
          getCart() // Refresh cart
          // Remove from selected items if it was selected
          setSelectedItems(prev => {
            const newSelected = new Set(prev)
            newSelected.delete(cartId)
            return newSelected
          })
        } else {
          alert("Failed to remove item from cart.")
        }
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error)
        alert("Error removing item from cart.")
      })
  }

  const handleCheckboxChange = (cartId) => {
    setSelectedItems(prev => {
      const newSelected = new Set(prev)
      if (newSelected.has(cartId)) {
        newSelected.delete(cartId)
      } else {
        newSelected.add(cartId)
      }
      return newSelected
    })
  }

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert("Please select items to checkout.")
      return
    }
    
    const selectedCartItems = Cart.filter(item => selectedItems.has(item.id))
    const total = selectedCartItems.reduce((sum, item) => {
      return sum + (item.item_price * quantities[item.id])
    }, 0)
    
    alert(`Checkout ${selectedItems.size} items for ₱${total.toFixed(2)}`)
    // Add your checkout logic here
  }

  const deleteProduct = (id) => {
    api
      .delete(`api/product/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("Product deleted.")
        } else {
          alert("Failed to delete product.")
        }
      })
      .catch((error) => alert(error))
    setLoading(false)
    getProduct()
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    getProduct()
    getAccount()
    getCart()
  }, [])

  // Updated navigation items - removed "Edit Account Information" and "Edit Business"
  const navItemsTop = ["Add / Edit Products", "Cart"]
  const navItemsBottom = ["Settings", "Logout"]

  // Settings tabs
  const settingsTabs = ["General", "Edit Account Information", "Edit Business"]

  const renderSettingsContent = () => {
    switch (activeSettingsTab) {
      case "General":
        return (
          <div>
            <h4>General Settings</h4>
            <p>This section contains general application settings.</p>
            <p>More settings options will be added here in the future.</p>
          </div>
        )
      case "Edit Account Information":
        return (
          <div>
            <h4>Edit Account Information</h4>
            <p>This section is under construction.</p>
            <p>Here you will be able to update your personal information, contact details, and profile settings.</p>
          </div>
        )
      case "Edit Business":
        return (
          <div>
            <h4>Edit Business Information</h4>
            <p>This section is under construction.</p>
            <p>Here you will be able to update your business details, branding, and business-related settings.</p>
          </div>
        )
      default:
        return <div>Select a settings tab.</div>
    }
  }

  const renderContent = () => {
    switch (activeNav) {
      case "Overview":
        return (
          <>
            {/* Profile Section */}
            <section className="profile-header">
              <div className="profile-info">
                {Account.length === 0 ? (
                  <Link to="/updateinfo">
                    <button className="dashboard-action-button">Finalize Account Info</button>
                  </Link>
                ) : (
                  <div>
                    {Account.map((account) => (
                      <div key={account.id} className="profile-display">
                        <div
                          className="profile-avatar"
                          style={{
                            backgroundImage: `url(${account.profilePhoto || "/placeholder.svg"})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div className="profile-details">
                          <h2 className="profile-name">{account.name}</h2>
                          <p className="profile-contact">
                            <strong>Contact:</strong> {account.contact}
                          </p>
                          <p className="profile-email">
                            <strong>Email:</strong> {account.user_email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Products Section */}
            <div className="content-header">
              <h3 className="content-title">My Products</h3>
              <Link to="/addproduct">
                <button className="dashboard-action-button">Add Product</button>
              </Link>
            </div>

            {Product.length === 0 ? (
              <p>No products found. Add some products to get started!</p>
            ) : (
              <div className="products-list">
                {Product.map((item) => (
                  <div key={item.id} className="product-card">
                    {editingId !== item.id ? (
                      <div className="product-view">
                        <div className="product-info">
                          <h4 className="product-name">{item.productName}</h4>
                          <p className="product-type">Type: {item.type}</p>
                          <p className="product-business">Business Brand: {item.business_name}</p>
                          <p className="product-price">Price: ₱{item.price || "N/A"}</p>
                        </div>
                        <div className="product-actions">
                          <button className="edit-button" onClick={() => handleEditClick(item)} title="Edit Product">
                            🖊️
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteProduct(item.id)}
                            title="Delete Product"
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="product-edit-form">
                        <div className="product-info">
                          <h4>
                            <input
                              type="text"
                              placeholder="Update Product Name"
                              value={productName || item.productName}
                              onChange={(e) => setProductName(e.target.value)}
                              className="form-input"
                            />
                          </h4>
                          <p>
                            <input
                              type="text"
                              value={type || item.type}
                              onChange={(e) => setType(e.target.value)}
                              placeholder="Type of beans"
                              className="form-input"
                            />
                          </p>
                          <p className="product-business">Business Brand: {item.business_name}</p>
                          <p>
                            <input
                              type="number"
                              value={price || item.price}
                              onChange={(e) => setPrice(e.target.value)}
                              placeholder="Update Price"
                              className="form-input"
                            />
                          </p>
                          <input
                            type="hidden"
                            value={item.stock}
                            onChange={(e) => setStock(e.target.value)}
                            placeholder="Stock"
                          />
                          <input
                            type="hidden"
                            value={item.description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                          />
                          <input
                            type="hidden"
                            value={item.origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            placeholder="Place of origin"
                          />
                          <input
                            type="hidden"
                            value={item.grams}
                            onChange={(e) => setGrams(e.target.value)}
                            placeholder="Grams per package"
                          />
                        </div>
                        <div className="product-actions">
                          <button type="submit" className="edit-button" title="Save Product">
                            ✔️
                          </button>
                          <button
                            type="button"
                            className="delete-button"
                            onClick={() => setEditingId(null)}
                            title="Cancel Edit"
                          >
                            ❌
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )
      case "Add / Edit Products":
        return (
          <div>
            {/* Content for Add / Edit Products */}
            <h3>Add / Edit Products</h3>
            <p>This section is under construction.</p>
          </div>
        )
      case "Cart":
        return (
          <div>
            <div className="content-header">
              <h3 className="content-title">My Cart</h3>
              {selectedItems.size > 0 && (
                <button className="dashboard-action-button" onClick={handleCheckout}>
                  Checkout ({selectedItems.size} items)
                </button>
              )}
            </div>
            
            {Cart.length === 0 ? (
              <p>Your cart is empty. Add some products to get started!</p>
            ) : (
              <div className="cart-list">
                {Cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </div>
                    <div className="cart-item-info">
                      <h4 className="cart-item-name">{item.item_name}</h4>
                      <p className="cart-item-business">From: {item.business_name}</p>
                      <p className="cart-item-type">Type: {item.item_type}</p>
                      <p className="cart-item-price">Price: ₱{item.item_price}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateCartQuantity(item.id, quantities[item.id] - 1)}
                        disabled={quantities[item.id] <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-display">{quantities[item.id] || 1}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateCartQuantity(item.id, quantities[item.id] + 1)}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      <p>Total: ₱{(item.item_price * quantities[item.id]).toFixed(2)}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        className="delete-button"
                        onClick={() => deleteCartItem(item.id)}
                        title="Remove from Cart"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="cart-summary">
                  <div className="cart-total">
                    <h3>
                      Total: ₱{Cart.filter(item => selectedItems.has(item.id))
                        .reduce((sum, item) => sum + (item.item_price * quantities[item.id]), 0)
                        .toFixed(2)}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      case "Settings":
        return (
          <div>
            <h3>Settings</h3>
            
            {/* Settings Navigation Tabs */}
            <div className="settings-tabs">
              {settingsTabs.map((tab) => (
                <button
                  key={tab}
                  className={`settings-tab ${activeSettingsTab === tab ? "active" : ""}`}
                  onClick={() => setActiveSettingsTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Settings Content */}
            <div className="settings-content">
              {renderSettingsContent()}
            </div>
          </div>
        )
      default:
        return <div>Select a navigation item.</div>
    }
  }

  return (
    <div className="dashboard-container">
      <TopBar />

      <div className="dashboard-layout">
        <div className="dashboard-main">
          {/* Sidebar Navigation */}
          <aside className="dashboard-sidebar">
            <div className="dashboard-header" onClick={() => setActiveNav("Overview")}>
              <h2>Dashboard</h2>
            </div>
            <nav className="sidebar-nav">
              <div className="nav-items">
                {navItemsTop.map((label) => (
                  <div
                    key={label}
                    className={`nav-item ${activeNav === label ? "active" : ""}`}
                    onClick={() => setActiveNav(label)}
                  >
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <div className="nav-items">
                {navItemsBottom.map((label) => (
                  <div
                    key={label}
                    className={`nav-item ${activeNav === label ? "active" : ""}`}
                    onClick={() => (label === "Logout" ? handleLogout() : setActiveNav(label))}
                  >
                    <span>{label}</span>
                  </div>
                ))}
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