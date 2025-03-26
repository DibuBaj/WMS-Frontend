import React, { useState } from 'react';
import "./Pickup.css";

const Pickup = () => {
  const [formData, setFormData] = useState({
    dateTime: '',
    location: '',
    route: '#123-Kathmandu',
    wasteType: 'Organic',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="pickup-container">
      <h2 className='Maintext'>New Pickup Request</h2>
      <p className='subtext'>Schedule a new waste collection</p>
      <div>
        <form className="pickup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Pickup Date & Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              className="pickup-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter address"
              className="pickup-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Route</label>
            <select
              name="route"
              value={formData.route}
              onChange={handleChange}
              className="pickup-select"
              required
            >
              <option value="#123-Kathmandu">#123-Kathmandu</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Waste Type</label>
            <select
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
              className="pickup-select"
              required
            >
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Non-Recyclable">Non-Recyclable</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Amount (kg)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="pickup-input"
              min="1"
              required
            />
          </div>
          
          <button type="submit" className="pickup-button">Schedule Pickup</button>
        </form>
      </div>
    </div>
  );
};

export default Pickup;