import React, { useState } from "react";
import "./Userschedule.css";

const initialData = [
  { id: 1, date: "Jan 15, 2025 09:00 AM", location: "Newroad", type: "Organic", amount: "250 kg", status: "Pending" },
  { id: 2, date: "Jan 16, 2025 10:30 AM", location: "Newroad", type: "Recyclable", amount: "180 kg", status: "Completed" },
  { id: 3, date: "Jan 17, 2025 02:00 PM", location: "Newroad", type: "Recyclable", amount: "75 kg", status: "Completed" }
];

const Userschedule = () => {
  const [data, setData] = useState(initialData);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [popupMessage, setPopupMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [error, setError] = useState("");

  const handleEdit = (item) => {
    setEditItem(item.id);
    setEditData(item);
    setMenuOpen(null);
    document.body.classList.add("blur-active");
  };

  const handleSaveEdit = () => {
    if (!editData.date || !editData.location || !editData.type || !editData.amount || !editData.status) {
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
          <select value={editData.status} onChange={(e) => setEditData({ ...editData, status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={closeEditPopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Userschedule;
