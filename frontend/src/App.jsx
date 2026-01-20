import {  BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./Pages/user/Home"
import Signin from "./Pages/auth/Signin"
import Signup from "./Pages/auth/Signup"
import ProtectedRoute from "./auth/ProtectedRoute"
import AdminRoute from "./auth/AdminRoute"
import Admin from "./Pages/admin/admin"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route 
          path="/home"
          element= {
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
  )
}

export default App;
