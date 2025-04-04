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
        {/* Top row for search and button */}
        <div className="collection-top-row">
          <div className="collection-search-bar">
            <input 
              type="text" 
              placeholder="Search collections..." 
              className="collection-search-input"
            />
            <span className="collection-search-icon">🔍</span> {/* Consider replacing with an actual icon */}
          </div>
          <button className="collection-new-btn">New Collection</button>
        </div>

        {/* Stats Grid */}
        <div className="collection-stats-grid">
          <div className="collection-stat-card">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Total Collected</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>
          
          <div className="collection-stat-card organic">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Organic Collected</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>
          
          <div className="collection-stat-card recyclable">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Recyclable Collected</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>

          <div className="collection-stat-card electric">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Electric Collection</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>

          <div className="collection-stat-card non-recyclable">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Non-Recyclable Collection</h3>
            <p className="collection-stat-value">856 kg</p>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
};

export default CollectionPage;
