import {  BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Signup from "./Components/Signup"
import Signin from "./Components/Signin"
import Home from "./Components/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
