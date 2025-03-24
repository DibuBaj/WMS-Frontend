import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Userdashboard from "./pages/Userdashboard";
import AdminDashboard from "./pages/AdminDashboard";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/userdashboard" element={<Userdashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
