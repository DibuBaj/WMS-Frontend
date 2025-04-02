import { useState } from "react"
import { Search, Leaf, Box, Inbox, LayoutDashboard } from "lucide-react"
import "./PickupManagement.css"

export default function PickupManagement() {
  const [activePage, setActivePage] = useState(1)

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
      date: "Jan 13, 2025 8:30am",
      location: "Newroad",
      type: "Organic",
      user: "Ram Shrestha",
      status: "Completed",
    },
    {
      id: 7,
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
      <div className="sidebar">
        <div className="logo-container">
          <div className="logo-circle">
            <Leaf className="logo-icon" />
          </div>
          <h1 className="logo-text">GreenBin</h1>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>
              <button className="nav-button active">
                <LayoutDashboard className="nav-icon" />
                Dashboard
              </button>
            </li>
            <li>
              <button className="nav-button">
                <Box className="nav-icon" />
                Collections
              </button>
            </li>
            <li>
              <button className="nav-button">
                <Inbox className="nav-icon" />
                All Pickup
              </button>
            </li>
          </ul>
        </nav>
      </div>

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

                <button
                  className={`pagination-number ${activePage === 2 ? "active" : ""}`}
                  onClick={() => handlePageChange(2)}
                >
                  2
                </button>

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
}

