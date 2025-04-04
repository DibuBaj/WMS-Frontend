import React from "react";
// Assuming you might use icons from lucide-react or similar
// import { Clock, MoreHorizontal, Truck, BarChart2, ArrowRightLeft } from "lucide-react"; 
import Header from "../Navbar/Header";
import Sidebarr from "../Navbar/Sidebarr";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <Sidebarr />
        
        <div className="dashboard-content">
          {/* Top Row: Routes and Stats */}
          <div className="dashboard-top-row">
            {/* Routes Section */}
            <div className="routes-section card"> {/* Added card class */}
              <div className="card-header">
                <h2 className="section-title">Active Route</h2>
                <span className="icon-placeholder">...</span> {/* Placeholder for MoreHorizontal icon */}
              </div>
              
              <div className="route-card">
                <span className="icon-placeholder truck-icon">🚚</span> {/* Placeholder for Truck icon */}
                <div className="route-details">
                  <h3>Route #123 - Kathmandu</h3>
                  <p className="route-time">
                    {/* <Clock size={14} />  */} {/* Optional: Keep clock icon */}
                    8:00 AM - 12:00 PM
                  </p>
                </div>
                <span className="status-badge status-in-progress">In Progress</span>
              </div>
              
              <div className="route-card">
                <span className="icon-placeholder truck-icon">🚚</span> {/* Placeholder for Truck icon */}
                <div className="route-details">
                  <h3>Route #124 - Lalitpur</h3>
                  <p className="route-time">
                    {/* <Clock size={14} /> */} {/* Optional: Keep clock icon */}
                     1:00 PM - 5:00 PM
                  </p>
                </div>
                <span className="status-badge status-scheduled">Scheduled</span>
              </div>
            </div>

            {/* Stats Section */}
            <div className="stats-section">
              <div className="stat-card card"> {/* Added card class */}
                 <div className="card-header">
                    <h3>Waste Collected</h3>
                    <span className="icon-placeholder">📊</span> {/* Placeholder for BarChart2 icon */}
                 </div>
                <p className="stat-value">856 kg</p>
              </div>
              
              <div className="stat-card card"> {/* Added card class */}
                <div className="card-header">
                    <h3>Active Routes</h3>
                    <span className="icon-placeholder">⇄</span> {/* Placeholder for ArrowRightLeft icon */}
                </div>
                <p className="stat-value">42</p>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div className="activities-section card"> {/* Added card class */}
            <div className="card-header">
              <h2 className="section-title">Recent Activities</h2>
              <a href="#" className="view-all-link">View All</a>
            </div>
            <div className="activities-table">
              {/* Header Row */}
              <div className="table-row table-header">
                <div className="table-cell">Date</div>
                <div className="table-cell">Location</div>
                <div className="table-cell">Type</div>
                <div className="table-cell">Amount</div>
                <div className="table-cell">Status</div>
              </div>
              
              {/* Data Rows */}
              <div className="table-row">
                <div className="table-cell">Jan 15, 2025 5:30am</div>
                <div className="table-cell">Newroad</div>
                <div className="table-cell">Organic</div>
                <div className="table-cell">50 kg</div>
                <div className="table-cell">
                  <span className="status-badge status-pending">Pending</span>
                </div>
              </div>
              
              <div className="table-row">
                <div className="table-cell">Jan 14, 2025 6:30am</div>
                <div className="table-cell">Newroad</div>
                <div className="table-cell">Recyclable</div>
                <div className="table-cell">30 kg</div>
                <div className="table-cell">
                  <span className="status-badge status-completed">Completed</span>
                </div>
              </div>
              
              <div className="table-row">
                <div className="table-cell">Jan 13, 2025 8:30am</div>
                <div className="table-cell">Newroad</div>
                <div className="table-cell">Organic</div>
                <div className="table-cell">25 kg</div>
                <div className="table-cell">
                  <span className="status-badge status-completed">Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Removed the standalone View All Button */}
        </div>
      </div>
    </div>
  );
}
