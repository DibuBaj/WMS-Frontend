import React, { useState, useEffect } from 'react';
import AdminLayout from "../Navbar/AdminLayout";
import './Collection.css';

const Collection = () => {
  const [showModal, setShowModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    type: '',
    amount: '',
    notes: '',
    status: 'pending'
  });
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      return;
    }
    
  console.log("Token",token);
  const fetchCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/collections', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCollections(data.collections || []);
        setError('');
      } else {
        setError(data.message || 'Failed to load collections');
      }
    } catch (err) {
      setError('Failed to fetch collections');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const { type, amount, notes, status } = newCollection;
    if (!type || !amount || !notes || !status) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/collections', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          amount: Number(amount),
          notes,
          status
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to create collection');
      }

      setNewCollection({ type: '', amount: '', notes: '', status: 'pending' });
      setShowModal(false);
      setError('');
      fetchCollections();
    } catch (err) {
      setError(err.message || 'Failed to create collection');
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="collection-content">
        <div className="collection-top-row">
          <div className="collection-search-bar">
            <input
              type="text"
              placeholder="Search collections..."
              className="collection-search-input"
            />
            <span className="collection-search-icon">🔍</span>
          </div>
          <button className="collection-new-btn" onClick={() => setShowModal(true)}>
            New Collection
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowModal(false)}>&#10005;</button>
              <h2 className="modal-title">New Collection</h2>
              <form onSubmit={handleCreate}>
                <input
                  className="modal-input"
                  type="text"
                  value={newCollection.type}
                  onChange={e => setNewCollection({ ...newCollection, type: e.target.value })}
                  placeholder="Type (e.g. recycle)"
                  required
                />
                <input
                  className="modal-input"
                  type="number"
                  value={newCollection.amount}
                  onChange={e => setNewCollection({ ...newCollection, amount: e.target.value })}
                  placeholder="Amount in kg"
                  required
                />
                <input
                  className="modal-input"
                  type="text"
                  value={newCollection.notes}
                  onChange={e => setNewCollection({ ...newCollection, notes: e.target.value })}
                  placeholder="Notes"
                  required
                />
                <select
                  className="modal-input"
                  value={newCollection.status}
                  onChange={e => setNewCollection({ ...newCollection, status: e.target.value })}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button className="modal-create-btn" type="submit" disabled={loading}>
                  CREATE
                </button>
              </form>
              {error && <div className="modal-error">{error}</div>}
            </div>
          </div>
        )}

        <div className="collection-stats-grid">
          {loading ? (
            <p>Loading...</p>
          ) : collections.length > 0 ? (
            collections.map((col) => (
              <div className="collection-stat-card" key={col._id}>
                <span className="collection-info-icon">?</span>
                <h3>{col.type}</h3>
                <p className="collection-stat-value">{col.amount} kg</p>
                <p className="collection-stat-value">{col.status}</p>
                <p className="collection-stat-value">
                  {new Date(col.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No collections found.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Collection;
