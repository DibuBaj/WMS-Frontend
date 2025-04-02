import { useState } from "react";
import { Search, Leaf, Box } from "lucide-react";
import Header from "../Navbar/Header";

import "./PickupManagement.css";
import Sidebarr from "../Navbar/Sidebarr";

export default function PickupManagement() {
  const [activePage, setActivePage] = useState(1);


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
  
  ];

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handlePrevious = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const handleNext = () => {
    if (activePage < 3) {
      setActivePage(activePage + 1);
    }
  };

  return (
    <div>
      <Header/>
    <div className="pickup-container">
      <Sidebarr />
      
      <div className="pickup-content">
        <div className="pickup-search-container">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search pickups..." 
              className="search-input"
            />
          </div>
        </div>

        <div className="pickup-table-container">
          <table className="pickup-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Type</th>
                <th>User</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pickupData.map((pickup) => (
                <tr key={pickup.id}>
                  <td>{pickup.date}</td>
                  <td>{pickup.location}</td>
                  <td>
                    <div className="type-wrapper">
                      {pickup.type === "Organic" ? (
                        <Leaf className="type-icon organic" />
                      ) : (
                        <Box className="type-icon recyclable" />
                      )}
                      {pickup.type}
                    </div>
                  </td>
                  <td>{pickup.user}</td>
                  <td>
                    <span className={`status-badge ${pickup.status.toLowerCase()}`}>
                      {pickup.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pickup-pagination">
            <div className="pagination-info">Showing 1 to 7 of {pickupData.length} entries</div>
            <div className="pagination-controls">
              <button 
                className="pagination-btn prev" 
                onClick={handlePrevious} 
                disabled={activePage === 1}
              >
                Previous
              </button>
              
              {[1, 2, 3].map((page) => (
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
                disabled={activePage === 3}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
