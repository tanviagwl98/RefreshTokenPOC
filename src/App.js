import React from "react";
import Home from "./components/HomePage";
import Signup from "./components/Signup";
// import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import axios from "axios";
import LoginPage from "./components/LoginPage"
import Hello from "./components/Hello";
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hello" element={<Hello />} />
        
      </Routes>
    </Router>
  );
}

export default App;
