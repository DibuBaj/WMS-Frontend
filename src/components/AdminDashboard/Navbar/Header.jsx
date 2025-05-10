import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

import Logo from "../../../assets/Logo.svg";
import Adminlogo from "../../../assets/Adminlogo.svg";
import logout from "../../../assets/logout.png";
import SettingsIcon from "../../../assets/Settings.svg";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [username, setUsername] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.fullName) {
          setUsername(parsed.fullName);
        }
      } catch (err) {
        console.error("Failed to parse user:", err);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("token");
    
    setTimeout(() => navigate("/signin"), 3000);
    try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("user");
      setTimeout(() => navigate("/signin"), 1500);
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
        <div className='logo-wrap'>
          <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
          <span className="GreenBinText">GreenBin</span>
        </div>
        <div className="profile-container" onClick={toggleDropdown}>
          <img src={Adminlogo} alt="Profile" className="profile-icon" />
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-username">{username}</div>
              <div className="dropdown-item" onClick={handleLogout}>
                <img src={logout} alt="Logout" className="dropdown-icon" />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>

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



