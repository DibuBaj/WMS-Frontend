import React from "react";
import "./Recentpickup.css";

const RecentPickups = [
  { date: "Jan 15, 2025 5:30am", location: "Newroad", route: "#123-Kathmandu", type: "Organic", amount: "50 kg", status: "Pending" },
  { date: "Jan 14, 2025 6:30am", location: "Newroad", route: "#123-Kathmandu", type: "Recyclable", amount: "30 kg", status: "Completed" },
  { date: "Jan 13, 2025 8:30am", location: "Newroad", route: "#123-Kathmandu", type: "Organic", amount: "25 kg", status: "Completed" },
];

const Recentpickup = () => {
  return (
    <div className="recent-pickups-wrapper">
      <h2 className="Recenttext">Recent Pickups</h2>
      <div className="recent-pickups">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Route</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {RecentPickups.map((pickup, index) => (
              <tr key={index}>
                <td>{pickup.date}</td>
                <td>{pickup.location}</td>
                <td>{pickup.route}</td>
                <td>{pickup.type}</td>
                <td>{pickup.amount}</td>
                <td className={pickup.status === "Pending" ? "status-pending" : "status-completed"}>
                  {pickup.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recentpickup;
