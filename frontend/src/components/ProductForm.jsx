import { use, useState, useEffect } from "react"
import api from "../api"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/AddProduct.css"; 

function ProductForm({route}) {
    
    const [business, setBusiness] = useState([])
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [origin, setOrigin] = useState("")
    const [type, setType] = useState("")
    const [grams, setGrams] = useState("")
    const [mainImg, setMainImg] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`api/getbusiness`)
        .then(res => {
            console.log(res.data)
            setBusiness(res.data)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Create FormData for file uploads
        const formData = new FormData();

        formData.append('business', business.pk);
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('origin', origin);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('grams', grams);
        
        // Only append the photo if one was selected
        if (mainImg) {
            formData.append('mainImg', mainImg);
            console.log("Photo being uploaded:", mainImg.name, mainImg.size, mainImg.type);
        } else {
            console.log("No photo selected");
        }

        try {
            // Send the FormData object with proper headers
            const res = await api.post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Product listed successfully:", res.data);
            navigate('/dashboard'); 
            
        } catch(error) {
            console.error("Error listing product:", error);
            console.error("Error details:", error.response?.data);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false)
        }
    }

    // Handle file selection with validation
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                alert('Please select a valid image file (JPEG, PNG, or GIF)');
                e.target.value = ''; // Clear the input
                return;
            }
            
            // Validate file size (e.g., max 5MB)
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (file.size > maxSize) {
                alert('File size must be less than 5MB');
                e.target.value = ''; // Clear the input
                return;
            }
            
            console.log("File selected:", file.name, file.size, file.type);
            setMainImg(file);
        } else {
            setMainImg(null);
        }
    };

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
            <input
              type="file"
              name="mainImg"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <small className="placeholder-note">
              Please upload your profile photo here (Max 5MB, JPEG/PNG/GIF)
            </small>
            {mainImg && (
              <div className="file-info">
                <small>Selected: {mainImg.name}</small>
              </div>
            )}
        </div>
        <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
    </form>
}

export default ProductForm