import { use, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function BusinessForm({route}) {
    const [businessName, setBusinessName] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [businessAddress, setBusinessAddress] = useState("")
    const [businessLogo, setBusinessLogo] = useState("")
    const [loading, setLoading] = useState (false)
    const navigate = useNavigate

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { 
                businessName, businessDescription, businessContact, businessLogo
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
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
        />
        <input 
            className="form-input"
            type="text"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="Describe your business"
        />
        <input 
            className="form-input"
            type="number"
            value={businessContact}
            onChange={(e) => setBusinessContact(e.target.value)}
            placeholder="Business Contact Number"
        />
        <input 
            className="form-input"
            type="file"
            value={businessLogo}
            onChange={(e) => setLogo(e.target.value)}
        />
        <button className="form-button" type="submit">
            Submit
        </button>
    </form>
}

export default BusinessForm