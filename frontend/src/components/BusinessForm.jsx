import { use, useState, useEffect } from "react"
import api from "../api"
import { useNavigate, useParams } from "react-router-dom"

function BusinessForm({route}) {

    const { pk } = useParams()

    const [businessName, setBusinessName] = useState("")
    const [businessDescription, setBusinessDescription] = useState("")
    const [businessContact, setBusinessContact] = useState("")
    const [businessLogo, setBusinessLogo] = useState(null)
    const [loading, setLoading] = useState (false)
    const navigate = useNavigate

    useEffect(() => {
        api.get(`createbusiness/${pk}`)
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

        // FIX: Use FormData to handle file uploads correctly.
        // This sets the request's Content-Type to 'multipart/form-data'.
        const formData = new FormData();

        formData.append('owner', pk);
        formData.append('businessName', businessName);
        formData.append('businessDescription', businessDescription);
        formData.append('businessContact', businessContact);

        // Only append the photo if one was selected
        if (businessLogo) {
            formData.append('businessLogo', businessLogo);
            console.log("Photo being uploaded:", businessLogo.name, businessLogo.size, businessLogo.type);
        } else {
            console.log("No photo selected");
        }

        try {
            // Send the FormData object
            const res = await api.post(route, formData);

            console.log("Business created successfully:", res.data);
            navigate('/dashboard'); 
            
        } catch(error) {
            console.error("Error creating business:", error);
            // The detailed error from the backend is often in error.response.data
            console.error("Error details:", error.response?.data);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false)
        }
    }

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
            setBusinessLogo(file);
        } else {
            setBusinessLogo(null);
        }
    };

    return <form onSubmit={handleSubmit} className="register-form">
        <h1>
            Business Listing
        </h1>
        <input 
            className="form-input"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Business Name"
            required
        />
        <input 
            className="form-input"
            type="text"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            placeholder="Describe your business"
            required
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
              type="file"
              name="businessLogo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <small className="placeholder-note">
              Please upload your profile photo here (Max 5MB, JPEG/PNG/GIF)
            </small>
            {businessLogo && (
              <div className="file-info">
                <small>Selected: {businessLogo.name}</small>
              </div>
            )}
        </div>
        <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
        </button>
    </form>
}

export default BusinessForm