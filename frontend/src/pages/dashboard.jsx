import React, { useState, useEffect } from 'react'
import TopBar from '../components/TopBar'
import { useNavigate, Link } from "react-router-dom";
import api from "../api"
const baseURL = "http://127.0.0.1:8000/"

function Dashboard() {
  const [activeNav, setActiveNav] = useState('Cart');
  const [Account, setAccount] = useState("");
  const [Product, setProduct] = useState("");
  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [description, setDescription] = useState("")
  const [origin, setOrigin] = useState("")
  const [type, setType] = useState("")
  const [grams, setGrams] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const TOPBAR_HEIGHT = '60px';

  const [method, setMethod] = useState('view')

  const [editingId, setEditingId] = useState(null);

  const handleEditClick = (product) => {
    // Set the ID of the product being edited
    setEditingId(product.id);
    
    // Pre-fill the form state with the product's current values
    setProductName(product.productName);
    setPrice(product.price);
    setStock(product.stock);
    setDescription(product.description);
    setOrigin(product.origin);
    setType(product.type);
    setGrams(product.grams);
  };
  
  const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('origin', origin);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('grams', grams);

        try {
            // Send the FormData object with proper headers
            const res = await api.put(`api/product/update/${editingId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Product updated successfully:", res.data);
            
        } catch(error) {
            console.error("Error updating product:", error);
            console.error("Error details:", error.response?.data);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false)
        }
        setMethod('view')
    }

  const getProduct = () => {
    api.get(`api/dashboard/product/`).then((res) => {
      setProduct(res.data)
      console.log(res.data)
    })

  }

  useEffect(() => {
    getProduct();
  }, [])

  const getAccount = () => {
    api.get(`api/dashboard/account/`).then((res) => {
      setAccount(res.data)
      console.log(res.data)
    })

  }

  useEffect(() => {
    getAccount();
  }, [])

  const deleteProduct = (id) => {
    api.delete(`api/product/delete/${id}`).then((res) =>
    {
      if (res.status === 204)
        alert("Product deleted.")
      else
        alert("Failed to delete product.")
    }).catch((error) => alert(error))
    getProduct()
  }

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
    transition: 'background-color 0.2s ease',
  };

  const updateBtn = {
    position: 'absolute',
    top: '10px',
    right: '40px',
    backgroundColor: '#Add8e6',
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
    transition: 'background-color 0.2s ease',
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
            {loading ? (
            <p>Loading products...</p>
          ) : Account.length === 0 ? (
            "No account found"
          ) : (
            <div>
              {Account.map((account) => (
              <div key={account.id}>
                <div style={profileIcon}>
                  <img
                    src={`${baseURL}${account.profilePhoto}`}
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
                    <strong>Email:</strong> {account.user_email}
                  </p>
                </div>
              </div>
                ))}
            </div>
            )}
          </section>

          <h3 style={sectionTitle}>My Products</h3>

          {loading ? (
            <p>Loading products...</p>
          ) : Product.length === 0 ? (
            <p>No products found. Add some products to get started!</p>
          ) : (
            <div>
              {Product.map((item) => (
                <div key={item.id} style={itemCard}>
                  {editingId != item.id ? 
                  (
                  <div>
                  <div>
                    <h4 style={textStyle}>{item.productName}</h4>
                    <p style={textStyle}>Type: {item.type}</p>
                    <p style={textStyle}>
                      Business Brand: {item.business_name}
                    </p>
                    <p style={textStyle}>
                      Price: P{item.price || 'N/A'}
                    </p>
                  </div>
                  <button 
                    style={updateBtn}
                    onClick = {() => handleEditClick(item)}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#90ee90'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#Add8e6'}
                    title="Edit Product"
                  >
                   🖊️
                  </button>
                  </div>
                  ) :
                  (
                  <form onSubmit={handleSubmit}>
                  <div>
                    <h4>
                      <input
                        style={textStyle}
                        type="text"
                        name="name"
                        placeholder="Update Product Name"
                        value={productName || item.productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </h4>
                    
                    <p>
                      <input
                        style={textStyle}
                        className="form-input"
                        type="text"
                        value={type || item.type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Type of beans"
                      />
                    </p>
                    <p style={textStyle}>
                      Business Brand: {item.business_name}
                    </p>
                    <p style={textStyle}>
                      <input 
                        style={textStyle}
                        className="form-input"
                        type="number"
                        value={price || item.price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Update Price"
                    />
                    </p>
                    <input 
                        className="form-input"
                        type="hidden"
                        value={item.stock}
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Stock"
                    />
                    <input 
                        className="form-input"
                        type="hidden"
                        value={item.description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <input 
                      className="form-input"
                      type="hidden"
                      value={item.origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="Place of origin"
                  />
                  <input 
                      className="form-input"
                      type="hidden"
                      value={item.grams}
                      onChange={(e) => setGrams(e.target.value)}
                      placeholder="Grams per package"
                  />
                  </div>
                  <button 
                    style={updateBtn}
                    type="submit"
                    onMouseOver={(e) => e.target.style.backgroundColor = '#90ee90'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#Add8e6'}
                    title="Edit Product"
                  >
                   ✔️
                  </button>
                  </form>
                  )
                }
                  <button 
                    style={removeBtn}
                    onClick={() => deleteProduct(item.id)}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e63946'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FF7518'}
                    title="Delete Product"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;