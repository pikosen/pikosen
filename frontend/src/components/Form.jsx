import React, { use, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import "../styles/Createaccount.css";
import LogoNav from "../assets/PS_logo_leaf_or.png";

function Form({route,method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState("")
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState (false)
    const navigate = useNavigate()  // Fixed: Added parentheses

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        // Only validate passwords for registration, not login
        if (method !== "login") {
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match!");
                setLoading(false);
                return;
            }

            if (password.length < 8) { 
                setPasswordError("Password must be at least 8 characters long.");
                setLoading(false);
                return;
            }
        }

        setPasswordError(''); // Clear error before making request
        console.log('Passwords match and are valid!');
        
        try {
            // Different payloads for login vs registration
            const payload = method === "login" 
                ? { username, password } 
                : { username, password, confirm_password: confirmPassword, email };
                
            const res = await api.post(route, payload);
            
            if (method == "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch(error) {
            console.log('Error details:', error.response?.data);
            if (error.response?.data) {
                // Show specific validation errors from Django
                const errorMessages = Object.values(error.response.data).flat().join(', ');
                setPasswordError(errorMessages);
            } else {
                alert(error.message || 'An error occurred');
            }
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="createaccount-form">
                <input 
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input 
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                {method !== "login" && (
                    <input
                        className="form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                )}
                {method !== "login" && (
                    <input 
                        className="form-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                )}
                {passwordError && <p className="error-message" style={{ color: 'red' }}>{passwordError}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
}

export default Form