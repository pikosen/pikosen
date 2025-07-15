import { useState, useEffect } from "react"
import "../styles/TopBar.css"
import { Link } from "react-router-dom"
import LogoNav from "../assets/PS_logo_leaf_or.png"
import ShoppingBag from "../assets/Shopping_bag.png"
import AccountCircle from "../assets/account_circle.png"
import coffeecom from "../assets/coffee_com.png"

const TopBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <nav className="topbar">
      <div className="topbar-left">
        <Link to="/home/" className="logo-link">
          <img src={LogoNav || "/placeholder.svg"} alt="PikoSen Logo" className="logo-image" />
        </Link>
      </div>

      <div className="topbar-right">
        <Link to="/about-us" className="about-link">
          <img src={coffeecom || "/placeholder.svg"} alt="About Us" className="about-image" />
        </Link>
        {!isMobile && <input type="text" placeholder="Search coffee..." className="search-input" />}
        <Link to="/products/" className="nav-icon-link">
          <img src={ShoppingBag || "/placeholder.svg"} alt="Products" className="nav-icon" />
        </Link>
        <Link to="/dashboard/" className="nav-icon-link">
          <img src={AccountCircle || "/placeholder.svg"} alt="Dashboard" className="nav-icon" />
        </Link>
      </div>
    </nav>
  )
}

export default TopBar
