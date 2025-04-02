import React from 'react';
import Header from '../Navbar/Header';
import Sidebarr from '../Navbar/Sidebarr';
import './Collection.css';

const CollectionPage = () => {
  return (
    <div>
      <Header/>
    <div className="collection-container">
      <Sidebarr />
      
      <div className="collection-content">
        <div className="collection-search-bar">
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="collection-search-input"
          />
          <span className="collection-search-icon">🔍</span>
        </div>

        <div className="collection-stats-grid">
          <div className="collection-stat-card">
            <h3>Total Collected</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>
          
          <div className="collection-stat-card organic">
            <h3>Organic Collected</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>
          
          <div className="collection-stat-card recyclable">
            <h3>Recyclable Collected</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>

          <div className="collection-stat-card electric">
            <h3>Electric Collection</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>

          <div className="collection-stat-card non-recyclable">
            <h3>Non-Recyclable Collection</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>
        </div>

        <button className="collection-new-btn">New Collection</button>
      </div>
    </div>
    </div>
  );
};

export default CollectionPage;