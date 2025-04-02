import React, { useState, useEffect } from "react";
import "./Userschedule.css";

const Userschedule = () => {
  const [data, setData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Get the token from localStorage
  const token = localStorage.getItem('token'); 

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchPickupsHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pickups/history", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Send token in the header
          },
        });
        const result = await response.json();
        
        if (result.message === "Pickup history retrieved successfully for user") {
          // Transform the API data into the required format
          const transformedData = result.pickups.map((pickup) => ({
            id: pickup._id,
            date: new Date(pickup.pickupDateTime).toLocaleString(),
            location: `${pickup.pickupLocation.coordinates[0]}, ${pickup.pickupLocation.coordinates[1]}`,
            type: pickup.wasteType.charAt(0).toUpperCase() + pickup.wasteType.slice(1),
            amount: `${pickup.amount} ${pickup.unit}`,
            status: pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1),
          }));
          setData(transformedData);
        } else {
          setError("Failed to load pickup history.");
        }
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);  // Stop the loading spinner
      }
    };

    fetchPickupsHistory();
  }, [token]);

  const handleEdit = (item) => {
    setEditItem(item.id);
    setEditData(item);
    setMenuOpen(null);
    document.body.classList.add("blur-active");
  };

  const handleSaveEdit = () => {
    if (!editData.date || !editData.location || !editData.type || !editData.amount) {
      setError("All fields are required.");
      return;
    }
    setData(data.map((item) => (item.id === editItem ? editData : item)));
    setEditItem(null);
    setError("");
    showPopup("Edited Successfully!");
    document.body.classList.remove("blur-active");
  };

  const handleCancel = (id) => {
    setData(data.filter((item) => item.id !== id));
    setMenuOpen(null);
    showPopup("Deleted Successfully!");
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    document.body.classList.add("blur-active");
    setTimeout(() => {
      setPopupMessage("");
      document.body.classList.remove("blur-active");
    }, 2000);
  };

  const closeEditPopup = () => {
    setEditItem(null);
    setError("");
    document.body.classList.remove("blur-active");
  };

  const filteredData = data.filter((row) => {
    return (
      (filterType === "All" || row.type.toLowerCase() === filterType.toLowerCase()) &&
      (row.location.toLowerCase().includes(search.toLowerCase()) ||
        row.type.toLowerCase().includes(search.toLowerCase()) ||
        row.status.toLowerCase().includes(search.toLowerCase()) ||
        row.amount.toLowerCase().includes(search.toLowerCase()) ||
        row.date.toLowerCase().includes(search.toLowerCase()))
    );
  });

  if (loading) {
    return <div>Loading...</div>; // Display loading text while data is being fetched
  }

  return (
    <div className={`container ${editItem !== null || popupMessage ? "blur-background" : ""}`}>
      <h2 className="title">Waste Collection Schedule</h2>
      {popupMessage && <div className="popup-message">{popupMessage}</div>}

      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-dropdown">
          <option value="All">All Types</option>
          <option value="Organic">Organic</option>
          <option value="Recyclable">Recyclable</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <table className="data-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Location</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.location}</td>
              <td><span className="type-badge">{row.type}</span></td>
              <td>{row.amount}</td>
              <td className="status-container">
                <span className={row.status === "Pending" ? "status-pending" : "status-completed"}>{row.status}</span>
                <button className="menu-btn" onClick={() => setMenuOpen(menuOpen === row.id ? null : row.id)}>⋮</button>
                {menuOpen === row.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleCancel(row.id)}>Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editItem !== null && <div className="overlay" onClick={closeEditPopup}></div>}

      {editItem !== null && (
        <div className="edit-popup">
          <h3>Edit Entry</h3>
          {error && <p className="error-message">{error}</p>}
          <input type="text" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
          <input type="text" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
          <input type="text" value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })} />
          <input type="text" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={closeEditPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Userschedule;
