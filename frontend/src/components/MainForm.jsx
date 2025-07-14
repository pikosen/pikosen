import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Login.css";
import { React, useState } from "react"


function MainForm({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    setError("")

    try {
      const res = await api.post(route, { username, password })
      if ( method == "login" )
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/")
    }
    catch (error){
      alert(error)
    }
    finally {
      setLoading(false)
    }
  }
    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                className="login-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="login-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <div className="login-buttons">
                <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
                </button>
                <p className="signup-prompt">
                  Don't have an account yet?{" "}
                  <Link to="/register/" className="signup-link">
                    Sign up here!
                  </Link>
                </p>
            </div>
        </form>
    );
}

export default MainForm;
