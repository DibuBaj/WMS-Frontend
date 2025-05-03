import React, { useState, useEffect } from 'react';
import Header from '../Navbar/Header';
import Sidebarr from '../Navbar/Sidebarr';
import './Collection.css';

const CollectionPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch collections from API
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/collections');
      const data = await res.json();
      setCollections(data.collections || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch collections');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  // Handle create new collection
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCollectionName })
      });
      if (!res.ok) throw new Error('Failed to create collection');
      setNewCollectionName('');
      setShowModal(false);
      fetchCollections();
      setError('');
    } catch (err) {
      setError('Failed to create collection');
    }
    setLoading(false);
  };

  // Calculate stats
  const totalCollected = collections.reduce((sum, c) => sum + (c.amount || 0), 0);
  const organicCollected = collections.filter(c => c.type === 'organic').reduce((sum, c) => sum + (c.amount || 0), 0);
  const recyclableCollected = collections.filter(c => c.type === 'recyclable').reduce((sum, c) => sum + (c.amount || 0), 0);
  const electricCollected = collections.filter(c => c.type === 'electric').reduce((sum, c) => sum + (c.amount || 0), 0);
  const nonRecyclableCollected = collections.filter(c => c.type === 'non-recyclable').reduce((sum, c) => sum + (c.amount || 0), 0);

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
          <button className="collection-new-btn" onClick={() => setShowModal(true)}>New Collection</button>
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowModal(false)}>&#10005;</button>
              <h2 className="modal-title">New Collection Name</h2>
              <form onSubmit={handleCreate}>
                <input
                  className="modal-input"
                  type="text"
                  value={newCollectionName}
                  onChange={e => setNewCollectionName(e.target.value)}
                  placeholder="Enter collection name"
                  autoFocus
                />
                <button className="modal-create-btn" type="submit" disabled={loading}>
                  CREATE
                </button>
              </form>
              {error && <div className="modal-error">{error}</div>}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="collection-stats-grid">
          <div className="collection-stat-card">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Total Collected</h3>
            <p className="collection-stat-value">{totalCollected} kg</p>
          </div>
          
          <div className="collection-stat-card organic">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Organic Collected</h3>
            <p className="collection-stat-value">{organicCollected} kg</p>
          </div>
          
          <div className="collection-stat-card recyclable">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Recyclable Collected</h3>
            <p className="collection-stat-value">{recyclableCollected} kg</p>
          </div>

          <div className="collection-stat-card electric">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Electric Collection</h3>
            <p className="collection-stat-value">{electricCollected} kg</p>
          </div>

          <div className="collection-stat-card non-recyclable">
            <span className="collection-info-icon">?</span> {/* Placeholder for info icon */}
            <h3>Non-Recyclable Collection</h3>
            <p className="collection-stat-value">{nonRecyclableCollected} kg</p>
          </div>
        </div>

        {/* List of Collections */}
        <div className="collection-list">
          <h3>All Collections</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {collections && collections.length > 0 ? (
                collections.map((col, idx) => (
                  <li key={col._id || idx}>
                    <strong>Type:</strong> {col.type} | <strong>Amount:</strong> {col.amount} kg | <strong>Date:</strong> {col.collectionDate ? new Date(col.collectionDate).toLocaleDateString() : 'N/A'}
                  </li>
                ))
              ) : (
                <li>No collections found.</li>
              )}
            </ul>
          )}
        </div>

      </div>
    </div>
    </div>
  );
};

export default CollectionPage;
