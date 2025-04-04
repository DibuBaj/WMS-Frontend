import { useState } from "react";
// Removed Leaf, Box imports as they are not in the design
import { Search } from "lucide-react"; 
import Header from "../Navbar/Header";
import "./PickupManagement.css";
import Sidebarr from "../Navbar/Sidebarr";

export default function PickupManagement() {
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 7; // Assuming 7 items per page based on design example
  const totalEntries = 24; // From design example

  // Sample data - expanded slightly for pagination example
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
    // Add more entries if needed to test pagination beyond page 1
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
      </div>
    </div>
  ); // Ensure this parenthesis closes the return statement
}
