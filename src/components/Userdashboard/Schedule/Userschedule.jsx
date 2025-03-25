import React, { useState } from "react";
import "./Userschedule.css";

const data = [
  { date: "Jan 15, 2025 09:00 AM", location: "Newroad", route: "#123-Kathmandu", type: "Organic", amount: "250 kg", status: "Pending" },
  { date: "Jan 16, 2025 10:30 AM", location: "Newroad", route: "#123-Kathmandu", type: "Recyclable", amount: "180 kg", status: "Completed" },
  { date: "Jan 17, 2025 02:00 PM", location: "Newroad", route: "#123-Kathmandu", type: "Recyclable", amount: "75 kg", status: "Completed" },
];

 const Userschedule=()=> {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredData = data.filter(
    (row) =>
      (filterType === "All" || row.type === filterType) &&
      row.location.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="container">
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
            <th>Route</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.location}</td>
              <td>{row.route}</td>
              <td><span className="type-badge">{row.type}</span></td>
              <td>{row.amount}</td>
              <td className={row.status === "Pending" ? "status-pending" : "status-completed"}>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={i + 1 === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}
export default Userschedule;