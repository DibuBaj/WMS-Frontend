import React, { useState, useEffect } from 'react';
import AdminLayout from '../Navbar/AdminLayout';
import './Collection.css';

const Collection = () => {
  const [showModal, setShowModal] = useState(false);
  const [newCollection, setNewCollection] = useState({
    type: '',
    amount: '',
    notes: '',
    status: 'pending',
    route: ''
  });
  const [routes, setRoutes] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to access this page.");
          return;
        }

        const response = await fetch('http://localhost:3000/api/route/get-routes', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch routes');
        }

        const data = await response.json();
        if (data.success) {
          // Only show routes that are in Scheduled or No Schedule status
          const availableRoutes = data.data.filter(route => 
            route.status === 'Scheduled' || route.status === 'No Schedule'
          );
          setRoutes(availableRoutes);
          setError('');
        } else {
          throw new Error(data.message || 'Failed to load routes');
        }
      } catch (err) {
        console.error('Error fetching routes:', err);
        setError(err.message || 'Failed to load routes. Please try again.');
      }
    };
    fetchRoutes();
  }, []);

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (!token) {
      setError("Please log in to access this page.");
    } else if (user.email !== "greenbinpvtltd@gmail.com") {
      setError("Admin access required. Please log in as admin.");
    } else {
      fetchCollections();
    }
  }, []);

  const fetchCollections = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/collections', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
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

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to access this page.");
      return;
    }

    const { type, amount, notes, status, route } = newCollection;
    if (!type || !amount || !notes || !status || !route) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/collections', {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          amount: Number(amount),
          notes,
          status,
          route
        })
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to create collection');
      }

      setNewCollection({ type: '', amount: '', notes: '', status: 'pending', route: '' });
      setShowModal(false);
      setError('');
      fetchCollections();
    } catch (err) {
      setError(err.message || 'Failed to create collection');
    }
    setLoading(false);
  };

  const filteredCollections = collections.filter(collection =>
    collection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="collection-content">
        <div className="collection-top-row">
          <div className="collection-search-bar">
            <input
              type="text"
              placeholder="Search collections..."
              className="collection-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  value={newCollection.route}
                  onChange={e => setNewCollection({ ...newCollection, route: e.target.value })}
                  required
                >
                  <option value="">Select a route</option>
                  {routes.map(route => (
                    <option key={route._id} value={route._id}>
                      {route.routeName} ({route.routeId}) - {route.status}
                    </option>
                  ))}
                </select>
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
                  {loading ? 'Creating...' : 'CREATE'}
                </button>
              </form>
              {error && <div className="modal-error">{error}</div>}
            </div>
          </div>
        )}

        {error && <div className="collection-error">{error}</div>}

        <div className="collection-stats-grid">
          {loading ? (
            <div className="collection-loading">Loading collections...</div>
          ) : filteredCollections.length > 0 ? (
            filteredCollections.map((col) => (
              <div className="collection-stat-card" key={col._id}>
                <div className="collection-card-header">
                  <h3>{col.type}</h3>
                  <span className={`collection-status ${col.status}`}>
                    {col.status}
                  </span>
                </div>
                <div className="collection-card-body">
                  <p className="collection-amount">{col.amount} kg</p>
                  <p className="collection-notes">{col.notes}</p>
                  <p className="collection-date">
                    {new Date(col.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="collection-empty">
              {searchTerm ? 'No collections match your search.' : 'No collections found.'}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Collection;
