import React, { useState } from "react";
import { Search } from "lucide-react";
import AdminLayout from "../Navbar/AdminLayout";
import "./Routes.css";

const routeData = [
  {
    _id: "68165155176c1e565eca912d",
    routeId: "RT004",
    routeName: "Lubhu/Lalitpur",
    status: "Scheduled",
    createdAt: "2025-05-03T17:24:37.201Z",
  },
  {
    _id: "68163972d1eaef6ae4547ad3",
    routeId: "RT003",
    routeName: "Lubhu/Lalitpur",
    status: "Scheduled",
    createdAt: "2025-05-03T15:42:42.829Z",
  },
  {
    _id: "6815a4458a8352e95c09ecb8",
    routeId: "RT002",
    routeName: "Patan/Lalitpur",
    status: "Scheduled",
    createdAt: "2025-05-03T05:06:13.045Z",
  },
];

const itemsPerPage = 7;

const Routes = () => {
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");

  // Filtered data based on search
  const filteredRoutes = routeData.filter(
    (route) =>
      route.routeId.toLowerCase().includes(search.toLowerCase()) ||
      route.routeName.toLowerCase().includes(search.toLowerCase()) ||
      route.status.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalEntries = filteredRoutes.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoutes = filteredRoutes.slice(startIndex, endIndex);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <div className="routes-content card">
        {/* Header: Title and Search */}
        <div className="routes-header">
          <h2 className="routes-title">Routes Management</h2>
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search routes..."
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="routes-table-container">
          {/* Header Row */}
          <div className="table-row table-header">
            <div className="table-cell">Route ID</div>
            <div className="table-cell">Route Name</div>
            <div className="table-cell">Status</div>
            <div className="table-cell">Created At</div>
          </div>

          {/* Data Rows */}
          {currentRoutes.length === 0 ? (
            <div className="table-row">
              <div className="table-cell" colSpan={4} style={{ textAlign: 'center' }}>
                No routes found.
              </div>
            </div>
          ) : (
            currentRoutes.map((route) => (
              <div className="table-row" key={route._id}>
                <div className="table-cell">{route.routeId}</div>
                <div className="table-cell">{route.routeName}</div>
                <div className="table-cell">
                  <span className={`status-badge status-${route.status.toLowerCase()}`}>
                    {route.status}
                  </span>
                </div>
                <div className="table-cell">{formatDate(route.createdAt)}</div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="routes-pagination">
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

export default Routes; 