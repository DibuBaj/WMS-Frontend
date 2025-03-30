import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Userdashboard from "./pages/Userdashboard";
import AdminDashboard from "./components/AdminDashboard/Dashboard/AdminDashboard";
import Collection from "./components/AdminDashboard/Dashboard/Collection"
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";





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
      </Routes>
    </Router>
  );
}

export default App;
