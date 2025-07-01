import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/home"
import NotFound from "./pages/notfound"
import Products from "./pages/products"
import Address from "./pages/Address"
import CreateAccount from "./pages/Createaccount"
import AddingProduct from "./pages/AddProduct"
import ProtectedRoute from "./components/ProtectedRoute"
import "./styles/register.css"
import "./styles/Home.css"
import "./styles/Createaccount.css"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register/>
}

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
              <Home />
          }
        />   

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<RegisterAndLogout />}
        />
        <Route path="*"
          element={<NotFound />} 
        />
        <Route
          path="/products"
          element={
              <Products />}
          />
        <Route 
            path="/address" 
            element={<Address />} 
          />
        <Route
            path="/addproduct"
            element={<AddingProduct/>}
          />
        <Route
            path="/Createaccount"
            element={<CreateAccount/>}
          />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;
