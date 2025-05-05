import React, { useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../Navbar/AdminLayout";
import "./PickupManagement.css";

const PickupManagement = () => {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 7;
  const totalEntries = 24;

  // Sample data
  const pickupData = [
    {
      id: 1,
      date: "Jan 15, 2025 5:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
      status: "Pending",
    },
    {
      id: 2,
      date: "Jan 14, 2025 6:30am",
      location: "Newroad",
      type: "Recyclable",
      user: "Ram Shrestha",
      status: "Completed",
    },
    {
      id: 3,
      date: "Jan 13, 2025 8:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
      status: "Completed",
    },
    {
      id: 4,
      date: "Jan 13, 2025 8:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
      status: "Completed",
    },
    {
      id: 5,
      date: "Jan 13, 2025 8:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
      status: "Completed",
    },
    {
      id: 6,
      date: "Jan 12, 2025 9:00am",
      location: "Patan",
      type: "Recyclable",
      user: "Sita Rai",
      status: "Completed",
    },
    {
      id: 7,
      date: "Jan 11, 2025 7:15am",
      location: "Bhaktapur",
      type: "Organic",
      user: "Hari Lama",
      status: "Pending",
    },
  ];

  // Calculate pagination details
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPickupData = pickupData.slice(0, itemsPerPage);
  const showingStart = totalEntries > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(endIndex, totalEntries);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setActivePage(pageNumber);
    }
  };

  const handlePrevious = () => {
    handlePageChange(activePage - 1);
  };

  const handleNext = () => {
    handlePageChange(activePage + 1);
  };

  // Generate page numbers to display
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <AdminLayout>
      <div className="pickup-content card">
        {/* Header: Title and Search */}
        <div className="pickup-header">
          <h2 className="pickup-title">Pickup Management</h2>
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search routes..."
              className="search-input"
            />
          </div>
        </div>

        {/* Table */}
        <div className="pickup-table-container">
          {/* Header Row */}
          <div className="table-row table-header">
            <div className="table-cell">Date</div>
            <div className="table-cell">Location</div>
            <div className="table-cell">Type</div>
            <div className="table-cell">User</div>
            <div className="table-cell">Status</div>
          </div>
          
          {/* Data Rows */}
          {currentPickupData.map((pickup) => (
            <div className="table-row" key={pickup.id}>
              <div className="table-cell">{pickup.date}</div>
              <div className="table-cell">{pickup.location}</div>
              <div className="table-cell">{pickup.type}</div>
              <div className="table-cell">{pickup.user}</div>
              <div className="table-cell">
                <span className={`status-badge status-${pickup.status.toLowerCase()}`}>
                  {pickup.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pickup-pagination">
          <div className="pagination-info">
            Showing {showingStart} to {showingEnd} of {totalEntries} entries
          </div>
          <div className="pagination-controls">
            <button 
              className="pagination-btn prev" 
              onClick={handlePrevious} 
              disabled={activePage === 1}
            >
              Previous
            </button>
            
            {pageNumbers.map((page) => (
              <button
                key={page}
                className={`pagination-btn ${activePage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="pagination-btn next" 
              onClick={handleNext} 
              disabled={activePage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PickupManagement;
