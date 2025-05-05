<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from "react";
// Removed Leaf, Box imports as they are not in the design
import { Search } from "lucide-react"; 
import Header from "../Navbar/Header";
=======
import { useState } from "react";
// Removed Leaf, Box imports as they are not in the design
import { Search } from "lucide-react"; 
import Header from "../Navbar/Header";
<<<<<<< HEAD

>>>>>>> 7ab7657 (Sneha Branch Fixes)
=======
>>>>>>> da5f14c (updated the codes)
=======
import React, { useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../Navbar/AdminLayout";
>>>>>>> e1879a9 (Admin Navbar)
import "./PickupManagement.css";

const PickupManagement = () => {
  const [activePage, setActivePage] = useState(1);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da5f14c (updated the codes)
  const itemsPerPage = 7; // Assuming 7 items per page based on design example
  const totalEntries = 24; // From design example

  // Sample data - expanded slightly for pagination example
<<<<<<< HEAD
=======
import { useState } from "react"
import { Search, Leaf, Box, Inbox, LayoutDashboard } from "lucide-react"
import "./PickupManagement.css"
import Navbar from "../Navbar/Navbar"

export default function PickupManagement() {
  const [activePage, setActivePage] = useState(1)
=======

>>>>>>> 7ab7657 (Sneha Branch Fixes)

>>>>>>> 4a79a34 (Pickup)
=======
>>>>>>> da5f14c (updated the codes)
=======
  const itemsPerPage = 7;
  const totalEntries = 24;

  // Sample data
>>>>>>> e1879a9 (Admin Navbar)
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
<<<<<<< HEAD
<<<<<<< HEAD
    {
      id: 6,
<<<<<<< HEAD
=======
    {
      id: 6,
>>>>>>> da5f14c (updated the codes)
      date: "Jan 12, 2025 9:00am",
      location: "Patan",
      type: "Recyclable",
      user: "Sita Rai",
<<<<<<< HEAD
=======
      date: "Jan 13, 2025 8:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
>>>>>>> 4a79a34 (Pickup)
=======
>>>>>>> da5f14c (updated the codes)
      status: "Completed",
    },
    {
      id: 7,
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> da5f14c (updated the codes)
      date: "Jan 11, 2025 7:15am",
      location: "Bhaktapur",
      type: "Organic",
      user: "Hari Lama",
      status: "Pending",
    },
<<<<<<< HEAD
    // Add more entries if needed to test pagination beyond page 1
<<<<<<< HEAD
=======
>>>>>>> e1879a9 (Admin Navbar)
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

<<<<<<< HEAD
          {/* Pagination */}
          <div className="pickup-pagination">
            <div className="pagination-info">
              Showing {showingStart} to {showingEnd} of {totalEntries} entries
            </div>
=======
  
=======
>>>>>>> da5f14c (updated the codes)
  ];

  // Calculate pagination details
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // In a real app, you'd slice the *full* dataset based on pagination
  // For this example, we'll just use the sample data as if it's page 1
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

  // Generate page numbers to display (e.g., 1, 2, 3)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <Header />
      <div className="pickup-container"> {/* Use same container class? */}
        <Sidebarr />
        
        <div className="pickup-content card"> {/* Added card class */}
          {/* Header: Title and Search */}
          <div className="pickup-header">
            <h2 className="pickup-title">Pickup Management</h2>
            <div className="search-wrapper">
              {/* Using placeholder icon from lucide, replace if needed */}
              <Search className="search-icon" size={18} /> 
              <input 
                type="text" 
                placeholder="Search routes..." /* Placeholder text from design */
                className="search-input"
              />
            </div>
          </div>

          {/* Table using div structure */}
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
                <div className="table-cell">{pickup.type}</div> {/* Removed icons */}
                <div className="table-cell">{pickup.user}</div>
                <div className="table-cell">
                  {/* Ensure class names match CSS (e.g., status-pending) */}
                  <span className={`status-badge status-${pickup.status.toLowerCase()}`}>
                    {pickup.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pickup-pagination">
<<<<<<< HEAD
            <div className="pagination-info">Showing 1 to 7 of {pickupData.length} entries</div>
>>>>>>> 7ab7657 (Sneha Branch Fixes)
=======
            <div className="pagination-info">
              Showing {showingStart} to {showingEnd} of {totalEntries} entries
            </div>
>>>>>>> da5f14c (updated the codes)
            <div className="pagination-controls">
              <button 
                className="pagination-btn prev" 
                onClick={handlePrevious} 
                disabled={activePage === 1}
=======
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
>>>>>>> e1879a9 (Admin Navbar)
              >
                {page}
              </button>
<<<<<<< HEAD
              
<<<<<<< HEAD
<<<<<<< HEAD
              {pageNumbers.map((page) => (
=======
      date: "Jan 13, 2025 8:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
      status: "Completed",
    },
  ]

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1)
    }
  }

  const handleNext = () => {
    if (activePage < 3) {
      setActivePage(activePage + 1)
    }
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1 className="page-title">Pickup Management</h1>
          <div className="header-right">
            <div className="search-container">
              <Search className="search-icon" />
              <input type="text" placeholder="Search routes..." className="search-input" />
            </div>
            <div className="user-info">Admin User</div>
          </div>
        </header>

        <main className="main-area">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>User</th>
                  <th className="status-column">Status</th>
                </tr>
              </thead>
              <tbody>
                {pickupData.map((pickup) => (
                  <tr key={pickup.id} className="table-row">
                    <td className="date-cell">{pickup.date}</td>
                    <td>{pickup.location}</td>
                    <td>
                      <div className="type-container">
                        {pickup.type === "Organic" ? (
                          <Leaf className="type-icon organic" />
                        ) : (
                          <Box className="type-icon recyclable" />
                        )}
                        {pickup.type}
                      </div>
                    </td>
                    <td>{pickup.user}</td>
                    <td className="status-cell">
                      <span className={`status-badge ${pickup.status === "Pending" ? "pending" : "completed"}`}>
                        {pickup.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-container">
              <div className="pagination-info">Showing 1 to 3 of 24 entries</div>
              <div className="pagination-controls">
                <button className="pagination-button prev" onClick={handlePrevious} disabled={activePage === 1}>
                  Previous
                </button>

                <button
                  className={`pagination-number ${activePage === 1 ? "active" : ""}`}
                  onClick={() => handlePageChange(1)}
                >
                  1
                </button>

>>>>>>> 4a79a34 (Pickup)
                <button
                  className={`pagination-number ${activePage === 2 ? "active" : ""}`}
                  onClick={() => handlePageChange(2)}
                >
                  2
                </button>
<<<<<<< HEAD
=======
              {[1, 2, 3].map((page) => (
=======
              {pageNumbers.map((page) => (
>>>>>>> da5f14c (updated the codes)
                <button
                  key={page}
                  className={`pagination-btn ${activePage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
>>>>>>> 7ab7657 (Sneha Branch Fixes)
              ))}
              
              <button 
                className="pagination-btn next" 
                onClick={handleNext} 
<<<<<<< HEAD
<<<<<<< HEAD
                disabled={activePage === totalPages}
=======
                disabled={activePage === 3}
>>>>>>> 7ab7657 (Sneha Branch Fixes)
=======
                disabled={activePage === totalPages}
>>>>>>> da5f14c (updated the codes)
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
<<<<<<< HEAD
  ); // Ensure this parenthesis closes the return statement
=======

                <button
                  className={`pagination-number ${activePage === 3 ? "active" : ""}`}
                  onClick={() => handlePageChange(3)}
                >
                  3
                </button>

                <button className="pagination-button next" onClick={handleNext} disabled={activePage === 3}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
>>>>>>> 4a79a34 (Pickup)
}

=======
    </div>
  );
=======
  ); // Ensure this parenthesis closes the return statement
>>>>>>> da5f14c (updated the codes)
}
>>>>>>> 7ab7657 (Sneha Branch Fixes)
=======
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
>>>>>>> e1879a9 (Admin Navbar)
