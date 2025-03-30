import React from 'react';
import Header from '../Navbar/Header';
import './Collection.css';
import Navbar from "../Navbar/Navbar.jsx"


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header title="GreenBin" />
      
      {/* <div className="dashboard-nav">
        <button className="nav-button active">Dashboard</button>
        <button className="nav-button">Collections</button>
        <button className="nav-button">Routes</button>
      </div> */}
      
       <Navbar/>

      <div className="dashboard-content">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="search-input"
          />
          <span className="search-icon">Q.</span>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Collected</h3>
            <p className="stat-value">856 kg</p>
          </div>
          
          <div className="stat-card organic">
            <h3>Organic Collected</h3>
            <p className="stat-value">856 kg</p>
          </div>
          
          <div className="stat-card recyclable">
            <h3>Recyclable Collected</h3>
            <p className="stat-value">856 kg</p>
          </div>
        </div>

        <button className="new-collection-btn">
          New Collection
        </button>
      </div>
    </div>
  );
};

export default Dashboard;