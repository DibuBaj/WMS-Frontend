import React, { useState } from "react";
import Sidebar from "../components/Userdashboard/Navbar/Sidebar.jsx";
import Pickup from "../components/Userdashboard/Dashboard/Pickup.jsx";
import Recentpickup from "../components/Userdashboard/Dashboard/Recentpickup.jsx";
import Header from "../components/Userdashboard/Navbar/Header.jsx";
import "../components/Userdashboard/Dashboard/Dashboard.css";

const Userdashboard = () => {
  const [recentPickups, setRecentPickups] = useState([
    { date: "Jan 15, 2025 5:30am", location: "Newroad", route: "#123-Kathmandu", type: "Organic", amount: "50 kg", status: "Pending" },
    { date: "Jan 14, 2025 6:30am", location: "Newroad", route: "#123-Kathmandu", type: "Recyclable", amount: "30 kg", status: "Completed" },
    { date: "Jan 13, 2025 8:30am", location: "Newroad", route: "#123-Kathmandu", type: "Organic", amount: "25 kg", status: "Completed" },
  ]);

  // Function to add a new pickup request
  const addPickup = (newPickup) => {
    setRecentPickups(prev => [newPickup, ...prev]); // Add new pickup to the top of the list
  };

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <Sidebar />
        <div className="dashboard-wrapper">
          <Pickup addPickup={addPickup} />  {/* Pass function to Pickup */}
          <Recentpickup recentPickups={recentPickups} />  {/* Pass recent pickups data */}
        </div>
      </div>
    </>
  );
};

export default Userdashboard;
