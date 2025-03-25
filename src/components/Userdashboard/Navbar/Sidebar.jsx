// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";
// import Dashboard from "../../../assets/Dashboard.svg";
// import Schedule from "../../../assets/Schedule.svg";
// import Settings from "../../../assets/Settings.svg";
// import Recycle from "../../../assets/Recycle.svg";
// import Adminlogo from "../../../assets/Adminlogo.svg"; // Profile image
// import logout from "../../../assets/logout.png";

// const Sidebar = () => {
  
//   return (
//     <div>
//       {/* Top Navbar */}
//       <div className="top-navbar">
//       <img src={Recycle} alt="GreenBin Logo" className="sidebar-logo" />
//         <span className="GreenBinText">GreenBin</span>
//         <img src={Adminlogo} alt="Profile" className="profile-icon" />
//       </div>

//       {/* Sidebar */}
//       <div className="sidebar">
//         <ul>
//           <li>
//             <NavLink to="/userdashboard" className={({ isActive }) => (isActive ? "active" : "")}>
//               <img src={Dashboard} alt="Dashboard" className="icon" />
//               <span className="text">Dashboard</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
//               <img src={Schedule} alt="Schedule" className="icon" />
//               <span className="text">Schedule</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
//               <img src={Settings} alt="Settings" className="icon" />
//               <span className="text">Settings</span>
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };
// import logout from "../../../assets/logout.png";
// export default Sidebar;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Dashboard from "../../../assets/Dashboard.svg";
import Schedule from "../../../assets/Schedule.svg";
import Settings from "../../../assets/Settings.svg";
import Recycle from "../../../assets/Recycle.svg";
import Adminlogo from "../../../assets/Adminlogo.svg"; // Profile image
import logout from "../../../assets/logout.png" // Logout icon
import SettingsIcon from "../../../assets/Settings.svg"; // Settings icon

const Sidebar = () => {
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
    <div>
      {/* Top Navbar */}
      <div className="top-navbar">
        <img src={Recycle} alt="GreenBin Logo" className="sidebar-logo" />
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

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>
            <NavLink to="/userdashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={Dashboard} alt="Dashboard" className="icon" />
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={Schedule} alt="Schedule" className="icon" />
              <span className="text">Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
              <img src={Settings} alt="Settings" className="icon" />
              <span className="text">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

