import { useState, useEffect } from "react"
import api from "../api"
import { useNavigate, useParams } from "react-router-dom"

function AddressForm({route}) {

    // --- STATE VARIABLES ---
    const { pk } = useParams()
    
    // Form state variables
    const [houseNumber, setHouseNumber] = useState("")
    const [street, setStreet] = useState("")
    const [barangay, setBarangay] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`address/${pk}`)
        .then(res => {
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err.message)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Create FormData for file uploads
        const formData = new FormData();

        formData.append('account', pk);
        formData.append('houseNumber', houseNumber);
        formData.append('street', street);
        formData.append('barangay', barangay);
        formData.append('city', city);
        formData.append('province', province);
        formData.append('postalCode', postalCode);

         try {
            // Send the FormData object with proper headers
            const res = await api.post(route, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Account created successfully:", res.data);
            navigate('/dashboard'); 
            
        } catch(error) {
            console.error("Error creating account:", error);
            console.error("Error details:", error.response?.data);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false)
        }

    };

    return <form className="createaccount-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
          <input
            type="text"
            name="barangay"
            placeholder="Barangay"
            value={barangay}
            onChange={(e) => setBarangay(e.target.value)}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            name="province"
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          />
            <input
            type="number"
            name="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
}

export default AddressForm;