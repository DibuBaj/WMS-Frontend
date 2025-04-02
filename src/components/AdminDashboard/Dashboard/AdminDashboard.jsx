import React from "react";
import { Clock } from "lucide-react";
import Header from "../Navbar/Header";
import Sidebarr from "../Navbar/Sidebarr";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <Header title="GreenBin" />
      <Sidebarr />
      
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
    </div>
  );
}