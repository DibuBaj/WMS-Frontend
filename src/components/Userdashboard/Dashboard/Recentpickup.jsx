import React from "react";
import "./Recentpickup.css";

const Recentpickup = ({ recentPickups }) => {
  return (
    <div className="recent-pickups-wrapper">
      <h2 className="Recenttext">Recent Pickups</h2>
      <div className="recent-pickups">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              {/* <th>Route</th> */}
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentPickups.map((pickup, index) => (
              <tr key={index}>
                <td>{pickup.date}</td>
                <td>{pickup.location}</td>
                {/* <td>{pickup.route}</td> */}
                <td>{pickup.type}</td>
                <td>{pickup.amount}</td>
                <td className={pickup.status === "Pending" ? "status-pending status-td" : "status-completed status-td"}>
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

