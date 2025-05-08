import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import axios from "axios";
import AdminLayout from "../Navbar/AdminLayout";
import "./PickupManagement.css";

const PickupManagement = () => {
  const [activePage, setActivePage] = useState(1);
  const [pickupData, setPickupData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    wasteType: "",
    status: "",
    dateRange: {
      start: "",
      end: ""
    }
  });
  const itemsPerPage = 7;

  // Get unique waste types and statuses for filter options
  const wasteTypes = [...new Set(pickupData.map(pickup => pickup.wasteType))];
  const statuses = [...new Set(pickupData.map(pickup => pickup.status))];

  useEffect(() => {
    const fetchPickupData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/admin/pickups/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPickupData(response.data.pickups);
        setFilteredData(response.data.pickups);
        setTotalEntries(response.data.count);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch pickup data");
        setLoading(false);
        console.error("Error fetching pickup data:", err);
      }
    };

    fetchPickupData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...pickupData];

    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((pickup) => {
        return (
          pickup.address.toLowerCase().includes(query) ||
          pickup.wasteType.toLowerCase().includes(query) ||
          (pickup.userId?.fullName?.toLowerCase().includes(query) ?? false) ||
          pickup.status.toLowerCase().includes(query) ||
          pickup.subscription.toLowerCase().includes(query)
        );
      });
    }

    // Apply waste type filter
    if (filters.wasteType) {
      filtered = filtered.filter(pickup => 
        pickup.wasteType.toLowerCase() === filters.wasteType.toLowerCase()
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(pickup => 
        pickup.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Apply date range filter
    if (filters.dateRange.start) {
      filtered = filtered.filter(pickup => 
        new Date(pickup.pickupDateTime) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      filtered = filtered.filter(pickup => 
        new Date(pickup.pickupDateTime) <= new Date(filters.dateRange.end)
      );
    }

    setFilteredData(filtered);
    setTotalEntries(filtered.length);
    setActivePage(1);
  }, [searchQuery, filters, pickupData]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleDateRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      wasteType: "",
      status: "",
      dateRange: {
        start: "",
        end: ""
      }
    });
    setSearchQuery("");
  };

  // Calculate pagination details
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPickupData = filteredData.slice(startIndex, endIndex);
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="pickup-content card">
          <div className="loading">Loading pickup data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="pickup-content card">
          <div className="error">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="pickup-content card">
        {/* Header: Title, Search and Filter */}
        <div className="pickup-header">
          <h2 className="pickup-title">Pickup Management</h2>
          <div className="header-controls">
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search pickups..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-group">
              <label>Waste Type</label>
              <select 
                value={filters.wasteType}
                onChange={(e) => handleFilterChange('wasteType', e.target.value)}
              >
                <option value="">All Types</option>
                {wasteTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Status</label>
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group date-range">
              <label>Date Range</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateRangeChange('start', e.target.value)}
                  placeholder="Start Date"
                />
                <span>to</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange('end', e.target.value)}
                  placeholder="End Date"
                />
              </div>
            </div>

            <button className="clear-filters" onClick={clearFilters}>
              <X size={16} />
              Clear Filters
            </button>
          </div>
        )}

        {/* Table */}
        <div className="pickup-table-container">
          {/* Header Row */}
          <div className="table-row table-header">
            <div className="table-cell">Date</div>
            <div className="table-cell">Location</div>
            <div className="table-cell">Type</div>
            <div className="table-cell">User</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Status</div>
          </div>
          
          {/* Data Rows */}
          {currentPickupData.length > 0 ? (
            currentPickupData.map((pickup) => (
              <div className="table-row" key={pickup._id}>
                <div className="table-cell">
                  {new Date(pickup.pickupDateTime).toLocaleString()}
                </div>
                <div className="table-cell">{pickup.address}</div>
                <div className="table-cell">{pickup.wasteType}</div>
                <div className="table-cell">
                  {pickup.userId ? pickup.userId.fullName : "Guest"}
                </div>
                <div className="table-cell">
                  {pickup.amount} {pickup.unit}
                </div>
                <div className="table-cell">
                  <span className={`status-badge status-${pickup.status.toLowerCase()}`}>
                    {pickup.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No pickups found matching your criteria</div>
          )}
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
