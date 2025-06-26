import { use, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function ProductForm({route}) {
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [description, setDescription] = useState("")
    const [origin, setOrigin] = useState("")
    const [type, setType] = useState("")
    const [grams, setGrams] = useState("")
    const [process, setProcess] = useState("")
    const [loading, setLoading] = useState (false)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { 
                productName, stock, price, description, origin, 
                type, grams
             })
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSumbit={handleSubmit} className="form-container">
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
        <input 
            className="form-input"
            type="dropdown"
            value={process}
            onChange={(e) => setProcess(e.target.value)}
            placeholder="Type of processing"
        />
        <button className="form-button" type="submit">
            Submit
        </button>
    </form>
}

export default ProductForm