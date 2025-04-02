import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

import Logo from "../../../assets/Logo.svg";
import Adminlogo from "../../../assets/Adminlogo.svg"; 
import logout from "../../../assets/logout.png";
import SettingsIcon from "../../../assets/Settings.svg"; 

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true); // Start logout animation

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem("token");

      // Delay navigation to show animation
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem("token");

      // Even if logout fails, show animation and navigate
      setTimeout(() => navigate("/signin"), 2000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="top-navbar">
        <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
        <span className="GreenBinText">GreenBin</span>

        <div className="profile-container" onClick={toggleDropdown}>
          <img src={Adminlogo} alt="Profile" className="profile-icon" />

          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/settings" className="dropdown-item">
                <img src={SettingsIcon} alt="Settings" className="dropdown-icon" />
                Settings
              </NavLink>
              <div className="dropdown-item" onClick={handleLogout}>
                <img src={logout} alt="Logout" className="dropdown-icon" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Animation Overlay */}
      {isLoggingOut && (
        <div className="logout-overlay">
          <div className="logout-animation">
            <span className="loading-spinner"></span>
            <p>Logging out...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
