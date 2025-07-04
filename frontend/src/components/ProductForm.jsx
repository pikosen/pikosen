import { use, useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import "../styles/AddProduct.css"; 

function ProductForm({route}) {

    const [business, setBusiness] = useState(null);
    // ... your other form state variables (productName, stock, etc.)

    useEffect(() => {
        // This function fetches the user's business data when the component mounts
        const fetchUserBusiness = async () => {
            try {
                // Make a GET request to your endpoint that returns the user's business
                const response = await api.get('api/business'); // 👈 Replace with your actual API endpoint
                setBusiness(response.data);
            } catch (error) {
                console.error("Failed to fetch business info:", error);
                alert("Could not load user's business information.");
            }
        };

        fetchUserBusiness();
    }, []);
    
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [origin, setOrigin] = useState("")
    const [type, setType] = useState("")
    const [grams, setGrams] = useState("")
    const [mainImg, setMainImage] = useState("")
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { 
                business: business.id,
                productName, stock, price, description, origin, 
                type, grams, mainImg,
             })
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="addprod-form">
        <h1>
            Product Listing
        </h1>
        <input 
            className="form-input"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
        />
        <input 
            className="form-input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
        />
        <input 
            className="form-input"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
        />
        <input 
            className="form-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
        />
        <input 
            className="form-input"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Place of origin"
        />
        <input 
            className="form-input"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Type of beans"
        />
        <input 
            className="form-input"
            type="number"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            placeholder="Grams per package"
        />
        <label>Product Main Image</label>
        <div className="addprod-upload-box">
            <span>Choose a file or drag it here</span>
            <input
                className="form-input"
                type="file"
                value={mainImg}
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="Product Image"
            />
        </div>
        <button className="form-button" type="submit">
            Submit
        </button>
    </form>
}

export default ProductForm