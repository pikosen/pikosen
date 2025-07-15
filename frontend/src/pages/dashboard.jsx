import { useState, useEffect } from "react"
import TopBar from "../components/TopBar"
import { useNavigate, Link } from "react-router-dom"
import api from "../api"
import "../styles/Dashboard.css"

function Dashboard() {
  // Changed default activeNav to "Overview"
  const [activeNav, setActiveNav] = useState("Overview")
  const [Account, setAccount] = useState([])
  const [Product, setProduct] = useState([])
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [description, setDescription] = useState("")
  const [origin, setOrigin] = useState("")
  const [type, setType] = useState("")
  const [grams, setGrams] = useState("")
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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

  const getCart = async () => {
    try {
      const res = await api.get("api/bean-shops/products/cart/");
      setCartItems(res.data);
      setSelectedItems([]);
      setSelectAll(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    if (activeNav === "Cart") getCart();
  }, [activeNav]);

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

  // Toggle one checkbox
  const handleSelectItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Toggle “select all”
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(c => c.id));
    }
    setSelectAll(!selectAll);
  };

  // Inline quantity update
  const handleQuantityChange = async (id, qty) => {
    if (qty < 1) return;
    try {
      await api.put(`api/bean-shops/products/cart/${id}/`, { quantity: qty });
      setCartItems(prev =>
        prev.map(c => (c.id === id ? { ...c, quantity: qty } : c))
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Delete cart item
  const handleDeleteCartItem = async (id) => {
    try {
      await api.delete(`api/bean-shops/products/cart/${id}/`);
      setCartItems(prev => prev.filter(c => c.id !== id));
      setSelectedItems(prev => prev.filter(x => x !== id));
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    getProduct()
    getAccount()
  }, [])

  // Added "Overview" to the top navigation items
  const navItemsTop =["Edit Account Information", "Add / Edit Products", "Edit Business", "Cart"]
  const navItemsBottom = ["Settings", "Logout"]

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
      case "Edit Account Information":
        return (
          <div>
            {/* Content for Edit Account Information */}
            <h3>Edit Account Information</h3>
            <p>This section is under construction.</p>
          </div>
        )
      case "Add / Edit Products":
        return (
          <div>
            {/* Content for Add / Edit Products */}
            <h3>Add / Edit Products</h3>
            <p>This section is under construction.</p>
          </div>
        )
      case "Edit Business":
        return (
          <div>
            {/* Content for Edit Business */}
            <h3>Edit Business</h3>
            <p>This section is under construction.</p>
          </div>
        )
      case "Cart":
        return (
          <section className="cart-container">
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map(c => {
                      const p = c.item;
                      return (
                        <tr key={c.id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(c.id)}
                              onChange={() => handleSelectItem(c.id)}
                            />
                          </td>
                          <td className="cart-product-info">
                            <img src={p.mainImg || "/placeholder.svg"} alt="" className="cart-product-img" />
                            <span>{p.productName}</span>
                          </td>
                          <td>₱{p.price}</td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              value={c.quantity}
                              onChange={e => handleQuantityChange(c.id, +e.target.value)}
                              className="cart-qty-input"
                            />
                          </td>
                          <td>₱{c.quantity * p.price}</td>
                          <td>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteCartItem(c.id)}
                            >❌</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="cart-footer">
                  <span className="cart-total">
                    Total: ₱
                    {cartItems
                      .filter(c => selectedItems.includes(c.id))
                      .reduce((sum, c) => sum + c.quantity * c.item.price, 0)
                    }
                  </span>
                  <button
                    className="checkout-button"
                    disabled={selectedItems.length === 0}
                    onClick={() =>
                      alert(`Checking out ${selectedItems.length} item(s)`)
                    }
                  >Checkout</button>
                </div>
              </>
            )}
          </section>
        );
      case "Settings":
        return (
          <div>
            {/* Content for Settings */}
            <h3>Settings</h3>
            <p>This section is under construction.</p>
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
