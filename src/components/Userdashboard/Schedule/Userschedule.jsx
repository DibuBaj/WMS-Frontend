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
  const [unit, setUnit] = useState("kg");

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Fetch data from API on component mount
useEffect(() => {
  const fetchPickupsHistory = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (parsedUser?.id && token) {
        const response = await fetch(`http://localhost:3000/api/pickups/history?userId=${parsedUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.message === "Pickup history retrieved successfully" || result.pickups) {
          const transformedData = result.pickups.map((pickup) => ({
            id: pickup._id,
            date: new Date(pickup.pickupDateTime).toLocaleString(),
            location: pickup.address,
            type: pickup.wasteType.charAt(0).toUpperCase() + pickup.wasteType.slice(1),
            amount: `${pickup.amount} ${pickup.unit}`,
            status: pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1),
          }));
          setData(transformedData);
        } else {
          showError("Failed to load pickup history.");
        }
      } else {
        showError("User not found or not authenticated.");
      }
    } catch (err) {
      console.error(err);
      showError("An error occurred while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  fetchPickupsHistory();
}, [token]);


  const handleEdit = (item) => {
    setEditItem(item.id);
    setEditData({
      date: item.date,        // Set initial date from the user's data
      location: item.location,
      type: item.type,
      amount: item.amount.split(' ')[0],  // Extract numeric amount (without unit)
    });
    setMenuOpen(null);

    // Delay the class addition to ensure DOM updates correctly
    setTimeout(() => {
      document.body.classList.add("blur-active");
      document.querySelector('.edit-popup').classList.add('active');
      document.querySelector('.overlay').style.display = 'block';
    }, 0);
  };

  const handleSaveEdit = async () => {
    if (!editData.date || !editData.location || !editData.type || !editData.amount) {
      showError("All fields are required.");
      return;
    }
  
    const payload = {
      address: editData.location,
      pickupDateTime: new Date(editData.date).toISOString(),
      subscription: "1 Week ($5)", // You can replace this with dynamic value if needed
      wasteType: editData.type.toLowerCase(),
      amount: parseFloat(editData.amount),
      unit: unit,
    };
  
    try {
      const response = await fetch(`http://localhost:3000/api/pickups/${editItem}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Update local state for frontend
        const updatedItem = {
          id: editItem,
          date: new Date(payload.pickupDateTime).toLocaleString(),
          location: payload.address,
          type: payload.wasteType.charAt(0).toUpperCase() + payload.wasteType.slice(1),
          amount: `${payload.amount} ${payload.unit}`,
          status: "Pending", // You can also fetch this from the response if returned
        };
  
        setData(data.map(item => item.id === editItem ? updatedItem : item));
        showSuccess("Edited Successfully!");
        setEditItem(null);
        document.body.classList.remove("blur-active");
        document.querySelector('.edit-popup').classList.remove('active');
        document.querySelector('.overlay').style.display = 'none';
      } else {
        showError(result.message || "Failed to update data.");
      }
    } catch (error) {
      showError("Error updating the entry.");
    }
  };
  
  const handleDelete = async (id) => {
    console.log("Deleting pickup with ID:", id);
    try {
      const response = await fetch(`http://localhost:3000/api/pickups/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setData(data.filter((item) => item.id !== id));
        setMenuOpen(null);
        showSuccess("Cancelled Successfully!");
      } else {
        showError(result.message || "Failed to cancel entry.");
      }
    } catch (error) {
      showError("Error canceling the entry.");
    }
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
    document.querySelector('.edit-popup').classList.remove('active');
    document.querySelector('.overlay').style.display = 'none';
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
                <p className="menu-btn" onClick={() => setMenuOpen(menuOpen === row.id ? null : row.id)}>⋮</p>
                {menuOpen === row.id && (
                  <div className="dropdown-menu-user">
                    <button onClick={() => handleEdit(row)}>Edit</button>
                    <button onClick={() => handleDelete(row.id)}>Cancel</button>
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
          
          <div className="popup-fields">
            <label htmlFor="edit-date">Date & Time</label>
            <input
              id="edit-date"
              type="datetime-local"
              value={editData.date}
              onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            />
          </div>

          <div className="popup-fields">
            <label htmlFor="edit-location">Location</label>
            <input
              id="edit-location"
              type="text"
              value={editData.location}
              onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            />
          </div>

          <div className="popup-fields">
            <label htmlFor="edit-type">Type</label>
            <select
              id="edit-type"
              value={editData.type}
              onChange={(e) => setEditData({ ...editData, type: e.target.value })}
            >
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Non-Recyclable">Non-Recyclable</option>
            </select>
          </div>

          <div className="popup-fields">
            <label htmlFor="edit-amount">Amount</label>
            <input
              id="edit-amount"
              type="number"
              value={editData.amount}
              onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
              placeholder="Amount"
            />
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="kg">Kg</option>
              <option value="g">Gram</option>
            </select>
          </div>

          <div className="popup-actions">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={closeEditPopup}>Close</button>
          </div>
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
