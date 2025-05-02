import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Userdashboard from "./pages/Userdashboard";
import AdminDashboard from "./components/AdminDashboard/Dashboard/AdminDashboard";
import Collection from "./components/AdminDashboard/Dashboard/Collection";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import PickupManagement from "./components/AdminDashboard/Dashboard/PickupManagement";
import Otp from "./pages/Otp.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/userdashboard" element={<Userdashboard/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path = "/collection" element={<Collection/>}/>
        <Route path = "/pickupmanagement" element={<PickupManagement/>}/>
        <Route path="/Otpverification" element={<Otp/>} />

      </Routes>
    </Router>
  );
}

export default App;