import React from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar.jsx";
import Pickup from "../components/Userdashboard/Dashboard/Pickup.jsx";
import Recentpickup from "../components/Userdashboard/Dashboard/Recentpickup.jsx";
import Header from "../components/Userdashboard/Navbar/Header.jsx";
import "../components/Userdashboard/Dashboard/Dashboard.css";

const Userdashboard = () => {
  return (
    <>
      <Header />
      <div className="user-dashboard">
        <Sidebar />
        <div className="dashboard-wrapper">
          <Pickup />
          <Recentpickup />
        </div>
      </div>
    </>
  );
};

export default Userdashboard;
