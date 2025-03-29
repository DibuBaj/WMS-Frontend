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

  const [showPopup, setShowPopup] = useState(false); 

  
  const addPickup = (newPickup) => {
    setRecentPickups(prev => [newPickup, ...prev]); 
    setShowPopup(true); 

    
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <Sidebar />
        <div className={`dashboard-wrapper ${showPopup ? "blurred" : ""}`}> 
          <Pickup addPickup={addPickup} />
          <Recentpickup recentPickups={recentPickups} />
        </div>
      </div>
      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-message">
            <p>New pickup request added successfully!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Userdashboard;
