import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/login"
import Register from "./pages/Createaccount"
import Home from "./pages/home"
import NotFound from "./pages/notfound"
import Products from "./pages/products"
import Address from "./pages/Address"
import CreateBusiness from "./pages/register"
import AddingProduct from "./pages/AddProduct"
import Dashboard from "./pages/dashboard"
import AccountInfo from "./pages/AccountInfo"
import AboutUs from "./pages/AboutUs"
import "./styles/register.css"
import "./styles/Home.css"
import "./styles/Createaccount.css"
import "./styles/Login.css"
import "./styles/AboutUs.css"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=""
          element={
              <Login />
          }
        /> 

        <Route path="/login/" element={<Login />} />
        <Route path="/logout/" element={<Logout />} />
        <Route path="/register/" element={<Register />} />
        <Route 
          path="/home/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/products/" element={<Products />} />
        <Route
          path="/address/"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct/"
          element={
            <ProtectedRoute>
              <AddingProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createbusiness/"
          element={
            <ProtectedRoute>
              <CreateBusiness />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/updateinfo/"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login/"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App