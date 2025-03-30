import React from "react";
// import Navbar from "../components/AdminDashboard/Navbar";
// import React from "react";
import { LayoutDashboard, Truck, Package, Recycle, Clock } from "lucide-react";
import "./AdminDashboard.css";
import Navbar from "../Navbar/Navbar.jsx"

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      {/* <aside className="sidebar">
        <div className="sidebar-header">
          <Recycle className="sidebar-logo-icon" />
          <h1 className="sidebar-logo-text">GreenBin</h1>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active">
            <LayoutDashboard size={20} />
            <span className="nav-label">Dashboard</span>
          </div>
          <div className="nav-item">
            <Package size={20} />
            <span className="nav-label">Collections</span>
          </div>
          <div className="nav-item">
            <Truck size={20} />
            <span className="nav-label">Routes</span>
          </div>
        </nav>
      </aside> */}
       <Navbar/>



      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <h1 className="page-title">GreenBin</h1>
          <div className="user-profile">
            <span className="user-name">Admin User</span>
            <div className="user-avatar">
              {/* User Icon */}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Routes Section */}
          <div className="routes-section">
            <h2 className="section-title">Active Route</h2>
            
            <div className="route-card">
              <h3>Route #123 - Kathmandu</h3>
              <p className="route-time">
                <Clock size={16} /> 8:00 AM - 12:00 PM
              </p>
            </div>
            
            <div className="route-card">
              <h3>Route #124 - Lalitpur</h3>
              <p className="route-time">
                <Clock size={16} /> 1:00 PM - 5:00 PM
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-card">
              <h3>Waste Collected</h3>
              <p className="stat-value">856 kg</p>
            </div>
            
            <div className="stat-card">
              <h3>Active Routes</h3>
              <p className="stat-value">42</p>
            </div>
          </div>

          {/* Activities Section */}
          <div className="activities-section">
            <h2 className="section-title">Recent Activities</h2>
            <div className="activities-table">
              <div className="table-header">
                <span>Date</span>
                <span>Location</span>
                <span>Type</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              
              <div className="table-row">
                <span>Jan 15, 2025 5:30am</span>
                <span>Newroad</span>
                <span>Organic</span>
                <span>50 kg</span>
                <span>(mixing)</span>
              </div>
              
              <div className="table-row">
                <span>Jan 14, 2025 6:30am</span>
                <span>Newroad</span>
                <span>Recyclable</span>
                <span>30 kg</span>
                <span>(completed)</span>
              </div>
              
              <div className="table-row">
                <span>Jan 13, 2025 8:30am</span>
                <span>Newroad</span>
                <span>Organic</span>
                <span>25 kg</span>
                <span>(completed)</span>
              </div>
            </div>
          </div>

          {/* View All Button */}
          <button className="view-all-btn">
            View All
          </button>
        </div>
      </main>
    </div>
  );
}

// const AdminDashboard =()=>{
//   return (
//     <>
//         <div>
//             <Navbar/>
//         </div>
//     </>

  
//   )
// };

// export default AdminDashboard;
