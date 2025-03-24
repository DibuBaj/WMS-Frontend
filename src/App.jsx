import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Userdashboard/Navbar/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Userdashboard from "./pages/Userdashboard";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/userdashboard" element={<Userdashboard/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
