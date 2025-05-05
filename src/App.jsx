import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Userdashboard from "./pages/Userdashboard";
import AdminDashboard from "./components/AdminDashboard/Dashboard/AdminDashboard";
import Collection from "./components/AdminDashboard/Dashboard/Collection.jsx";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import PickupManagement from "./components/AdminDashboard/Dashboard/PickupManagement";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import AdminRoutesPage from "./components/AdminDashboard/Dashboard/Routes";
>>>>>>> 9598a9f (Routes)
import Otp from "./pages/Otp.jsx";
import ForgotPassword from "./pages/Forgotpassword.jsx";
import ForgotOtp from "./pages/ForgotOtp.jsx";
import SetNewPassword from "./pages/SetNewPassword.jsx";
import PasswordUpdated from "./pages/PasswordUpdated.jsx";

<<<<<<< HEAD
=======
>>>>>>> 4a79a34 (Pickup)
=======
const ADMIN_EMAIL = "greenbinpvtltd@gmail.com";

// Protect routes for authenticated non-admin users
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (user.email === ADMIN_EMAIL) {
    return <Navigate to="/admindashboard" replace />;
  }

  return children;
}

// Protect routes for admin users only
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/userdashboard" replace />;
  }

  return children;
}
>>>>>>> 1f14a48 (Authentication)

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Determine redirect based on user type
  const redirectPath = token
    ? user.email === ADMIN_EMAIL
      ? "/admindashboard"
      : "/userdashboard"
    : "/signin";

  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/userdashboard" element={<Userdashboard/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path = "/collection" element={<Collection/>}/>
        <Route path = "/pickupmanagement" element={<PickupManagement/>}/>
<<<<<<< HEAD
        <Route path="/Otpverification" element={<Otp/>} />

=======
>>>>>>> 7927c1b (App)
=======
        {/* Public routes, but redirect if already logged in */}
        <Route path="/" element={token ? <Navigate to={redirectPath} replace /> : <SignUp />} />
        <Route path="/signin" element={token ? <Navigate to={redirectPath} replace /> : <SignIn />} />
        <Route path="/Otpverification" element={<Otp />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/forgototp" element={<ForgotOtp/>} />
        <Route path="/setpassword" element={<SetNewPassword/>} />
        <Route path="/passwordupdate" element={<PasswordUpdated/>} />

        {/* Protected user routes */}
        <Route path="/userdashboard" element={<ProtectedRoute><Userdashboard /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        

        {/* Admin-only routes */}
        <Route path="/admindashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/collection" element={<AdminRoute><Collection/></AdminRoute>} />
        <Route path="/pickupmanagement" element={<AdminRoute><PickupManagement /></AdminRoute>} />
<<<<<<< HEAD
>>>>>>> 1f14a48 (Authentication)
=======
        <Route path="/routes" element={<AdminRoute><AdminRoutesPage /></AdminRoute>} />
>>>>>>> 9598a9f (Routes)
      </Routes>
    </Router>
  );
}

export default App;