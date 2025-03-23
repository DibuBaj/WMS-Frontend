import React from "react";
import { NavLink } from "react-router-dom";
import "./components/Userdashboard/Navbar/Sidebar.css";

const SidebarMenu = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/schedule" activeClassName="active">
            <span>Schedule</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">
           <span>Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
