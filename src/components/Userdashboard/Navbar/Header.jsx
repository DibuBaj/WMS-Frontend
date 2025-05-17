import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";

import Logo from "../../../assets/Logo.svg";
import logout from "../../../assets/logout.png";
import SettingsIcon from "../../../assets/Settings.svg";
import Adminlogo from "../../../assets/Adminlogo.svg"; 

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [avatar, setAvatar] = useState(Adminlogo); 
  const [username, setUsername] = useState("User");
  const [greeting, setGreeting] = useState("");
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
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

   
    const storedAvatar = localStorage.getItem("avatar");
    setAvatar(storedAvatar || Adminlogo);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogout = async () => {
    setIsLoggingOut(true);
    const token = localStorage.getItem("token");
  
    try {
      // Clear all auth-related data first
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("avatar");
      
      // Then make the logout API call
      await axios.post("http://localhost:3000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Navigate immediately after clearing data
      navigate("/signin", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      // Even if the API call fails, we still want to log the user out
      navigate("/signin", { replace: true });
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
        <div className="logo-wrap">
          <img src={Logo} alt="GreenBin Logo" className="sidebar-logo" />
          <span className="GreenBinText">GreenBin</span>
        </div>
        <div className="greeting">
          <span>👋 {greeting}, {username}</span>
        </div>

        {/* Profile Dropdown */}
        <div className="profile-container" onClick={toggleDropdown}>
          <img src={avatar} alt="Profile" className="profile-icon" />

          {showDropdown && (
            <div className="dropdownn-menuu">
              <div className="dropdown-username">{username}</div>
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
