import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../../assets/Logo.svg"
import Adminlogo from "../../../assets/Adminlogo.svg"; 
import logout from "../../../assets/logout.png" 
import SettingsIcon from "../../../assets/Settings.svg"; 

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown menu on clicking profile icon
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close dropdown when clicking outside
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
      {/* Top Navbar */}
      <div className="top-navbar">
        <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
        <span className="GreenBinText">GreenBin</span>
        
        {/* Profile Icon with Dropdown */}
        <div className="profile-container" onClick={toggleDropdown}>
          <img src={Adminlogo} alt="Profile" className="profile-icon" />
          
          {/* Dropdown Menu (Only visible when showDropdown is true) */}
          {showDropdown && (
            <div className="dropdown-menu">
              <NavLink to="/settings" className="dropdown-item">
                <img src={SettingsIcon} alt="Settings" className="dropdown-icon" />
                Settings
              </NavLink>
              <NavLink to="/signin" className="dropdown-item">
                <img src={logout} alt="Logout" className="dropdown-icon" />
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

