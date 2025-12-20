import {  BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./Pages/Home"
import Signin from "./Pages/Signin"
import Signup from "./Pages/Signup"
import ProtectedRoute from "./Auth/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        
        <Route 
          path="/home"
          element= {
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
