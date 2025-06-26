import react from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import Home from "./pages/home"
import NotFound from "./pages/notfound"
import ProtectedRoute from "./components/ProtectedRoute"
import "./styles/Form.css"
import "./styles/Home.css"

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
          element={<NotFound />} >
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
