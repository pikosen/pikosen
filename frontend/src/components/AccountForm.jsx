import { useState, useEffect } from "react"
import api from "../api"
import { useNavigate, useParams } from "react-router-dom"

function AccountForm({route}) {

    // --- STATE VARIABLES ---
    
    // Form state variables
    const [user, setUser] = useState(null)
    const [name, setName] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [contact, setContact] = useState("")
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`api/account/user/`)
        .then(res => {
            console.log(res.data)
            // Fix 2: Store the response data in state
            setUser(res.data)
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

        formData.append('user', user.id);
        formData.append('name', name);
        formData.append('gender', gender);
        formData.append('age', age);
        formData.append('contact', contact);
        formData.append('isOwner', isOwner);
        formData.append('user_mail', user.email);

        // Only append the photo if one was selected
        if (profilePhoto) {
            formData.append('profilePhoto', profilePhoto);
            console.log("Photo being uploaded:", profilePhoto.name, profilePhoto.size, profilePhoto.type);
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

            console.log("Account created successfully:", res.data);
            navigate('/dashboard'); 
            
        } catch(error) {
            console.error("Error creating account:", error);
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
            setProfilePhoto(file);
        } else {
            setProfilePhoto(null);
        }
    };

    return <form className="createaccount-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="gender-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="FEMALE"
                checked={gender === "FEMALE"}
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="MALE"
                checked={gender === "MALE"}
                onChange={(e) => setGender(e.target.value)}
              />
              Male
            </label>
          </div>

          <input
            type="number"
            name="age"
            placeholder="Age"
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <div className="profile-photo-section">
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <small className="placeholder-note">
              Please upload your profile photo here (Max 5MB, JPEG/PNG/GIF)
            </small>
            {profilePhoto && (
              <div className="file-info">
                <small>Selected: {profilePhoto.name}</small>
              </div>
            )}
          </div>

          <label className="sell-checkbox">
            <input
              type="checkbox"
              name="sellBeans"
              checked={isOwner}
              onChange={(e) => setIsOwner(e.target.checked)}
            />
            I want to sell coffee beans
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
}

export default AccountForm;