import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignupForm from "./signup"; // Ensure the file exists as 'signup.jsx'
import SigninForm from "./signin"; // Ensure the file exists as 'signin.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
      </Routes>
    </Router>
  );
}

export default App;
