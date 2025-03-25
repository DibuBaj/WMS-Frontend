import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Dashboard from "../../../assets/Dashboard.svg";
import Schedule from "../../../assets/Schedule.svg";
import Settings from "../../../assets/Settings.svg";
import Recycle from "../../../assets/Recycle.svg";
import Adminlogo from "../../../assets/Adminlogo.svg"; // Profile image

const Sidebar = () => {
  return (
    <div>
      {/* Top Navbar */}
      <div className="top-navbar">
      <img src={Recycle} alt="GreenBin Logo" className="sidebar-logo" />
        <span className="GreenBinText">GreenBin</span>
        <img src={Adminlogo} alt="Profile" className="profile-icon" />
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

