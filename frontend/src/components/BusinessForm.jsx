import { use, useState, useEffect } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"

function BusinessForm({route}) {

    const [account, setAccount] = useState(null);
    // ... your other form state variables (productName, stock, etc.)

    useEffect(() => {
        // This function fetches the user's business data when the component mounts
        const fetchUserAccount = async () => {
            try {
                // Make a GET request to your endpoint that returns the user's business
                const response = await api.get('api/account'); // 👈 Replace with your actual API endpoint
                setAccount(response.data);
            } catch (error) {
                console.error("Failed to fetch account info:", error);
                alert("Could not load user's account information.");
            }
        };

        fetchUserAccount();
    }, []);

    const [businessName, setBusinessName] = useState("")
    const [businessDescription, setBusinessDescription] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [businessLogo, setBusinessLogo] = useState("")
    const [loading, setLoading] = useState (false)
    const navigate = useNavigate

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const res = await api.post(route, { 
                account: account.id,
                businessName, businessDescription, businessContact, businessLogo
             })
        } catch(error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return <form onSumbit={handleSubmit} className="register-form">
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
        <label>Business Logo</label>
        <div className="upload-box">
        <input 
            className="form-input"
            type="file"
            value={businessLogo}
            onChange={(e) => setBusinessLogo(e.target.value)}
        />
        </div>
        <button className="form-button" type="submit">
            Submit
        </button>
    </form>
}

export default BusinessForm