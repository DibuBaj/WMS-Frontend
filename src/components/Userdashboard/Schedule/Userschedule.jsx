import React, { useState, useEffect } from "react";
import "./Userschedule.css";
import SuccessPopup from "../Navbar/SuccessPopup";
import ErrorPopup from "../Navbar/ErrorPopup";

const Userschedule = () => {
  const [data, setData] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Get the token from localStorage
  const token = localStorage.getItem('token'); 

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchPickupsHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/pickups/history", {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        
        if (result.message === "Pickup history retrieved successfully for user") {
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
          showError("Failed to load pickup history.");
        }
      } catch (err) {
        showError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
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
      showError("All fields are required.");
      return;
    }
    setData(data.map((item) => (item.id === editItem ? editData : item)));
    setEditItem(null);
    showSuccess("Edited Successfully!");
    document.body.classList.remove("blur-active");
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setMenuOpen(null);
    showSuccess("Deleted Successfully!");
  };

  const showSuccess = (message) => {
    setPopupMessage(message);
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 2000);
  };

  const showError = (message) => {
    setPopupMessage(message);
    setShowErrorPopup(true);
    setTimeout(() => setShowErrorPopup(false), 2000);
  };

  const closeEditPopup = () => {
    setEditItem(null);
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
    return <div>Loading...</div>;
  }

  return (
    <div className={`container ${editItem !== null ? "blur-background" : ""}`}>
      <h2 className="title">Waste Collection Schedule</h2>

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
                    <button onClick={() => handleDelete(row.id)}>Delete</button>
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
          <input type="text" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
          <input type="text" value={editData.location} onChange={(e) => setEditData({ ...editData, location: e.target.value })} />
          <input type="text" value={editData.type} onChange={(e) => setEditData({ ...editData, type: e.target.value })} />
          <input type="text" value={editData.amount} onChange={(e) => setEditData({ ...editData, amount: e.target.value })} />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={closeEditPopup}>Close</button>
        </div>
      )}

      {showSuccessPopup && (
        <SuccessPopup
          message={popupMessage}
          onClose={() => setShowSuccessPopup(false)}
        />
      )}

      {showErrorPopup && (
        <ErrorPopup
          message={popupMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default Userschedule;
